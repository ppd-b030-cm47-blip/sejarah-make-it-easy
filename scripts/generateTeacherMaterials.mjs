import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const outputDir = path.resolve('public/bahan-guru')

const chapters = [
  {
    number: 1,
    title: 'Kedaulatan Negara',
    themes: ['takrif kedaulatan', 'ciri negara berdaulat', 'kepentingan kedaulatan', 'cabaran global', 'patriotisme'],
    learning: ['Konsep kedaulatan', 'Ciri negara yang berdaulat', 'Kepentingan negara berdaulat', 'Langkah mempertahankan kedaulatan'],
    thinking: ['Kronologi konsep kedaulatan', 'Bukti kepentingan kedaulatan', 'Rasionalisasi mengekalkan kedaulatan'],
    values: ['Menjiwai identiti negara', 'Menghormati kepelbagaian budaya dan agama', 'Bijaksana menghadapi cabaran'],
    people: ['Tun Mohd Salleh Abas', 'Pemerintah negara', 'Rakyat Malaysia', 'Institusi raja', 'Pemimpin kerajaan'],
  },
  {
    number: 2,
    title: 'Perlembagaan Persekutuan',
    themes: ['undang-undang tertinggi', 'keluhuran perlembagaan', 'pindaan', 'hak asasi', 'tanggungjawab warganegara'],
    learning: ['Latar belakang sejarah Perlembagaan Persekutuan', 'Sejarah penggubalan perlembagaan', 'Ciri utama Perlembagaan Persekutuan', 'Pindaan 1963 dan 1965'],
    thinking: ['Bukti undang-undang adat dan bertulis', 'Interpretasi ciri utama perlembagaan', 'Rasionalisasi pindaan perlembagaan'],
    values: ['Mendaulatkan Perlembagaan Persekutuan', 'Mematuhi undang-undang', 'Memelihara tanggungjawab sebagai rakyat'],
    people: ['Suruhanjaya Reid', 'Raja-raja Melayu', 'Tunku Abdul Rahman Putra al-Haj', 'Majlis Perundangan Persekutuan', 'Badan kehakiman'],
  },
  {
    number: 3,
    title: 'Raja Berperlembagaan dan Demokrasi Berparlimen',
    themes: ['Yang di-Pertuan Agong', 'Parlimen', 'pilihan raya', 'pengasingan kuasa', 'semak dan imbang'],
    learning: ['Latar belakang pemerintahan beraja', 'Majlis Raja-Raja', 'Yang di-Pertuan Agong dan raja', 'Amalan demokrasi dan pengasingan kuasa', 'Keunikan Demokrasi Berparlimen'],
    thinking: ['Kronologi pemerintahan beraja', 'Bukti amalan demokrasi', 'Interpretasi kedudukan Yang di-Pertuan Agong'],
    values: ['Taat setia kepada pemerintah', 'Menghargai pengasingan kuasa', 'Mempertahankan sistem pemerintahan negara'],
    people: ['Yang di-Pertuan Agong', 'Majlis Raja-Raja', 'Ahli Parlimen', 'Suruhanjaya Pilihan Raya', 'Ketua Menteri dan Menteri Besar'],
  },
  {
    number: 4,
    title: 'Sistem Persekutuan',
    themes: ['Kerajaan Persekutuan', 'Kerajaan Negeri', 'pembahagian kuasa', 'kerjasama kerajaan', 'keluhuran perlembagaan'],
    learning: ['Latar belakang sistem Persekutuan', 'Kuasa Kerajaan Persekutuan dan Kerajaan Negeri', 'Kerjasama antara kerajaan', 'Faktor pengukuhan sistem Persekutuan'],
    thinking: ['Kronologi sistem Persekutuan', 'Bukti keberkesanan kerjasama kerajaan', 'Rasionalisasi pembahagian kuasa'],
    values: ['Bermusyawarah dalam keputusan', 'Menghargai pentadbiran sistematik', 'Memahami tanggungjawab rakyat dan pemimpin'],
    people: ['Kerajaan Persekutuan', 'Kerajaan Negeri', 'Yamtuan Besar Negeri Sembilan', 'Tuanku Muhammad ibni Tuanku Antah', 'Pentadbir tempatan'],
  },
  {
    number: 5,
    title: 'Pembentukan Malaysia',
    themes: ['gagasan Malaysia', 'Suruhanjaya Cobbold', 'Jawatankuasa Antara Kerajaan', 'Perjanjian Malaysia 1963', 'reaksi wilayah'],
    learning: ['Konsep gagasan Malaysia', 'Faktor pembentukan Malaysia', 'Reaksi terhadap pembentukan Malaysia', 'Langkah pembentukan Malaysia', 'Perjanjian Malaysia 1963'],
    thinking: ['Bukti proses rundingan', 'Interpretasi reaksi wilayah', 'Rasionalisasi kepentingan pembentukan Malaysia'],
    values: ['Mempertahankan kedaulatan negara', 'Memperkukuh toleransi', 'Mengukuhkan cinta akan negara'],
    people: ['Tunku Abdul Rahman Putra al-Haj', 'Suruhanjaya Cobbold', 'Jawatankuasa Antara Kerajaan', 'Lee Kuan Yew', 'Pemimpin Sarawak dan Sabah'],
  },
  {
    number: 6,
    title: 'Cabaran Selepas Pembentukan Malaysia',
    themes: ['pembangunan Sarawak dan Sabah', 'krisis politik Sarawak', 'perpaduan kaum', 'ancaman komunis', 'pembangunan sosioekonomi'],
    learning: ['Cabaran pembangunan dan sosioekonomi', 'Krisis politik di Sarawak', 'Perpaduan kaum', 'Ancaman komunis', 'Usaha kerajaan menangani cabaran'],
    thinking: ['Bukti cabaran dalaman', 'Imaginasi penyelesaian sebagai pemimpin', 'Rasionalisasi pentingnya kestabilan negara'],
    values: ['Bersatu menghadapi cabaran', 'Menghargai keamanan', 'Mementingkan keseimbangan pembangunan'],
    people: ['Tun Abdul Razak Hussein', 'Stephen Kalong Ningkan', 'Kerajaan Persekutuan', 'Penduduk Sarawak dan Sabah', 'Pasukan keselamatan'],
  },
  {
    number: 7,
    title: 'Membina Kesejahteraan Negara',
    themes: ['perpaduan kaum', 'integrasi nasional', 'Dasar Pendidikan Kebangsaan', 'bahasa Melayu', 'Rukun Negara'],
    learning: ['Perpaduan dan integrasi nasional', 'Dasar Pendidikan Kebangsaan', 'Bahasa Melayu sebagai bahasa ilmu dan perpaduan', 'Dasar Kebudayaan Kebangsaan', 'Sukan dan Rukun Negara'],
    thinking: ['Kronologi usaha perpaduan', 'Bukti pelaksanaan dasar pendidikan', 'Rasionalisasi prinsip Rukun Negara'],
    values: ['Menjaga keharmonian', 'Menghayati Rukun Negara', 'Menghargai pendidikan untuk perpaduan'],
    people: ['Tun Abdul Razak Hussein', 'Murid pelbagai kaum', 'Dewan Bahasa dan Pustaka', 'Majlis Kebudayaan Kebangsaan', 'Atlet negara'],
  },
  {
    number: 8,
    title: 'Membina Kemakmuran Negara',
    themes: ['Dasar Ekonomi Baru', 'membasmi kemiskinan', 'menyusun semula masyarakat', 'Dasar Pembangunan Nasional', 'Rancangan Pembangunan Lima Tahun'],
    learning: ['Pembentukan Dasar Ekonomi Baru', 'Pelaksanaan Dasar Ekonomi Baru', 'Pembentukan Dasar Pembangunan Nasional', 'Pelaksanaan Dasar Pembangunan Nasional', 'Pencapaian dasar ekonomi'],
    thinking: ['Kronologi DEB', 'Bukti pelaksanaan dasar ekonomi', 'Interpretasi pencapaian dasar ekonomi'],
    values: ['Melibatkan diri dalam pembangunan', 'Menghargai harta awam', 'Menjaga kelestarian alam sekitar'],
    people: ['Tun Abdul Razak Hussein', 'Majlis Perundingan Negara', 'Dr. Rais Saniman', 'Dr. Just Faaland', 'Dr. Jack R. Parkinson'],
  },
  {
    number: 9,
    title: 'Dasar Luar Malaysia',
    themes: ['asas dasar luar', 'PBB', 'Komanwel', 'ASEAN', 'NAM dan OIC'],
    learning: ['Latar belakang dasar luar', 'Asas penggubalan dasar luar', 'Malaysia dalam PBB', 'Malaysia dalam Komanwel', 'Malaysia dalam ASEAN, NAM dan OIC'],
    thinking: ['Kronologi dasar luar', 'Bukti sumbangan tokoh', 'Interpretasi cabaran mengukuhkan dasar luar'],
    values: ['Menghormati dasar luar negara lain', 'Prihatin terhadap isu antarabangsa', 'Bekerjasama demi kemakmuran bersama'],
    people: ['Tunku Abdul Rahman Putra al-Haj', 'Tun Abdul Razak Hussein', 'Wakil Malaysia di PBB', 'Pemimpin ASEAN', 'Pertubuhan Kerjasama Islam'],
  },
  {
    number: 10,
    title: 'Kecemerlangan Malaysia di Persada Dunia',
    themes: ['isu global kontemporari', 'hubungan ekonomi antarabangsa', 'kemanusiaan dan keamanan', 'kelestarian global', 'wawasan masa hadapan'],
    learning: ['Malaysia dalam isu global kontemporari', 'Hubungan ekonomi antarabangsa', 'Pelibatan rakyat dalam isu kemanusiaan dan keamanan', 'Kelestarian global', 'Wawasan Malaysia menuju masa hadapan'],
    thinking: ['Kronologi isu pertindihan sempadan', 'Bukti usaha menangani kemelesetan ekonomi', 'Rasionalisasi Deklarasi Langkawi'],
    values: ['Prihatin terhadap isu global', 'Mengutamakan keamanan dunia', 'Mengamalkan semangat kesukarelawanan'],
    people: ['Pemimpin Malaysia', 'Sukarelawan Malaysia', 'Pasukan pengaman negara', 'Wakil ekonomi Malaysia', 'Penyelidik Antartika Malaysia'],
  },
]

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const list = (items) => items.map((item) => `<li>${item}</li>`).join('')

