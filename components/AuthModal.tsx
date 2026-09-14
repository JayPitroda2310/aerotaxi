"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Button } from "./ui";

export type AuthMode = "signin" | "signup";

const COPY = {
  signin: {
    title: "Welcome back",
    lead: "Sign in to your Aero Taxi account",
    cta: "Sign in",
    switchText: "Don't have an account?",
    switchCta: "Sign up",
  },
  signup: {
    title: "Create your account",
    /* no strapline here — the heading already says what the form is for */
    lead: "",
    cta: "Create account",
    switchText: "Already have an account?",
    switchCta: "Sign in",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Inputs                                                              */
/* ------------------------------------------------------------------ */

/*
 * The field is framed by four corner marks rather than a box or a rule —
 * registration marks, the way an instrument or a viewfinder brackets a
 * reading. At rest they are short and quiet; on focus they run out longer and
 * turn accent, so the frame closes around the active field. Nothing shifts,
 * because the marks are positioned rather than in flow.
 */
const CORNER =
  "pointer-events-none absolute size-2.5 border-hair transition-[border-color,width,height] " +
  "duration-300 group-focus-within:size-4 group-focus-within:border-accent";

function Row({
  label,
  id,
  children,
  trailing,
}: {
  label: string;
  id: string;
  children: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div className="group relative px-4 py-2.5">
      <span aria-hidden className={`${CORNER} top-0 left-0 border-t border-l`} />
      <span aria-hidden className={`${CORNER} top-0 right-0 border-t border-r`} />
      <span aria-hidden className={`${CORNER} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${CORNER} right-0 bottom-0 border-r border-b`} />

      <div className="flex items-center gap-3">
        <span className="min-w-0 flex-1">
          <label
            htmlFor={id}
            className="block text-[9.5px] leading-[12px] font-semibold tracking-[0.2em] text-fog-2 uppercase transition-colors duration-200 group-focus-within:text-accent"
          >
            {label}
          </label>
          {children}
        </span>
        {trailing}
      </div>
    </div>
  );
}

const inputCls =
  "h-[23px] w-full border-0 bg-transparent text-[15px] font-semibold tracking-tight outline-none";

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */

export default function AuthModal({
  mode,
  logo,
  onMode,
  onClose,
}: {
  mode: AuthMode | null;
  /* passed in rather than imported, so this file and Navbar do not
     import each other */
  logo: ReactNode;
  onMode: (m: AuthMode) => void;
  onClose: () => void;
}) {
  const open = mode !== null;
  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [notice, setNotice] = useState(false);
  const ids = useId();

  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement as HTMLElement;
    setNotice(false);
    setShowPw(false);

    // lock the page behind the dialog, padding for the scrollbar that goes
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prev = {
      overflow: document.body.style.overflow,
      pad: document.body.style.paddingRight,
    };
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    const focusable = () =>
      Array.from(
        panel.current?.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      // keep tabbing inside the dialog
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panel.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => focusable()[1]?.focus(), 60);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      document.body.style.overflow = prev.overflow;
      document.body.style.paddingRight = prev.pad;
      returnTo.current?.focus?.();
    };
  }, [open, onClose]);

  const c = mode ? COPY[mode] : COPY.signin;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 grid place-items-center overflow-y-auto bg-ink/70 p-5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onPointerDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${ids}-title`}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 0.9, 0.24, 1] }}
            className="relative my-auto w-full max-w-[430px] rounded-[26px] border-2 border-accent/55 bg-linear-to-b from-panel-2 to-ink-2 p-7 shadow-[0_40px_90px_-30px_rgb(13_27_42/0.18)] max-sm:p-5.5"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 grid size-8 cursor-pointer place-items-center rounded-md text-fog transition-colors duration-200 hover:text-accent"
            >
              <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M2 2l10 10M12 2L2 12" />
              </svg>
            </button>

            <div className="mb-6 text-center">
              <div className="mb-5 flex justify-center">{logo}</div>
              <h2 id={`${ids}-title`} className="text-[26px] max-sm:text-[22px]">
                {c.title}
              </h2>
              {c.lead && (
                <p className="mt-2 text-[14.5px] text-fog">{c.lead}</p>
              )}
            </div>

            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setNotice(true);
              }}
            >
              {mode === "signup" && (
                <Row label="Full name" id={`${ids}-name`}>
                  <input
                    id={`${ids}-name`}
                    className={inputCls}
                    type="text"
                    name="name"
                    autoComplete="name"
                                        required
                  />
                </Row>
              )}

              <Row label="Email address" id={`${ids}-email`}>
                <input
                  id={`${ids}-email`}
                  className={inputCls}
                  type="email"
                  name="email"
                  autoComplete="email"
                                    required
                />
              </Row>

              <Row
                label="Password"
                id={`${ids}-password`}
                trailing={
                  <PasswordToggle
                    on={showPw}
                    onToggle={() => setShowPw((v) => !v)}
                  />
                }
              >
                <input
                  id={`${ids}-password`}
                  className={inputCls}
                  type={showPw ? "text" : "password"}
                  name="password"
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                                    required
                />
              </Row>

              {mode === "signin" && (
                <div className="mt-0.5 flex flex-wrap items-center justify-between gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2.5 text-[13.5px] text-fog select-none">
                    <input
                      type="checkbox"
                      name="remember"
                      className="size-4 cursor-pointer appearance-none rounded-[5px] border border-hair bg-tint transition-colors duration-200 checked:border-accent checked:bg-accent checked:shadow-[inset_0_0_0_2.5px_var(--color-ink-2)]"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => setNotice(true)}
                    className="cursor-pointer text-[13.5px] font-semibold text-accent hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button type="submit" size="lg" className="mt-2 w-full">
                {c.cta}
                <svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 10h13M11 5l5 5-5 5" />
                </svg>
              </Button>
            </form>

            {notice && (
              <p
                role="status"
                className="mt-3.5 rounded-xl border border-accent/25 bg-accent/8 px-3.5 py-2.5 text-center text-[12.5px] text-fog"
              >
                This form is presentation only &mdash; no account system is
                connected yet, so nothing was sent.
              </p>
            )}

            <div className="my-5 flex items-center gap-3.5">
              <span className="h-px flex-1 bg-hair" />
              <span className="text-[12.5px] text-fog-2">or</span>
              <span className="h-px flex-1 bg-hair" />
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
              <Social onClick={() => setNotice(true)} label="Continue with Google">
                <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
                  <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62Z" />
                  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.35 0-4.34-1.58-5.05-3.71H.96v2.33A9 9 0 0 0 9 18Z" />
                  <path fill="#FBBC05" d="M3.95 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l2.99-2.33Z" />
                  <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l2.99 2.33C4.66 5.16 6.65 3.58 9 3.58Z" />
                </svg>
                Google
              </Social>
              <Social onClick={() => setNotice(true)} label="Continue with Apple">
                <svg viewBox="0 0 16 19" width="15" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M13.2 10.1c0-2 1.6-3 1.7-3-.9-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7C5 5.5 3.6 6.3 2.9 7.6c-1.4 2.5-.4 6.1 1 8.1.7 1 1.5 2.1 2.5 2 1-.04 1.4-.65 2.6-.65s1.5.65 2.6.63c1.1-.02 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.1-3.2ZM11.3 3.9c.5-.6.9-1.5.8-2.4-.8 0-1.8.5-2.4 1.2-.5.6-.9 1.5-.8 2.4.9.07 1.8-.45 2.4-1.2Z" />
                </svg>
                Apple
              </Social>
            </div>

            <p className="mt-6 text-center text-[13.5px] text-fog">
              {c.switchText}{" "}
              <button
                type="button"
                onClick={() => onMode(mode === "signin" ? "signup" : "signin")}
                className="cursor-pointer font-bold text-accent hover:underline"
              >
                {c.switchCta}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Show/hide control for the password field. */
function PasswordToggle({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={on ? "Hide password" : "Show password"}
      aria-pressed={on}
      onClick={onToggle}
      className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-md text-fog-2 transition-colors duration-200 hover:text-accent"
    >
      <svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M1.5 10S4.7 4.5 10 4.5 18.5 10 18.5 10 15.3 15.5 10 15.5 1.5 10 1.5 10Z" />
        <circle cx="10" cy="10" r="2.6" />
        {on && <path d="M3.5 3.5l13 13" strokeLinecap="round" />}
      </svg>
    </button>
  );
}

function Social({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl border border-hair bg-tint px-4 py-3 text-[14px] font-semibold transition-[border-color,background,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-panel-2"
    >
      {children}
    </button>
  );
}
