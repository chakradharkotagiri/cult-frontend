import Card from "../shared/Components/FormElements/Card";

// Mirrors HomeItem's spacing and sizes, so the feed doesn't jump when real
// posts replace it. Change the two together.
const PostSkeleton = () => {
  return (
    <div
      data-testid="post-skeleton"
      className="w-full shadow-lg bg-[#282828] mb-5 rounded-xl"
    >
      <Card className="p-4 rounded-xl overflow-hidden">
        <div className="flex gap-3">
          <div className="skeleton w-12 h-12 flex-shrink-0" />
          <div>
            <div className="skeleton h-5 w-24 mb-2" />
            <div className="skeleton h-7 w-40" />
          </div>
        </div>

        <div className="skeleton mt-3 mb-4 h-5 w-3/4" />

        <div className="skeleton mb-4 w-full h-64 md:h-80 rounded-3xl" />

        <div className="flex gap-3">
          {[0, 1, 2].map((action) => (
            <div key={action} className="mt-4">
              {/* 30px, not 24: HomeItem's inline buttons sit in a text line. */}
              <div className="h-[30px]">
                <div className="skeleton w-6 h-6" />
              </div>
              <div className="skeleton mt-1 h-5 w-6" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PostSkeleton;
