# Eboipotro (এবইপত্র)

**Bengali books, on the internet, free.**

A public library for Bengali literature — find a book, read the summary, download
the PDF or EPUB. No account, no paywall, no app.

---

## The problem

Bengali literature is almost entirely offline. The books exist as PDFs scattered
across Facebook groups and random links. There's no catalogue, no way to search,
and if a link dies the book is gone.

Eboipotro puts them in one searchable place.

---

## What it does

**Browse.** The homepage shows the most recent book as a featured card, then the
rest of the catalogue below it — cover, title, author, and genre for each.

**Read the summary.** Know what you're downloading before you download it.

**Download.** PDF and EPUB links, where available.

Everything is in Bengali.

There is no search yet — the catalogue is browsed, not queried.

---

## How it works

There's no database and no admin panel. Books live in a Google Sheet, which is
published as a CSV. The site reads that sheet at build time and renders from it.

That means adding a book is as simple as adding a row to the spreadsheet. No
deploy, no CMS, no migration.

---

## Running it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run build
npm start
```

---

## How it's built

**Next.js** with the App Router
**React + TypeScript**
**Tailwind CSS**
**Google Sheets** as the catalogue — read as CSV, cached for 60 seconds

The CSV parser is hand-written rather than pulled from a library. It's about
twenty lines, and it handles the quoted-comma case that would otherwise break.

---

## Structure

```
app/
├── page.tsx              the homepage — browse and search
├── book/[rowNumber]/     one page per book
├── layout.tsx
└── globals.css
lib/
└── books.ts              reads the sheet, parses the CSV, returns books
```

A book is identified by its row number in the sheet, which keeps the URLs short
and stable — no slugs to maintain, no renaming cascade.

---

## Status

Working. The catalogue is populated and books are browsable and downloadable.

Not built yet: search, and reading in the browser without downloading.

---

Bengali books should not be locked behind a Facebook login.