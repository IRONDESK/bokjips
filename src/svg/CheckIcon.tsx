import React, { SVGProps } from "react";

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="-4 -4 18 16" x="393" y="293" {...props}>
      <path
        fillRule="evenodd"
        d="M4.243 5.071L8.485.828 9.9 2.243 5.657 6.485 4.243 7.9 0 3.657l1.414-1.414L4.243 5.07z"
      />
    </svg>
  );
}

export default CheckIcon;
