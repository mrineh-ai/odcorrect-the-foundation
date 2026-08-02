const LOGO_SRC = "/odcorrect-logo.png";

const NATURAL_WIDTH = 1022;
const NATURAL_HEIGHT = 603;

interface LogoProps {
  className?: string;
  /** Rendered width in px — proportions are always preserved. */
  width?: number;
  priority?: boolean;
}

/**
 * The official ODCORRECT logo, used exactly as provided.
 * Never recreated, traced or restyled — only scaled proportionally.
 */
export function Logo({ className = "", width = 160, priority = false }: LogoProps) {
  const height = Math.round((width * NATURAL_HEIGHT) / NATURAL_WIDTH);
  return (
    <img
      src={LOGO_SRC}
      alt="ODCORRECT — Unlearn What's Right"
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      className={className}
      style={{ width, height: "auto" }}
    />
  );
}
