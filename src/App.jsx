import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Award,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Crown,
  Download,
  GalleryHorizontalEnd,
  GraduationCap,
  History,
  Image as ImageIcon,
  Landmark,
  Lightbulb,
  MessageCircle,
  Moon,
  Music,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
  UserRound,
  Volume2,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import './App.css'
import { assetUrl, notebookMaterials } from './notebookMaterials.js'

const textbookNote =
  'Kandungan disusun khusus untuk Sejarah Tingkatan 5 berdasarkan buku teks KSSM yang dimuat naik dan berpandukan DSKP KSSM Sejarah Tingkatan 4 dan 5.'

const formBlueprints = [
  {
    form: 5,
    focus: 'Malaysia dan masa hadapan: kedaulatan, pembentukan Malaysia, kemakmuran negara dan peranan di persada dunia',
    source: textbookNote,
    chapters: [
      'Kedaulatan Negara',
      'Perlembagaan Persekutuan',
      'Raja Berperlembagaan dan Demokrasi Berparlimen',
      'Sistem Persekutuan',
      'Pembentukan Malaysia',
      'Cabaran Selepas Pembentukan Malaysia',
      'Membina Kesejahteraan Negara',
      'Membina Kemakmuran Negara',
      'Dasar Luar Malaysia',
      'Kecemerlangan Malaysia di Persada Dunia',
    ],
  },
]

const chapterThemes = {
  'Kedaulatan Negara': ['takrif kedaulatan', 'ciri negara berdaulat', 'kepentingan kedaulatan', 'cabaran global', 'patriotisme'],
  'Perlembagaan Persekutuan': ['undang-undang tertinggi', 'keluhuran perlembagaan', 'pindaan', 'hak asasi', 'tanggungjawab warganegara'],
  'Raja Berperlembagaan dan Demokrasi Berparlimen': ['Yang di-Pertuan Agong', 'Parlimen', 'pilihan raya', 'pengasingan kuasa', 'semak dan imbang'],
  'Sistem Persekutuan': ['Kerajaan Persekutuan', 'Kerajaan Negeri', 'pembahagian kuasa', 'kerjasama kerajaan', 'keluhuran perlembagaan'],
  'Pembentukan Malaysia': ['gagasan Malaysia', 'Suruhanjaya Cobbold', 'Jawatankuasa Antara Kerajaan', 'Perjanjian Malaysia 1963', 'reaksi wilayah'],
  'Cabaran Selepas Pembentukan Malaysia': ['pembangunan Sarawak dan Sabah', 'krisis politik Sarawak', 'perpaduan kaum', 'ancaman komunis', 'pembangunan sosioekonomi'],
  'Membina Kesejahteraan Negara': ['perpaduan kaum', 'integrasi nasional', 'Dasar Pendidikan Kebangsaan', 'bahasa Melayu', 'Rukun Negara'],
  'Membina Kemakmuran Negara': ['Dasar Ekonomi Baru', 'membasmi kemiskinan', 'menyusun semula masyarakat', 'Dasar Pembangunan Nasional', 'Rancangan Pembangunan Lima Tahun'],
  'Dasar Luar Malaysia': ['asas dasar luar', 'PBB', 'Komanwel', 'ASEAN', 'NAM dan OIC'],
  'Kecemerlangan Malaysia di Persada Dunia': ['isu global kontemporari', 'hubungan ekonomi antarabangsa', 'kemanusiaan dan keamanan', 'kelestarian global', 'wawasan masa hadapan'],
}

const chapterDetails = {
  'Kedaulatan Negara': {
    summary:
      'Bab ini menerangkan konsep kedaulatan, ciri negara berdaulat, kepentingan mewujudkan negara berdaulat serta langkah pemerintah dan rakyat mempertahankan kedaulatan negara.',
    learning:
      ['Konsep kedaulatan', 'Ciri negara yang berdaulat', 'Kepentingan negara berdaulat', 'Langkah mempertahankan kedaulatan'],
    thinking:
      ['Memahami kronologi perkembangan konsep kedaulatan', 'Meneroka bukti kepentingan kedaulatan', 'Membuat rasionalisasi kepentingan mengekalkan kedaulatan negara'],
    values:
      ['Menjiwai identiti negara', 'Menghormati kepelbagaian budaya dan agama', 'Bijaksana menghadapi cabaran'],
  },
  'Perlembagaan Persekutuan': {
    summary:
      'Bab ini membincangkan latar belakang sejarah Perlembagaan Persekutuan, proses penggubalannya, ciri utama dan pindaan penting yang menyesuaikan perlembagaan dengan keperluan negara.',
    learning:
      ['Latar belakang sejarah Perlembagaan Persekutuan', 'Sejarah penggubalan perlembagaan', 'Ciri utama Perlembagaan Persekutuan', 'Pindaan 1963 dan 1965'],
    thinking:
      ['Meneroka bukti undang-undang adat dan undang-undang bertulis', 'Membuat interpretasi ciri utama perlembagaan', 'Membuat rasionalisasi pindaan perlembagaan'],
    values:
      ['Mendaulatkan Perlembagaan Persekutuan', 'Mematuhi undang-undang', 'Memelihara tanggungjawab sebagai rakyat'],
  },
  'Raja Berperlembagaan dan Demokrasi Berparlimen': {
    summary:
      'Bab ini menjelaskan perkembangan pemerintahan beraja, kedudukan Majlis Raja-Raja, peranan Yang di-Pertuan Agong dan pelaksanaan Demokrasi Berparlimen di Malaysia.',
    learning:
      ['Latar belakang pemerintahan beraja', 'Majlis Raja-Raja', 'Yang di-Pertuan Agong dan raja', 'Amalan demokrasi dan pengasingan kuasa', 'Keunikan Demokrasi Berparlimen'],
    thinking:
      ['Memahami kronologi pemerintahan beraja', 'Meneroka bukti amalan demokrasi', 'Membuat interpretasi kedudukan Yang di-Pertuan Agong'],
    values:
      ['Taat setia kepada pemerintah', 'Menghargai pengasingan kuasa', 'Mempertahankan sistem pemerintahan negara'],
  },
  'Sistem Persekutuan': {
    summary:
      'Bab ini menerangkan latar belakang sistem Persekutuan, pembahagian kuasa antara Kerajaan Persekutuan dengan Kerajaan Negeri serta kerjasama yang mengukuhkan pentadbiran negara.',
    learning:
      ['Latar belakang sistem Persekutuan', 'Kuasa Kerajaan Persekutuan dan Kerajaan Negeri', 'Kerjasama antara kerajaan', 'Faktor pengukuhan sistem Persekutuan'],
    thinking:
      ['Memahami kronologi perkembangan sistem Persekutuan', 'Meneroka bukti keberkesanan kerjasama kerajaan', 'Membuat rasionalisasi pembahagian kuasa'],
    values:
      ['Bermusyawarah dalam keputusan', 'Menghargai pentadbiran sistematik', 'Memahami tanggungjawab rakyat dan pemimpin'],
  },
  'Pembentukan Malaysia': {
    summary:
      'Bab ini meneliti gagasan pembentukan Malaysia, faktor pembentukan, reaksi tempatan dan luar, langkah pembentukan serta Perjanjian Malaysia 1963.',
    learning:
      ['Konsep gagasan Malaysia', 'Faktor pembentukan Malaysia', 'Reaksi terhadap pembentukan Malaysia', 'Langkah pembentukan Malaysia', 'Perjanjian Malaysia 1963'],
    thinking:
      ['Meneroka bukti proses rundingan', 'Membuat interpretasi reaksi wilayah', 'Membuat rasionalisasi kepentingan pembentukan Malaysia'],
    values:
      ['Mempertahankan kedaulatan negara', 'Memperkukuh toleransi', 'Mengukuhkan cinta akan negara'],
  },
  'Cabaran Selepas Pembentukan Malaysia': {
    summary:
      'Bab ini membincangkan cabaran dalaman selepas pembentukan Malaysia termasuk pembangunan Sarawak dan Sabah, krisis politik, perpaduan kaum dan ancaman komunis.',
    learning:
      ['Cabaran pembangunan dan sosioekonomi', 'Krisis politik di Sarawak', 'Perpaduan kaum', 'Ancaman komunis', 'Usaha kerajaan menangani cabaran'],
    thinking:
      ['Meneroka bukti cabaran dalaman', 'Membuat imaginasi penyelesaian sebagai pemimpin', 'Membuat rasionalisasi pentingnya kestabilan negara'],
    values:
      ['Bersatu menghadapi cabaran', 'Menghargai keamanan', 'Mementingkan keseimbangan pembangunan'],
  },
  'Membina Kesejahteraan Negara': {
    summary:
      'Bab ini menerangkan usaha membina perpaduan kaum dan integrasi nasional melalui dasar pendidikan, bahasa Melayu, Dasar Kebudayaan Kebangsaan, sukan dan Rukun Negara.',
    learning:
      ['Perpaduan dan integrasi nasional', 'Dasar Pendidikan Kebangsaan', 'Bahasa Melayu sebagai bahasa ilmu dan perpaduan', 'Dasar Kebudayaan Kebangsaan', 'Sukan dan Rukun Negara'],
    thinking:
      ['Membuat kronologi usaha perpaduan', 'Meneroka bukti pelaksanaan dasar pendidikan', 'Membuat rasionalisasi prinsip Rukun Negara'],
    values:
      ['Menjaga keharmonian', 'Menghayati Rukun Negara', 'Menghargai pendidikan untuk perpaduan'],
  },
  'Membina Kemakmuran Negara': {
    summary:
      'Bab ini memberi tumpuan kepada pembangunan ekonomi negara melalui Dasar Ekonomi Baru dan Dasar Pembangunan Nasional bagi membasmi kemiskinan dan menyusun semula masyarakat.',
    learning:
      ['Pembentukan Dasar Ekonomi Baru', 'Pelaksanaan Dasar Ekonomi Baru', 'Pembentukan Dasar Pembangunan Nasional', 'Pelaksanaan Dasar Pembangunan Nasional', 'Pencapaian dasar ekonomi'],
    thinking:
      ['Memahami kronologi DEB', 'Meneroka bukti pelaksanaan dasar ekonomi', 'Membuat interpretasi pencapaian dasar ekonomi'],
    values:
      ['Melibatkan diri dalam pembangunan', 'Menghargai harta awam', 'Menjaga kelestarian alam sekitar'],
  },
  'Dasar Luar Malaysia': {
    summary:
      'Bab ini membincangkan latar belakang dasar luar, asas penggubalan dasar luar dan pelibatan Malaysia dalam PBB, Komanwel, ASEAN, NAM serta OIC.',
    learning:
      ['Latar belakang dasar luar', 'Asas penggubalan dasar luar', 'Malaysia dalam PBB', 'Malaysia dalam Komanwel', 'Malaysia dalam ASEAN, NAM dan OIC'],
    thinking:
      ['Memahami kronologi dasar luar', 'Meneroka bukti sumbangan tokoh', 'Membuat interpretasi cabaran mengukuhkan dasar luar'],
    values:
      ['Menghormati dasar luar negara lain', 'Prihatin terhadap isu antarabangsa', 'Bekerjasama demi kemakmuran bersama'],
  },
  'Kecemerlangan Malaysia di Persada Dunia': {
    summary:
      'Bab ini memaparkan peranan Malaysia dalam isu global kontemporari, hubungan ekonomi antarabangsa, isu kemanusiaan dan keamanan, kelestarian global serta wawasan masa hadapan.',
    learning:
      ['Malaysia dalam isu global kontemporari', 'Hubungan ekonomi antarabangsa', 'Pelibatan rakyat dalam isu kemanusiaan dan keamanan', 'Kelestarian global', 'Wawasan Malaysia menuju masa hadapan'],
    thinking:
      ['Memahami kronologi isu pertindihan sempadan', 'Meneroka bukti usaha menangani kemelesetan ekonomi', 'Membuat rasionalisasi Deklarasi Langkawi'],
    values:
      ['Prihatin terhadap isu global', 'Mengutamakan keamanan dunia', 'Mengamalkan semangat kesukarelawanan'],
  },
}

