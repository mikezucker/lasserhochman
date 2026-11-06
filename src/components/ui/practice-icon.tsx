import {
  Building2,
  BriefcaseBusiness,
  Calculator,
  Files,
  ReceiptText,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

const practiceIcons: Record<string, LucideIcon> = {
  "real-property-tax-appeals": ReceiptText,
  "real-estate": Building2,
  litigation: Files,
  "corporate-law": BriefcaseBusiness,
  "estate-planning-and-administration": ScrollText,
  taxation: Calculator,
};

export function PracticeIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = practiceIcons[slug] ?? Files;
  return (
    <Icon
      className={className}
      size={30}
      strokeWidth={1.4}
      aria-hidden="true"
      focusable="false"
    />
  );
}
