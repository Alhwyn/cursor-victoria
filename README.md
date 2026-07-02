# bun-react-tailwind-template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

## Luma email invites

Agents can invite a guest by email through the local API when Luma credentials are configured:

```bash
LUMA_API_KEY=... LUMA_EVENT_ID=evt_... LUMA_INVITE_TOKEN=... bun start
```

```bash
curl -X POST http://localhost:3000/api/luma/invite \
  -H "Authorization: Bearer $LUMA_INVITE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"guest@example.com"}'
```

The request body supports `email` (required), plus optional `eventId`, `name`, and
`message`. If `eventId` is omitted, the server uses `LUMA_EVENT_ID`. Keep
`LUMA_INVITE_TOKEN` separate from the Luma API key so agents can be authorized
without exposing Luma credentials.

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
