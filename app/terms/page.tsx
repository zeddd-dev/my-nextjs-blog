import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Legal
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Syarat & Ketentuan
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
            Selamat datang di NextTech. Dengan mengakses atau menggunakan situs
            NextTech, kamu dianggap telah membaca, memahami, dan menyetujui
            Syarat & Ketentuan ini.
          </p>

          <p className="mt-4">
            Jika kamu tidak menyetujui ketentuan yang berlaku, harap
            menghentikan penggunaan situs ini.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            2. Penggunaan Situs
          </h2>

          <p>
            NextTech menyediakan artikel dan informasi mengenai teknologi,
            termasuk namun tidak terbatas pada web development, software,
            gadget, artificial intelligence, dan perkembangan teknologi digital
            lainnya.
          </p>

          <p className="mt-4">
            Pengguna setuju untuk menggunakan situs secara wajar dan tidak
            melakukan tindakan yang dapat mengganggu keamanan, kinerja, atau
            ketersediaan layanan.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            3. Akun Pengguna
          </h2>

          <p>
            Beberapa fitur NextTech mungkin memerlukan pengguna untuk memiliki
            akun. Pengguna bertanggung jawab menjaga kerahasiaan informasi akun
            dan bertanggung jawab atas aktivitas yang dilakukan melalui akun
            tersebut.
          </p>

          <p className="mt-4">
            Pengguna tidak diperbolehkan menggunakan akun untuk melakukan
            tindakan yang melanggar hukum atau menyalahgunakan layanan NextTech.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            4. Komentar dan Konten Pengguna
          </h2>

          <p>
            Pengguna dapat menggunakan fitur komentar apabila tersedia dan telah
            memenuhi persyaratan yang ditentukan oleh NextTech.
          </p>

          <p className="mt-4">
            Pengguna bertanggung jawab sepenuhnya atas komentar atau konten yang
            mereka kirimkan.
          </p>

          <p className="mt-4">Pengguna dilarang mengirimkan konten yang:</p>

          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Melanggar hukum yang berlaku.</li>
            <li>Mengandung ancaman atau pelecehan terhadap pihak lain.</li>
            <li>Mengandung spam atau promosi yang tidak relevan.</li>
            <li>
              Melanggar hak cipta, merek, atau hak kekayaan intelektual pihak
              lain.
            </li>
            <li>Mengandung informasi palsu yang sengaja menyesatkan.</li>
            <li>Mengganggu keamanan atau operasional situs.</li>
          </ul>

          <p className="mt-4">
            NextTech berhak menghapus komentar atau konten yang dianggap
            melanggar ketentuan tanpa harus memberikan pemberitahuan sebelumnya.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            5. Hak Kekayaan Intelektual
          </h2>

          <p>
            Konten yang diterbitkan oleh NextTech, termasuk teks, desain, logo,
            elemen visual, dan materi lainnya, dapat dilindungi oleh hak
            kekayaan intelektual yang berlaku.
          </p>

          <p className="mt-4">
            Pengguna tidak diperbolehkan menyalin, mendistribusikan,
            memodifikasi, atau menggunakan kembali konten NextTech untuk tujuan
            komersial tanpa izin yang sesuai.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            6. Konten dan Tautan Pihak Ketiga
          </h2>

          <p>
            Artikel NextTech dapat memuat tautan menuju situs atau layanan pihak
            ketiga. Tautan tersebut disediakan untuk memberikan informasi atau
            referensi tambahan.
          </p>

          <p className="mt-4">
            NextTech tidak bertanggung jawab atas konten, keamanan, kebijakan,
            atau praktik situs pihak ketiga tersebut.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            7. Keakuratan Informasi
          </h2>

          <p>
            Kami berusaha menyajikan informasi yang akurat dan relevan. Namun,
            informasi mengenai teknologi dapat berubah dengan cepat.
          </p>

          <p className="mt-4">
            NextTech tidak menjamin bahwa seluruh informasi yang tersedia selalu
            lengkap, akurat, atau bebas dari kesalahan.
          </p>

          <p className="mt-4">
            Untuk ketentuan lebih lanjut mengenai penggunaan informasi, silakan
            lihat halaman{" "}
            <Link
              href="/disclaimer"
              className="font-medium text-primary hover:underline"
            >
              Disclaimer
            </Link>
            .
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            8. Pembatasan Tanggung Jawab
          </h2>

          <p>
            NextTech tidak bertanggung jawab atas kerugian atau dampak yang
            mungkin timbul secara langsung maupun tidak langsung dari penggunaan
            informasi atau layanan yang tersedia di situs ini, sejauh
            diperbolehkan oleh hukum yang berlaku.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            9. Perubahan Layanan
          </h2>

          <p>
            NextTech dapat mengubah, memperbarui, menambahkan, atau menghentikan
            fitur tertentu dari situs sewaktu-waktu.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            10. Perubahan Syarat & Ketentuan
          </h2>

          <p>
            Syarat & Ketentuan ini dapat diperbarui dari waktu ke waktu.
            Perubahan akan dipublikasikan melalui halaman ini.
          </p>

          <p className="mt-4">
            Dengan tetap menggunakan NextTech setelah perubahan diterbitkan,
            pengguna dianggap menyetujui ketentuan yang telah diperbarui.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            11. Hubungi Kami
          </h2>

          <p>
            Jika kamu memiliki pertanyaan mengenai Syarat & Ketentuan ini,
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