const chapterPeople = {
  'Kedaulatan Negara': ['Tun Mohd Salleh Abas', 'Pemerintah negara', 'Rakyat Malaysia', 'Institusi raja', 'Pemimpin kerajaan'],
  'Perlembagaan Persekutuan': ['Suruhanjaya Reid', 'Raja-raja Melayu', 'Tunku Abdul Rahman Putra al-Haj', 'Majlis Perundangan Persekutuan', 'Badan kehakiman'],
  'Raja Berperlembagaan dan Demokrasi Berparlimen': ['Yang di-Pertuan Agong', 'Majlis Raja-Raja', 'Ahli Parlimen', 'Suruhanjaya Pilihan Raya', 'Ketua Menteri dan Menteri Besar'],
  'Sistem Persekutuan': ['Kerajaan Persekutuan', 'Kerajaan Negeri', 'Yamtuan Besar Negeri Sembilan', 'Tuanku Muhammad ibni Tuanku Antah', 'Pentadbir tempatan'],
  'Pembentukan Malaysia': ['Tunku Abdul Rahman Putra al-Haj', 'Suruhanjaya Cobbold', 'Jawatankuasa Antara Kerajaan', 'Lee Kuan Yew', 'Pemimpin Sarawak dan Sabah'],
  'Cabaran Selepas Pembentukan Malaysia': ['Tun Abdul Razak Hussein', 'Stephen Kalong Ningkan', 'Kerajaan Persekutuan', 'Penduduk Sarawak dan Sabah', 'Pasukan keselamatan'],
  'Membina Kesejahteraan Negara': ['Tun Abdul Razak Hussein', 'Murid pelbagai kaum', 'Dewan Bahasa dan Pustaka', 'Majlis Kebudayaan Kebangsaan', 'Atlet negara'],
  'Membina Kemakmuran Negara': ['Tun Abdul Razak Hussein', 'Majlis Perundingan Negara', 'Dr. Rais Saniman', 'Dr. Just Faaland', 'Dr. Jack R. Parkinson'],
  'Dasar Luar Malaysia': ['Tunku Abdul Rahman Putra al-Haj', 'Tun Abdul Razak Hussein', 'Wakil Malaysia di PBB', 'Pemimpin ASEAN', 'Pertubuhan Kerjasama Islam'],
  'Kecemerlangan Malaysia di Persada Dunia': ['Pemimpin Malaysia', 'Sukarelawan Malaysia', 'Pasukan pengaman negara', 'Wakil ekonomi Malaysia', 'Penyelidik Antartika Malaysia'],
}