const page = (title, body) => `<!doctype html>
<html lang="ms">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    :root { --navy:#081a33; --maroon:#9d1b32; --gold:#d69b20; --ink:#172033; --muted:#64748b; }
    * { box-sizing:border-box; }
    body { margin:0; font-family: Arial, sans-serif; color:var(--ink); background:#eef2f7; line-height:1.45; }
    main { max-width: 900px; margin: 24px auto; background:white; padding: 34px; border-radius: 18px; box-shadow: 0 18px 50px rgba(8,26,51,.16); }
    header { border-bottom: 6px solid var(--gold); padding-bottom: 18px; margin-bottom: 22px; }
    .eyebrow { color:var(--maroon); font-weight:800; text-transform:uppercase; letter-spacing:.08em; font-size:12px; }
    h1 { margin:6px 0 8px; color:var(--navy); font-size:30px; line-height:1.1; }
    h2 { margin:24px 0 10px; color:var(--maroon); font-size:20px; }
    h3 { margin:18px 0 8px; color:var(--navy); font-size:16px; }
    p { margin:8px 0; }
    ul, ol { margin:8px 0 14px 20px; padding:0; }
    li { margin:5px 0; }
    .grid { display:grid; grid-template-columns: 1fr 1fr; gap:14px; }
    .box { border:1px solid #dbe3ef; border-radius:14px; padding:14px; background:#f8fafc; }
    .note { border-left:5px solid var(--gold); background:#fff8e1; padding:12px 14px; border-radius:12px; }
    table { width:100%; border-collapse:collapse; margin:12px 0 18px; font-size:14px; }
    th { background:var(--navy); color:white; text-align:left; }
    th, td { border:1px solid #cbd5e1; padding:10px; vertical-align:top; }
    .score { text-align:center; width:80px; }
    .line { min-height: 34px; border-bottom:1px solid #94a3b8; margin:8px 0 12px; }
    .visual-card { min-height:110px; border:2px dashed #cbd5e1; border-radius:14px; padding:12px; background:linear-gradient(135deg,#fff,#f8fafc); }
    .print { position:fixed; top:16px; right:16px; border:0; background:var(--maroon); color:white; border-radius:999px; padding:11px 16px; font-weight:800; cursor:pointer; }
    @media print { body { background:white; } main { margin:0; box-shadow:none; border-radius:0; max-width:none; } .print { display:none; } h2 { break-after:avoid; } .box, table { break-inside:avoid; } }
    @media (max-width: 720px) { main { margin:0; border-radius:0; padding:22px; } .grid { grid-template-columns:1fr; } h1 { font-size:24px; } }
  </style>
</head>
<body>
  <button class="print" onclick="window.print()">Cetak / Simpan PDF</button>
  <main>${body}</main>
</body>
</html>`

