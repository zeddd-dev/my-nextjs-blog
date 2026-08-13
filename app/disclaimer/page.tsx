import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 overflow-hidden">
      {/* Header */}
      <div className="mb-10 sm:mb-12">
        <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
          Informasi Penting
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight wrap-break-word">
          Disclaimer
        </h1>

        <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-muted-foreground">
          Terakhir diperbarui:{" "}
          {new Date().toLocaleDateString("id-ID")}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 sm:space-y-10 text-sm sm:text-base leading-relaxed text-muted-foreground">
        {/* 1 */}
        <section className="min-w-0">
          <h2 className="mb-3 text-xl sm:text-2xl font-bold text-foreground">
            1. Informasi Umum
          </h2>

          <p>
            Seluruh informasi yang tersedia di NextTech disediakan untuk
            tujuan informasi dan edukasi umum. Kami berusaha menyajikan
            informasi yang akurat, relevan, dan terkini, namun kami tidak
            menjamin bahwa seluruh informasi selalu lengkap, akurat, atau
            bebas dari kesalahan.
          </p>
        </section>

        {/* 2 */}
        <section className="min-w-0">
          <h2 className="mb-3 text-xl sm:text-2xl font-bold text-foreground">
            2. Akurasi Informasi
          </h2>

          <p>
            Informasi dalam artikel dapat berubah seiring perkembangan
            teknologi, produk, layanan, maupun kondisi lainnya. Pembaca
            disarankan melakukan verifikasi terhadap informasi penting
            sebelum mengambil keputusan berdasarkan konten yang tersedia
            di NextTech.
          </p>
        </section>

        {/* 3 */}
        <section className="min-w-0">
          <h2 className="mb-3 text-xl sm:text-2xl font-bold text-foreground">
            3. Tautan Eksternal
          </h2>

          <p>
            NextTech dapat menyediakan tautan menuju situs web atau
            layanan pihak ketiga. Kami tidak mengontrol dan tidak
            bertanggung jawab atas isi, kebijakan, keamanan, maupun
            praktik dari situs pihak ketiga tersebut.
          </p>
        </section>

        {/* 4 */}
        <section className="min-w-0">
          <h2 className="mb-3 text-xl sm:text-2xl font-bold text-foreground">
            4. Tanggung Jawab Pembaca
          </h2>

          <p>
            Penggunaan informasi yang tersedia di NextTech merupakan
            tanggung jawab pembaca. NextTech tidak bertanggung jawab atas
            kerugian atau dampak yang mungkin timbul akibat penggunaan
            informasi dari situs ini.
          </p>
        </section>

        {/* 5 */}
        <section className="min-w-0">
          <h2 className="mb-3 text-xl sm:text-2xl font-bold text-foreground">
            5. Perubahan Disclaimer
          </h2>

          <p>
            Kami dapat memperbarui atau mengubah halaman Disclaimer ini
            apabila diperlukan. Setiap perubahan akan dipublikasikan
            melalui halaman ini.
          </p>
        </section>

        {/* 6 */}
        <section className="min-w-0">
          <h2 className="mb-3 text-xl sm:text-2xl font-bold text-foreground">
            6. Hubungi Kami
          </h2>

          <p>
            Jika kamu memiliki pertanyaan mengenai Disclaimer ini atau
            menemukan informasi yang perlu dikoreksi, silakan hubungi kami
            melalui halaman{" "}
            <Link
              href="/contact"
              className="font-medium text-primary hover:underline"
            >
              Kontak
            </Link>
            .
          </p>
        </section>
      </div>

      {/* Back */}
      <div className="mt-10 sm:mt-12 border-t pt-6 sm:pt-8">
        <Link
          href="/"
          className="inline-flex text-sm font-medium text-primary hover:underline"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}