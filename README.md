# Real Estate Marathon - Next.js + Supabase

Full website (Home, About, Sponsors, Expo, Merchandise, Why Participate, Contact) + 6-step registration with payment and confirmation pass.

## 1. Run locally (copy-paste)
```bash
npm install
cp .env.example .env.local      # then fill in the values (step 2)
npm run images                  # creates image folders + checklist
npm run dev                     # http://localhost:3000
```

## 2. Supabase setup
1. Create a project at supabase.com.
2. Dashboard -> SQL Editor -> paste all of `supabase/schema.sql` -> Run (creates tables, bib-number function, private storage bucket).
3. Dashboard -> Project Settings -> API: copy **Project URL** and **service_role key** into `.env.local`:
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```
The service-role key stays on the server only (never prefix it with NEXT_PUBLIC_). Row Level Security is ON with no public policies, so all data access goes through the API routes.

## 3. Payments
- `PAYMENT_PROVIDER=demo` (default): no real money, auto-approves. Use for development/staging only.
- `PAYMENT_PROVIDER=razorpay`: set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`. In the Razorpay dashboard add webhook `https://YOUR-DOMAIN/api/payments/webhook` (event: `payment.captured`).
- Card / bank details are entered on the gateway, never in our forms.
- Test the Razorpay flow with test keys before going live (it was not run against a live gateway here).

## 4. Project structure
```
supabase/schema.sql          database schema (run once)
scripts/setup-images.mjs     creates image folders + public/images/IMAGES.md
src/
  app/                       routes: /, /about, /sponsors, /expo, /merchandise,
                             /why-participate, /contact, /register, /register/confirmation
    api/                     registrations, uploads, payments (create/verify/webhook), enquiries, newsletter
  components/
    ui/ (+ form/)            Button, Img, Icon, Select, DatePicker, FileUpload ...
    layout/                  Navbar, Footer
    shared/                  PageHero, StatsBand, EnquiryForm, CtaStrip ... (reused on every page)
    home/ about/ sponsors/ expo/ merchandise/ why/ contact/    page-specific components
    register/ (+ steps/)     wizard, 6 steps, stepper, confirmation
  config/                    site.js (event/contact), images.js (ALL image paths), registration.js (options)
  data/                      page text content (edit text here, not in components)
  lib/                       validation (zod, shared client+server), pricing, api client, utils
  server/                    supabase client, http helpers, rate limit, payment providers, services/
  styles/styles.css          ALL colors, fonts, font sizes, spacing
```
Flow: component -> `lib/api/client` -> `app/api/*` route -> `server/services/*` -> Supabase.

## 5. Images
Every page has its own folder: `public/images/home`, `about`, `sponsors`, `expo`, `merchandise`, `why-participate`, `contact`, `register`, `common`.
Open `public/images/IMAGES.md` for the exact file names. Until a file exists a placeholder shows. To rename, edit `src/config/images.js`, then run `npm run images`.

## 6. Things to edit before launch (placeholders)
- Event date: `NEXT_PUBLIC_EVENT_DATE` in `.env.local`; venue/contact/socials in `src/config/site.js`
- Registration price: `src/lib/pricing.js` (Rs 99 flat family pass, 5 members included, Rs 99 per extra member)
- Category start times / waves: `src/config/registration.js`
- Sponsorship and merchandise prices, sponsor names, communities, leaderboard numbers: `src/data/*.js`
- Colors / fonts: `src/styles/styles.css`

## 7. Where data lands in Supabase
| Table | Contents |
|---|---|
| registrations, family_members | participants, bib numbers (assigned on payment) |
| payments | gateway orders and status |
| enquiries | contact, sponsor, expo stall, volunteer, community, kit sponsor, corporate kit, merchandise orders (`type` column) |
| newsletter_subscribers | footer signups |
| Storage `registration-docs` (private) | photo, ID proof, medical certificate |

## 8. Not included yet
- Admin dashboard (view data in Supabase Table Editor for now)
- Confirmation emails / SMS / WhatsApp (add a mailer in `server/services` after payment is confirmed)
- Merchandise online payment (orders are sent as requests)
- Rate limiting is in-memory; use Upstash Redis or similar when deploying to serverless
