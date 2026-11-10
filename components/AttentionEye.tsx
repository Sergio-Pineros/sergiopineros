/** Original line engraving: attention as the thread through all five questions. */
export default function AttentionEye() {
  return (
    <figure className="attention-eye" aria-hidden="true">
      <svg viewBox="0 0 280 180" fill="none">
        <defs>
          <clipPath id="eye-aperture"><path d="M22 91Q130 8 258 91Q145 166 22 91Z" /></clipPath>
          <pattern id="eye-hatching" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(22)">
            <path d="M0 0V5" stroke="currentColor" strokeWidth=".7" />
          </pattern>
        </defs>
        <g stroke="currentColor" strokeLinecap="round">
          <path d="M15 89Q125 -3 265 88M22 91Q130 8 258 91Q145 166 22 91Z" strokeWidth="1.8" />
          <path d="M25 103Q141 178 253 101M34 116Q142 179 241 113M46 130Q144 176 227 128" strokeWidth=".6" />
          <path d="M30 70Q130 6 249 70M43 55Q135 2 234 54M66 36Q142 4 209 36" strokeWidth=".7" />
          <g clipPath="url(#eye-aperture)">
            <circle cx="141" cy="88" r="47" fill="url(#eye-hatching)" strokeWidth="1.2" />
            {[...Array(48)].map((_, i) => (
              <path key={i} d="M141 45L142 62" transform={`rotate(${i * 7.5} 141 88)`} strokeWidth={i % 3 === 0 ? 1.4 : .6} />
            ))}
            <circle cx="141" cy="88" r="26" strokeWidth="1" />
            <circle cx="141" cy="88" r="20" fill="currentColor" />
            <circle cx="149" cy="80" r="6" fill="var(--color-page)" stroke="none" />
            <path d="M28 91Q64 62 98 70M184 70Q221 73 249 91M30 94Q67 110 100 110M185 109Q220 105 250 94" strokeWidth=".7" />
          </g>
          {[-54,-36,-18,0,18,36,54].map((angle) => (
            <path key={angle} d="M140 8V0" transform={`rotate(${angle} 140 90)`} strokeWidth=".8" />
          ))}
        </g>
      </svg>
      <figcaption>the art of noticing</figcaption>
    </figure>
  );
}
