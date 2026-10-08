# Pedoman penulisan personal website

Panduan ini berlaku untuk homepage, Work, Writing, About, Experience, Index,
metadata dan microcopy. Gunakan `DESIGN.md` untuk hierarki visual, `AGENTS.md`
untuk aturan kerja, dan `README.md` untuk format serta publikasi konten.

Tujuan tulisan adalah membuat pembaca memahami apa yang Daffa kerjakan,
bagaimana ia mengambil keputusan, kontribusi pribadinya, dan hal yang ia pelajari.
Panduan ini bukan kumpulan copy siap terbit. Contoh di bawah menunjukkan gaya;
contoh tidak membuktikan pengalaman, teknologi atau hasil proyek Daffa.

## Bahasa dan suara

Bahasa utama situs adalah English. Gunakan international English yang alami,
jelas dan mudah dipahami pembaca non-native. Bahasa Indonesia digunakan untuk
versi Indonesia atau konteks lokal yang memerlukannya. Pertahankan nama resmi;
hindari campuran bahasa dalam satu kalimat tanpa alasan.

Suara situs tenang, langsung, spesifik dan personal. Homepage boleh hangat dan
sedikit playful; case study lebih analitis. Tulis seperti orang yang memahami
pekerjaannya, bukan perusahaan yang sedang menjual layanan.

- Sampaikan poin utama lebih awal.
- Jelaskan produk atau masalah sebelum daftar teknologi.
- Pilih kata kerja konkret: built, designed, implemented, investigated,
  maintained, tested, documented.
- Gunakan panjang kalimat yang bervariasi dan satu ide utama per paragraf.
- Gunakan bullet untuk langkah, constraints atau outcomes, bukan semua narasi.
- Refleksi harus menyebut hal yang berubah dalam pemahaman atau cara bekerja.

Hindari slogan seperti "crafting exceptional digital experiences", "turning
ideas into reality", "passionate developer" dan "building the future".
Hapus pembuka generik seperti "in today's digital landscape", pengumuman
"let's dive in", serta kesimpulan motivasional yang tidak menambah informasi.
Istilah "reliable", "secure", "scalable" atau "optimized" membutuhkan penjelasan
atau bukti; kata sifat tersebut bukan pengganti hasil.

## Fakta, kontribusi dan sumber

Akurasi lebih penting daripada wording. Jangan mengarang perusahaan, jabatan,
tanggal, tanggung jawab, teknologi, metrik, penghargaan, kutipan, cerita personal
atau hasil. Jika informasi belum diketahui, tanyakan atau tandai secara internal;
jangan menerbitkan asumsi sebagai fakta.

Gunakan "I" untuk kontribusi pribadi dan "we" untuk pekerjaan tim. Bedakan apa
yang dirancang bersama, bagian yang Daffa kerjakan, dan outcome tim. Kata seperti
"led" atau "architected" hanya digunakan jika scope sebenarnya mendukungnya.

Bedakan dengan jelas:

- Fakta terverifikasi: sesuatu yang memang dilakukan atau terjadi.
- Hasil pengukuran: observasi dengan metode, lingkungan dan batasan yang diketahui.
- Interpretasi personal: kesimpulan atau pelajaran penulis.
- Estimasi: disebut sebagai estimasi tanpa false precision.
- Rencana: belum menjadi hasil yang tercapai.

Untuk metrik, cek apa yang diukur, baseline, periode, lingkungan pengujian dan
atribusi kontribusinya. Hasil pengujian lokal tidak otomatis membuktikan performa
produksi, semua skenario kegagalan atau keamanan menyeluruh. Jika angka tidak
tersedia, gunakan outcome yang dapat diamati tanpa membuat angka baru.

Simpan provenance dalam field internal yang memang didukung, seperti `sourceNote`
atau `sourceNotes`. Jangan mempublikasikan credential, data klien, informasi
pribadi atau detail rahasia. Kutipan/testimonial memerlukan izin dan atribusi yang
disetujui; penyuntingan tidak boleh mengubah makna atau menulis atas nama orang lain.

## Pedoman per halaman

### Homepage

Jawab siapa Daffa, apa yang ia bangun, proyek mana yang layak dilihat, apa yang
ia tulis, dan bagaimana menghubunginya. Pertahankan greeting yang personal dan
positioning yang sesuai pekerjaan nyata; jangan menggantinya dengan manifesto
atau daftar teknologi.

Project summaries dan Writing dikurasi. Experience menampilkan semua role yang
published dan verified sesuai desain aktif, dengan ringkasan singkat; detail
outcome tetap di About. Jangan memotong daftar role karena aturan curation.

