# JS SEO + SSR

_Via: Google Webmasters and Firebase_

## JS SEO
https://developers.google.com/search/docs/guides/javascript-seo-basics

- If relying on JS being executed by Googlebot, "the content may not be indexed or appear in search results for days or even weeks."

- `App shell model`: initial HTML does not contain the actual content and Googlebot needs to execute JavaScript before being able to see the actual page content that JavaScript generates.

- Each page must have following in the `<head>`

```html
    <title>...</title>
    <meta name=“description” content=“…” />
```

- Avoid programmatic navigation unless using the browser's `history` API ([video reference](https://www.youtube.com/watch?v=nwGY-9lwTF4&list=PLKoqnv2vTMUPOalM1zuWDP9OQl851WMM9&index=4&t=0s))


> “Keep in mind that server-side or pre-rendering is still a great idea because it makes your website faster for users and crawlers, and not all bots can run JavaScript.”

- `ngrok` can make dev url public

- Google's [Mobile Friendly](https://search.google.com/test/mobile-friendly) audit is a great first step 

- `Google Search Console` provides the actual dashboard view you want to a given URL
    - Requires verification via DNS host

- `React-snap`: simple but potentially no-config means to prerender HTML

## SSR
https://www.youtube.com/playlist?list=PLl-K7zZEsYLkbvTj8AUUCfBO7DoEHJ-ME

- First load can be slow because JS needs to be downloaded and then parsed, which can take time on low power devices, and executed
- Critical path is having the HTML and CSS needed for fast first paint, and then loading the JS as an enhancement
- Firebase hosting is set up to execute the file generation on the server and then cache the files, so future requests receive the cached files from the edge of a CDN
 - Big latency and execution savings
- TTI (time to interactive)

