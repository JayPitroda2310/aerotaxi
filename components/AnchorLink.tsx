"use client";

import type { ComponentProps, ReactNode } from "react";
import { buttonClass } from "./ui";

/**
 * A jump to another part of the same page that does not leave a hash behind.
 *
 * A plain <a href="#routes"> works, but it also rewrites the address bar. The
 * URL then lives on in history and autocomplete, so the next time the site is
 * opened the browser honours the hash and lands halfway down the page. This
 * scrolls to the target and then puts the clean path back.
 *
 * It stays a real anchor: right-click, middle-click and no-JS all behave, and
 * a hash someone else shares is still honoured on arrival — only the creating
 * of one is suppressed.
 */
function jump(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#") || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  const el = document.getElementById(href.slice(1));
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", location.pathname + location.search);
}

type Props = Omit<ComponentProps<"a">, "children"> & {
  href: string;
  children: ReactNode;
};

export function AnchorLink({ href, children, ...rest }: Props) {
  return (
    <a href={href} onClick={(e) => jump(e, href)} {...rest}>
      {children}
    </a>
  );
}

export function AnchorButton({
  href,
  variant = "solid",
  size = "md",
  className = "",
  children,
  ...rest
}: Props & {
  variant?: Parameters<typeof buttonClass>[0];
  size?: Parameters<typeof buttonClass>[1];
}) {
  return (
    <a
      href={href}
      onClick={(e) => jump(e, href)}
      className={buttonClass(variant, size, className)}
      {...rest}
    >
      {children}
    </a>
  );
}
