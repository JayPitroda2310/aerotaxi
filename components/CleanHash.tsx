"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Clears an anchor out of the address bar once it has been honoured.
 *
 * In-page jumps written by this site already avoid creating one (see
 * AnchorLink), but a cross-page link like /#routes has to carry the hash to
 * get there. Left in place it outlives the visit: history and autocomplete
 * keep the full URL, so the next time the site is opened the browser honours
 * the anchor again and the visitor lands halfway down the page instead of at
 * the top.
 *
 * The hash is still honoured on arrival — a link someone shares works. It is
 * only cleared afterwards, on the next frame, which does not disturb a scroll
 * already under way.
 *
 * Keyed to the pathname so it runs again after a client-side navigation, not
 * just on first mount.
 */
export default function CleanHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) return;
    const id = requestAnimationFrame(() => {
      if (!window.location.hash) return;
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