const header = (chapter, type) => `<header>
  <div class="eyebrow">Sejarah Tingkatan 5 · Bab ${chapter.number}</div>
  <h1>${type}: ${chapter.title}</h1>
  <p>Bahan ini dibina berdasarkan buku teks KSSM Sejarah Tingkatan 5 dan dipandu oleh DSKP tema Malaysia dan Masa Hadapan.</p>
</header>`

const worksheet = (chapter) =>
  page(
    `Lembaran Kerja - ${chapter.title}`,
    `${header(chapter, 'Lembaran Kerja')}
    <section class="grid">
      <div class="box"><h2>Standard Fokus</h2><ul>${list(chapter.learning)}</ul></div>
      <div class="box"><h2>Kata Kunci</h2><ul>${list(chapter.themes)}</ul></div>
    </section>
    <h2>A. Pemahaman Konsep</h2>
    <ol>
      <li>Jelaskan maksud <strong>${chapter.themes[0]}</strong> dalam konteks ${chapter.title}.<div class="line"></div><div class="line"></div></li>
      <li>Nyatakan dua bukti yang menunjukkan kepentingan topik ini kepada negara Malaysia.<div class="line"></div><div class="line"></div></li>
      <li>Lengkapkan peta minda ringkas tentang ${chapter.learning[0]}.</li>
    </ol>
    <table><tr><th>Aspek</th><th>Huraian Murid</th></tr>${chapter.learning.map((item) => `<tr><td>${item}</td><td></td></tr>`).join('')}</table>
    <h2>B. Analisis Sumber</h2>
    <p class="note">Guru boleh memaparkan visual dalam aplikasi dan meminta murid membuat inferens berdasarkan soalan berikut.</p>
    <ol>
      <li>Apakah maklumat tersurat yang dapat diperhatikan?</li>
      <li>Apakah inferens sejarah yang boleh dibuat?</li>
      <li>Bagaimanakah visual tersebut berkaitan dengan ${chapter.title}?</li>
    </ol>
    <h2>C. Soalan KBAT</h2>
    <p><strong>Soalan:</strong> Pada pendapat anda, mengapakah ${chapter.themes[1]} penting dalam pembinaan masa hadapan Malaysia?</p>
    <div class="line"></div><div class="line"></div><div class="line"></div>
    <h2>D. Refleksi Kendiri</h2>
    <p>Satu nilai yang saya pelajari daripada bab ini ialah:</p><div class="line"></div>`,
  )

