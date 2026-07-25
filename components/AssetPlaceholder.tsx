import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  className?: string;
};

export default function AssetPlaceholder({ project, className = "" }: Props) {
  return (
    <div
      className={`asset-placeholder ${className}`}
      data-asset={project.slug}
      aria-label={`Asset placeholder: ${project.assetLabel}`}
    >
      <div className="asset-placeholder__inner">
        <span className="asset-placeholder__label">{project.assetLabel}</span>
        <span className="asset-placeholder__hint">Asset needed</span>
        <span className="asset-placeholder__size">1200 × 800</span>
      </div>
    </div>
  );
}
