import React, { SVGProps } from "react";

function Prohibit404Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 512 512" {...props}>
      <g>
        <path d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256C511.847 114.678 397.322.153 256 0zm0 64a190.869 190.869 0 0 1 111.083 35.669L99.669 367.061c-61.503-86.178-41.499-205.897 44.679-267.4A191.703 191.703 0 0 1 256 64zm0 384a190.766 190.766 0 0 1-111.061-35.669l267.392-267.413c61.514 86.17 41.527 205.891-44.643 267.406A191.707 191.707 0 0 1 256 448z"></path>
      </g>
    </svg>
  );
}

export default Prohibit404Icon;