const rubric = (chapter) =>
  page(
    `Rubrik KBAT - ${chapter.title}`,
    `${header(chapter, 'Rubrik KBAT')}
    <h2>Soalan Pentaksiran</h2>
    <p>Huraikan kepentingan ${chapter.themes[2]} dan cadangkan tindakan warganegara untuk memperkukuh masa hadapan Malaysia.</p>
    <table>
      <tr><th>Kriteria</th><th>Cemerlang 4</th><th>Baik 3</th><th>Memuaskan 2</th><th>Perlu Bimbingan 1</th><th class="score">Skor</th></tr>
      <tr><td>Fakta sejarah</td><td>Fakta tepat, khusus dan berkaitan dengan bab.</td><td>Fakta tepat tetapi huraian kurang mendalam.</td><td>Fakta umum dan terhad.</td><td>Fakta kurang tepat.</td><td></td></tr>
      <tr><td>Huraian dan bukti</td><td>Huraian jelas dengan bukti yang meyakinkan.</td><td>Huraian jelas tetapi bukti sederhana.</td><td>Huraian ringkas.</td><td>Huraian kabur.</td><td></td></tr>
      <tr><td>Pemikiran kritis</td><td>Menghubungkait sebab, kesan dan pengajaran secara matang.</td><td>Menghubungkait sebahagian sebab dan kesan.</td><td>Hubung kait terhad.</td><td>Tiada hubung kait jelas.</td><td></td></tr>
      <tr><td>Nilai kewarganegaraan</td><td>Nilai dinyatakan dan diaplikasikan dengan cadangan tindakan.</td><td>Nilai dinyatakan dengan contoh ringkas.</td><td>Nilai dinyatakan secara umum.</td><td>Nilai tidak jelas.</td><td></td></tr>
      <tr><td>Bahasa</td><td>Bahasa Melayu gramatis dan tersusun.</td><td>Bahasa jelas dengan sedikit kesalahan.</td><td>Bahasa mudah tetapi masih difahami.</td><td>Bahasa mengganggu kefahaman.</td><td></td></tr>
    </table>
    <h2>Maklum Balas Guru</h2><div class="line"></div><div class="line"></div>`,
  )

