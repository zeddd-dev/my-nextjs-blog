import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Privasi
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Kebijakan Privasi
        </h1>

        <p className="mt-5 text-sm text-muted-foreground">
          Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
        </p>
      </div>

      <div className="space-y-10 leading-relaxed text-muted-foreground">
        {/* 1 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            1. Pendahuluan
          </h2>

          <p>
            NextTech menghargai privasi setiap pengguna. Kebijakan Privasi ini
            menjelaskan bagaimana informasi pengguna dapat dikumpulkan,
            digunakan, dan dilindungi ketika menggunakan situs NextTech.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            2. Informasi yang Kami Kumpulkan
          </h2>

          <p className="mb-4">
            Ketika kamu membuat akun atau menggunakan fitur tertentu di
            NextTech, beberapa informasi dapat diproses oleh sistem kami.
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              Nama atau informasi identitas akun yang diberikan saat
              pendaftaran.
            </li>
            <li>
              Alamat email yang digunakan untuk membuat atau mengakses akun.
            </li>
            <li>
              Informasi autentikasi dan session yang diperlukan agar akun dapat
              digunakan dengan aman.
            </li>
            <li>
              Komentar atau konten lain yang secara langsung kamu kirimkan
              melalui fitur yang tersedia di situs.
            </li>
          </ul>
        </section>

        {/* 3 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            3. Penggunaan Informasi
          </h2>

          <p className="mb-4">Informasi yang diproses dapat digunakan untuk:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Mengelola dan menyediakan akses ke akun pengguna.</li>
            <li>
              Menyediakan fitur yang membutuhkan autentikasi, seperti komentar.
            </li>
            <li>
              Menjaga keamanan dan mencegah penggunaan layanan secara tidak sah.
            </li>
            <li>Memelihara, memperbaiki, dan mengembangkan fitur NextTech.</li>
            <li>
              Menanggapi pertanyaan, laporan, atau permintaan dari pengguna.
            </li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            4. Komentar dan Konten Pengguna
          </h2>

          <p>
            Jika kamu menggunakan fitur komentar, konten yang kamu kirimkan
            dapat ditampilkan kepada pengguna lain sesuai dengan fungsi situs.
            Pengguna bertanggung jawab atas isi komentar atau konten yang mereka
            publikasikan.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            5. Keamanan Data
          </h2>

          <p>
            Kami berupaya menerapkan langkah-langkah teknis dan organisasi yang
            wajar untuk membantu melindungi informasi pengguna dari akses,
            perubahan, atau penggunaan yang tidak sah.
          </p>

          <p className="mt-4">
            Namun, tidak ada sistem penyimpanan atau transmisi data melalui
            internet yang dapat dijamin sepenuhnya aman.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            6. Layanan Pihak Ketiga
          </h2>

          <p>
            NextTech dapat menggunakan layanan pihak ketiga untuk membantu
            menyediakan dan menjalankan layanan, termasuk layanan infrastruktur,
            autentikasi, penyimpanan, atau analitik apabila fitur tersebut
            digunakan.
          </p>

          <p className="mt-4">
            Layanan pihak ketiga tersebut dapat memiliki kebijakan privasi dan
            ketentuan penggunaan mereka sendiri.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            7. Penyimpanan Informasi
          </h2>

          <p>
            Informasi pengguna disimpan selama diperlukan untuk menyediakan
            layanan, memenuhi tujuan yang dijelaskan dalam kebijakan ini,
            menjaga keamanan layanan, atau memenuhi kewajiban yang berlaku.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            8. Hak Pengguna
          </h2>

          <p>
            Jika kamu memiliki pertanyaan mengenai informasi akun atau ingin
            meminta bantuan terkait data yang berkaitan dengan akunmu, kamu
            dapat menghubungi kami melalui halaman Kontak.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            9. Perubahan Kebijakan Privasi
          </h2>

          <p>
            Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu untuk
            mencerminkan perubahan pada layanan, fitur, atau kebutuhan
            operasional NextTech.
          </p>

          <p className="mt-4">
            Perubahan akan dipublikasikan pada halaman ini dan tanggal pembaruan
            akan disesuaikan.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            10. Hubungi Kami
          </h2>

          <p>
            Jika kamu memiliki pertanyaan mengenai Kebijakan Privasi ini,
            silakan hubungi kami melalui halaman{" "}
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
      <div className="mt-12 border-t pt-8">
        <Link
          href="/"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
