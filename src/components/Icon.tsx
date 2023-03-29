import React from 'react';

interface IconProps {
  className: string;
  download?: boolean;
  href?: string;
  isButton?: boolean;
  handleClick?: () => void;
  Icon: React.FC<{ size: number; color: string }>;
}

export default function Icon({
  className,
  download,
  href,
  isButton = false,
  handleClick,
  Icon,
}: IconProps) {
  if (isButton) {
    return (
      <button
        className={`rounded-full  p-3 shadow hover:shadow-none hover:-translate-y-1 transition duration-300 ease-in-out ${className} `}
        onClick={() => handleClick && handleClick()}
        type="button"
      >
        <Icon size={32} color="white" />
      </button>
    );
  } else {
    return (
      <a
        className={`rounded-full p-3 shadow hover:shadow-none hover:-translate-y-1 transition duration-300 ease-in-out ${className}`}
        download={download}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon size={32} color="white" />
      </a>
    );
  }
}
