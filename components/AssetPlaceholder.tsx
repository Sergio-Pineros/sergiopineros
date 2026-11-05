import Image from "next/image";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  className?: string;
};

export default function AssetPlaceholder({ project, className = "" }: Props) {
  if (project.image) {
    const ratio = project.imageRatio ?? "3 / 2";
    return (
      <div
        className={`asset-placeholder asset-placeholder--filled ${className}`}
        data-asset={project.slug}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          aspectRatio: ratio,
          overflow: "hidden",
        }}
      >
        <Image
          src={project.image}
          alt={project.imageAlt ?? project.assetLabel}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div
      className={`asset-placeholder ${className}`}
      data-asset={project.slug}
      aria-label={`Asset placeholder: ${project.assetLabel}`}
    >
      <div className="asset-placeholder__inner">
        <span className="asset-placeholder__label">{project.assetLabel}</span>
        <span className="asset-placeholder__hint">Drop image here</span>
      </div>
    </div>
  );
}
