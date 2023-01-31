export default function middleware(request: Request) {
  const { headers } = request;
  const host =
    "https://test-avatar-and-logo-upload-wegroup-nv.campaigns.staging.louiseforbrokers.be/#/?lang=nl";
  const userAgent = headers.get("user-agent");

  if (userAgent && host && Boolean(host.match(/\.campaigns|conversations\./))) {
    const agents =
      ".*(googlebot|adsbot-google|Feedfetcher-Google|bingbot|yandex|baiduspider|Facebot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|redditbot|applebot|whatsapp|flipboard|tumblr|bitlybot|skypeuripreview|nuzzel|discordbot|google page speed|qwantify|pinterestbot|bitrix link preview|xing-contenttabreceiver|chrome-lighthouse|telegrambot).*";
    const prerender = new RegExp(agents, "i").test(userAgent);
    const url = new URL(
      `/?url=${host}`,
      "https://prerender-campaign.vercel.app"
    );

    const headers = new Headers(request?.headers ?? {});
    headers.set("x-middleware-rewrite", String(url));

    return new Response(null, {
      ...request,
      headers,
    });
  }
}
