"use client";

import Image from "next/image";
import { STORY_PHOTO_COUNT, STORY_YEARS, storyPhotoSrc } from "@/lib/story";

export default function StoryGallery() {
  return (
    <div className="story-gallery">
      <div className="story-gallery__intro">
        <div>
          <h2>Story</h2>
          <span>{STORY_PHOTO_COUNT} photos · {STORY_YEARS.length} years</span>
        </div>
        <nav className="story-gallery__years" aria-label="Jump to a year">
          {STORY_YEARS.map(({ year }) => (
            <button
              key={year}
              type="button"
              onClick={() => document.getElementById(`story-${year}`)?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                block: "start",
              })}
            >
              {year}
            </button>
          ))}
        </nav>
      </div>

      <div className="story-gallery__timeline">
        {STORY_YEARS.map(({ year, photos, note }) => (
          <section className="story-gallery__year" id={`story-${year}`} key={year} aria-labelledby={`story-year-${year}`}>
            <div className="story-gallery__year-heading">
              <h3 id={`story-year-${year}`}>{year}</h3>
              <span>{photos.length} {photos.length === 1 ? "photo" : "photos"}</span>
            </div>
            {note && <p className="story-gallery__note">{note}</p>}
            <div className={`story-gallery__grid${photos.length === 1 ? " story-gallery__grid--single" : photos.length === 2 ? " story-gallery__grid--pair" : ""}`}>
              {photos.map((photo, index) => (
                <figure
                  className={`story-gallery__tile story-gallery__tile--${photo.height > photo.width * 1.12 ? "portrait" : photo.width > photo.height * 1.45 ? "wide" : "standard"}`}
                  key={photo.file}
                >
                  <Image
                    src={storyPhotoSrc(photo.file)}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 719px) 92vw, (max-width: 1100px) 45vw, 34vw"
                    loading={year === 2015 && index === 0 ? "eager" : "lazy"}
                  />
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
