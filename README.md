# G-Scores

Look up high school graduation exam scores with G-Scores.
[Live Demo](https://truong-minh-phat-g-scores.vercel.app/)

![G-Scores Dashboard](/docs/screenshots/dashboard.png)

From **Trương Minh Phát - 0933756220**

## Local Setup

Requirements

- [Node.js](https://nodejs.org/en) version >= 20

Run specified commands as instructions below.

1. Clone the repository
   ```bash
   git clone https://github.com/tmphat1312/TruongMinhPhat_G-Scores.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set environment variables

   - Create `.env` file
   - Copy the following variables to `.env` (These variables are for local development)

   ```bash
   DB_FILE_NAME=file:local.db
   SEED_DATASET_URL=https://raw.githubusercontent.com/GoldenOwlAsia/webdev-intern-assignment-3/refs/heads/main/dataset/diem_thi_thpt_2024.csv
   ```

4. Migrate database schema (two methods, choose one to migrate)

   (4.1) Create migration file and apply migration

   Generate migration file:

   ```bash
   npm run db:generate
   ```

   Apply migration:

   ```bash
   npm run db:migrate
   ```

   (4.2) Apply migration directly

   ```bash
   npm run db:push
   ```

5. Seed database (Conversion of raw data to database data)

   It will take some time, monitor the progress on console screen.

   ```bash
   npm run db:seed
   ```

6. Start local development server

   ```bash
   npm run dev
   ```

## Requirement Walkthrough

### Must have:

- [x] Conversion of raw data into the database. (located at `./src/db/seed.ts`)
- [x] Check score from registration number. (located at `/search-scores` page)
- [x] Statistics of the number of students with scores in the above 4 levels by subjects. (located at `reports` page)
- [x] List top 10 students of group A. (located at `reports` page)

### Nice to have:

- [x] Responsive design
- [x] Deploy the application to go live. [Live Demo](https://truong-minh-phat-g-scores.vercel.app/)

## Tech Stack

The project is built entirely with Next.js. I use Next.js for both front-end and back-end implementations.

### Frontend:

- Framework: [Next.js](https://nextjs.org/)
- UI Library: [Shadcn UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)

### Backend:

- Framework: [Next.js](https://nextjs.org/)
- ORM: [Drizzle ORM](https://orm.drizzle.team/)
- Database: SQLite

### Deployment:

- Application: [Vercel](https://vercel.com)
- Database: [Turso](https://turso.tech/)

## Acknowlegements

- The overall UI of the application was first prototyped by [v0.dev](v0.dev)
