# Ramesh Solar Services

A production-oriented MERN website for Ramesh Solar Services, a solar consultation, installation and maintenance business serving Indore, Bhopal, Sehore, Ujjain, Dewas and Rajgarh.

The project includes a premium marketing website, an indicative solar calculator, a PM Surya Ghar subsidy guide with estimator and eligibility checker plus homepage subsidy highlights, an enquiry pipeline with internal notes and CSV export, editable service/location content, and configurable contact and calculator settings.

## Stack

- **Frontend:** React 18, Vite, JavaScript, Tailwind CSS, React Router, Lucide React, Framer Motion
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT authentication, express-validator, rate limiting
- **Auth:** HttpOnly cookie session (`rss_admin_token`), 8-hour JWT expiry
- **Tests:** Node test runner + Supertest against a separate `ramesh_solar_test` database

## Project structure

```text
solarservice/
├─ client/
│  ├─ public/                 # Images, favicon, robots.txt, sitemap.xml
│  └─ src/
│     ├─ components/          # Shared public and admin UI
│     ├─ context/             # Authentication and site content providers
│     ├─ data/                # Static defaults, cities, property types, admin constants
│     ├─ lib/                 # API client and formatting helpers
│     └─ pages/
│        └─ admin/            # Dashboard, enquiries, content and settings panels
├─ server/
│  ├─ src/
│  │  ├─ config/              # Environment and database connection
│  │  ├─ controllers/         # Auth, content, enquiry and admin handlers
│  │  ├─ data/                # Database constants and seed defaults
│  │  ├─ middleware/          # Auth, validation, sanitisation, errors, rate limits
│  │  ├─ models/              # Mongoose models
│  │  ├─ routes/              # API routes
│  │  └─ scripts/seed.js      # Idempotent seed script
│  └─ tests/                  # Integration tests
├─ package.json               # Workspace scripts
└─ README.md
```

## Requirements

- Node.js 18 or newer (tested with Node 24)
- npm 9 or newer
- MongoDB running locally on port `27017`, or a MongoDB Atlas connection string

## Local setup

1. Install dependencies from the project root:

   ```bash
   npm install
   ```

2. Copy the environment examples and update values:

   ```bash
   copy server\.env.example server\.env
   copy client\.env.example client\.env
   ```

   On macOS/Linux use `cp` instead of `copy`.

3. Set a strong `JWT_SECRET` and your real admin credentials in `server/.env`.

4. Seed the database:

   ```bash
   npm run seed
   ```

   The seed is idempotent: existing admin, contact, calculator, service and location records are not overwritten.

5. Start the API and Vite dev server together:

   ```bash
   npm run dev
   ```

   - Website: `http://localhost:5173`
   - API: `http://localhost:5000`
   - Health check: `http://localhost:5000/api/health`
   - Admin login: `http://localhost:5173/admin/login`

### Development credentials

From the included development `server/.env`:

```text
Email:    admin@rameshsolar.in
Password: ChangeMe@123
```

Change this password immediately from **Admin → Account** after your first login. Never deploy with the example credentials.

## Scripts

Run these from the project root:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Express API and Vite dev server together |
| `npm run build` | Build the client for production |
| `npm start` | Start the Express server (also serves `client/dist` if built) |
| `npm run seed` | Seed the admin and default content |
| `npm test` | Run backend integration tests |
| `npm run preview` | Preview the built Vite client |

## Admin dashboard

- **Overview:** total/new/converted enquiries, this-month count, pipeline distribution, leads by city and recent enquiries.
- **Enquiries:** search by name/mobile/enquiry ID/consumer number, filter by city and status, paginated list, detail drawer, status updates, internal notes, CSV export and permanent deletion (admin role only).
- **Site content:** edit service and city landing-page copy, features, service areas, images, SEO fields, display order and visibility.
- **Contact details:** manage primary and alternate phone numbers, call-link numbers, WhatsApp, email, address, hours and Google Maps URL, with a live preview.
- **Calculator:** manage tariff defaults, peak sun hours by city, performance ratio, cost per kW, CO₂ factor and capacity limits.
- **Account:** view account details and change the admin password.

