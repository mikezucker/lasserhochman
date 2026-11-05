import Link from "next/link";
import { BreadcrumbSchema } from "@/lib/seo";
export function PageHeading({
  eyebrow,
  title,
  description,
  path,
  parents = [],
}: {
  eyebrow: string;
  title: string;
  description?: string;
  path: string;
  parents?: { name: string; path: string }[];
}) {
  const items = [...parents, { name: title, path }];
  return (
    <>
      <BreadcrumbSchema items={items} />
      <div className="wrap page-heading">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {parents.map((p) => (
            <span key={p.path}>
              <span aria-hidden="true">/</span>
              <Link href={p.path}>{p.name}</Link>
            </span>
          ))}
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
    </>
  );
}