Patokan panjang, bukan batas kaku:

- Hero heading: 7–16 kata.
- Hero paragraph dan project summary: 20–45 kata.
- Pengantar section: satu kalimat jika memang diperlukan.

Contoh arah wording:

> I build web applications and document the decisions behind them.

Gunakan hanya jika scope tersebut sesuai sumber. Tidak perlu menambahkan claim
availability atau keahlian yang belum dikonfirmasi.

### Work dan case study

Judul memakai nama proyek sebenarnya. Ringkasan menjelaskan produk, pengguna
atau masalah yang dibantu, lalu kontribusi atau hasil yang relevan.

Susun narasi sesuai materi yang tersedia:

1. Context dan problem.
2. Role pribadi, tim dan constraints.
3. Keputusan, alasan dan trade-off.
4. Implementasi serta kasus kegagalan yang relevan.
5. Outcome terverifikasi dan batasannya.
6. Pelajaran, credits dan related writing bila ada.

Ini kerangka, bukan kewajiban membuat section kosong. Jangan mengarang isi untuk
melengkapi struktur. Satu keputusan yang dijelaskan baik lebih berguna daripada
banyak nama teknologi tanpa konteks.

Contoh perbaikan:

- Hindari: "Built a robust and scalable event system."
- Lebih konkret: "Stored pending events in the same transaction as the business
  change so they could be retried after a broker failure."

Kalimat kedua hanya layak terbit jika implementasinya terverifikasi. Sebutkan
kompleksitas retry, idempotency atau processing tambahan jika itu trade-off nyata.

### Experience

Cantumkan role resmi, organisasi, periode, employment type, scope dan kontribusi.
Ringkasan memberi konteks, bukan mengulang seluruh bullet. Gunakan pola
"action + context + decision + outcome" ketika unsur tersebut tersedia.

- Summary: sekitar 25–60 kata.
- Outcome bullet: sekitar 20–45 kata.
- Hindari "Responsible for front-end development" tanpa menjelaskan pekerjaan.
- Jangan mengatribusi seluruh hasil tim kepada satu orang.
- Detail di About boleh lebih dalam daripada ringkasan homepage.

### Writing

Mulai dengan masalah atau insight utama, bukan introduction generik. Jelaskan
asumsi dan mental model sebelum implementasi. Struktur dapat mencakup context,
solusi, failure cases, verifikasi dan trade-offs sesuai topik.

Sebelum code block atau command, sebutkan fungsinya, tempat menjalankannya,
prasyarat serta risiko jika relevan. Setelahnya, jelaskan expected result dan
cara mengecek hasil. Bedakan output nyata dari ilustrasi. Jangan menyajikan
output buatan sebagai hasil eksekusi.

Sebutkan versi/lingkungan ketika memengaruhi perilaku; tanggal "last tested"
hanya boleh merujuk pengujian yang benar-benar dilakukan. Gunakan sumber
primer untuk klaim eksternal dan tautkan dokumentasi yang mendukung penjelasan.
Akhiri saat poinnya lengkap, tanpa "hopefully this helps" atau ringkasan berulang.

Notes bukan lagi fitur/collection situs. Jangan menambahkan navigasi, preview,
metadata atau instruksi publikasi Notes. Kata "notes" dalam prose biasa dan
provenance internal tidak perlu dihapus jika maknanya relevan.

### About dan contact

About menjelaskan cara bekerja, proses belajar, fokus saat ini dan minat yang
relevan. Refleksi personal boleh memakai "I" dan opini yang jelas sebagai opini.
Jangan menambah origin story atau hobi yang tidak bersumber.

Pertimbangkan apakah informasi personal aman dan nyaman untuk tetap terindeks
jangka panjang. Contact harus hangat dan rendah-friksi, tanpa janji availability
yang belum dikonfirmasi atau "let's make magic".

### Index, metadata dan microcopy

Gunakan label navigasi yang jelas: Work, Writing, About, Index. Pertahankan
nama resmi proyek, perusahaan dan role. Metadata membantu orientasi; ia bukan
ruang untuk marketing copy atau keyword stuffing.

CTA menyebut tindakan dan tujuan, misalnya:

- View case study
- Read article
- Browse all work
- View complete experience
- Open résumé, atau Download résumé jika tindakannya memang mengunduh
- Send an email

Jangan memakai "Click here" atau "Discover more" jika tujuan bisa disebutkan.
Panah tidak menggantikan label yang dapat dipahami. Icon-only control memerlukan
accessible name; teks status menyampaikan hasil, bukan hanya nama tombol.

