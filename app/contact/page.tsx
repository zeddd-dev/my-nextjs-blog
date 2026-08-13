import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 overflow-hidden">
      {/* Header */}
      <div className="mb-10 sm:mb-12 text-center">
        <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
          Hubungi Kami
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight wrap-break-word">
          Hubungi Next<span className="text-primary">Tech</span>
        </h1>

        <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Punya pertanyaan, masukan, koreksi artikel, atau ingin bekerja sama
          dengan NextTech? Kami dengan senang hati mendengar dari kamu.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {/* Email */}
        <div className="w-full min-w-0 rounded-2xl border bg-card p-5 sm:p-8">
          <div className="mb-4 flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
            ✉
          </div>

          <h2 className="text-xl font-bold">
            Email
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Hubungi kami melalui email untuk pertanyaan, koreksi artikel,
            maupun keperluan lainnya.
          </p>

          <a
            href="mailto:hello@nexttech.com"
            className="mt-4 inline-block max-w-full break-all text-sm font-medium text-primary hover:underline"
          >
            hello@nexttech.com
          </a>
        </div>

        {/* Social Media */}
        <div className="w-full min-w-0 rounded-2xl border bg-card p-5 sm:p-8">
          <div className="mb-4 flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
            @
          </div>

          <h2 className="text-xl font-bold">
            Media Sosial
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Ikuti akun media sosial NextTech untuk mendapatkan informasi dan
            artikel teknologi terbaru.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              X
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Other Inquiries */}
      <section className="mt-5 sm:mt-8 w-full min-w-0 rounded-2xl border bg-muted/30 p-5 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight wrap-break-word">
          Pertanyaan & Koreksi Artikel
        </h2>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground wrap-break-word">
          Jika kamu menemukan kesalahan informasi, tautan yang bermasalah,
          atau memiliki masukan mengenai artikel di NextTech, silakan hubungi
          kami melalui email. Kami akan meninjau setiap laporan yang masuk.
        </p>
      </section>

      {/* Back to Blog */}
      <div className="mt-8 sm:mt-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}