const chapterStudyContent = {
  'Kedaulatan Negara': {
    notes: [
      'Kedaulatan bermaksud kuasa tertinggi sesebuah negara untuk memerintah secara bebas tanpa campur tangan kuasa asing.',
      'Kedaulatan dapat dilihat melalui kerajaan yang sah, rakyat, wilayah, sempadan dan pengiktirafan antarabangsa.',
      'Kemerdekaan Tanah Melayu dan pembentukan Malaysia mengukuhkan kedudukan negara sebagai negara bebas dan berdaulat.',
      'Kedaulatan penting untuk menjamin kestabilan politik, kemakmuran ekonomi dan keharmonian sosial.',
      'Pemerintah dan rakyat bertanggungjawab mempertahankan kedaulatan melalui perpaduan, patriotisme dan pematuhan undang-undang.',
    ],
    terms: [
      ['Kedaulatan', 'Kekuasaan tertinggi dan kewibawaan negara yang bebas untuk melaksanakan pemerintahan.'],
      ['Daulat', 'Kekuasaan tertinggi terhadap pemerintahan negara dalam tradisi bahasa Melayu.'],
      ['Sovereignty', 'Kuasa penuh sesebuah negara terhadap pemerintahan dan urusan dalamannya.'],
      ['Negara berdaulat', 'Negara yang mempunyai kerajaan, rakyat, wilayah dan kebebasan menentukan hal ehwal sendiri.'],
      ['Patriotisme', 'Perasaan cinta, taat setia dan sanggup berkorban demi negara.'],
    ],
    dates: [
      ['31 Ogos 1957', 'Kemerdekaan Persekutuan Tanah Melayu mengukuhkan kedaulatan negara.'],
      ['16 September 1963', 'Pembentukan Malaysia memantapkan negara bangsa yang bebas dan berdaulat.'],
      ['1000-800 SM', 'Zaman perkembangan Tamadun Yunani yang mempengaruhi istilah kedaulatan dalam tradisi Barat.'],
    ],
  },
  'Perlembagaan Persekutuan': {
    notes: [
      'Perlembagaan Persekutuan ialah undang-undang tertinggi yang menjadi asas pemerintahan negara.',
      'Asas perlembagaan negara dipengaruhi undang-undang negeri Melayu, adat tempatan dan unsur undang-undang Inggeris.',
      'Perlembagaan mempunyai ciri tradisional seperti institusi raja, agama Islam, bahasa Melayu dan kedudukan istimewa orang Melayu serta bumiputera.',
      'Ciri moden perlembagaan termasuk kerajaan persekutuan, kewarganegaraan, demokrasi berparlimen dan hak asasi.',
      'Pindaan perlembagaan dibuat untuk menyesuaikan undang-undang tertinggi negara dengan keperluan semasa.',
    ],
    terms: [
      ['Perlembagaan', 'Undang-undang tertinggi yang menjadi teras sistem pemerintahan negara.'],
      ['Keluhuran Perlembagaan', 'Prinsip bahawa semua pihak tertakluk kepada Perlembagaan Persekutuan.'],
      ['Hukum Kanun Melaka', 'Undang-undang bertulis zaman Kesultanan Melayu Melaka yang mempengaruhi tradisi perundangan Melayu.'],
      ['Charter of Justice', 'Piagam keadilan British yang memperkenalkan prinsip undang-undang Inggeris di Negeri-negeri Selat.'],
      ['Pindaan perlembagaan', 'Perubahan rasmi terhadap peruntukan perlembagaan mengikut prosedur yang ditetapkan.'],
    ],
    dates: [
      ['1807', 'Charter of Justice diperkenalkan di Negeri-negeri Selat.'],
      ['31 Ogos 1957', 'Perlembagaan Persekutuan berkuat kuasa seiring kemerdekaan.'],
      ['1963', 'Pindaan berkaitan pembentukan Malaysia.'],
      ['1965', 'Pindaan berkaitan pemisahan Singapura daripada Malaysia.'],
    ],
  },
  'Raja Berperlembagaan dan Demokrasi Berparlimen': {
    notes: [
      'Pemerintahan beraja merupakan warisan kerajaan Melayu yang berkembang menjadi sistem Raja Berperlembagaan.',
      'Yang di-Pertuan Agong menjalankan kuasa mengikut Perlembagaan Persekutuan.',
      'Majlis Raja-Raja mempunyai kedudukan penting dalam institusi Raja Berperlembagaan.',
      'Demokrasi Berparlimen membolehkan rakyat memilih wakil melalui pilihan raya.',
      'Pengasingan kuasa antara badan perundangan, eksekutif dan kehakiman mengukuhkan semak dan imbang.',
    ],
    terms: [
      ['Raja Berperlembagaan', 'Sistem pemerintahan beraja yang kuasa raja ditentukan oleh perlembagaan.'],
      ['Demokrasi Berparlimen', 'Sistem pemerintahan yang rakyat memilih wakil untuk membentuk kerajaan melalui pilihan raya.'],
      ['Majlis Raja-Raja', 'Institusi yang menghimpunkan Raja-raja Melayu dan mempunyai fungsi tertentu dalam Perlembagaan.'],
      ['Parlimen', 'Badan perundangan tertinggi pada peringkat Persekutuan.'],
      ['Pengasingan kuasa', 'Pembahagian kuasa antara badan perundangan, eksekutif dan kehakiman.'],
    ],
    dates: [
      ['18 Mei 2020', 'Istiadat Pembukaan Mesyuarat Pertama Penggal Ketiga Parlimen ke-14.'],
      ['1957', 'Sistem Raja Berperlembagaan dan Demokrasi Berparlimen diperkukuh selepas kemerdekaan.'],
      ['1948', 'Majlis Raja-Raja wujud dalam struktur Persekutuan Tanah Melayu.'],
    ],
  },
  'Sistem Persekutuan': {
    notes: [
      'Persekutuan bermaksud penyatuan beberapa buah negeri di bawah sebuah negara bersekutu.',
      'Sistem Persekutuan mempunyai Kerajaan Persekutuan dan Kerajaan Negeri dengan bidang kuasa masing-masing.',
      'Pembahagian kuasa mengelakkan pertindihan kuasa dan melancarkan pentadbiran.',
      'Kerjasama antara Kerajaan Persekutuan dengan Kerajaan Negeri penting untuk pembangunan negara.',
      'Keluhuran Perlembagaan menjadi asas penyelarasan kuasa dalam sistem Persekutuan.',
    ],
    terms: [
      ['Persekutuan', 'Penyatuan beberapa buah negeri yang membentuk sebuah negara bersekutu.'],
      ['Kerajaan Persekutuan', 'Kerajaan pusat yang mempunyai kuasa terhadap perkara di bawah Senarai Persekutuan.'],
      ['Kerajaan Negeri', 'Kerajaan yang mentadbir negeri mengikut kuasa dalam Senarai Negeri.'],
      ['Konfederasi', 'Gabungan negeri berdaulat dalam ikatan yang longgar.'],
      ['Senarai Bersama', 'Bidang kuasa yang melibatkan tanggungjawab bersama Kerajaan Persekutuan dan Kerajaan Negeri.'],
    ],
    dates: [
      ['1895', 'Pembentukan Konfederasi Negeri Sembilan.'],
      ['1896', 'Pembentukan Negeri-negeri Melayu Bersekutu.'],
      ['1948', 'Pembentukan Persekutuan Tanah Melayu.'],
      ['1963', 'Pembentukan Malaysia memperluas sistem Persekutuan.'],
    ],
  },
  'Pembentukan Malaysia': {
    notes: [
      'Gagasan Malaysia bertujuan menggabungkan Persekutuan Tanah Melayu, Sarawak, Sabah, Singapura dan Brunei.',
      'Pembentukan Malaysia dipengaruhi faktor keselamatan, keseimbangan kaum, kemajuan ekonomi dan mempercepat kemerdekaan wilayah terlibat.',
      'Suruhanjaya Cobbold meninjau pandangan penduduk Sarawak dan Sabah.',
      'Jawatankuasa Antara Kerajaan merangka perkara berkaitan kepentingan Sarawak dan Sabah.',
      'Perjanjian Malaysia 1963 menjadi asas rasmi pembentukan Malaysia.',
    ],
    terms: [
      ['Gagasan Malaysia', 'Cadangan pembentukan sebuah negara baharu melalui penggabungan wilayah tertentu.'],
      ['Suruhanjaya Cobbold', 'Suruhanjaya yang meninjau pandangan penduduk Sarawak dan Sabah tentang pembentukan Malaysia.'],
      ['Jawatankuasa Antara Kerajaan', 'Jawatankuasa yang membincangkan hak dan kepentingan Sarawak serta Sabah dalam Malaysia.'],
      ['Perjanjian Malaysia 1963', 'Perjanjian rasmi yang menjadi asas pembentukan Malaysia.'],
      ['Referendum', 'Pemungutan suara rakyat bagi mendapatkan pendirian tentang sesuatu perkara.'],
    ],
    dates: [
      ['27 Mei 1961', 'Tunku Abdul Rahman mengemukakan gagasan pembentukan Malaysia.'],
      ['1962', 'Suruhanjaya Cobbold menjalankan tinjauan di Sarawak dan Sabah.'],
      ['9 Julai 1963', 'Perjanjian Malaysia ditandatangani.'],
      ['16 September 1963', 'Malaysia dibentuk secara rasmi.'],
    ],
  },
  'Cabaran Selepas Pembentukan Malaysia': {
    notes: [
      'Malaysia menghadapi cabaran pembangunan dan sosioekonomi terutama di Sarawak dan Sabah.',
      'Kedudukan geografi yang luas menyebabkan cabaran perhubungan dan pengangkutan.',
      'Krisis politik di Sarawak memerlukan kebijaksanaan pentadbiran untuk mengekalkan kestabilan.',
      'Perpaduan kaum menjadi cabaran penting dalam masyarakat pelbagai latar belakang.',
      'Ancaman komunis perlu ditangani bagi menjamin keamanan dan keselamatan negara.',
    ],
    terms: [
      ['Sosioekonomi', 'Keadaan sosial dan ekonomi masyarakat.'],
      ['Integrasi nasional', 'Proses merapatkan hubungan rakyat antara negeri dan wilayah.'],
      ['Krisis politik', 'Keadaan ketidakstabilan politik yang boleh menjejaskan pentadbiran.'],
      ['Ancaman komunis', 'Gerakan yang menggugat keselamatan dan kestabilan negara.'],
      ['Pembangunan seimbang', 'Usaha memastikan kemajuan dinikmati oleh semua wilayah dan masyarakat.'],
    ],
    dates: [
      ['1963', 'Malaysia dibentuk dan cabaran dalaman mula ditangani.'],
      ['1966', 'Krisis politik Sarawak berlaku dalam konteks pentadbiran selepas pembentukan Malaysia.'],
      ['1970', 'Usaha pembangunan negara diperkukuh melalui dasar selepas peristiwa perpaduan negara.'],
    ],
  },
  'Membina Kesejahteraan Negara': {
    notes: [
      'Perpaduan kaum dan integrasi nasional menjadi asas kesejahteraan negara.',
      'Dasar Pendidikan Kebangsaan berperanan membina identiti kebangsaan melalui sistem pendidikan.',
      'Bahasa Melayu diperkasakan sebagai bahasa ilmu dan bahasa perpaduan.',
      'Dasar Kebudayaan Kebangsaan membentuk identiti nasional berasaskan budaya tempatan.',
      'Rukun Negara menjadi tonggak kesejahteraan dan panduan hidup rakyat Malaysia.',
    ],
    terms: [
      ['Perpaduan kaum', 'Keadaan rakyat pelbagai etnik hidup aman dan bersatu.'],
      ['Integrasi nasional', 'Proses dinamik merapatkan hubungan masyarakat antara negeri dan wilayah.'],
      ['Dasar Pendidikan Kebangsaan', 'Dasar yang membentuk sistem pendidikan ke arah perpaduan dan identiti kebangsaan.'],
      ['Dasar Kebudayaan Kebangsaan', 'Dasar yang membentuk kebudayaan nasional sebagai identiti negara.'],
      ['Rukun Negara', 'Ideologi kebangsaan yang menjadi panduan perpaduan dan kesejahteraan rakyat.'],
    ],
    dates: [
      ['1970', 'Rukun Negara diisytiharkan sebagai ideologi kebangsaan.'],
      ['31 Ogos 1986', 'Perkhidmatan Feri Malaysia diperkenalkan untuk integrasi penduduk Semenanjung, Sarawak dan Sabah.'],
      ['1989', 'Perkhidmatan Feri Malaysia ditamatkan.'],
    ],
  },
  'Membina Kemakmuran Negara': {
    notes: [
      'Pembangunan ekonomi selepas pembentukan Malaysia bertujuan meningkatkan kesejahteraan rakyat.',
      'Dasar Ekonomi Baru diperkenalkan untuk membasmi kemiskinan dan menyusun semula masyarakat.',
      'DEB dilaksanakan melalui Rancangan Pembangunan Lima Tahun.',
      'Dasar Pembangunan Nasional meneruskan usaha pembangunan selepas DEB.',
      'Dasar ekonomi negara membantu meningkatkan taraf hidup rakyat dan memupuk perpaduan.',
    ],
    terms: [
      ['Dasar Ekonomi Baru', 'Dasar pembangunan ekonomi untuk membasmi kemiskinan dan menyusun semula masyarakat.'],
      ['Membasmi kemiskinan', 'Usaha meningkatkan pendapatan dan peluang pekerjaan rakyat tanpa mengira kaum.'],
      ['Menyusun semula masyarakat', 'Usaha mengurangkan pengenalan kaum mengikut fungsi ekonomi.'],
      ['Dasar Pembangunan Nasional', 'Dasar yang meneruskan matlamat pembangunan selepas DEB.'],
      ['Rancangan Pembangunan Lima Tahun', 'Rancangan pembangunan negara yang dilaksanakan mengikut tempoh lima tahun.'],
    ],
    dates: [
      ['Januari 1970', 'Majlis Perundingan Negara ditubuhkan.'],
      ['1970-1990', 'Tempoh pelaksanaan Dasar Ekonomi Baru.'],
      ['1971-1975', 'Rancangan Malaysia Kedua.'],
      ['1991', 'Dasar Pembangunan Nasional diperkenalkan.'],
    ],
  },
  'Dasar Luar Malaysia': {
    notes: [
      'Dasar luar ialah tindakan kerajaan menjalinkan hubungan dengan negara lain.',
      'Dasar luar Malaysia menjaga kedaulatan, kepentingan ekonomi dan keamanan serantau serta antarabangsa.',
      'Malaysia terlibat aktif dalam PBB, Komanwel, ASEAN, NAM dan OIC.',
      'Hubungan luar Malaysia berakar daripada tradisi hubungan diplomatik dan perdagangan kerajaan Melayu.',
      'Cabaran dasar luar memerlukan kebijaksanaan, sikap terbuka dan hubungan harmoni.',
    ],
    terms: [
      ['Dasar luar', 'Tindakan dan pendirian kerajaan dalam hubungan dengan negara lain.'],
      ['Diplomatik', 'Hubungan rasmi antara kerajaan atau negara.'],
      ['PBB', 'Pertubuhan Bangsa-Bangsa Bersatu yang berperanan mengekalkan keamanan dunia.'],
      ['ASEAN', 'Persatuan Negara-negara Asia Tenggara untuk kerjasama serantau.'],
      ['NAM', 'Pergerakan Negara-negara Tanpa Pihak yang tidak memihak kepada blok kuasa besar.'],
    ],
    dates: [
      ['424 Masihi', 'Kerajaan P’an-p’an menghantar utusan ke China.'],
      ['523 Masihi', 'Langkasuka menghantar utusan ke China.'],
      ['1967', 'ASEAN ditubuhkan.'],
      ['1970', 'Malaysia mula menekankan dasar berkecuali dan berbaik-baik dengan semua negara.'],
    ],
  },
  'Kecemerlangan Malaysia di Persada Dunia': {
    notes: [
      'Malaysia memainkan peranan dalam isu global kontemporari seperti dadah, sempadan, ekonomi, pemerdagangan orang dan penyakit berjangkit.',
      'Pelibatan dalam hubungan ekonomi antarabangsa membantu memajukan perdagangan dan pembangunan negara.',
      'Rakyat Malaysia terlibat dalam isu kemanusiaan dan keamanan melalui bantuan serta kesukarelawanan.',
      'Malaysia menyuarakan kepentingan kelestarian global termasuk alam sekitar dan warisan sejagat.',
      'Wawasan masa hadapan negara menekankan keamanan, kemakmuran dan kerjasama antarabangsa.',
    ],
    terms: [
      ['Isu global kontemporari', 'Isu semasa dunia yang mempengaruhi politik, ekonomi, sosial dan keselamatan negara.'],
      ['Pemerdagangan orang', 'Eksploitasi manusia melalui penipuan, paksaan atau penyalahgunaan kuasa.'],
      ['Kelestarian global', 'Usaha memelihara keseimbangan alam sekitar dan kesejahteraan manusia sejagat.'],
      ['Deklarasi Langkawi', 'Pengisytiharan berkaitan komitmen terhadap alam sekitar dan pembangunan lestari.'],
      ['Warisan manusia sejagat', 'Khazanah yang dianggap milik bersama seluruh manusia dan perlu dipelihara.'],
    ],
    dates: [
      ['1983', 'International Drug Enforcement Conference ditubuhkan; Malaysia menyuarakan perang terhadap dadah dalam forum antarabangsa.'],
      ['1989', 'Deklarasi Langkawi menunjukkan komitmen Malaysia terhadap alam sekitar.'],
      ['1997-1998', 'Kemelesetan ekonomi Asia memberi cabaran kepada Malaysia.'],
    ],
  },
}

const kbatTypes = [
  'Analisis',
  'Situasi sejarah',
  'Analisis gambar',
  'Garis masa interaktif',
  'Debat dan pendapat',
]

const makeKbatAnswer = (chapter, themes, index) => {
  const details = chapterDetails[chapter]
  const study = chapterStudyContent[chapter]
  const theme = themes[index % themes.length]
  const note = study.notes[index % study.notes.length]
  const term = study.terms[index % study.terms.length]
  const date = study.dates[index % study.dates.length]
  const thinking = details.thinking[index % details.thinking.length]
  const value = details.values[index % details.values.length]
  const people = chapterPeople[chapter]?.[index % chapterPeople[chapter].length]

  return [
    `Pendirian: ${theme} penting dalam ${chapter} kerana membantu menjelaskan perkembangan negara secara tersusun dan berasaskan bukti.`,
    `Bukti buku teks: ${note} Istilah berkaitan ialah ${term[0]}, iaitu ${term[1]}`,
    `Kronologi atau contoh: ${date[0]} - ${date[1]}${people ? ` Pihak/tokoh berkaitan: ${people}.` : ''}`,
    `Huraian KBAT: Murid perlu menghubungkan sebab, tindakan dan kesan supaya jawapan tidak sekadar menghafal fakta.`,
    `Nilai dan DSKP: Jawapan yang baik menunjukkan ${thinking.toLowerCase()} serta menonjolkan nilai ${value.toLowerCase()}.`,
    `Kesimpulan: Pengajaran daripada ${chapter} boleh diaplikasikan untuk membina warganegara yang bertanggungjawab, patriotik dan mampu membuat keputusan secara rasional.`,
  ].join(' ')
}

