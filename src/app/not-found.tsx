import { ButtonLink } from "@/components/ui/link-arrow";
export default function NotFound() {
  return (
    <div className="wrap not-found">
      <p className="eyebrow">Page not found / 404</p>
      <h1>Let’s find your way.</h1>
      <p>The page you requested could not be found.</p>
      <ButtonLink href="/">Return to the homepage</ButtonLink>
    </div>
  );
}
