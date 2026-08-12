import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Tentang Kami
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Mengenal Next<span className="text-primary">Tech</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Portal berita dan artikel teknologi yang menyajikan informasi terkini
          seputar perkembangan dunia digital.
        </p>
      </div>

      {/* About */}
      <div className="space-y-10">
        <section className="rounded-2xl border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Apa itu NextTech?
          </h2>

          <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
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
        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fokus Kami</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border p-5">
              <h3 className="font-semibold">Web Development</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Perkembangan web, framework, tools, dan teknologi yang digunakan
                dalam pengembangan aplikasi modern.
              </p>
            </div>

            <div className="rounded-xl border p-5">
              <h3 className="font-semibold">Artificial Intelligence</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Informasi dan perkembangan terbaru mengenai AI serta
                penerapannya dalam kehidupan dan dunia teknologi.
              </p>
            </div>

            <div className="rounded-xl border p-5">
              <h3 className="font-semibold">Software & Apps</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Berita dan informasi mengenai software, aplikasi, serta berbagai
                layanan digital.
              </p>
            </div>

            <div className="rounded-xl border p-5">
              <h3 className="font-semibold">Gadget & Hardware</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Perkembangan perangkat keras, gadget, dan teknologi yang
                digunakan dalam kehidupan sehari-hari.
              </p>
            </div>
          </div>
        </section>

        {/* Tujuan */}
        <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight">Tujuan NextTech</h2>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            Kami ingin membantu pembaca memahami perkembangan teknologi dengan
            menyediakan informasi yang relevan, menarik, dan mudah dipahami.
            Teknologi berkembang dengan cepat, dan NextTech hadir untuk membantu
            kamu tetap mengikuti perkembangannya.
          </p>
        </section>

        {/* Closing */}
        <section className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Tetap Terhubung dengan NextTech
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Jelajahi artikel terbaru kami dan ikuti perkembangan teknologi
            bersama NextTech.
          </p>

          <Link
            href="/blog"
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Jelajahi Artikel
          </Link>
        </section>
      </div>
    </main>
  );
}
