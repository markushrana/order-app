export async function GET(req) {
  const apiKey = process.env.MICROCMS_API_KEY;
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  if (!apiKey || !serviceDomain) {
    return new Response(
      JSON.stringify({ error: "Missing API key or service domain" }),
      { status: 500 }
    );
  }
  const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1/menu`, {
    headers: { "X-API-KEY": apiKey },
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
