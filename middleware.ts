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

    const prerenderRequest = new Request(url, request);
    prerenderRequest.headers.set(
      "origin",
      "https://prerender-campaign.vercel.app"
    );
    prerenderRequest.headers.set(
      "host",
      "https://prerender-campaign.vercel.app"
    );
    return request;
  }
}
