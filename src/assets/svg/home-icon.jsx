// type Svgprops={
//   className:string;
// }

const HomeIcon = ({className,...rest}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    {...rest}
  >
    <path
      fill="currentColor"
      d="M2.5 20q-1.031 0-1.765-.67Q0 18.656 0 17.713V7.43Q0 6.886.266 6.4T1 5.6L8.5.457q.345-.229.719-.343Q9.594 0 10 0a2.67 2.67 0 0 1 1.5.457L19 5.6q.47.315.735.8T20 7.429v10.285q0 .943-.734 1.615-.734.67-1.766.671h-5v-8h-5v8z"
    />
  </svg>
);

export default HomeIcon;
