import { Link } from "react-router-dom";

/*
  Reusable button component.

  Why this is useful:
  - Sometimes you want a real button: <button>
  - Sometimes you want a route link: <Link>
  - Sometimes you want a normal anchor tag: <a>

  Instead of rewriting button styles everywhere,
  this component gives one shared interface.
*/
export default function Button({
  children,
  to, // for internal route navigation
  href, // for external links or mailto links
  variant = "primary",
  type = "button",
}) {
  const className = `btn btn-${variant}`;

  // If "to" exists, render a React Router link
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  // If "href" exists, render a normal anchor tag
  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  // Otherwise render a standard button
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}
