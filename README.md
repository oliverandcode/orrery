# Astrology For Exoplanets

A Node.js/TypeScript application intended to speculate about the study of
astrology on planets outside the Earth's solar system: exoplanets. 

Our first extrasolar system: TRAPPIST-1. Our first exoplanet: TRAPPIST-1e. 

This is an early-stage project. Right now it is a database layer only:
it defines the data model, creates the tables, and seeds them with real
astronomical data. Future iterations will add chart calculation, star catalog
integration, and a user interface.

---

## Background

### A Note On Orreries

An [ORRERY](https://en.wikipedia.org/wiki/Orrery) is a mechanical model of the solar system that illustrates or predicts the relative positions and motions of the planets and moons. The term is derived from a device produced circa 1712 by John Rowley and named for his patron Charles Boyle, 4th Earl of Orrery. Orreries are typically driven by a clockwork mechanism with a globe representing the sun at the center, and with a planet at the end of each of a series of arms. 

Since this app aims to be a model of another solar system, used to illustrate or predict the relative positions and motions of the planets and other bodies in that system, it is in a sense a "digital orrery." Calculating astrological charts for planets outside Earth's solar system is a whimsical exercise with little practical value but a lot to delight the mind; in the era of publicly available NASA data on the positions of the celestial bodies, a literal mechanical orrery has little practical value, but a lot of whimsy. 

### Our Chosen Exoplanet

TRAPPIST-1 is a red dwarf star approximately 40 light-years from Earth,
host to seven known planets. TRAPPIST-1e is the fifth planet — likely
tidally locked (one hemisphere permanently facing the star) and potentially
habitable.

This project builds an astrological system rooted in that world:

- **Ecliptic**: the plane of TRAPPIST-1e's orbit projected onto the
  background star field. This plays the role that Earth's ecliptic does
  in traditional astrology.
- **12 sections**: the ecliptic band (±8° around the ecliptic) is divided
  into 12 equal 30° arcs, analogous to the zodiac signs.
- **Zero point**: Section 1 begins where the ecliptic crosses the galactic
  plane in the direction of the galactic center.
- **Planets**: the six other TRAPPIST-1 planets (b, c, d, f, g, h) move
  through the 12 sections on timescales of hours to days, playing the role
  that Mercury, Venus, etc. play in Earth astrology.

---

## Prerequisites

- **Node.js** v18 or later (v22 recommended)
- **npm** v9 or later
- A running **PostgreSQL** instance (local or cloud)

---

## Setup

### 1. Clone and install

```bash
git clone <repository-url>
cd orrery
npm install
```

### 2. Configure the database connection

Create a file called `.env` and open it.

Fill in your PostgreSQL credentials. Two options:

**Option A — Individual variables (local PostgreSQL):**
```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=orrery
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
```

**Option B — Connection string (cloud providers like Supabase, Railway, Neon):**
```
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```
If `DATABASE_URL` is set, it takes precedence over the individual variables.

In the same file, set your environment to "development", "test", or "production:
```
NODE_ENV=development
```

### 3. Create the database

If you are using a cloud provider, skip this step. 
Cloud providers create the database for you. 

If using local PostgreSQL, create the database first*:
```bash
psql -U postgres -c "CREATE DATABASE orrery;"
```

*If you are running postgres for the first time, you will have to create the
`postgres` user before creating the database. Follow these steps:

```
psql -d postgres
```

Once inside the psql prompt, create the role:
```
CREATE ROLE postgres WITH SUPERUSER LOGIN;
```

Once it says CREATE ROLE, the user has been created. 
You can exit the prompt using `\q`


### 4. Run the migration

Creates the `ecliptic_signs` and `planets` tables:
```bash
npm run db:migrate
```

### 5. Seed the database

Inserts the 12 ecliptic sections and the 6 TRAPPIST-1 planets:
```bash
npm run db:seed
```

### 6. Run the application

```bash
npm run dev     # development mode — auto-restarts on file changes
npm start       # production mode — runs compiled JavaScript
```

---

## Available scripts

| Script                | What it does                                                            |
|-----------------------|-------------------------------------------------------------------------|
| `npm run dev`         | Runs the app in development mode using `tsx` (no compile step needed)   |
| `npm run build`       | Compiles TypeScript to JavaScript in `dist/`                            |
| `npm start`           | Runs the compiled JavaScript (requires `npm run build` first)           |
| `npm run db:migrate`  | Creates database tables (safe to run multiple times)                    |
| `npm run db:seed`     | Inserts initial data (safe to run multiple times — skips existing rows) |
| `npm run db:reset`    | **Destructive.** Drops all tables. Run migrate + seed after this.       |

---

## Project structure

```
orrery/
├── src/
│   ├── config/
│   │   └── database-connection.ts   # PostgreSQL pool + connection verification
│   ├── database/
│   │   ├── migrate.ts               # CREATE TABLE statements
│   │   ├── seed.ts                  # INSERT initial data
│   │   ├── seed-data.ts             # The actual seed data as typed constants
│   │   └── reset.ts                 # DROP TABLE (development only)
│   ├── models/
│   │   ├── types.ts                 # TypeScript interfaces for all domain objects
│   │   ├── ecliptic-sign-model.ts   # Query functions for the ecliptic_signs table
│   │   └── planet-model.ts          # Query functions for the planets table
│   └── index.ts                     # Application entry point
├── .env.example                     # Template for environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---