## API overview

Public:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | API and database health |
| `GET` | `/api/content` | Public services, locations, contact and calculator settings |
| `POST` | `/api/enquiries` | Submit a website enquiry |

Authentication:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Sign in and set the HttpOnly cookie |
| `GET` | `/api/auth/me` | Current admin session |
| `POST` | `/api/auth/logout` | Clear the session cookie |
| `PUT` | `/api/auth/password` | Change the current admin password |

Protected admin:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/admin/stats` | Dashboard statistics |
| `GET` | `/api/enquiries` | Paginated, filterable enquiry list |
| `GET` | `/api/enquiries/:id` | Enquiry detail |
| `PATCH` | `/api/enquiries/:id/status` | Update enquiry status |
| `POST` | `/api/enquiries/:id/notes` | Add an internal note |
| `DELETE` | `/api/enquiries/:id` | Delete an enquiry (admin only) |
| `GET` | `/api/enquiries/export.csv` | Export filtered enquiries as CSV |
| `GET/PUT` | `/api/admin/settings/contact` | Read or update contact details |
| `GET/PUT` | `/api/admin/settings/calculator` | Read or update calculator assumptions |
| `GET` | `/api/admin/services` | List all services |
| `PUT` | `/api/admin/services/:id` | Update a service |
| `GET` | `/api/admin/locations` | List all locations |
| `PUT` | `/api/admin/locations/:id` | Update a location |

## Honesty and content guardrails

This project must not be used to publish fabricated claims:

- Customer testimonials use an honest placeholder until verified reviews are available. Do not invent names, photos or review text.
- Calculator output is clearly labelled as an **indicative estimate**, not a guarantee of savings or system performance.
- Brand names are presented as technology/products we work with. Do not claim authorised dealership, official partnership or certification unless it is genuinely held and documented.
- Do not add fake countdown timers, fake discounts, fake enquiry counts or fabricated project statistics.
- The PM Surya Ghar page and FAQ reference indicative figures reviewed in November 2026: ₹30,000 for 1 kW, ₹60,000 for 2 kW and a maximum of ₹78,000 for 3 kW and above. No confirmed Madhya Pradesh state cash top-up is claimed. Do not imply government affiliation, empanelment or guaranteed approval. Subsidy rules can change — verify current eligibility and amounts at pmsuryaghar.gov.in before quoting.

## Production build

1. Set production values in `server/.env`:
   - `NODE_ENV=production`
   - a strong `JWT_SECRET` of at least 32 characters
   - the real `MONGODB_URI`
   - the real `CLIENT_URL`
   - real admin credentials before seeding
2. Set `client/.env` values:
   - `VITE_SITE_URL=https://your-domain.example`
   - leave `VITE_API_URL` blank when the API is served from the same origin
3. Build and start:

   ```bash
   npm run build
   npm start
   ```

Express serves the built client from `client/dist` and falls back to `index.html` for client-side routes.

## Tests

```bash
npm test
```

Tests use `ramesh_solar_test` and drop that database during setup/teardown. They do not touch the development database.

## Pre-launch checklist

- [ ] Replace the placeholder phone (`+91 90000 00000`), WhatsApp (`+919000000000`) and email (`hello@rameshsolar.in`) from **Admin → Contact details**.
- [ ] Set the real business address, working hours and Google Maps URL.
- [ ] Change the seeded admin password and store it in a password manager.
- [ ] Set a unique production `JWT_SECRET` and keep `server/.env` out of version control.
- [ ] Verify every call, WhatsApp and email link on a mobile device.
- [ ] Review all service and city copy for accuracy.
- [ ] Confirm calculator assumptions against current tariffs and realistic generation values.
- [ ] Verify current PM Surya Ghar subsidy rules and state-level policy before quoting.
- [ ] Replace the testimonial placeholder only with verified customer feedback and permission to publish.
- [ ] Update `client/public/robots.txt` and `client/public/sitemap.xml` if the production domain changes.
- [ ] Configure database backups, HTTPS and server monitoring.
- [ ] Submit the sitemap in Google Search Console after launch.
