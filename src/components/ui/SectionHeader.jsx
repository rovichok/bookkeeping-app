/*
  Reusable section heading component.

  This prevents repeating the same heading markup
  on every section and keeps the site visually consistent.
*/
export default function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header">
      {/* Small label above the heading */}
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

      {/* Main section title */}
      <h2>{title}</h2>

      {/* Supporting paragraph */}
      {text ? <p className="section-text">{text}</p> : null}
    </div>
  );
}
