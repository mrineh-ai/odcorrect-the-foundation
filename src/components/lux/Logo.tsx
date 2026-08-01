import logoAsset from "@/assets/odcorrect-logo.asset.json";

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
  return (
    <img
      src={logoAsset.url}
      alt="ODCORRECT — Unlearn What's Right"
      width={width}
      height={width}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      className={className}
      style={{ width, height: "auto" }}
    />
  );
}
