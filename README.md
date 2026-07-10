# Crude HR Website

Marketing site + portfolio + blog for crudehr.com, with the interactive field ticketing demo embedded at `/demo`.

Stack: Vite, React, React Router, Tailwind CSS 4. No backend, no CMS.

## Develop

```
npm install
npm run dev
```

## Deploy to Netlify

1. `npm run build`
2. Confirm `public/_redirects` exists with `/*  /index.html  200` (it does; it is copied into `dist` automatically)
3. Drag-and-drop the `dist` folder into Netlify, or connect the repo (build command `npm run build`, publish directory `dist`)
4. Swap the scheduler placeholder: edit `SCHEDULER_URL` at the top of `src/pages/Contact.jsx` to the real Calendly link
5. Point crudehr.com at the new Netlify deploy

Netlify forms (`contact` and `newsletter`) are declared as hidden forms in `index.html` so Netlify detects them at deploy time. Submissions appear under Forms in the Netlify dashboard.

## Editing content

- Blog posts: add a markdown file to `src/content/blog/` with `title`, `date`, `excerpt` frontmatter. It appears automatically.
- Founder photo: `src/assets/brittany-sutton.jpg`
- Brand tokens (colors, fonts): `src/styles/global.css`
- The demo app lives in `src/demo/` and is self-contained (data persists in the visitor's browser via localStorage).
