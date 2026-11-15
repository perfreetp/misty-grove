import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 16): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const IconLayers = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3 3 8l9 5 9-5-9-5Z" />
    <path d="m3 13 9 5 9-5" />
    <path d="m3 17.5 9 5 9-5" opacity={0.45} />
  </svg>
);

export const IconPen = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
  </svg>
);

export const IconCube = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 2.6 21 7.4v9.2L12 21.4 3 16.6V7.4l9-4.8Z" />
    <path d="M3 7.4 12 12l9-4.6M12 12v9.4" />
  </svg>
);

export const IconList = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
  </svg>
);

export const IconSliders = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
    <path d="M1.5 14h5M9.5 8h5M17.5 16h5" />
  </svg>
);

export const IconChart = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3 20h18" />
    <path d="M6.5 20V11M11.5 20V5M16.5 20v-6" />
  </svg>
);

export const IconCheck = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const IconX = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconAlert = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3.5 2.6 20h18.8L12 3.5Z" />
    <path d="M12 9.5v4.5M12 17h.01" />
  </svg>
);

export const IconInfo = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5M12 7.8h.01" />
  </svg>
);

export const IconRotate = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M20.5 12a8.5 8.5 0 1 1-3-6.5" />
    <path d="M20.5 4v5h-5" />
  </svg>
);

export const IconUpload = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 16V4M7.5 8.5 12 4l4.5 4.5" />
    <path d="M4 16.5V19a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-2.5" />
  </svg>
);

export const IconDoc = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M14 3H7a1.6 1.6 0 0 0-1.6 1.6v14.8A1.6 1.6 0 0 0 7 21h10a1.6 1.6 0 0 0 1.6-1.6V7.6L14 3Z" />
    <path d="M13.6 3v5h5M8.5 13h7M8.5 17h4.5" />
  </svg>
);

export const IconTarget = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.8" fill="currentColor" />
  </svg>
);

export const IconRoute = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="5.5" cy="5.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
    <path d="M8 5.5h6.5a4 4 0 0 1 0 8H9a4 4 0 0 0 0 5h6.5" />
  </svg>
);

export const IconGauge = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3.5 17a9 9 0 1 1 17 0" />
    <path d="M12 17l4.2-4.8" />
    <circle cx="12" cy="17" r="1.4" fill="currentColor" />
  </svg>
);

export const IconUser = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="8.2" r="3.7" />
    <path d="M4.8 20c.9-3.5 3.7-5.5 7.2-5.5s6.3 2 7.2 5.5" />
  </svg>
);

export const IconPlus = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconTrash = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 7h16M9.5 7V4.8h5V7M6.5 7l.9 12.4A1.6 1.6 0 0 0 9 21h6a1.6 1.6 0 0 0 1.6-1.6L17.5 7" />
  </svg>
);

export const IconUndo = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 9h10.5a5 5 0 0 1 0 10H8" />
    <path d="M7.5 5 3.5 9l4 4" />
  </svg>
);

export const IconEye = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconCamera = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3.5 8.5h3l1.5-2.5h8l1.5 2.5h3V19h-17V8.5Z" />
    <circle cx="12" cy="13.5" r="3.2" />
  </svg>
);

export const IconDownload = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5" />
    <path d="M4 16.5V19a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-2.5" />
  </svg>
);

export const IconFilter = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3.5 5h17l-6.5 7.5V20l-4-2.2v-5.3L3.5 5Z" />
  </svg>
);

export const IconClock = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.4 2" />
  </svg>
);

export const IconBack = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M10 5 3 12l7 7M3 12h18" />
  </svg>
);

export const IconFlask = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M9.5 3h5M10.5 3v6.2L5.2 18a1.7 1.7 0 0 0 1.4 2.5h10.8a1.7 1.7 0 0 0 1.4-2.5L13.5 9.2V3" />
    <path d="M7.6 14h8.8" />
  </svg>
);

export const IconGrid = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
  </svg>
);

export const IconLungs = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3v9" />
    <path d="M9.5 8.5C7 9 4.5 11.5 4 15c-.3 2.2.6 4.5 2.6 4.9 1.6.3 3-1 3-3V11c0-1.3-.4-2.2-1.1-2.5Z" />
    <path d="M14.5 8.5C17 9 19.5 11.5 20 15c.3 2.2-.6 4.5-2.6 4.9-1.6.3-3-1-3-3V11c0-1.3.4-2.2 1.1-2.5Z" />
  </svg>
);
