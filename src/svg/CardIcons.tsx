import React, { SVGProps } from "react";

export function MoneyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24" {...props}>
      <g>
        <path d="M18 21H5c-2.76 0-5-2.24-5-5V9c0-.55.45-1 1-1s1 .45 1 1v7c0 1.65 1.35 3 3 3h13c.55 0 1 .45 1 1s-.45 1-1 1ZM14 9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1Zm10-2v6c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V7c0-2.21 1.79-4 4-4h12c2.21 0 4 1.79 4 4Zm-7 3c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3 3-1.35 3-3Z"></path>
      </g>
    </svg>
  );
}

export function VerifiedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g>
        <path d="M23,12l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,12l2.44,2.79l-0.34,3.7 l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,12z M10.09,16.72l-3.8-3.81l1.48-1.48l2.32,2.33 l5.85-5.87l1.48,1.48L10.09,16.72z" />
      </g>
    </svg>
  );
}
