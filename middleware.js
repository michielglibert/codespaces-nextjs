export default function middleware(request) {
  const { headers } = request;
  const userAgent = headers["user-agent"];
  const host = headers["host"];

  console.debug("Start");
  if (userAgent && host && Boolean(host.match(/\.campaigns|conversations\./))) {
    const agents =
      ".*(googlebot|adsbot-google|Feedfetcher-Google|bingbot|yandex|baiduspider|Facebot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|redditbot|applebot|whatsapp|flipboard|tumblr|bitlybot|skypeuripreview|nuzzel|discordbot|google page speed|qwantify|pinterestbot|bitrix link preview|xing-contenttabreceiver|chrome-lighthouse|telegrambot).*";
    const prerender = new RegExp(agents, "i").test(userAgent);
    console.debug("Host and agent were found");
    if (prerender) {
      const url = new URL(
        `/?url=${host}`,
        "https://prerender-campaign.vercel.app"
      );
      console.debug("Prerender should work");
      console.debug(url.href);
      return Response.redirect(url);
    }
  }
}
