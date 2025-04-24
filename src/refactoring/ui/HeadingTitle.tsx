interface HeadingTitleProps {
  title: string;
  level: "page" | "section" | "subSection" | "miniSection";
}

const HEADING_VARIANTS = {
  page: {
    Element: "h1",
    className: "text-3xl font-bold mb-6",
  },
  section: {
    Element: "h2",
    className: "text-2xl font-semibold mb-4",
  },
  subSection: {
    Element: "h2",
    className: "text-2xl font-semibold mb-2",
  },
  miniSection: {
    Element: "h3",
    className: "text-lg font-semibold mb-2",
  },
} as const;

export const HeadingTitle = ({ title, level }: HeadingTitleProps) => {
  const { Element, className } = HEADING_VARIANTS[level];
  return <Element className={className}>{title}</Element>;
};
