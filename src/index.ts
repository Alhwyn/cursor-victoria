import { serve } from "bun";
import index from "./index.html";

const LUMA_SEND_INVITES_URL = "https://api.luma.com/v1/events/guests/send-invites";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type InviteRequestBody = {
  email?: unknown;
  eventId?: unknown;
  name?: unknown;
  message?: unknown;
};

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

async function readJsonBody(req: Request): Promise<InviteRequestBody | null> {
  try {
    const body = await req.json();
    return typeof body === "object" && body !== null ? (body as InviteRequestBody) : null;
  } catch {
    return null;
  }
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function parseJsonText(text: string) {
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

async function inviteLumaGuest(req: Request) {
  const body = await readJsonBody(req);
  if (!body) {
    return jsonResponse({ error: "Expected a JSON body." }, 400);
  }

  const email = optionalString(body.email)?.toLowerCase();
  if (!email || !EMAIL_PATTERN.test(email)) {
    return jsonResponse({ error: "A valid email is required." }, 400);
  }

  const apiKey = optionalString(process.env.LUMA_API_KEY);
  if (!apiKey) {
    return jsonResponse({ error: "LUMA_API_KEY is not configured." }, 503);
  }

  const eventId = optionalString(body.eventId) ?? optionalString(process.env.LUMA_EVENT_ID);
  if (!eventId) {
    return jsonResponse({ error: "Provide eventId or configure LUMA_EVENT_ID." }, 400);
  }

  const guest: { email: string; name?: string } = { email };
  const name = optionalString(body.name);
  if (name) guest.name = name;

  const lumaBody: { event_id: string; guests: Array<typeof guest>; message?: string } = {
    event_id: eventId,
    guests: [guest],
  };

  const message = optionalString(body.message);
  if (message) lumaBody.message = message;

  const lumaResponse = await fetch(LUMA_SEND_INVITES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-luma-api-key": apiKey,
    },
    body: JSON.stringify(lumaBody),
  });

  const responseBody = parseJsonText(await lumaResponse.text());

  if (!lumaResponse.ok) {
    return jsonResponse(
      { error: "Luma invite request failed.", details: responseBody },
      lumaResponse.status,
    );
  }

  return jsonResponse({ invited: true, luma: responseBody });
}

const server = serve({
  routes: {
    "/api/luma/invite": {
      POST: inviteLumaGuest,
    },
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Server running at ${server.url}`);
