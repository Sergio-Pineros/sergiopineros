"use client";

import Image from "next/image";
import { FileText } from "lucide-react";
import AttentionEye from "@/components/AttentionEye";
import { CardHandGallery } from "@/components/ui/card-hand-gallery";
import { getProjectFiles, type Project } from "@/lib/projects";

export default function FolderContents({ project }: { project: Project }) {
  const files = getProjectFiles(project);
  const cards = files.map((file) => ({ ...file, src: file.image }));
  return (
    <>
      <CardHandGallery cards={cards} cardWidth={190} renderCard={(card) => {
        const file = files.find((item) => item.id === card.id)!;
        if (file.artwork === "attention-eye") {
          return <span className="folder-file__artwork"><AttentionEye /></span>;
        }
        if (file.image) {
          return <Image src={file.image} alt="" fill sizes="190px" draggable={false} style={{ objectFit: "contain" }} />;
        }
        return (
          <span className="folder-file__document">
            <FileText size={24} strokeWidth={1.2} />
            <span>{project.name}</span>
            <span>{file.text ?? file.description}</span>
          </span>
        );
      }} />
      {project.href && !project.comingSoon && (
        <a className="folder-file__link" href={project.href} target="_blank" rel="noopener noreferrer">
          {project.linkLabel ?? "Visit the studio"}
        </a>
      )}
    </>
  );
}
