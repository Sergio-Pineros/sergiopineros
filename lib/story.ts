export type StoryPhoto = {
  file: string;
  alt: string;
  width: number;
  height: number;
};

export type StoryYear = {
  year: number;
  photos: readonly StoryPhoto[];
  /** An optional personal note can be added when the story for this year is ready. */
  note?: string;
};

export const STORY_YEARS: readonly StoryYear[] = [
  { year: 2015, photos: [
    { file: "2015.jpg", alt: "A small robot assembled on a desk", width: 1152, height: 2048 },
  ] },
  { year: 2016, photos: [
    { file: "2016.jpg", alt: "A lake and mountains beneath the clouds", width: 2048, height: 1536 },
  ] },
  { year: 2017, photos: [
    { file: "2017.jpg", alt: "A silhouette against a colorful sunset", width: 1440, height: 1080 },
    { file: "2017 flower.jpg", alt: "Yellow flowers in a garden", width: 1440, height: 1080 },
  ] },
  { year: 2018, photos: [
    { file: "2018.jpg", alt: "Sergio in a room with computers", width: 2048, height: 1228 },
    { file: "2018 1.jpg", alt: "Sergio at a desk with editing software", width: 2048, height: 1536 },
  ] },
  { year: 2020, photos: [
    { file: "2020.jpg", alt: "Sergio holding a bass guitar", width: 1152, height: 2048 },
    { file: "2020 1.jpg", alt: "A computer running video editing software", width: 1150, height: 2048 },
    { file: "2020 2.jpg", alt: "A pink cover for Dulce Sarita", width: 2048, height: 2048 },
    { file: "2020 accesories 1.jpg", alt: "Pearl hair accessories among leaves", width: 1000, height: 1000 },
    { file: "2020 accesories 2.jpg", alt: "Colorful accessories resting on plants", width: 2048, height: 2048 },
    { file: "2020 freelance.jpg", alt: "A desk set up for video editing", width: 1440, height: 1080 },
  ] },
  { year: 2021, photos: [
    { file: "2021.jpg", alt: "Sergio and a friend making music", width: 1536, height: 2048 },
    { file: "2021 .jpg", alt: "A recording session with a guitar", width: 1536, height: 2048 },
    { file: "2021 17 bits.png", alt: "17 Bits Records lettering", width: 1080, height: 1080 },
  ] },
  { year: 2025, photos: [
    { file: "2025.jpg", alt: "A scooter parked beside an open road", width: 2048, height: 1536 },
    { file: "2025 1.jpeg", alt: "Sergio working on a video edit", width: 2048, height: 1152 },
    { file: "2025 2.jpg", alt: "Sergio in a creative studio", width: 2048, height: 1959 },
    { file: "2025 end.jpg", alt: "Sergio taking a photo beside a yellow car", width: 2048, height: 1542 },
  ] },
  { year: 2026, photos: [
    { file: "2026.jpeg", alt: "Sergio by his desk with a baby", width: 2048, height: 1152 },
    { file: "2026.jpg", alt: "Sergio working at an airport", width: 1542, height: 2048 },
    { file: "2026 mid.jpg", alt: "A row of colorful cars", width: 2048, height: 1536 },
    { file: "2026 mid freelance.jpeg", alt: "Sergio working from a studio desk", width: 2048, height: 1152 },
    { file: "end 2026 robot.jpg", alt: "Sergio beside a glowing robot", width: 2048, height: 1536 },
  ] },
];

export const STORY_PHOTO_COUNT = STORY_YEARS.reduce((count, group) => count + group.photos.length, 0);

export function storyPhotoSrc(file: string) {
  return `/story-photos/${encodeURIComponent(file)}`;
}
