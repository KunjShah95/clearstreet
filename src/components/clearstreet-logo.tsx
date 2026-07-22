import React from "react";

interface ClearStreetLogoProps {
  className?: string;
  variant?: "light" | "dark" | "white";
  showText?: boolean;
}

export function ClearStreetLogo({
  className = "h-7 w-auto",
  variant = "light",
  showText = true,
}: ClearStreetLogoProps) {
  const brandColor = variant === "dark" ? "#01001F" : "#2E21DE";
  const textColor = variant === "dark" ? "#01001F" : "#FFFFFF";

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M2.00005 5.86593L15.6165 1.97501L29.2331 5.86593V8.78324L15.6165 7.08118L2.00005 8.78324V5.86593Z"
          fill={variant === "white" ? "#FFFFFF" : brandColor}
        />
        <path
          d="M2.00002 11.7951L15.6165 10.3347L29.233 11.7951V14.4708H2.00002V11.7951Z"
          fill={variant === "white" ? "#FFFFFF" : brandColor}
        />
        <path
          d="M2.00002 17.4792H29.233V20.1549L15.6165 21.6153L2.00002 20.1549V17.4792Z"
          fill={variant === "white" ? "#FFFFFF" : brandColor}
        />
        <path
          d="M2.00002 23.1667L15.6165 24.8688L29.233 23.1667V26.0911L15.6165 29.982L2.00002 26.0911V23.1667Z"
          fill={variant === "white" ? "#FFFFFF" : brandColor}
        />
      </svg>
      {showText && (
        <span
          className="font-sans text-lg font-bold tracking-tight uppercase"
          style={{ color: textColor }}
        >
          CLEAR STREET
        </span>
      )}
    </div>
  );
}
