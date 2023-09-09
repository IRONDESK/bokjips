import React, { SVGProps } from "react";

export function ServiceAlertSpeakerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24" {...props}>
      <g>
        <path d="M23 16a1 1 0 0 1-.446-.105l-2-1a1 1 0 0 1 .894-1.79l2 1A1 1 0 0 1 23 16zm-1.553-9.1 2-1a1 1 0 1 0-.894-1.79l-2 1a1 1 0 0 0 .894 1.79zM24 10a1 1 0 0 0-1-1h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1zm-6 9V1a1 1 0 0 0-2 0c0 2.949-2.583 4-5 4H4a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h7c2.417 0 5 1.051 5 4a1 1 0 0 0 2 0zm-9.814-2H4a6 6 0 0 1-1.382-.167l2.5 5.582A2.671 2.671 0 0 0 7.558 24 2.462 2.462 0 0 0 9.8 20.528z"></path>
      </g>
    </svg>
  );
}

export function ServiceAlertErrorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 512 512" {...props}>
      <g>
        <path d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256C511.847 114.678 397.322.153 256 0zm0 448c-106.039 0-192-85.961-192-192S149.961 64 256 64s192 85.961 192 192c-.118 105.99-86.01 191.882-192 192z"></path>
        <path d="M256 321.941c17.673 0 32-14.327 32-32V140.608c0-17.673-14.327-32-32-32s-32 14.327-32 32v149.333c0 17.673 14.327 32 32 32z"></path>
        <circle cx="256.107" cy="373.333" r="32"></circle>
      </g>
    </svg>
  );
}
