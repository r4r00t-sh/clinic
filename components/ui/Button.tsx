import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "oat";
type Size = "md" | "lg" | "sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-olive-deep text-oat hover:bg-olive border border-transparent font-semibold",
  outline:
    "bg-transparent text-olive-deep border border-olive/50 hover:border-olive hover:bg-olive/10",
  ghost: "bg-transparent text-olive-deep hover:bg-olive/10 border border-transparent",
  oat: "bg-oat text-olive-deep hover:bg-surface border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-5 text-sm",
  md: "min-h-12 px-6 text-sm",
  lg: "min-h-14 px-8 text-base",
};

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Common & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props;
    const external =
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("https://wa.me");
    if (external) {
      return (
        <a href={href} className={classes} target={target} rel={rel} onClick={onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} target={target} rel={rel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