const makeCards = (chapter, themes) => {
  const study = chapterStudyContent[chapter]
  const peopleList = chapterPeople[chapter]
  const definitions = study.terms.map(([term, meaning], index) => ({
    id: `definisi-${chapter}-${index}`,
    type: index === 0 ? 'Definisi' : 'Istilah',
    level: ['mudah', 'sederhana', 'tinggi'][index % 3],
    front: `${index === 0 ? 'Definisi' : 'Maksud istilah'}: ${term}`,
    back: meaning,
  }))

  const dates = study.dates.map(([date, event], index) => ({
    id: `tarikh-${chapter}-${index}`,
    type: 'Tarikh',
    level: ['mudah', 'sederhana', 'tinggi'][index % 3],
    front: `Tarikh penting: ${date}`,
    back: event,
  }))

  const facts = study.notes.slice(0, 5).map((note, index) => ({
    id: `fakta-${chapter}-${index}`,
    type: 'Fakta',
    level: ['mudah', 'sederhana', 'tinggi'][index % 3],
    front: `Isi penting ${index + 1}: ${themes[index % themes.length]}`,
    back: note,
  }))

  const people = Array.from({ length: 5 }, (_, index) => ({
    id: `tokoh-${chapter}-${index}`,
    type: 'Tokoh',
    level: ['mudah', 'sederhana', 'tinggi'][index % 3],
    front: `Kad tokoh ${index + 1}: ${peopleList[index]}`,
    back: `Terangkan peranan ${peopleList[index]} dalam ${chapter}. Jawapan yang baik menyatakan latar, tindakan, kesan kepada negara dan nilai kewarganegaraan yang boleh dicontohi.`,
  }))

  const kbat = Array.from({ length: 10 }, (_, index) => {
    const suggestedAnswer = makeKbatAnswer(chapter, themes, index)
    return {
      id: `kbat-${chapter}-${index}`,
      type: 'KBAT',
      level: ['mudah', 'sederhana', 'tinggi'][index % 3],
      mode: kbatTypes[index % kbatTypes.length],
      front: [
        `Mengapakah ${themes[index % themes.length]} penting dalam memahami ${chapter}?`,
        `Jika anda pemimpin pada zaman ${chapter}, apakah keputusan yang wajar dibuat?`,
        `Analisis visual berkaitan ${themes[index % themes.length]} dan buat inferens sejarah.`,
        `Susun peristiwa utama ${chapter} mengikut urutan sebab, peristiwa dan kesan.`,
        `Setuju atau tidak: ${chapter} masih mempengaruhi kehidupan moden. Berikan hujah.`,
      ][index % kbatTypes.length],
      back: suggestedAnswer,
      suggestedAnswer,
      answerGuide: [
        'Nyatakan pendirian dengan jelas.',
        'Gunakan sekurang-kurangnya satu fakta buku teks.',
        'Huraikan sebab dan kesan.',
        'Kaitkan dengan nilai kewarganegaraan atau pengajaran.',
      ],
      keywords: [...themes.slice(0, 4), ...study.terms.slice(0, 2).map(([term]) => term)],
    }
  })

  return { facts: [...definitions, ...dates, ...facts], people, kbat }
}

const makeQuiz = (chapter) => {
  const details = chapterDetails[chapter]
  const study = chapterStudyContent[chapter]
  const themes = chapterThemes[chapter]
  const terms = study.terms
  const dates = study.dates

  const setA = Array.from({ length: 10 }, (_, index) => {
    const term = terms[index % terms.length]
    const date = dates[index % dates.length]
    const learning = details.learning[index % details.learning.length]
    const note = study.notes[index % study.notes.length]
    const isDateQuestion = index % 3 === 1
    const isTermQuestion = index % 3 === 0

    return {
      id: `quiz-a-${chapter}-${index}`,
      set: 'Set A',
      bloom: index % 2 === 0 ? 'Aras 1: Mengingat' : 'Aras 2: Memahami',
      question: isTermQuestion
        ? `Apakah maksud ${term[0]} dalam topik ${chapter}?`
        : isDateQuestion
          ? `Apakah peristiwa yang berkaitan dengan ${date[0]}?`
          : `Pernyataan manakah paling tepat menerangkan ${learning}?`,
      options: isTermQuestion
        ? [
            term[1],
            `Perkara yang tidak berkaitan dengan ${chapter}.`,
            'Hiasan dalam buku teks tanpa kepentingan sejarah.',
            'Tindakan individu yang tidak memberi kesan kepada negara.',
          ]
        : isDateQuestion
          ? [
              date[1],
              `Permulaan semua peristiwa dalam ${chapter}.`,
              'Tarikh ulang kaji tanpa kaitan dengan fakta sejarah.',
              'Peristiwa kecil yang tidak perlu dihuraikan.',
            ]
          : [
              note,
              'Tidak membantu murid memahami sebab dan akibat.',
              'Hanya berkaitan hafalan tanpa kefahaman.',
              'Tidak mempunyai nilai kewarganegaraan.',
            ],
      answer: 0,
      explanation: `Jawapan tepat kerana fakta ini membantu murid mengingat dan memahami asas ${chapter}.`,
    }
  })

  const setB = Array.from({ length: 10 }, (_, index) => {
    const theme = themes[index % themes.length]
    const value = details.values[index % details.values.length]
    const learning = details.learning[index % details.learning.length]
    const thinking = details.thinking[index % details.thinking.length]

    return {
      id: `quiz-b-${chapter}-${index}`,
      set: 'Set B',
      bloom: index % 2 === 0 ? 'Aras 4: Menganalisis' : 'Aras 5: Menilai',
      question: index % 2 === 0
        ? `Mengapakah ${theme} penting untuk menganalisis ${chapter}?`
        : `Apakah pertimbangan terbaik untuk menilai kepentingan ${learning}?`,
      options: [
        `Menghubungkan bukti, sebab, kesan dan nilai ${value} dalam konteks negara.`,
        'Memilih jawapan berdasarkan pendapat tanpa bukti sejarah.',
        'Mengabaikan kronologi kerana semua peristiwa mempunyai kesan yang sama.',
        'Menilai sesuatu isu hanya melalui satu sudut pandangan.',
      ],
      answer: 0,
      explanation: `Jawapan tepat kerana soalan aras tinggi memerlukan ${thinking.toLowerCase()}, bukti, hujah dan pertimbangan yang seimbang.`,
    }
  })

  return { setA, setB }
}

const makeGallery = (chapter) =>
  (notebookMaterials[chapter]?.images ?? []).map(([title, src], index) => ({
      title,
      img: assetUrl(src),
      caption: `Infografik NotebookLM untuk ${chapter}.`,
      prompt: `Apakah maklumat utama dan inferens sejarah daripada infografik ini? Hubungkan dengan ${chapter}.`,
      source: 'NotebookLM',
      index,
    }))

const forms = formBlueprints.map((form) => ({
  ...form,
  chapters: form.chapters.map((title, index) => {
    const themes = chapterThemes[title]
    return {
      id: `t${form.form}-b${index + 1}`,
      title,
      themes,
      summary: chapterDetails[title].summary,
      learning: chapterDetails[title].learning,
      notes: chapterStudyContent[title].notes,
      terms: chapterStudyContent[title].terms,
      dates: chapterStudyContent[title].dates,
      thinking: chapterDetails[title].thinking,
      values: chapterDetails[title].values,
      timeline: chapterDetails[title].learning,
      mindmap: [...themes, ...chapterDetails[title].values.slice(0, 2)],
      cards: makeCards(title, themes),
      quiz: makeQuiz(title, themes),
      gallery: makeGallery(title),
    }
  }),
}))

const navItems = [
  ['Utama', '#utama'],
  ['Bab', '#tingkatan'],
  ['NotebookLM', '#bahan-notebook'],
  ['Komik Digital', '#komik-digital'],
  ['Kad KBAT', '#kad-kbat'],
  ['Kuiz', '#kuiz'],
  ['Galeri', '#galeri'],
  ['Guru', '#guru'],
]

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const teacherMaterialLinks = (chapter) => {
  const form = forms[0]
  const number = form.chapters.findIndex((item) => item.id === chapter.id) + 1
  const base = `bab-${String(number).padStart(2, '0')}-${slugify(chapter.title)}`
  return [
    ['Lembaran kerja bercetak', `/bahan-guru/${base}-lembaran-kerja.html`],
    ['Rubrik KBAT', `/bahan-guru/${base}-rubrik-kbat.html`],
    ['Aktiviti PdP 60 minit', `/bahan-guru/${base}-aktiviti-pdp.html`],
    ['Set kad visual', `/bahan-guru/${base}-kad-visual.html`],
  ]
}

const normalizeSearchText = (value) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const chapterSearchIndex = (chapter, chapterNumber) => {
  const terms = chapter.terms.flatMap(([term, meaning]) => [term, meaning])
  const dates = chapter.dates.flatMap(([date, event]) => [date, event])
  const people = chapterPeople[chapter.title] ?? []
  return normalizeSearchText(
    [
      `bab ${chapterNumber}`,
      `bab${chapterNumber}`,
      chapter.title,
      chapter.summary,
      ...chapter.themes,
      ...chapter.notes,
      ...terms,
      ...dates,
      ...chapter.learning,
      ...chapter.thinking,
      ...chapter.values,
      ...people,
    ].join(' '),
  )
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

function App() {
  const [activeForm, setActiveForm] = useState(forms[0])
  const [activeChapter, setActiveChapter] = useState(forms[0].chapters[0])
  const [mobilePanel, setMobilePanel] = useState(null)
  const [query, setQuery] = useState('')
  const [dark, setDark] = useLocalStorage('sejarah-dark-mode', true)
  const [progress, setProgress] = useLocalStorage('sejarah-progress', {
    xp: 420,
    level: 5,
    streak: 7,
    mastered: [],
    quizScores: {},
    badges: ['Pemikir Sejarah', 'Penganalisis Kritis'],
  })
  const [musicOn, setMusicOn] = useState(false)
  const [loading, setLoading] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    if (!musicOn) {
      audioRef.current?.close?.()
      audioRef.current = null
      return
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = 220
    gain.gain.value = 0.025
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    oscillator.start()
    audioRef.current = ctx
    return () => ctx.close()
  }, [musicOn])

  const allChapters = useMemo(
    () => forms.flatMap((form) => form.chapters.map((chapter) => ({ ...chapter, form: form.form }))),
    [],
  )

  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    const needle = normalizeSearchText(query)
    const words = needle
      .split(' ')
      .filter((word) => word.length > 2)
    return allChapters
      .map((chapter) => {
        const chapterNumber = forms[0].chapters.findIndex((item) => item.id === chapter.id) + 1
        const indexText = chapterSearchIndex(chapter, chapterNumber)
        const title = normalizeSearchText(chapter.title)
        const titleHit = title.includes(needle) || needle.includes(title) ? 10 : 0
        const chapterHit = indexText.includes(`bab ${chapterNumber}`) && (needle.includes(`bab ${chapterNumber}`) || needle.includes(`bab${chapterNumber}`)) ? 9 : 0
        const exactHit = indexText.includes(needle) ? 6 : 0
        const wordHits = words.filter((word) => indexText.includes(word)).length
        const score = titleHit + chapterHit + exactHit + wordHits
        const matchedTerm = chapter.terms.find(([term, meaning]) => normalizeSearchText(`${term} ${meaning}`).includes(needle))
        const matchedDate = chapter.dates.find(([date, event]) => normalizeSearchText(`${date} ${event}`).includes(needle))
        const matchLabel = matchedTerm
          ? `Istilah: ${matchedTerm[0]}`
          : matchedDate
            ? `Tarikh: ${matchedDate[0]}`
            : chapterHit
              ? `Bab ${chapterNumber}`
              : chapter.themes.find((theme) => normalizeSearchText(theme).includes(needle)) ?? 'Padanan kandungan'
        return { ...chapter, chapterNumber, matchLabel, score }
      })
      .filter((chapter) => chapter.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
  }, [allChapters, query])

  const selectChapter = (form, chapter) => {
    setActiveForm(form)
    setActiveChapter(chapter)
    document.querySelector('#tingkatan')?.scrollIntoView({ behavior: 'smooth' })
  }

  const addXp = (amount, badge) => {
    setProgress((current) => ({
      ...current,
      xp: current.xp + amount,
      level: Math.max(current.level, Math.floor((current.xp + amount) / 180) + 1),
      badges: badge && !current.badges.includes(badge) ? [...current.badges, badge] : current.badges,
    }))
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-950 transition-colors dark:bg-[#07111f] dark:text-white">
      <FloatingParticles />
      <TopNav
        dark={dark}
        setDark={setDark}
        musicOn={musicOn}
        setMusicOn={setMusicOn}
        query={query}
        setQuery={setQuery}
        searchResults={searchResults}
        selectChapter={selectChapter}
      />
      <main>
        <Hero progress={progress} />
        <Stats progress={progress} />
        <section id="tingkatan" className="section-shell">
          <SectionTitle
            eyebrow="Sejarah Tingkatan 5"
            title="Pilih bab berdasarkan buku teks KSSM dan panduan DSKP."
            icon={GraduationCap}
          />
          <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
            <FormAccordion
              activeForm={activeForm}
              activeChapter={activeChapter}
              setActiveForm={setActiveForm}
              selectChapter={selectChapter}
            />
            <ChapterWorkspace
              form={activeForm}
              chapter={activeChapter}
              progress={progress}
              setProgress={setProgress}
              addXp={addXp}
            />
          </div>
        </section>
        <DigitalComicSection key={activeChapter.id} chapters={allChapters} activeChapter={activeChapter} />
        <KbatArena chapter={activeChapter} progress={progress} addXp={addXp} />
        <QuizZone key={activeChapter.id} chapter={activeChapter} progress={progress} setProgress={setProgress} addXp={addXp} />
        <GallerySection chapter={activeChapter} />
        <TeacherPanel chapter={activeChapter} />
        <AppFooter />
        <Chatbot chapters={allChapters} />
        <MobileDock openPanel={setMobilePanel} />
        <MobileFeatureOverlay
          panel={mobilePanel}
          openPanel={setMobilePanel}
          closePanel={() => setMobilePanel(null)}
          activeChapter={activeChapter}
          allChapters={allChapters}
          progress={progress}
          setProgress={setProgress}
          addXp={addXp}
        />
      </main>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#07111f] text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mx-auto mb-6 grid size-20 place-items-center rounded-2xl border border-amber-300/40 bg-white/10 shadow-2xl shadow-amber-400/20 backdrop-blur">
          <History className="size-10 text-amber-300" />
        </div>
        <h1 className="text-3xl font-black tracking-normal">Skor A Sejarah</h1>
        <p className="mt-3 text-sm text-slate-300">Menyediakan ruang pembelajaran interaktif...</p>
        <div className="mx-auto mt-6 h-2 w-64 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-amber-300 to-red-500"
          />
        </div>
      </motion.div>
    </div>
  )
}

