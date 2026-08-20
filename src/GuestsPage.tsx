import { useQuery } from "convex/react";
import { useMemo, useState, type ReactNode } from "react";
import { api } from "../convex/_generated/api";
import cursorLockup from "./assets/cursor-lockup.png";
import "./index.css";

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

export function GuestsPage() {
  const guests = useQuery(api.guests.listGuests);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!guests) return [];
    const q = query.trim().toLowerCase();
    if (!q) return guests;
    return guests.filter(guest => {
      const haystack = `${guest.name} ${guest.email} ${guest.company} ${guest.city}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [guests, query]);

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

            {/* Mobile cards */}
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
                      <p className="type-sm font-medium text-[var(--fg)]">
                        {guest.name}
                      </p>
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
                      <div className="mt-3">
                        <SocialLinks
                          linkedin={guest.linkedin}
                          twitter={guest.twitter}
                          github={guest.github}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--border)] type-sm text-[var(--fg-tertiary)]">
                    <th className="py-3 pr-3 font-normal">Guest</th>
                    <th className="py-3 pr-3 font-normal">Email</th>
                    <th className="py-3 pr-3 font-normal">Ticket</th>
                    <th className="hidden py-3 pr-3 font-normal lg:table-cell">
                      City
                    </th>
                    <th className="hidden py-3 pr-3 font-normal lg:table-cell">
                      Company
                    </th>
                    <th className="py-3 pr-3 font-normal">Building</th>
                    <th className="py-3 font-normal">Social</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(guest => (
                    <tr
                      key={guest._id}
                      className="border-b border-[var(--border)] type-sm align-top"
                    >
                      <td className="py-4 pr-3">
                        <div className="flex items-center gap-3">
                          <GuestAvatar
                            name={guest.name}
                            firstName={guest.firstName}
                            lastName={guest.lastName}
                            photoUrl={guest.resolvedPhotoUrl}
                          />
                          <span className="font-medium text-[var(--fg)]">
                            {guest.name}
                          </span>
                        </div>
                      </td>
                      <td className="max-w-[12rem] truncate py-4 pr-3 text-[var(--fg-secondary)]">
                        {guest.email}
                      </td>
                      <td className="py-4 pr-3 text-[var(--fg)]">
                        {guest.ticketName || <EmptyCell />}
                      </td>
                      <td className="hidden py-4 pr-3 text-[var(--fg-secondary)] lg:table-cell">
                        {guest.city || <EmptyCell />}
                      </td>
                      <td className="hidden py-4 pr-3 text-[var(--fg-secondary)] lg:table-cell">
                        {guest.company || <EmptyCell />}
                      </td>
                      <td className="max-w-[14rem] py-4 pr-3 text-[var(--fg)]">
                        {guest.building || <EmptyCell />}
                      </td>
                      <td className="py-4">
                        <SocialLinks
                          linkedin={guest.linkedin}
                          twitter={guest.twitter}
                          github={guest.github}
                        />
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