Error/empty state menjelaskan kondisi dan langkah berikutnya tanpa menyalahkan
pengguna. Contoh: "This article could not be found. Browse all writing instead."
Untuk Copy yang gagal, jelaskan bahwa teks masih bisa dipilih dan disalin manual.

## Aturan editorial

### Headings dan istilah

Gunakan sentence case untuk judul, headings dan tombol. Nama resmi tetap memakai
kapitalisasi resminya, seperti Next.js, TypeScript, PostgreSQL, GitLab CI/CD dan
NATS JetStream. Uppercase dibatasi pada label metadata pendek bila desain
memerlukannya, bukan paragraf.

Heading mendeskripsikan isi. Jangan mengulang heading dalam kalimat pembuka yang
tidak menambah konteks. Jelaskan jargon yang mungkin belum dikenal; singkatan
kurang umum ditulis lengkap pada penggunaan pertama. API, UI, SQL dan CI/CD dapat
langsung digunakan untuk pembaca teknis bila konteksnya jelas.

### Tanggal dan angka

Gunakan format konsisten dalam komponen yang sama. Rentang pengalaman dapat
berbentuk "January 2026 — Present"; metadata ringkas mengikuti formatter situs.
Jangan memasukkan rentang atau "Present" sebagai satu nilai `datetime`.

Tanggal sumber mengikuti schema aktual: tanggal kalender `YYYY-MM-DD`, bulan
pengalaman `YYYY-MM`, dan end `null` untuk role berjalan. Pastikan tanggal nyata,
updated tidak mendahului published, dan end tidak mendahului start. Jangan
mengubah tanggal publikasi hanya untuk membuat konten terlihat baru.

Gunakan numerals untuk metrik, tanggal dan nilai teknis. Hindari false precision,
`[XX]%` dan angka tanpa konteks. Menambahkan "approximately" tidak membuat
estimasi yang tidak bersumber menjadi sah.

### Gambar, captions dan links

Alt text menjelaskan informasi penting yang terlihat, bukan hanya "screenshot"
atau pengulangan judul. Gambar dekoratif memakai empty alt. Diagram kompleks
memerlukan penjelasan tekstual yang memadai; alt pendek bukan pengganti uraian.

Caption menambahkan konteks tentang figure atau hubungan antarbagian. Jangan
mengklaim detail yang tidak tampak atau tidak dijelaskan sumbernya. Link text
menyebut tujuan, misalnya "Read the Work Fusion case study".

## Draft dan bantuan AI

Gunakan model publikasi aktual dalam `src/lib/content/`: metadata MDX diekspor
sebagai object TypeScript, bukan YAML frontmatter contoh. Ikuti `contentStatus`,
`verified` dan field yang benar-benar didukung; lihat entry tetangga dan README.
Jangan memperkenalkan field `draft: true` sebagai pengganti schema yang ada.

Konten draft atau belum terverifikasi tidak masuk public listing, homepage,
RSS, sitemap atau static route generation. TODO untuk fakta yang belum lengkap
tetap internal dan tidak boleh bocor ke halaman publik. Tunda publikasi bagian
yang belum bisa dipertanggungjawabkan.

AI boleh membantu grammar, struktur, pemangkasan dan alternatif wording.
AI tidak boleh mengisi fakta kosong dengan cerita atau angka yang terdengar
meyakinkan. Penulis tetap memeriksa hasil terhadap sumber asli. Factual source
data menang ketika bertentangan dengan wording.

## Checklist sebelum publikasi

- Role, tanggal, teknologi, links dan kontribusi sesuai sumber.
- Metrik memiliki konteks dan bukti; hasil tim dibedakan dari kontribusi pribadi.
- Tidak ada TODO publik, klaim contoh, rahasia atau testimonial tanpa izin.
- Poin utama muncul lebih awal dan dapat dipahami tanpa konteks internal proyek.
- Tiap section memberi informasi baru; tidak ada filler atau kesimpulan berulang.
- Jargon dijelaskan seperlunya; judul, metadata dan CTA memakai label konsisten.
- Alt text, captions, link labels dan error states berguna tanpa konteks visual.
- Publication flags, tanggal, related slugs dan metadata mengikuti schema aktual.
- Jalankan content validation dan tes; preview listing serta detail sebelum publish.

Tulisan tidak perlu mencoba terdengar mengesankan. Jelaskan pekerjaan dengan
cukup konkret agar pembaca bisa menilainya sendiri.
