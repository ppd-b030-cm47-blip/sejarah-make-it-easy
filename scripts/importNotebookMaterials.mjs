import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const sourceRoot = '/Users/sitihidayubtludin/Downloads'
const outputRoot = path.resolve('public/notebooklm')

const chapters = [
  {
    number: 1,
    title: 'Kedaulatan Negara',
    dir: 'BAHAN BAB 1 TING5',
    pdf: 'Bab 1_Kedaulatan_Negara_Malaysia_(2).pdf',
    audio: 'Bab 1_Kedaulatan_Geran_Hak_Milik_Negara.m4a',
    images: ['Bab 1_Mengenali_Empat_Jenis_Kedaulatan.png', 'Bab 1_Cabaran_Minda_KBAT_Kedaulatan_Negara.png'],
  },
  {
    number: 2,
    title: 'Perlembagaan Persekutuan',
    dir: 'BAHAN BAB 2 TING5',
    pdf: 'Tingkatan 2_Malaysian_Constitutional_Heritage.pdf',
    audio: 'Tingkatan 2_DNA_Perlembagaan_Satukan_Tradisi_Dan_Moden.m4a',
    images: ['Tingkatan 2_Keunikan_Perlembagaan_Malaysia.png', 'Tingkatan 2_Keunikan_Perlembagaan_Persekutuan_Malaysia.png'],
  },
  {
    number: 3,
    title: 'Raja Berperlembagaan dan Demokrasi Berparlimen',
    dir: 'BAHAN BAB 3 TING5',
    pdf: 'Bab 3_Sintesis_Kedaulatan_Malaysia_(2).pdf',
    audio: 'Bab 3_Adaptasi_Genius_Institusi_Raja_Malaysia.m4a',
    images: ['Bab 3_Evolusi_Pemerintahan_di_Malaysia.png', 'Bab 3_Raja_Berperlembagaan_dan_Demokrasi_Malaysia (2).png'],
  },
  {
    number: 4,
    title: 'Sistem Persekutuan',
    dir: 'BAHAN BAB 4 TING5',
    pdf: 'Bab 4_Malaysia_Federal_Architecture.pdf',
    audio: 'Bab 4_Siapa_Lebih_Berkuasa_Pusat_Atau_Negeri.m4a',
    images: ['Bab 4_Sistem_Persekutuan_Tunjang_Kestabilan_Negara.png', 'Bab 4_Kronologi_Evolusi_Sistem_Persekutuan_Malaysia.png'],
  },
  {
    number: 5,
    title: 'Pembentukan Malaysia',
    dir: 'BAHAN BAB 5 TING5',
    pdf: 'Bab 5_Malaysia_s_Formation_(2).pdf',
    audio: 'Bab 5_Malaysia_hampir_tidak_wujud_pada_1963.m4a',
    images: ['Bab 5_Tarikh_Penting.png', 'Bab 5_Kronologi_Pembentukan_Negara_Malaysia.png'],
  },
  {
    number: 6,
    title: 'Cabaran Selepas Pembentukan Malaysia',
    dir: 'BAHAN BAB 6 TING5',
    pdf: 'Bab 6_Malaysia_s_Formative_Challenges.pdf',
    audio: 'Bab 6_Krisis_Dan_Retakan_Awal_Malaysia.m4a',
    images: ['Bab 6_Cabaran_dan_Kestabilan_Malaysia_Pasca-1963.png', 'Bab 6_Kestabilan_Politik_Nadi_Kemakmuran.png'],
  },
  {
    number: 7,
    title: 'Membina Kesejahteraan Negara',
    dir: 'BAHAN BAB 7 TING5',
    pdf: 'Bab 7_Teras_Kesejahteraan_Malaysia_(2).pdf',
    audio: 'Bab 7_Sulam_KBAT_Dalam_Naratif_Sejarah_Malaysia.m4a',
    images: ['Bab 7_Teras_Perpaduan_Nasional_Malaysia.png', 'Bab 7_Infografik_Rukun_Negara_Malaysia_Bersatu.png'],
  },
  {
    number: 8,
    title: 'Membina Kemakmuran Negara',
    dir: 'BAHAN BAB 8 TING5',
    pdf: 'Bab 8_National_Prosperity_Roadmap_(2).pdf',
    audio: null,
    images: ['Bab 8_Strategi_Kemakmuran_Negara_Malaysia.png', 'Bab 8_Kemahiran_Menjamin_Masa_Hadapan_Remaja.png', 'Bab 8_Dasar_Luar_Malaysia__Kedaulatan_Global.png'],
  },
  {
    number: 9,
    title: 'Dasar Luar Malaysia',
    dir: 'BAHAN BAB 9 TING5',
    pdf: 'Bab 9_Malaysian_Diplomatic_Prism_(2).pdf',
    audio: 'Bab 9_Diplomasi_Keris_dan_Dasar_Luar_Malaysia.m4a',
    images: ['Bab 9_Dasar_Luar_Malaysia__Kedaulatan_Global.png', 'Bab 9_Malaysia__Peneraju_Keamanan_di_PBB.png'],
  },
  {
    number: 10,
    title: 'Kecemerlangan Malaysia di Persada Dunia',
    dir: 'BAHAN BAB 10 TING5',
    pdf: 'Bab 10_Malaysia_Global_Excellence.pdf',
    audio: 'Bab 10_Kelicikan_Malaysia_Lawan_Gergasi_Tanpa_Senjata.m4a',
    images: ['Bab 10_Sumbangan_Strategik_Ekonomi_Malaysia.png', 'Bab 10_Peranan_Malaysia_di_Persada_Dunia.png'],
  },
]

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const manifest = {}

for (const chapter of chapters) {
  const folder = `bab-${String(chapter.number).padStart(2, '0')}`
  const outputDir = path.join(outputRoot, folder)
  await mkdir(outputDir, { recursive: true })

  const chapterManifest = { title: chapter.title, pdf: null, audio: null, images: [] }
  const sourceDir = path.join(sourceRoot, chapter.dir)

  if (chapter.pdf) {
    const file = `${folder}-nota-notebooklm.pdf`
    await copyFile(path.join(sourceDir, chapter.pdf), path.join(outputDir, file))
    chapterManifest.pdf = `/notebooklm/${folder}/${file}`
  }

  if (chapter.audio) {
    const file = `${folder}-audio-notebooklm.m4a`
    await copyFile(path.join(sourceDir, chapter.audio), path.join(outputDir, file))
    chapterManifest.audio = `/notebooklm/${folder}/${file}`
  }

  for (const [index, image] of chapter.images.entries()) {
    const file = `${folder}-infografik-${index + 1}-${slug(image.replace(/\\.png$/i, ''))}.png`
    await copyFile(path.join(sourceDir, image), path.join(outputDir, file))
    chapterManifest.images.push({
      title: image.replace(/\\.png$/i, '').replaceAll('_', ' '),
      src: `/notebooklm/${folder}/${file}`,
    })
  }

  manifest[chapter.title] = chapterManifest
}

await writeFile(path.join(outputRoot, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`Imported NotebookLM materials for ${chapters.length} chapters.`)
