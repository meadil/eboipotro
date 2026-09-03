import { getPostedBooks } from "@/lib/books";

export const revalidate = 60;

export default async function HomePage() {
  const books = await getPostedBooks();
  const [featured, ...rest] = books;

  if (!featured) {
    return (
      <div className="max-w-5xl mx-auto px-5 py-24 text-center">
        <p className="text-ink-muted">এখনো কোনো বই প্রকাশিত হয়নি। শীঘ্রই আসছে।</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <section className="mb-14">
        <p className="text-xs tracking-wide text-ink-muted mb-3">আজকের বই</p>
        <a
          href={`/book/${featured.rowNumber}`}
          className="group flex flex-col sm:flex-row gap-6 items-center sm:items-stretch bg-parchment-card rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(166,71,42,0.08)] hover:shadow-[0_12px_40px_rgba(166,71,42,0.14)] transition-shadow"
        >
          <img
            src={featured.coverImageUrl}
            alt={featured.title}
            className="w-40 h-56 object-cover rounded-2xl shadow-md shrink-0"
          />
          <div className="flex flex-col justify-center">
            <h1 className="font-display text-3xl mb-2 text-ink">{featured.title}</h1>
            <p className="text-sm text-ink-muted mb-4">{featured.author}</p>
            <p className="font-body text-[17px] leading-relaxed text-ink/80 line-clamp-4">
              {featured.summary}
            </p>
            <span className="mt-5 inline-flex w-fit items-center gap-1 text-sm text-rust">
              পড়ুন ও ডাউনলোড করুন
            </span>
          </div>
        </a>
      </section>

      {rest.length > 0 && (
        <section>
          <p className="text-xs tracking-wide text-ink-muted mb-4">আগের বই</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {rest.map((book) => (
              <a key={book.rowNumber} href={`/book/${book.rowNumber}`} className="group">
                <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(46,33,24,0.1)] group-hover:shadow-[0_8px_24px_rgba(166,71,42,0.18)] transition-shadow mb-2">
                  <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <p className="font-body text-sm text-ink truncate">{book.title}</p>
                <p className="text-xs text-ink-muted truncate">{book.author}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}