const lesson = (chapter) =>
  page(
    `Aktiviti PdP - ${chapter.title}`,
    `${header(chapter, 'Rancangan Aktiviti PdP')}
    <section class="grid">
      <div class="box"><h2>Objektif Pembelajaran</h2><ul>${list(chapter.learning.slice(0, 4))}</ul></div>
      <div class="box"><h2>Kemahiran DSKP</h2><ul>${list(chapter.thinking)}</ul></div>
    </section>
    <h2>Cadangan Aktiviti 60 Minit</h2>
    <table>
      <tr><th>Masa</th><th>Fasa</th><th>Aktiviti Guru dan Murid</th><th>Hasil</th></tr>
      <tr><td>5 minit</td><td>Set induksi</td><td>Guru memaparkan visual Malaysia dalam aplikasi dan menyoal kata kunci ${chapter.themes[0]}.</td><td>Murid mengemukakan pengetahuan awal.</td></tr>
      <tr><td>15 minit</td><td>Penerokaan</td><td>Murid membaca nota ringkas dan mengenal pasti tiga fakta utama.</td><td>Catatan fakta dan istilah penting.</td></tr>
      <tr><td>20 minit</td><td>Kolaborasi</td><td>Kumpulan melengkapkan lembaran kerja dan membina hujah KBAT.</td><td>Jawapan berkumpulan.</td></tr>
      <tr><td>15 minit</td><td>Pembentangan</td><td>Setiap kumpulan membentangkan satu inferens dan satu nilai sivik.</td><td>Perbincangan kelas.</td></tr>
      <tr><td>5 minit</td><td>Penutup</td><td>Murid menjawab tiket keluar: satu fakta, satu bukti, satu nilai.</td><td>Refleksi individu.</td></tr>
    </table>
    <h2>Pembezaan Pembelajaran</h2>
    <ul>
      <li>Murid memerlukan bimbingan: gunakan senarai kata kunci dan ayat mula.</li>
      <li>Murid sederhana: jawab soalan sebab dan kesan dengan contoh.</li>
      <li>Murid cemerlang: bina cadangan penyelesaian dan pertahankan hujah.</li>
    </ul>`,
  )

const gallery = (chapter) =>
  page(
    `Kad Visual - ${chapter.title}`,
    `${header(chapter, 'Set Kad Visual Jelajah Galeri')}
    <p class="note">Cetak halaman ini, potong mengikut kad, dan tampal di stesen jelajah galeri.</p>
    <section class="grid">
      ${chapter.themes
        .concat(chapter.people)
        .slice(0, 10)
        .map(
          (item, index) => `<div class="visual-card">
          <h3>Kad ${index + 1}: ${item}</h3>
          <p><strong>Tugasan:</strong> Perhatikan visual dalam aplikasi atau bahan guru. Nyatakan satu fakta, satu inferens dan satu soalan KBAT.</p>
          <p><strong>Soalan:</strong> Bagaimanakah ${item} berkaitan dengan ${chapter.title}?</p>
        </div>`,
        )
        .join('')}
    </section>`,
  )

await mkdir(outputDir, { recursive: true })

const manifest = {}
for (const chapter of chapters) {
  const base = `bab-${String(chapter.number).padStart(2, '0')}-${slug(chapter.title)}`
  const files = {
    worksheet: `${base}-lembaran-kerja.html`,
    rubric: `${base}-rubrik-kbat.html`,
    lesson: `${base}-aktiviti-pdp.html`,
    gallery: `${base}-kad-visual.html`,
  }
  await writeFile(path.join(outputDir, files.worksheet), worksheet(chapter))
  await writeFile(path.join(outputDir, files.rubric), rubric(chapter))
  await writeFile(path.join(outputDir, files.lesson), lesson(chapter))
  await writeFile(path.join(outputDir, files.gallery), gallery(chapter))
  manifest[chapter.title] = Object.fromEntries(
    Object.entries(files).map(([key, file]) => [key, `/bahan-guru/${file}`]),
  )
}

await writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`Generated ${chapters.length * 4} teacher material files in ${outputDir}`)