function TopNav({ dark, setDark, musicOn, setMusicOn, query, setQuery, searchResults, selectChapter }) {
  return (
    <header className="fixed left-0 right-0 top-2 z-50 px-2 sm:top-3 sm:px-3">
      <div className="mx-auto flex max-w-7xl items-center gap-2 rounded-2xl border border-white/30 bg-white/85 px-2 py-2 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75 sm:gap-3 sm:px-3 sm:py-3">
        <a href="#utama" className="flex items-center gap-2 font-black">
          <span className="grid size-9 place-items-center rounded-xl bg-[#9d1b32] text-amber-200 sm:size-10">
            <Landmark className="size-5" />
          </span>
          <span className="hidden sm:block">Skor A Sejarah</span>
        </a>
        <nav className="hidden flex-1 justify-center gap-1 overflow-x-auto md:flex">
          {navItems.map(([item, href]) => (
            <a key={item} href={href} className="nav-pill shrink-0">
              {item}
            </a>
          ))}
        </nav>
        <div className="relative ml-auto w-full max-w-[13rem] sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-amber-400 dark:border-white/10 dark:bg-white/10"
            placeholder="Cari bab, tokoh, istilah..."
          />
          {searchResults.length > 0 && (
            <div className="absolute right-0 top-12 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
              {searchResults.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    const form = forms.find((item) => item.form === chapter.form)
                    selectChapter(form, form.chapters.find((item) => item.id === chapter.id))
                    setQuery('')
                  }}
                  className="block w-full px-4 py-3 text-left text-sm hover:bg-amber-50 dark:hover:bg-white/10"
                >
                  <span className="font-black">Bab {chapter.chapterNumber}: {chapter.title}</span>
                  <span className="mt-1 block text-xs text-slate-500 dark:text-slate-300">{chapter.matchLabel}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="hidden gap-2 sm:flex">
          <IconButton label="Muzik" active={musicOn} onClick={() => setMusicOn((value) => !value)} icon={Music} />
          <IconButton label="Tema" active={dark} onClick={() => setDark((value) => !value)} icon={dark ? Moon : Sun} />
        </div>
      </div>
    </header>
  )
}

function MobileDock({ openPanel }) {
  const items = [
    { href: '#utama', icon: Landmark, label: 'Utama' },
    { href: '#tingkatan', icon: GraduationCap, label: 'Bab' },
    { panel: 'bahan', icon: BookOpen, label: 'Bahan' },
    { panel: 'komik', icon: BookOpen, label: 'Komik' },
    { panel: 'kbat', icon: Brain, label: 'KBAT' },
    { panel: 'kuiz', icon: ShieldCheck, label: 'Kuiz' },
    { panel: 'galeri', icon: GalleryHorizontalEnd, label: 'Galeri' },
  ]
  return (
    <nav className="fixed bottom-3 left-2 right-2 z-50 flex overflow-x-auto rounded-2xl border border-white/30 bg-white/90 p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 sm:hidden">
      {items.map(({ href, panel, icon: Icon, label }) => (
        <a
          key={href ?? panel}
          href={href ?? '#'}
          onClick={(event) => {
            if (!panel) return
            event.preventDefault()
            openPanel(panel)
          }}
          className="flex min-h-12 min-w-[4.2rem] flex-col items-center justify-center gap-1 rounded-xl text-[0.62rem] font-black text-slate-700 dark:text-slate-100"
        >
          <Icon className="size-4" />
          {label}
        </a>
      ))}
    </nav>
  )
}

function MobileFeatureOverlay({ panel, openPanel, closePanel, activeChapter, allChapters, progress, setProgress, addXp }) {
  const panelInfo = {
    bahan: ['Bahan NotebookLM', BookOpen],
    komik: ['Komik Digital', BookOpen],
    kbat: ['Kad KBAT', Brain],
    kuiz: ['Kuiz', ShieldCheck],
    galeri: ['Galeri', GalleryHorizontalEnd],
  }
  if (!panel) return null
  const [title, Icon] = panelInfo[panel]

  return (
    <div className="fixed inset-0 z-[90] bg-slate-50 text-slate-950 dark:bg-[#07111f] dark:text-white sm:hidden">
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-950/95">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-[#9d1b32] dark:text-amber-300">
              <Icon className="size-4" /> Paparan Telefon
            </p>
            <h2 className="truncate text-xl font-black tracking-normal">{title}</h2>
          </div>
          <button
            type="button"
            onClick={closePanel}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-[#9d1b32] text-white shadow-lg"
            aria-label="Kembali ke aplikasi"
            title="Kembali ke aplikasi"
          >
            <X className="size-6" />
          </button>
        </div>
      </div>
      <div className="h-[calc(100vh-76px)] overflow-y-auto pb-8">
        {panel === 'bahan' && (
          <div className="px-4 pb-8 pt-2">
            <LearningActivities chapter={activeChapter} onOpenInfographic={() => openPanel('galeri')} />
          </div>
        )}
        {panel === 'komik' && (
          <DigitalComicSection
            key={`mobile-${activeChapter.id}`}
            chapters={allChapters}
            activeChapter={activeChapter}
            onExit={closePanel}
          />
        )}
        {panel === 'kbat' && <KbatArena chapter={activeChapter} progress={progress} addXp={addXp} />}
        {panel === 'kuiz' && (
          <QuizZone
            key={`mobile-${activeChapter.id}`}
            chapter={activeChapter}
            progress={progress}
            setProgress={setProgress}
            addXp={addXp}
          />
        )}
        {panel === 'galeri' && <GallerySection chapter={activeChapter} />}
      </div>
    </div>
  )
}

function IconButton({ label, active, onClick, icon: Icon }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`grid size-10 shrink-0 place-items-center rounded-xl border transition ${
        active
          ? 'border-amber-300 bg-amber-300 text-slate-950'
          : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300 dark:border-white/10 dark:bg-white/10 dark:text-white'
      }`}
    >
      <Icon className="size-4" />
    </button>
  )
}

