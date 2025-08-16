import * as React from "react";

const LikeIcon = ({className,...rest}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="20"
    fill="currentcolor"
    viewBox="0 0 22 20"
    className={className}
    {...rest}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M11.62 18.81c-.34.12-.9.12-1.24 0C7.48 17.82 1 13.69 1 6.69 1 3.6 3.49 1.1 6.56 1.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C18.51 1.1 21 3.6 21 6.69c0 7-6.48 11.13-9.38 12.12"
    ></path>
  </svg>
);

export default LikeIcon;
