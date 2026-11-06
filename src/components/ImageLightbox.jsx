import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { FiArrowLeft, FiMinus, FiPlus } from "react-icons/fi";

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const BUTTON_ZOOM_FACTOR = 1.5;
const DOUBLE_TAP_SCALE = 2.5;
const DOUBLE_TAP_MS = 300;
const TAP_SLOP_PX = 8;
const KEYBOARD_PAN_PX = 80;
const SWIPE_DISMISS_PX = 100;

const clampNumber = (value, min, max) => Math.min(max, Math.max(min, value));

const controlClasses =
  "flex items-center justify-center text-white transition-colors hover:bg-white/15 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFD02] " +
  "disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-default";

const ImageLightbox = ({ src, alt = "", onClose }) => {
  const [view, setViewState] = useState({ scale: 1, x: 0, y: 0 });
  const [animate, setAnimate] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeY, setSwipeY] = useState(0);
  const [entered, setEntered] = useState(false);

  const dialogRef = useRef(null);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const backButtonRef = useRef(null);

  // Gesture handlers run many times between renders, so they read the latest
  // view from a ref rather than from a possibly stale closure.
  const viewRef = useRef(view);
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const pinch = useRef(null);
  const lastTap = useRef(null);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const historyEntryPushed = useRef(false);
  const isClosing = useRef(false);

  // Pointer position relative to the centre of the stage, which is the origin
  // the image's transform is expressed in.
  const fromCentre = useCallback((clientX, clientY) => {
    const stage = stageRef.current.getBoundingClientRect();
    return {
      x: clientX - stage.left - stage.width / 2,
      y: clientY - stage.top - stage.height / 2,
    };
  }, []);

  // Keeps the image covering the stage: it can't be dragged past its edges.
  const clampView = useCallback(({ scale, x, y }) => {
    const image = imageRef.current;
    const stage = stageRef.current;
    if (!image || !stage) return { scale, x, y };
    const maxX = Math.max(0, (image.offsetWidth * scale - stage.clientWidth) / 2);
    const maxY = Math.max(0, (image.offsetHeight * scale - stage.clientHeight) / 2);
    return {
      scale,
      x: clampNumber(x, -maxX, maxX),
      y: clampNumber(y, -maxY, maxY),
    };
  }, []);

  const setView = useCallback(
    (next, shouldAnimate) => {
      const clamped = clampView(next);
      viewRef.current = clamped;
      setAnimate(shouldAnimate);
      setViewState(clamped);
    },
    [clampView]
  );

  // Zooms while keeping the point under (pointX, pointY) stationary.
  const zoomTo = useCallback(
    (targetScale, pointX, pointY, shouldAnimate) => {
      const { scale, x, y } = viewRef.current;
      const nextScale = clampNumber(targetScale, MIN_SCALE, MAX_SCALE);
      const ratio = nextScale / scale;
      setView(
        {
          scale: nextScale,
          x: pointX - (pointX - x) * ratio,
          y: pointY - (pointY - y) * ratio,
        },
        shouldAnimate
      );
    },
    [setView]
  );

  const resetZoom = useCallback(
    () => setView({ scale: 1, x: 0, y: 0 }, true),
    [setView]
  );

  const zoomByStep = useCallback(
    (factor) => zoomTo(viewRef.current.scale * factor, 0, 0, true),
    [zoomTo]
  );

  // Every way of closing goes through history, so the entry added on open is
  // always consumed and the browser's Back button behaves like the UI one.
  const close = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;
    window.history.back();
  }, []);

  useEffect(() => {
    if (!historyEntryPushed.current) {
      historyEntryPushed.current = true;
      // Copying the state keeps React Router's location key and index intact,
      // so it treats this as the same page and leaves the feed mounted.
      window.history.pushState({ ...window.history.state }, "");
    }
    const handlePopState = () => onCloseRef.current();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    backButtonRef.current?.focus();
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { scale, x, y } = viewRef.current;
      const pan = (dx, dy) => {
        if (scale === 1) return;
        e.preventDefault();
        setView({ scale, x: x + dx, y: y + dy }, true);
      };

      switch (e.key) {
        case "Escape":
          close();
          break;
        case "+":
        case "=":
          zoomByStep(BUTTON_ZOOM_FACTOR);
          break;
        case "-":
        case "_":
          zoomByStep(1 / BUTTON_ZOOM_FACTOR);
          break;
        case "0":
          resetZoom();
          break;
        case "ArrowLeft":
          pan(KEYBOARD_PAN_PX, 0);
          break;
        case "ArrowRight":
          pan(-KEYBOARD_PAN_PX, 0);
          break;
        case "ArrowUp":
          pan(0, KEYBOARD_PAN_PX);
          break;
        case "ArrowDown":
          pan(0, -KEYBOARD_PAN_PX);
          break;
        case "Tab": {
          e.preventDefault();
          const focusable = [
            ...dialogRef.current.querySelectorAll("button:not(:disabled)"),
          ];
          const index = focusable.indexOf(document.activeElement);
          const step = e.shiftKey ? -1 : 1;
          focusable[(index + step + focusable.length) % focusable.length].focus();
          break;
        }
        default:
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close, resetZoom, setView, zoomByStep]);

  // React registers wheel listeners as passive, which can't preventDefault.
  useEffect(() => {
    const stage = stageRef.current;
    const handleWheel = (e) => {
      e.preventDefault();
      const pixelDelta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      // Trackpad pinches arrive as ctrl+wheel with much smaller deltas.
      const speed = e.ctrlKey ? 0.01 : 0.002;
      const point = fromCentre(e.clientX, e.clientY);
      zoomTo(
        viewRef.current.scale * Math.exp(-pixelDelta * speed),
        point.x,
        point.y,
        false
      );
    };
    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [fromCentre, zoomTo]);

  useEffect(() => {
    const handleResize = () => setView(viewRef.current, false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setView]);

  const measurePinch = () => {
    const [a, b] = [...pointers.current.values()];
    const midpoint = fromCentre((a.x + b.x) / 2, (a.y + b.y) / 2);
    return { distance: Math.hypot(a.x - b.x, a.y - b.y), midpoint };
  };

  const handlePointerDown = (e) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setIsDragging(true);

    if (pointers.current.size === 1) {
      gesture.current = {
        startX: e.clientX,
        startY: e.clientY,
        // Pointer capture retargets later events, so remember this now.
        startedOnImage: e.target === imageRef.current,
        moved: false,
        swiping: false,
        wasPinch: false,
      };
    } else if (pointers.current.size === 2) {
      gesture.current.moved = true;
      gesture.current.wasPinch = true;
      gesture.current.swiping = false;
      setSwipeY(0);
      pinch.current = { ...measurePinch(), view: viewRef.current };
    }
  };

  const handlePointerMove = (e) => {
    const previous = pointers.current.get(e.pointerId);
    if (!previous) return;
    const current = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, current);

    if (pointers.current.size >= 2) {
      const { distance, midpoint } = measurePinch();
      const start = pinch.current;
      const scale = clampNumber(
        (start.view.scale * distance) / start.distance,
        MIN_SCALE,
        MAX_SCALE
      );
      const ratio = scale / start.view.scale;
      setView(
        {
          scale,
          x: midpoint.x - (start.midpoint.x - start.view.x) * ratio,
          y: midpoint.y - (start.midpoint.y - start.view.y) * ratio,
        },
        false
      );
      return;
    }

    const active = gesture.current;
    const travelled = Math.hypot(
      current.x - active.startX,
      current.y - active.startY
    );
    if (travelled >= TAP_SLOP_PX) active.moved = true;

    const { scale, x, y } = viewRef.current;
    if (scale > 1) {
      setView(
        { scale, x: x + current.x - previous.x, y: y + current.y - previous.y },
        false
      );
    } else if (e.pointerType === "touch" && active.moved && !active.wasPinch) {
      active.swiping = true;
      setSwipeY(Math.max(0, current.y - active.startY));
    }
  };

  const handleTap = (e, startedOnImage) => {
    const now = Date.now();
    const previousTap = lastTap.current;
    const isDoubleTap =
      previousTap &&
      now - previousTap.time < DOUBLE_TAP_MS &&
      Math.hypot(e.clientX - previousTap.x, e.clientY - previousTap.y) <
        TAP_SLOP_PX * 3;

    if (isDoubleTap && startedOnImage) {
      lastTap.current = null;
      if (viewRef.current.scale > 1) {
        resetZoom();
      } else {
        const point = fromCentre(e.clientX, e.clientY);
        zoomTo(DOUBLE_TAP_SCALE, point.x, point.y, true);
      }
      return;
    }

    lastTap.current = { time: now, x: e.clientX, y: e.clientY };
    if (!startedOnImage && viewRef.current.scale === 1) close();
  };

  const handlePointerEnd = (e) => {
    if (!pointers.current.delete(e.pointerId)) return;
    if (pointers.current.size > 0) return;

    setIsDragging(false);
    const { moved, swiping, startY, startedOnImage } = gesture.current;

    if (e.type === "pointercancel") {
      setSwipeY(0);
    } else if (swiping) {
      if (e.clientY - startY >= SWIPE_DISMISS_PX) close();
      else setSwipeY(0);
    } else if (!moved) {
      handleTap(e, startedOnImage);
    }
  };

  const isZoomed = view.scale > 1;
  const backdropOpacity = clampNumber(1 - swipeY / 400, 0.3, 1);

  let imageCursor = "cursor-default";
  if (isZoomed) imageCursor = isDragging ? "cursor-grabbing" : "cursor-grab";

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Photo viewer"}
      // Sized to the screen, not inset-0: an overflowing page stretches the
      // fixed containing block on phones and pushes the controls off-screen.
      className={`fixed left-0 top-0 z-[9999] h-dvh w-screen overscroll-none transition-opacity duration-150 motion-reduce:transition-none ${
        entered ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/95"
        style={{ opacity: backdropOpacity }}
      />

      <div
        ref={stageRef}
        className="absolute inset-0 flex items-center justify-center overflow-hidden touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          draggable={false}
          className={`max-h-full max-w-full ${imageCursor} ${
            animate && !isDragging
              ? "transition-transform duration-200 ease-out motion-reduce:transition-none"
              : ""
          }`}
          style={{
            transform: `translate(${view.x}px, ${view.y + swipeY}px) scale(${view.scale})`,
          }}
        />
      </div>

      <button
        ref={backButtonRef}
        type="button"
        onClick={close}
        aria-label="Back"
        className={`${controlClasses} absolute left-4 top-4 h-11 gap-2 rounded-full border border-white/10 bg-black/60 pl-3 pr-4 text-sm font-medium backdrop-blur`}
      >
        <FiArrowLeft className="h-5 w-5" aria-hidden="true" />
        <span>Back</span>
      </button>

      <div className="absolute bottom-6 left-1/2 flex h-11 -translate-x-1/2 items-center overflow-hidden rounded-full border border-white/10 bg-black/60 backdrop-blur">
        <button
          type="button"
          onClick={() => zoomByStep(1 / BUTTON_ZOOM_FACTOR)}
          disabled={view.scale <= MIN_SCALE}
          aria-label="Zoom out"
          className={`${controlClasses} h-11 w-11`}
        >
          <FiMinus className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={resetZoom}
          disabled={!isZoomed}
          aria-label="Reset zoom"
          title="Reset zoom"
          className={`${controlClasses} h-11 w-14 text-xs font-medium tabular-nums`}
        >
          {Math.round(view.scale * 100)}%
        </button>
        <button
          type="button"
          onClick={() => zoomByStep(BUTTON_ZOOM_FACTOR)}
          disabled={view.scale >= MAX_SCALE}
          aria-label="Zoom in"
          className={`${controlClasses} h-11 w-11`}
        >
          <FiPlus className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body
  );
};

ImageLightbox.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ImageLightbox;
