export type Book = {
    rowNumber: number;
    title: string;
    author: string;
    genre: string;
    summary: string;
    coverImageUrl: string;
    pdfLink: string;
    epubLink: string;
    status: string;
    postDate: string;
};

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSqvYQAysXHhn2BTV8J7vGavpaJIF4uRpNn1HbRP6Ad6lwEK5eqPIQDQCtimeQdR98sIjxHLDbag9qw/pub?gid=968850189&single=true&output=csv";

function parseCsv(text: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const next = text[i + 1];
        if (inQuotes) {
            if (char === '"' && next === '"') { field += '"'; i++; }
            else if (char === '"') { inQuotes = false; }
            else { field += char; }
        } else {
            if (char === '"') inQuotes = true;
            else if (char === ',') { row.push(field); field = ""; }
            else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ""; }
            else if (char === '\r') { /* skip */ }
            else { field += char; }
        }
    }
    if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
    return rows;
}

export async function getAllBooks(): Promise<Book[]> {
    const res = await fetch(SHEET_CSV_URL, { next: { revalidate: 60 } });
    const text = await res.text();
    const rows = parseCsv(text);
    const [, ...dataRows] = rows;
    return dataRows
        .filter((r) => r.some((cell) => cell.trim() !== ""))
        .map((r, index) => ({
            rowNumber: index + 2,
            title: r[0]?.trim() || "",
            author: r[1]?.trim() || "",
            genre: r[2]?.trim() || "",
            summary: r[3]?.trim() || "",
            coverImageUrl: r[4]?.trim() || "",
            pdfLink: r[5]?.trim() || "",
            epubLink: r[6]?.trim() || "",
            status: r[7]?.trim() || "",
            postDate: r[8]?.trim() || "",
        }));
}

export async function getPostedBooks(): Promise<Book[]> {
    const books = await getAllBooks();
    return books
        .filter((b) => b.status.toLowerCase() === "posted" && b.title)
        .sort((a, b) => (a.postDate < b.postDate ? 1 : -1));
}

export async function getBookByRowNumber(rowNumber: number): Promise<Book | null> {
    const books = await getAllBooks();
    return books.find((b) => b.rowNumber === rowNumber) || null;
}