function Hero({ progress }) {
  return (
    <section id="utama" className="relative min-h-[92vh] px-4 pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,.20),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(157,27,50,.22),transparent_38%)]" />
      <div className="section-shell relative grid min-h-[78vh] items-center gap-10 py-10 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-200/20 px-4 py-2 text-sm font-bold text-amber-700 dark:text-amber-200">
            <Sparkles className="size-4" />
            Aplikasi PdP Sejarah Tingkatan 5
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-normal text-[#081a33] dark:text-white sm:text-5xl md:text-7xl">
            Skor A Sejarah
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-semibold text-slate-700 dark:text-slate-200 sm:text-xl">
            Belajar Sejarah Dengan Mudah dan Menyeronokkan
          </p>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Nota ringkas, kad imbas, KBAT, kuiz, galeri visual dan panel guru berdasarkan buku teks KSSM serta panduan DSKP.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#tingkatan" className="primary-btn">
              <Play className="size-4" /> Mula Belajar
            </a>
            <a href="#kad-kbat" className="secondary-btn">
              <Brain className="size-4" /> Cabaran KBAT
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotate: -2, y: 20 }}
          animate={{ opacity: 1, rotate: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-panel relative overflow-hidden p-5"
        >
          <div className="hero-museum">
            <div className="absolute left-6 top-6 rounded-xl bg-[#081a33]/80 px-4 py-3 text-white backdrop-blur">
              <p className="text-xs uppercase tracking-[.18em] text-amber-200">Tahap Murid</p>
              <p className="text-2xl font-black">{progress.level}</p>
            </div>
            <div className="absolute bottom-6 right-6 rounded-xl bg-white/85 px-4 py-3 text-slate-950 shadow-xl">
              <p className="text-xs font-bold uppercase text-[#9d1b32]">Mata XP</p>
              <p className="text-2xl font-black">{progress.xp}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FloatingParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 18 }, (_, index) => (
        <motion.span
          key={index}
          className="absolute size-1 rounded-full bg-amber-300/60"
          style={{ left: `${(index * 17) % 100}%`, top: `${(index * 23) % 100}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 3 + (index % 5), repeat: Infinity, delay: index * 0.2 }}
        />
      ))}
    </div>
  )
}

function Stats({ progress }) {
  const stats = [
    ['10', 'Bab Buku Teks'],
    ['1', 'Tingkatan 5'],
    ['350+', 'Kad & Kuiz'],
    [`${progress.badges.length}`, 'Lencana Murid'],
  ]
  return (
    <section className="section-shell grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(([value, label]) => (
        <div key={label} className="glass-panel p-5">
          <p className="text-3xl font-black text-[#9d1b32] dark:text-amber-300">{value}</p>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">{label}</p>
        </div>
      ))}
    </section>
  )
}

function SectionTitle({ eyebrow, title, icon: Icon }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-[.16em] text-[#9d1b32] dark:text-amber-300">
          <Icon className="size-4" /> {eyebrow}
        </p>
        <h2 className="max-w-3xl text-3xl font-black tracking-normal md:text-4xl">{title}</h2>
      </div>
    </div>
  )
}

function FormAccordion({ activeForm, activeChapter, setActiveForm, selectChapter }) {
  return (
    <div className="space-y-3">
      {forms.map((form) => (
        <div key={form.form} className="glass-panel overflow-hidden">
          <button
            onClick={() => setActiveForm(form)}
            className="flex w-full items-center justify-between gap-3 p-4 text-left"
          >
              <span>
              <span className="block text-lg font-black">Sejarah Tingkatan {form.form}</span>
              <span className="text-sm text-slate-500 dark:text-slate-300">{form.focus}</span>
            </span>
            <ChevronDown className={`size-5 transition ${activeForm.form === form.form ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence initial={false}>
            {activeForm.form === form.form && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 border-t border-slate-200 p-3 dark:border-white/10">
                  {form.chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => selectChapter(form, chapter)}
                      className={`w-full rounded-xl p-3 text-left text-sm transition ${
                        activeChapter.id === chapter.id
                          ? 'bg-[#081a33] text-white shadow-lg shadow-slate-900/20'
                          : 'bg-slate-100 hover:bg-amber-100 dark:bg-white/10 dark:hover:bg-white/15'
                      }`}
                    >
                      <span className="font-black">Bab {form.chapters.findIndex((item) => item.id === chapter.id) + 1}: {chapter.title}</span>
                      <span className="mt-1 block opacity-80">{chapter.themes.slice(0, 3).join(' • ')}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function ChapterWorkspace({ form, chapter, progress, setProgress, addXp }) {
  const [openNote, setOpenNote] = useState(true)
  const [speaking, setSpeaking] = useState(false)

  const speak = () => {
    if (!window.speechSynthesis) return
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(`${chapter.title}. ${chapter.summary}`)
    utterance.lang = 'ms-MY'
    utterance.onend = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="space-y-5">
      <div className="glass-panel p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-bold text-[#9d1b32] dark:text-amber-300">Tingkatan {form.form}</p>
            <h3 className="mt-1 text-2xl font-black tracking-normal sm:text-3xl">{chapter.title}</h3>
            <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{chapter.summary}</p>
            {form.source && <p className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-200">{form.source}</p>}
          </div>
          <button onClick={speak} className="secondary-btn">
            <Volume2 className="size-4" /> {speaking ? 'Henti Audio' : 'Audio Nota'}
          </button>
        </div>
        <LearningActivities chapter={chapter} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="glass-panel p-5">
          <button className="flex w-full items-center justify-between" onClick={() => setOpenNote((value) => !value)}>
            <span className="flex items-center gap-2 text-xl font-black">
              <BookOpen className="size-5 text-[#9d1b32] dark:text-amber-300" /> Nota Ringkas
            </span>
            <ChevronDown className={`size-5 transition ${openNote ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openNote && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {chapter.notes.map((point, index) => (
                    <motion.div
                      key={point}
                      whileHover={{ y: -4 }}
                      className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/10"
                    >
                      <span className="mb-3 grid size-10 place-items-center rounded-xl bg-amber-200 text-[#081a33]">
                        {index + 1}
                      </span>
                      <h4 className="font-black">Isi Penting</h4>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{point}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  <InfoList title="Istilah Penting" items={chapter.terms.map(([term, meaning]) => `${term}: ${meaning}`)} />
                  <InfoList title="Tarikh Penting" items={chapter.dates.map(([date, event]) => `${date}: ${event}`)} />
                  <InfoList title="Kemahiran Pemikiran Sejarah" items={chapter.thinking} />
                  <InfoList title="Elemen Kewarganegaraan dan Nilai Sivik" items={chapter.values} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <ProgressPanel progress={progress} chapter={chapter} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Timeline chapter={chapter} />
        <Flashcards chapter={chapter} progress={progress} setProgress={setProgress} addXp={addXp} />
      </div>
    </div>
  )
}

function InfoList({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/10">
      <h4 className="mb-3 font-black">{title}</h4>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#9d1b32] dark:text-amber-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LearningActivities({ chapter, onOpenInfographic }) {
  const material = notebookMaterials[chapter.title]
  if (!material) return null
  const previewImage = material.images?.[0]

  return (
    <div id="bahan-notebook" className="scroll-mt-28 mt-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 font-black text-[#9d1b32] dark:text-amber-200">
          <Sparkles className="size-4" /> Bahan NotebookLM
        </p>
        <span className="rounded-full bg-amber-200/70 px-3 py-1 text-xs font-black text-[#081a33]">
          Infografik • Nota Padat • Nota Suara
        </span>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <article className="activity-card overflow-hidden">
          {previewImage && (
            <div className="aspect-video overflow-hidden rounded-xl bg-slate-900">
              <img src={assetUrl(previewImage[1])} alt={previewImage[0]} className="h-full w-full object-cover" />
            </div>
          )}
          <div className="mt-4">
            <p className="flex items-center gap-2 font-black">
              <GalleryHorizontalEnd className="size-4 text-[#9d1b32] dark:text-amber-300" /> Infografik
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Teliti bahan visual, kenal pasti fakta utama dan buat inferens sejarah.
            </p>
            {onOpenInfographic ? (
              <button type="button" className="secondary-btn mt-3" onClick={onOpenInfographic}>
                <ImageIcon className="size-4" /> Lihat Infografik
              </button>
            ) : (
              <a className="secondary-btn mt-3" href="#galeri">
                <ImageIcon className="size-4" /> Lihat Infografik
              </a>
            )}
          </div>
        </article>
        <article className="activity-card">
          <p className="flex items-center gap-2 font-black">
            <BookOpen className="size-4 text-[#9d1b32] dark:text-amber-300" /> Nota Padat
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {chapter.notes.slice(0, 3).map((note) => (
              <li key={note} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#9d1b32] dark:text-amber-300" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
          {material.pdf && (
            <a className="secondary-btn mt-4" href={assetUrl(material.pdf)} target="_blank" rel="noreferrer">
              <Download className="size-4" /> Buka Nota PDF
            </a>
          )}
        </article>
        <article className="activity-card">
          <p className="mb-3 flex items-center gap-2 font-black">
            <Volume2 className="size-4 text-[#9d1b32] dark:text-amber-300" /> Nota Suara
          </p>
          <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
            Dengar penerangan ringkas untuk ulang kaji kendiri atau aktiviti stesen PdP.
          </p>
          {material.audio ? (
            <audio className="w-full" controls src={assetUrl(material.audio)}>
              Pelayar anda tidak menyokong pemain audio.
            </audio>
          ) : (
            <p className="rounded-xl bg-slate-100 p-3 text-sm font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
              Nota suara belum disediakan untuk bab ini.
            </p>
          )}
        </article>
      </div>
    </div>
  )
}

function DigitalComicSection({ chapters, activeChapter, onExit }) {
  const initialPage = Math.max(0, chapters.findIndex((chapter) => chapter.id === activeChapter.id))
  const [pageIndex, setPageIndex] = useState(initialPage)
  const [direction, setDirection] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)

  const pages = chapters.map((chapter, index) => ({
    chapter,
    number: index + 1,
    image: assetUrl(`komik-digital/bab-${String(index + 1).padStart(2, '0')}.png`),
  }))
  const currentPage = pages[pageIndex] ?? pages[0]

  const turnTo = (nextIndex, nextDirection) => {
    setDirection(nextDirection)
    setPageIndex((nextIndex + pages.length) % pages.length)
  }

  const goPrevious = () => {
    turnTo(pageIndex - 1, -1)
  }

  const goNext = () => {
    turnTo(pageIndex + 1, 1)
  }

  const handleExit = (event) => {
    if (!onExit) return
    event.preventDefault()
    onExit()
  }

  useEffect(() => {
    if (!fullscreen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [fullscreen])

  const pageImage = (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage.number}
        initial={{ rotateY: direction > 0 ? -72 : 72, opacity: 0.45, scale: 0.98 }}
        animate={{ rotateY: 0, opacity: 1, scale: 1 }}
        exit={{ rotateY: direction > 0 ? 72 : -72, opacity: 0.35, scale: 0.98 }}
        transition={{ duration: 0.42, ease: 'easeInOut' }}
        className="mx-auto rounded-xl bg-white p-2 shadow-2xl shadow-black/30"
        style={{ transformOrigin: direction > 0 ? 'left center' : 'right center', width: `${zoom * 100}%` }}
      >
        <img
          src={currentPage.image}
          alt={`Halaman ${currentPage.number}: ${currentPage.chapter.title}`}
          className="block h-auto w-full rounded-lg"
        />
      </motion.div>
    </AnimatePresence>
  )

  return (
    <section id="komik-digital" className="section-shell scroll-mt-28">
      <SectionTitle
        eyebrow="Komik Digital Murid"
        title="Flipbook Komik Sejarah"
        icon={BookOpen}
      />
      <div className="glass-panel overflow-hidden p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[.16em] text-[#9d1b32] dark:text-amber-300">
              Halaman {currentPage.number} daripada {pages.length}
            </p>
            <h3 className="mt-1 text-2xl font-black tracking-normal">Bab {currentPage.number}: {currentPage.chapter.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="secondary-btn" href="#utama" onClick={handleExit}>
              <X className="size-4" /> Kembali ke Utama
            </a>
            <button type="button" className="secondary-btn" onClick={() => setZoom((value) => Math.max(0.8, value - 0.15))}>
              <ZoomOut className="size-4" /> Kecil
            </button>
            <button type="button" className="secondary-btn" onClick={() => setZoom((value) => Math.min(1.8, value + 0.15))}>
              <ZoomIn className="size-4" /> Besar
            </button>
            <button type="button" className="primary-btn" onClick={() => setFullscreen(true)}>
              <BookOpen className="size-4" /> Buka Skrin Penuh
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-3 dark:border-white/10 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <button type="button" className="secondary-btn" onClick={goPrevious}>
              <ChevronLeft className="size-4" /> Sebelum
            </button>
            <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-black text-[#081a33]">
              Zum {Math.round(zoom * 100)}%
            </span>
            <button type="button" className="secondary-btn" onClick={goNext}>
              Selepas <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="relative max-h-[82vh] min-h-[560px] overflow-auto rounded-xl bg-[linear-gradient(90deg,#111827,#ffffff_8%,#ffffff_92%,#111827)] p-3">
            <div className="pointer-events-none absolute inset-y-3 left-1/2 z-10 w-1 -translate-x-1/2 rounded-full bg-slate-900/15" />
            <div style={{ perspective: '1800px' }}>{pageImage}</div>
          </div>
          <div className="mt-3 flex justify-center gap-1">
            {pages.map((page, index) => (
              <button
                key={page.number}
                type="button"
                aria-label={`Pergi ke halaman ${page.number}`}
                onClick={() => turnTo(index, index > pageIndex ? 1 : -1)}
                className={`h-2.5 rounded-full transition-all ${index === pageIndex ? 'w-8 bg-amber-300' : 'w-2.5 bg-white/35'}`}
              />
            ))}
          </div>
        </div>
      </div>
      {fullscreen && (
        <div className="fixed inset-0 z-[95] flex flex-col bg-slate-950 p-2 sm:p-4">
          <button
            type="button"
            aria-label="Tutup skrin penuh"
            title="Tutup"
            onClick={() => setFullscreen(false)}
            className="fixed right-3 top-3 z-[100] grid size-12 place-items-center rounded-full bg-white text-slate-950 shadow-2xl hover:bg-amber-100 sm:right-5 sm:top-5"
          >
            <X className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Kembali ke aplikasi"
            onClick={() => setFullscreen(false)}
            className="fixed bottom-24 right-4 z-[100] grid size-14 place-items-center rounded-full bg-[#9d1b32] text-white shadow-2xl shadow-red-950/40 sm:hidden"
          >
            <X className="size-7" />
          </button>
          <div className="mb-2 grid gap-2 text-white sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <button
              type="button"
              className="primary-btn justify-center bg-white text-[#081a33]"
              onClick={() => setFullscreen(false)}
            >
              <X className="size-4" /> Kembali ke Aplikasi
            </button>
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[.16em] text-amber-200">
                Halaman {currentPage.number} daripada {pages.length}
              </p>
              <p className="font-black">Bab {currentPage.number}: {currentPage.chapter.title}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="secondary-btn" onClick={goPrevious}>
                <ChevronLeft className="size-4" /> Sebelum
              </button>
              <button type="button" className="secondary-btn" onClick={goNext}>
                Selepas <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto rounded-2xl bg-[linear-gradient(90deg,#111827,#ffffff_8%,#ffffff_92%,#111827)] p-2">
            <div style={{ perspective: '1800px' }}>{pageImage}</div>
          </div>
        </div>
      )}
    </section>
  )
}

function ProgressPanel({ progress, chapter }) {
  const masteredCount = progress.mastered.filter((id) => id.includes(chapter.title)).length
  return (
    <div className="glass-panel p-5">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-black">
        <Trophy className="size-5 text-amber-400" /> Kemajuan Murid
      </h3>
      <div className="space-y-4">
        <ProgressBar label="Mata XP ke tahap seterusnya" value={progress.xp % 180} max={180} />
        <ProgressBar label="Kad dikuasai bab ini" value={masteredCount} max={25} />
        <div className="grid gap-3">
          <MiniStat icon={Award} label="Lencana" value={progress.badges.length} />
        </div>
      </div>
    </div>
  )
}

function ProgressBar({ label, value, max }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-bold">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-[#9d1b32] to-amber-300" style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
      </div>
    </div>
  )
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-slate-100 p-4 dark:bg-white/10">
      <Icon className="mb-2 size-5 text-[#9d1b32] dark:text-amber-300" />
      <p className="text-xs font-bold text-slate-500 dark:text-slate-300">{label}</p>
      <p className="text-lg font-black">{value}</p>
    </div>
  )
}

function Timeline({ chapter }) {
  return (
    <div className="glass-panel p-5">
      <h3 className="mb-5 flex items-center gap-2 text-xl font-black">
        <CalendarDays className="size-5 text-[#9d1b32] dark:text-amber-300" /> Garis Masa Sejarah
      </h3>
      <div className="space-y-4">
        {chapter.timeline.map((item, index) => (
          <div key={item} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="grid size-9 place-items-center rounded-full bg-[#081a33] text-sm font-black text-amber-200">{index + 1}</span>
              {index < chapter.timeline.length - 1 && <span className="h-10 w-px bg-slate-300 dark:bg-white/20" />}
            </div>
            <p className="pt-1 font-semibold">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Flashcards({ chapter, progress, setProgress, addXp }) {
  const cards = [...chapter.cards.facts, ...chapter.cards.people]
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = cards[index % cards.length]
  const mastered = progress.mastered.includes(card.id)

  const markMastered = () => {
    if (!mastered) {
      setProgress((current) => ({ ...current, mastered: [...current.mastered, card.id] }))
      addXp(12, 'Genius Sejarah')
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.75 } })
    }
  }

  return (
    <div className="glass-panel p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-xl font-black">
          <Zap className="size-5 text-amber-400" /> Kad Imbas
        </h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black dark:bg-white/10">{index + 1}/{cards.length}</span>
      </div>
      <button onClick={() => setFlipped((value) => !value)} className={`flash-card ${card.type === 'Tokoh' ? 'gold-card' : card.type === 'Tarikh' ? 'maroon-card' : 'blue-card'}`}>
        <AnimatePresence mode="wait">
          <motion.div key={flipped ? 'back' : 'front'} initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} exit={{ rotateY: -90 }} transition={{ duration: 0.2 }}>
            <p className="mb-3 text-xs font-black uppercase tracking-[.18em]">{card.type} • {card.level}</p>
            <p className="text-xl font-black">{flipped ? card.back : card.front}</p>
          </motion.div>
        </AnimatePresence>
      </button>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="secondary-btn" onClick={() => setIndex((value) => (value + 1) % cards.length)}>
          <RotateCcw className="size-4" /> Seterusnya
        </button>
        <button className="primary-btn" onClick={markMastered}>
          <CheckCircle2 className="size-4" /> {mastered ? 'Sudah Dikuasai' : 'Tandai Dikuasai'}
        </button>
      </div>
    </div>
  )
}

function KbatArena({ chapter, progress, addXp }) {
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const card = chapter.cards.kbat[index % chapter.cards.kbat.length]

  const submit = () => {
    const score = card.keywords.reduce((total, keyword) => total + (answer.toLowerCase().includes(keyword.toLowerCase()) ? 1 : 0), 0)
    setFeedback({
      score,
      text:
        score >= 2
          ? 'Jawapan mantap. Anda mengaitkan kata kunci sejarah dengan hujah yang jelas.'
          : 'Cuba tambah bukti, kesan dan kata kunci khusus daripada nota bab.',
    })
    addXp(score >= 2 ? 20 : 8, score >= 2 ? 'Pakar KBAT' : null)
    if (score >= 2) confetti({ particleCount: 70, spread: 60, origin: { y: 0.72 } })
  }

  return (
    <section id="kad-kbat" className="section-shell">
      <SectionTitle eyebrow="Kad Imbas KBAT" title="Latih murid berfikir seperti ahli sejarah." icon={Brain} />
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="kbat-card p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">{card.mode} • Aras {card.level}</span>
            <span className="rounded-full bg-amber-300 px-4 py-2 text-sm font-black text-slate-950">Cabaran Bermasa 03:00</span>
          </div>
          <h3 className="text-xl font-black tracking-normal sm:text-2xl">{card.front}</h3>
          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            className="mt-5 min-h-36 w-full rounded-2xl border border-white/15 bg-white/10 p-4 text-white outline-none placeholder:text-white/60"
            placeholder="Tulis jawapan KBAT anda di sini..."
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="bg-white px-5 py-3 font-black text-[#9d1b32]" onClick={submit}>
              Hantar Jawapan
            </button>
            <button
              className="border border-white/30 px-5 py-3 font-black text-white"
              onClick={() => {
                setIndex((value) => (value + 1) % chapter.cards.kbat.length)
                setAnswer('')
                setFeedback(null)
              }}
            >
              Kad Seterusnya
            </button>
          </div>
          {feedback && (
            <div className="mt-5 rounded-2xl bg-white/10 p-4">
              <p className="font-black">Maklum Balas Automatik: {feedback.text}</p>
              <div className="mt-3 rounded-2xl bg-white/10 p-4">
                <p className="text-sm font-black text-amber-200">Cadangan jawapan berdasarkan DSKP dan kandungan buku teks</p>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{card.suggestedAnswer}</p>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {card.answerGuide.map((guide) => (
                  <div key={guide} className="rounded-xl bg-white/10 p-3 text-sm font-semibold text-white/85">
                    {guide}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="glass-panel p-5">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-black">
            <Crown className="size-5 text-amber-400" /> Kedudukan KBAT
          </h3>
          {['Alya', 'Irfan', 'Sofia', 'Anda'].map((name, idx) => (
            <div key={name} className="mb-3 flex items-center justify-between rounded-2xl bg-slate-100 p-3 dark:bg-white/10">
              <span className="font-black">{idx + 1}. {name}</span>
              <span className="text-sm font-bold text-[#9d1b32] dark:text-amber-300">{980 - idx * 110} mata</span>
            </div>
          ))}
          <div className="mt-4 rounded-2xl border border-amber-300/40 bg-amber-200/20 p-4">
            <p className="text-sm font-bold">Lencana aktif: {progress.badges.join(', ')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuizZone({ chapter, progress, setProgress, addXp }) {
  const [activeSet, setActiveSet] = useState('setA')
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const quizItems = chapter.quiz[activeSet]
  const activeLabel = activeSet === 'setA' ? 'Set A' : 'Set B'
  const activeDescription =
    activeSet === 'setA'
      ? '10 soalan aras mengingat dan memahami berdasarkan Taksonomi Bloom.'
      : '10 soalan aras menganalisis dan menilai berdasarkan Taksonomi Bloom.'
  const scoreKey = `${chapter.id}-${activeSet}`
  const score = quizItems.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0)

  const submit = () => {
    setSubmitted(true)
    setProgress((current) => ({ ...current, quizScores: { ...current.quizScores, [scoreKey]: score } }))
    addXp(score * (activeSet === 'setA' ? 10 : 14), score >= 8 ? (activeSet === 'setA' ? 'Juara Kuiz' : 'Penganalisis Sejarah') : null)
    if (score >= 8) confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } })
  }

  return (
    <section id="kuiz" className="section-shell">
      <SectionTitle eyebrow="Latihan & Kuiz" title="Markah automatik, cuba semula dan analisis pencapaian." icon={ShieldCheck} />
      <div className="glass-panel p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-black tracking-normal">{chapter.title}</h3>
          <span className="rounded-full bg-[#081a33] px-4 py-2 text-sm font-black text-amber-200">
            Skor terbaik {activeLabel}: {progress.quizScores[scoreKey] ?? '-'} / 10
          </span>
        </div>
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          {[
            ['setA', 'Set A', 'Aras 1 dan 2', 'Mengingat fakta, memahami istilah, tarikh dan isi penting.'],
            ['setB', 'Set B', 'Menganalisis dan Menilai', 'Menguji sebab, kesan, pertimbangan dan hujah sejarah.'],
          ].map(([set, title, level, description]) => (
            <button
              key={set}
              type="button"
              onClick={() => {
                setActiveSet(set)
                setAnswers({})
                setSubmitted(false)
              }}
              className={`rounded-2xl border p-4 text-left ${
                activeSet === set
                  ? 'border-amber-300 bg-[#081a33] text-white shadow-xl shadow-slate-900/20'
                  : 'border-slate-200 bg-white/70 hover:border-amber-300 dark:border-white/10 dark:bg-white/10'
              }`}
            >
              <span className="text-lg font-black">{title}</span>
              <span className="mt-1 block text-sm font-black text-amber-500 dark:text-amber-300">{level}</span>
              <span className="mt-2 block text-sm opacity-80">{description}</span>
            </button>
          ))}
        </div>
        <p className="mb-4 rounded-2xl bg-amber-100 p-4 text-sm font-bold text-[#081a33] dark:bg-amber-300/20 dark:text-amber-100">
          {activeDescription}
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          {quizItems.map((item, index) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/10">
              <span className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-[#9d1b32] dark:bg-white/10 dark:text-amber-300">
                {item.bloom}
              </span>
              <p className="font-black">{item.question}</p>
              <div className="mt-3 space-y-2">
                {item.options.map((option, optionIndex) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-100 p-3 text-sm dark:bg-white/10">
                    <input
                      type="radio"
                      name={item.id}
                      checked={answers[index] === optionIndex}
                      onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {submitted && (
                <p className={`mt-3 text-sm font-bold ${answers[index] === item.answer ? 'text-emerald-600' : 'text-red-500'}`}>
                  {answers[index] === item.answer ? 'Betul. Hebat!' : `Semak semula. ${item.explanation}`}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="primary-btn" onClick={submit}>Semak Markah</button>
          <button className="secondary-btn" onClick={() => { setAnswers({}); setSubmitted(false) }}>Cuba Semula</button>
          {submitted && <p className="self-center font-black">Tahniah! Skor akhir {activeLabel} anda: {score}/10</p>}
        </div>
      </div>
    </section>
  )
}

function GallerySection({ chapter }) {
  const [active, setActive] = useState(null)
  const activeItem = active !== null ? chapter.gallery[active] : null

  useEffect(() => {
    if (active === null) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [active])

  return (
    <section id="galeri" className="section-shell" style={{ zIndex: active !== null ? 80 : 1 }}>
      <SectionTitle eyebrow="Galeri Gambar Pendidikan" title="Visual interaktif untuk analisis sejarah dan jelajah galeri." icon={GalleryHorizontalEnd} />
      <div className="grid gap-4 md:grid-cols-2">
        {chapter.gallery.map((item, index) => (
          <button key={item.title} onClick={() => setActive(index)} className="group min-h-full overflow-hidden rounded-2xl border border-white/20 bg-slate-900 text-left shadow-lg">
            <div className="aspect-video overflow-hidden">
              <img src={item.img} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            </div>
            <div className="p-3 text-white">
              <div className="mb-2 inline-flex rounded-full bg-amber-300 px-2 py-1 text-[0.68rem] font-black text-slate-950">
                {item.source}
              </div>
              <p className="text-sm font-black">{item.title}</p>
              <p className="mt-1 text-xs text-slate-300">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>
      {activeItem && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/85 p-3 sm:p-6" onClick={() => setActive(null)}>
          <div
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white text-slate-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Tutup galeri"
              title="Tutup"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 grid size-12 place-items-center rounded-full bg-white/95 text-slate-950 shadow-xl hover:bg-amber-100"
            >
              <X className="size-6" />
            </button>
            <div className="min-h-0 flex-1 overflow-auto bg-slate-950">
              <img
                src={activeItem.img}
                alt={activeItem.title}
                className="mx-auto block h-auto max-h-none w-full max-w-full object-contain sm:max-h-[76vh] sm:w-auto"
              />
            </div>
            <div className="shrink-0 border-t border-slate-200 bg-white p-4 sm:p-5">
              <div className="pr-14">
                <div className="mb-2 inline-flex rounded-full bg-amber-200 px-3 py-1 text-xs font-black text-[#081a33]">
                  {activeItem.source}
                </div>
                <h3 className="text-xl font-black tracking-normal sm:text-2xl">{activeItem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{activeItem.prompt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function TeacherPanel({ chapter }) {
  const materials = teacherMaterialLinks(chapter)
  const activities = [
    'Jelajah galeri: murid bergerak mengikut stesen visual dan menulis inferens.',
    'Fikir-Pasang-Kongsi: bincang soalan KBAT sebelum membentang hujah.',
    'Kuiz kelas: gunakan 10 soalan automatik sebagai tiket keluar.',
    'Debat mini: setuju atau tidak setuju berdasarkan bukti sejarah.',
  ]
  return (
    <section id="guru" className="section-shell pb-28 sm:pb-20">
      <SectionTitle eyebrow="Panel Guru" title="Idea PdP, bahan bantu mengajar dan aktiviti abad ke-21." icon={UserRound} />
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="glass-panel p-5 lg:col-span-2">
          <h3 className="mb-4 text-2xl font-black tracking-normal">Cadangan aktiviti untuk {chapter.title}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {activities.map((activity) => (
              <div key={activity} className="rounded-2xl bg-slate-100 p-4 dark:bg-white/10">
                <Lightbulb className="mb-3 size-5 text-[#9d1b32] dark:text-amber-300" />
                <p className="font-semibold">{activity}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel p-5">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-black">
            <Download className="size-5 text-[#9d1b32] dark:text-amber-300" /> Bahan Guru
          </h3>
          {materials.map(([item, href]) => (
            <a
              key={item}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mb-3 flex w-full items-center justify-between rounded-2xl bg-slate-100 p-3 text-left font-bold dark:bg-white/10"
            >
              <span>{item}</span>
              <ImageIcon className="size-4" />
            </a>
          ))}
          <div className="mt-4 rounded-2xl border border-amber-300/40 bg-amber-200/20 p-4 text-sm">
            <p className="font-black">Panduan DSKP</p>
            <p className="mt-2">
              Aktiviti bab ini diselaraskan dengan tema Malaysia dan Masa Hadapan melalui kemahiran kronologi, meneroka bukti,
              interpretasi, imaginasi dan rasionalisasi.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AppFooter() {
  return (
    <footer className="section-shell pb-32 pt-4 sm:pb-10">
      <div className="rounded-2xl border border-amber-300/30 bg-[#081a33] px-5 py-6 text-center text-white shadow-xl shadow-slate-900/20">
        <p className="text-sm font-semibold text-amber-200">Dihasilkan oleh:</p>
        <p className="mt-2 text-base font-black sm:text-lg">
          USTP dan SISC+ Sejarah, Sektor Pembelajaran, PPD Kuala Selangor
        </p>
      </div>
    </footer>
  )
}

function Chatbot({ chapters }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [reply, setReply] = useState('Tanya tentang bab, istilah atau cara menjawab KBAT.')

  const normalize = (value) =>
    value
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim()

  const chapterSearchText = (chapter) => {
    const terms = chapter.terms.flatMap(([term, meaning]) => [term, meaning])
    const dates = chapter.dates.flatMap(([date, event]) => [date, event])
    const people = chapterPeople[chapter.title] ?? []
    return normalize(
      [
        chapter.title,
        chapter.summary,
        ...chapter.themes,
        ...chapter.notes,
        ...terms,
        ...dates,
        ...chapter.learning,
        ...chapter.thinking,
        ...chapter.values,
        ...people,
      ].join(' '),
    )
  }

  const findBestChapter = (question) => {
    const words = normalize(question)
      .split(' ')
      .filter((word) => word.length > 3 && !['apakah', 'bagaimana', 'mengapa', 'kenapa', 'jelaskan', 'berikan', 'senaraikan', 'dalam'].includes(word))

    return chapters
      .map((chapter, index) => {
        const text = chapterSearchText(chapter)
        const chapterNumber = index + 1
        const titleHit = text.includes(normalize(chapter.title)) && normalize(question).includes(normalize(chapter.title)) ? 8 : 0
        const numberHit =
          normalize(question).includes(`bab ${chapterNumber}`) || normalize(question).includes(`bab${chapterNumber}`) ? 12 : 0
        const phraseHits = [...chapter.themes, ...chapter.terms.map(([term]) => term), ...chapter.dates.map(([date]) => date)]
          .filter((phrase) => normalize(question).includes(normalize(phrase)))
          .length * 5
        const wordHits = words.filter((word) => text.includes(word)).length
        return { chapter, score: titleHit + numberHit + phraseHits + wordHits }
      })
      .sort((a, b) => b.score - a.score)[0]
  }

  const formatList = (items) => items.slice(0, 5).map((item, index) => `${index + 1}. ${item}`).join(' ')

  const ask = () => {
    const lower = normalize(message)
    if (!lower) {
      setReply('Sila taip soalan ringkas, contohnya “isi penting Bab 5”, “maksud kedaulatan” atau “tarikh MA63”.')
      return
    }

    if (lower.includes('kbat')) {
      setReply('Jawapan KBAT yang kuat ada pendirian, bukti sejarah, kesan dan pengajaran. Gunakan kata hubung seperti kerana, akibatnya dan oleh itu.')
      return
    }

    const match = findBestChapter(lower)
    if (match?.score > 0) {
      const chapter = match.chapter
      const term = chapter.terms.find(([name]) => lower.includes(normalize(name)))
      const date = chapter.dates.find(([dateValue]) => lower.includes(normalize(dateValue)))
      const wantsNotes = ['isi penting', 'poin', 'point', 'key point', 'nota', 'ringkasan'].some((keyword) => lower.includes(keyword))
      const wantsDates = ['tarikh', 'kronologi', 'tahun', 'bila'].some((keyword) => lower.includes(keyword))
      const wantsTerms = ['maksud', 'definisi', 'istilah', 'apa itu'].some((keyword) => lower.includes(keyword))
      const wantsPeople = ['tokoh', 'siapa', 'peranan'].some((keyword) => lower.includes(keyword))

      if (term || wantsTerms) {
        const [name, meaning] = term ?? chapter.terms[0]
        setReply(`${chapter.title}. ${name} bermaksud ${meaning} Kata kunci lain: ${chapter.terms.slice(1, 4).map(([item]) => item).join(', ')}.`)
        return
      }

      if (date || wantsDates) {
        const dateText = date ? `${date[0]}: ${date[1]}` : formatList(chapter.dates.map(([dateValue, event]) => `${dateValue}: ${event}`))
        setReply(`${chapter.title}. Tarikh penting: ${dateText}`)
        return
      }

      if (wantsPeople) {
        setReply(`${chapter.title}. Tokoh atau pihak berkaitan: ${formatList((chapterPeople[chapter.title] ?? []).map((person) => `${person} berperanan dalam perkembangan ${chapter.title}.`))}`)
        return
      }

      if (wantsNotes) {
        setReply(`${chapter.title}. Isi penting: ${formatList(chapter.notes)}`)
        return
      }

      setReply(`${chapter.title}: ${chapter.summary} Isi utama: ${formatList(chapter.notes.slice(0, 3))} Kata kunci: ${chapter.themes.join(', ')}.`)
    } else {
      setReply('Saya belum dapat padankan soalan itu. Cuba gunakan kata kunci seperti kedaulatan, Perlembagaan Persekutuan, YDPA, sistem Persekutuan, MA63, DEB, Rukun Negara, ASEAN atau PBB.')
    }
  }

  return (
    <div className="fixed bottom-24 right-4 z-50 sm:bottom-5 sm:right-5">
      {open && (
        <div className="mb-3 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-white/20 bg-white p-4 shadow-2xl dark:bg-slate-900">
          <p className="mb-3 font-black">Pembantu Sejarah Ringkas</p>
          <div className="mb-3 rounded-xl bg-slate-100 p-3 text-sm dark:bg-white/10">{reply}</div>
          <div className="mb-3 flex flex-wrap gap-2">
            {['Isi penting Bab 5', 'Maksud kedaulatan', 'Tarikh MA63', 'Tokoh Bab 9'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => setMessage(sample)}
                className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-[#081a33] dark:bg-amber-300/20 dark:text-amber-100"
              >
                {sample}
              </button>
            ))}
          </div>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                ask()
              }
            }}
            className="h-24 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none dark:border-white/10 dark:bg-white/10"
            placeholder="Contoh: isi penting Bab 5, maksud kedaulatan, tarikh MA63..."
          />
          <button className="primary-btn mt-3 w-full justify-center" onClick={ask}>Tanya Pembantu</button>
        </div>
      )}
      <button onClick={() => setOpen((value) => !value)} className="grid size-14 place-items-center rounded-2xl bg-[#9d1b32] text-white shadow-xl shadow-red-900/30">
        <MessageCircle />
      </button>
    </div>
  )
}

export default App
