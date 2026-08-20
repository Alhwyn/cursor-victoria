import { useAction, useQuery } from "convex/react";
import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";
import cursorLockup from "./assets/cursor-lockup.png";
import "./index.css";

const ADMIN_SECRET_KEY = "codechella_admin_secret";

type EmailStatus = "none" | "sent" | "opened" | "read";

function CursorLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block bg-current ${className}`.trim()}
      style={{
        aspectRatio: "1024 / 254",
        WebkitMaskImage: `url(${cursorLockup})`,
        maskImage: `url(${cursorLockup})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      aria-hidden
    />
  );
}

function initialsFor(name: string, firstName: string, lastName: string): string {
  const fromParts = `${firstName.charAt(0)}${lastName.charAt(0)}`.trim();
  if (fromParts.length > 0) return fromParts.toUpperCase();
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]!.charAt(0)}${parts[parts.length - 1]!.charAt(0)}`.toUpperCase();
}

function GuestAvatar({
  name,
  firstName,
  lastName,
  photoUrl,
}: {
  name: string;
  firstName: string;
  lastName: string;
  photoUrl: string | null;
}) {
  const initials = initialsFor(name, firstName, lastName);
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt=""
        className="h-10 w-10 rounded-full object-cover"
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <span
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--border)] type-sm font-medium text-[var(--fg-secondary)]"
      aria-hidden
    >
      {initials}
    </span>
  );
}

function SocialLinks({
  linkedin,
  twitter,
  github,
}: {
  linkedin?: string;
  twitter?: string;
  github?: string;
}) {
  const links: { label: string; href: string }[] = [];
  if (linkedin) links.push({ label: "LinkedIn", href: linkedin });
  if (twitter) links.push({ label: "X", href: twitter });
  if (github) links.push({ label: "GitHub", href: github });
  if (links.length === 0) {
    return <span className="text-[var(--fg-tertiary)]">—</span>;
  }
  return (
    <span className="flex flex-wrap gap-x-3 gap-y-1">
      {links.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--fg-secondary)] underline-offset-2 transition-colors hover:text-[var(--fg)] hover:underline"
        >
          {link.label}
        </a>
      ))}
    </span>
  );
}

function EmailStatusPill({ status }: { status: EmailStatus }) {
  switch (status) {
    case "none":
      return (
        <span className="inline-flex type-sm text-[var(--fg-tertiary)]">
          Not sent
        </span>
      );
    case "sent":
      return (
        <span className="inline-flex bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-2 py-0.5 type-sm text-[var(--accent)]">
          Sent
        </span>
      );
    case "opened":
      return (
        <span className="inline-flex bg-[rgb(20_80_140/0.1)] px-2 py-0.5 type-sm text-[#1f5f8b]">
          Opened
        </span>
      );
    case "read":
      return (
        <span className="inline-flex bg-[var(--fg)] px-2 py-0.5 type-sm text-[var(--button-fg)]">
          Read
        </span>
      );
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function GuestsHeader() {
  return (
    <header className="header-shell">
      <div className="page-shell flex h-[var(--header-h)] items-center justify-between">
        <a
          href="/"
          className="inline-flex items-center text-[var(--fg)] transition-opacity hover:opacity-70"
          aria-label="Cursor Codechella home"
        >
          <CursorLogo className="h-auto w-[68px] md:w-[82px]" />
        </a>
        <nav
          className="flex items-center gap-7 type-sm text-[var(--fg-secondary)]"
          aria-label="Primary"
        >
          <a href="/" className="transition-colors hover:text-[var(--fg)]">
            Event
          </a>
          <span className="text-[var(--fg)]" aria-current="page">
            Guests
          </span>
        </nav>
      </div>
    </header>
  );
}

function EmptyCell({ children }: { children?: ReactNode }) {
  return (
    <span className="text-[var(--fg-tertiary)]">{children ?? "—"}</span>
  );
}

function SendButton({
  label,
  busy,
  disabled,
  onClick,
}: {
  label: string;
  busy: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || busy}
      className="bg-[var(--accent)] px-2.5 py-1 type-sm text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {busy ? "Sending…" : label}
    </button>
  );
}

export function GuestsPage() {
  const guests = useQuery(api.guests.listGuests);
  const sendGuestEmail = useAction(api.emails.sendGuestEmail);
  const sendAllUnsent = useAction(api.emails.sendAllUnsent);

  const [query, setQuery] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [adminReady, setAdminReady] = useState(false);
  const [sendingId, setSendingId] = useState<Id<"guests"> | null>(null);
  const [sendingAll, setSendingAll] = useState(false);
  const [adminMessage, setAdminMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_SECRET_KEY) ?? "";
      setAdminSecret(stored);
    } catch {
      // ignore
    }
    setAdminReady(true);
  }, []);

  const isAdmin = adminReady && adminSecret.trim().length > 0;

  const filtered = useMemo(() => {
    if (!guests) return [];
    const q = query.trim().toLowerCase();
    if (!q) return guests;
    return guests.filter(guest => {
      const haystack =
        `${guest.name} ${guest.email} ${guest.company} ${guest.city}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [guests, query]);

  const unsentCount = useMemo(() => {
    if (!guests) return 0;
    return guests.filter(g => g.emailStatus === "none").length;
  }, [guests]);

  function persistAdminSecret(value: string) {
    setAdminSecret(value);
    try {
      if (value.trim()) {
        localStorage.setItem(ADMIN_SECRET_KEY, value);
      } else {
        localStorage.removeItem(ADMIN_SECRET_KEY);
      }
    } catch {
      // ignore
    }
  }

  async function handleSend(guestId: Id<"guests">) {
    if (!adminSecret.trim()) return;
    setSendingId(guestId);
    setAdminMessage(null);
    try {
      const result = await sendGuestEmail({
        guestId,
        adminSecret: adminSecret.trim(),
      });
      setAdminMessage(
        result.dryRun
          ? "Dry-run: marked sent (no RESEND_API_KEY)."
          : "Email sent.",
      );
    } catch (error) {
      setAdminMessage(
        error instanceof Error ? error.message : "Send failed.",
      );
    } finally {
      setSendingId(null);
    }
  }

  async function handleSendAll() {
    if (!adminSecret.trim()) return;
    setSendingAll(true);
    setAdminMessage(null);
    try {
      const result = await sendAllUnsent({
        adminSecret: adminSecret.trim(),
      });
      const suffix = result.dryRun ? " (dry-run)" : "";
      const err =
        result.errors.length > 0
          ? ` Errors: ${result.errors.slice(0, 3).join("; ")}`
          : "";
      setAdminMessage(
        `Sent ${result.sent}/${result.attempted} unsent guests${suffix}.${err}`,
      );
    } catch (error) {
      setAdminMessage(
        error instanceof Error ? error.message : "Send all failed.",
      );
    } finally {
      setSendingAll(false);
    }
  }

  return (
    <div className="site-grain min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <GuestsHeader />
      <main className="page-shell pb-24 pt-10 md:pb-32 md:pt-14">
        <div className="mb-8 flex flex-col gap-4 border-b border-[var(--border)] pb-8 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="type-sm mb-2 text-[var(--fg-tertiary)]">Directory</p>
            <h1 className="font-display text-2xl tracking-tight text-[var(--fg)] md:text-3xl">
              Guests
            </h1>
            <p className="type-sm mt-2 max-w-xl text-[var(--fg-secondary)]">
              Registered attendees for Cursor Codechella Victoria — browse names,
              tickets, and what people plan to build.
            </p>
          </div>
          <label className="block w-full max-w-sm">
            <span className="sr-only">Search guests</span>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name or email"
              className="w-full border border-[var(--border)] bg-[var(--card)] px-3 py-2 type-sm text-[var(--fg)] outline-none placeholder:text-[var(--fg-tertiary)] focus:border-[var(--fg-tertiary)]"
            />
          </label>
        </div>

        <div className="mb-8 grid gap-3 border border-[var(--border)] bg-[var(--card)] p-4 md:grid-cols-[1fr_auto] md:items-end">
          <label className="block">
            <span className="mb-1 block type-sm text-[var(--fg-tertiary)]">
              Admin secret (required to send mail)
            </span>
            <input
              type="password"
              value={adminSecret}
              onChange={e => persistAdminSecret(e.target.value)}
              placeholder="Paste ADMIN_SECRET"
              autoComplete="off"
              className="w-full max-w-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 type-sm text-[var(--fg)] outline-none placeholder:text-[var(--fg-tertiary)] focus:border-[var(--fg-tertiary)]"
            />
          </label>
          {isAdmin ? (
            <div className="flex flex-wrap items-center gap-3">
              <SendButton
                label={`Send all unsent (${unsentCount})`}
                busy={sendingAll}
                disabled={unsentCount === 0}
                onClick={() => void handleSendAll()}
              />
              {adminMessage ? (
                <p className="type-sm text-[var(--fg-secondary)]">{adminMessage}</p>
              ) : null}
            </div>
          ) : (
            <p className="type-sm text-[var(--fg-tertiary)]">
              Enter the organizer secret to unlock Send.
            </p>
          )}
        </div>

        {guests === undefined ? (
          <p className="type-sm text-[var(--fg-secondary)]">Loading guests…</p>
        ) : guests.length === 0 ? (
          <p className="type-sm text-[var(--fg-secondary)]">
            No guests yet. Copy{" "}
            <code className="text-[var(--fg)]">data/guests.example.json</code> to{" "}
            <code className="text-[var(--fg)]">data/guests.json</code> and run{" "}
            <code className="text-[var(--fg)]">bun run seed:guests</code>.
          </p>
        ) : filtered.length === 0 ? (
          <p className="type-sm text-[var(--fg-secondary)]">
            No guests match “{query}”.
          </p>
        ) : (
          <>
            <p className="type-sm mb-4 text-[var(--fg-tertiary)]">
              {filtered.length} of {guests.length} guests
            </p>

            <ul className="grid gap-6 md:hidden">
              {filtered.map(guest => (
                <li
                  key={guest._id}
                  className="border-t border-[var(--border)] pt-5"
                >
                  <div className="flex items-start gap-3">
                    <GuestAvatar
                      name={guest.name}
                      firstName={guest.firstName}
                      lastName={guest.lastName}
                      photoUrl={guest.resolvedPhotoUrl}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="type-sm font-medium text-[var(--fg)]">
                          {guest.name}
                        </p>
                        <EmailStatusPill status={guest.emailStatus} />
                      </div>
                      <p className="type-sm truncate text-[var(--fg-secondary)]">
                        {guest.email}
                      </p>
                      <p className="type-sm mt-2 text-[var(--fg-secondary)]">
                        {guest.ticketName || <EmptyCell />}
                        {(guest.city || guest.company) && (
                          <>
                            {" · "}
                            {[guest.city, guest.company]
                              .filter(Boolean)
                              .join(" · ")}
                          </>
                        )}
                      </p>
                      {guest.building ? (
                        <p className="type-sm mt-2 text-[var(--fg)]">
                          {guest.building}
                        </p>
                      ) : null}
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <SocialLinks
                          linkedin={guest.linkedin}
                          twitter={guest.twitter}
                          github={guest.github}
                        />
                        {isAdmin ? (
                          <SendButton
                            label={
                              guest.emailStatus === "none" ? "Send" : "Resend"
                            }
                            busy={sendingId === guest._id}
                            onClick={() => void handleSend(guest._id)}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--border)] type-sm text-[var(--fg-tertiary)]">
                    <th className="py-3 pr-3 font-normal">Guest</th>
                    <th className="py-3 pr-3 font-normal">Email</th>
                    <th className="py-3 pr-3 font-normal">Ticket</th>
                    <th className="hidden py-3 pr-3 font-normal xl:table-cell">
                      Building
                    </th>
                    <th className="py-3 pr-3 font-normal">Status</th>
                    <th className="py-3 font-normal">Mail</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(guest => (
                    <tr
                      key={guest._id}
                      className="border-b border-[var(--border)] type-sm align-middle"
                    >
                      <td className="py-4 pr-3">
                        <div className="flex items-center gap-3">
                          <GuestAvatar
                            name={guest.name}
                            firstName={guest.firstName}
                            lastName={guest.lastName}
                            photoUrl={guest.resolvedPhotoUrl}
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-[var(--fg)]">
                              {guest.name}
                            </p>
                            <p className="truncate text-[var(--fg-tertiary)]">
                              {[guest.city, guest.company]
                                .filter(Boolean)
                                .join(" · ") || "—"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="max-w-[12rem] truncate py-4 pr-3 text-[var(--fg-secondary)]">
                        {guest.email}
                      </td>
                      <td className="py-4 pr-3 text-[var(--fg)]">
                        {guest.ticketName || <EmptyCell />}
                      </td>
                      <td className="hidden max-w-[12rem] py-4 pr-3 text-[var(--fg)] xl:table-cell">
                        {guest.building || <EmptyCell />}
                      </td>
                      <td className="py-4 pr-3">
                        <EmailStatusPill status={guest.emailStatus} />
                      </td>
                      <td className="py-4">
                        {isAdmin ? (
                          <SendButton
                            label={
                              guest.emailStatus === "none" ? "Send" : "Resend"
                            }
                            busy={sendingId === guest._id}
                            onClick={() => void handleSend(guest._id)}
                          />
                        ) : (
                          <span className="text-[var(--fg-tertiary)]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
