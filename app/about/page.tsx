import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 overflow-hidden">
      <div className="mt-12">
        <Link
          href="/"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
      {/* Header */}
      <div className="mb-10 sm:mb-12 text-center">
        <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
          Tentang Kami
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight wrap-break-word">
          Mengenal Next<span className="text-primary">Tech</span>
        </h1>

        <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Portal berita dan artikel teknologi yang menyajikan informasi terkini
          seputar perkembangan dunia digital.
        </p>
      </div>

      {/* About */}
      <div className="space-y-8 sm:space-y-10">
        {/* Apa itu NextTech */}
        <section className="w-full min-w-0 rounded-2xl border bg-card p-5 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Apa itu NextTech?
          </h2>

          <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <p>
              NextTech adalah portal berita dan artikel yang berfokus pada
              perkembangan teknologi dan dunia digital.
            </p>

            <p>
              Kami menghadirkan informasi mengenai web development, artificial
              intelligence, software, gadget, serta berbagai inovasi teknologi
              yang menarik untuk diketahui.
            </p>

            <p>
              NextTech dibuat untuk menjadi tempat bagi pembaca yang ingin
              mengikuti perkembangan teknologi dengan cara yang sederhana,
              informatif, dan mudah dipahami.
            </p>
          </div>
        </section>

        {/* Fokus */}
        <section className="w-full min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Fokus Kami
          </h2>

          <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Web Development */}
            <div className="w-full min-w-0 rounded-xl border bg-card p-5">
              <h3 className="font-semibold">Web Development</h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Perkembangan web, framework, tools, dan teknologi yang digunakan
                dalam pengembangan aplikasi modern.
              </p>
            </div>

            {/* Artificial Intelligence */}
            <div className="w-full min-w-0 rounded-xl border bg-card p-5">
              <h3 className="font-semibold">Artificial Intelligence</h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Informasi dan perkembangan terbaru mengenai AI serta
                penerapannya dalam kehidupan dan dunia teknologi.
              </p>
            </div>

            {/* Software */}
            <div className="w-full min-w-0 rounded-xl border bg-card p-5">
              <h3 className="font-semibold">Software & Apps</h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Berita dan informasi mengenai software, aplikasi, serta berbagai
                layanan digital.
              </p>
            </div>

            {/* Gadget */}
            <div className="w-full min-w-0 rounded-xl border bg-card p-5">
              <h3 className="font-semibold">Gadget & Hardware</h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Perkembangan perangkat keras, gadget, dan teknologi yang
                digunakan dalam kehidupan sehari-hari.
              </p>
            </div>
          </div>
        </section>

        {/* Tujuan */}
        <section className="w-full min-w-0 rounded-2xl border bg-muted/30 p-5 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Tujuan NextTech
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            Kami ingin membantu pembaca memahami perkembangan teknologi dengan
            menyediakan informasi yang relevan, menarik, dan mudah dipahami.
            Teknologi berkembang dengan cepat, dan NextTech hadir untuk membantu
            kamu tetap mengikuti perkembangannya.
          </p>
        </section>

        {/* Closing */}
        <section className="w-full text-center px-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Tetap Terhubung dengan NextTech
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Jelajahi artikel terbaru kami dan ikuti perkembangan teknologi
            bersama NextTech.
          </p>

          <Link
            href="/blog"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Jelajahi Artikel
          </Link>
        </section>
      </div>
    </main>
  );
}
