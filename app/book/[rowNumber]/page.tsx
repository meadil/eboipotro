import { getBookByRowNumber } from "@/lib/books";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function BookPage({ params }: { params: Promise<{ rowNumber: string }> }) {
  const { rowNumber } = await params;
  const book = await getBookByRowNumber(Number(rowNumber));

  if (!book || book.status.toLowerCase() !== "posted") {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <a href="/" className="text-sm text-ink-muted hover:text-rust transition-colors">← সব বই</a>

      <div className="mt-8 flex flex-col sm:flex-row gap-8">
        <img
          src={book.coverImageUrl}
          alt={book.title}
          className="w-48 h-64 object-cover rounded-2xl shadow-lg shrink-0 mx-auto sm:mx-0"
        />
        <div>
          <h1 className="font-display text-4xl text-ink mb-2">{book.title}</h1>
          <p className="text-base text-ink-muted mb-1">{book.author}</p>
          {book.genre && (
            <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-gold/15 text-ink-muted">
              {book.genre}
            </span>
          )}
        </div>
      </div>

      <p className="font-body text-lg leading-relaxed text-ink/90 mt-10 whitespace-pre-line">
        {book.summary}
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        {book.pdfLink && (
          <a
            href={book.pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center flex-1 px-8 py-4 rounded-2xl bg-rust text-parchment-card text-base shadow-[0_6px_20px_rgba(166,71,42,0.3)] hover:shadow-[0_8px_26px_rgba(166,71,42,0.4)] transition-shadow"
          >
            PDF ডাউনলোড করুন
          </a>
        )}
        {book.epubLink && (
          <a
            href={book.epubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center flex-1 px-8 py-4 rounded-2xl bg-ink text-parchment-card text-base shadow-[0_6px_20px_rgba(46,33,24,0.25)] hover:shadow-[0_8px_26px_rgba(46,33,24,0.35)] transition-shadow"
          >
            EPUB ডাউনলোড করুন
          </a>
        )}
        {!book.pdfLink && !book.epubLink && (
          <p className="text-sm text-ink-muted">শীঘ্রই ডাউনলোড লিংক যোগ করা হবে।</p>
        )}
      </div>
    </div>
  );
}
