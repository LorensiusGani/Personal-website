# 🌐 Lorensius Gani — Personal Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat&logo=react)](https://react.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![GraphQL](https://img.shields.io/badge/GitHub-GraphQL_API-e10098?style=flat&logo=graphql)](https://docs.github.com/en/graphql)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

A modern, high-performance personal developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, featuring an authentic real-time **GitHub Activity & Contributions Heatmap** powered by the **GitHub GraphQL API**.

---

## ✨ Features

- 📊 **Official GitHub-Style Contribution Heatmap**:
  - Full calendar year view (**Jan – Dec**) with 52/53-week grid and official GitHub color intensity scale.
  - Interactive hover tooltips showing daily commit count and date.
  - **Multi-Year Switcher (`2026`, `2025`, `2024`, `2023`)** with instant zero-latency client caching.
- 🕒 **Contribution Activity Timeline**:
  - Monthly activity groupings (*e.g., September 2026, August 2026*).
  - Connected vertical timeline tree with Git commit (`GoGitCommit`) and repository (`GoRepo`) nodes.
  - Visual **commit proportion progress bars** for each active repository.
  - Expandable *"Show more activity"* / *"Show less activity"* toggle.
- 💼 **Featured Repositories**:
  - Curated project showcases with live demo preview links (🌐), direct GitHub links (↗), repository sizes, and primary language indicators.
  - Smart fallback descriptions ensuring informative project context (*no "No description provided"*).
- 🌓 **Dual-Theme Support (Dark / Light Mode)**:
  - Seamless theme toggling powered by `next-themes` and Tailwind v4 CSS variables.
  - Smooth icon rotations, transition effects, and zero-hydration mismatch.
- 📱 **Mobile & Tablet Optimized Layout**:
  - Mobile & Tablet (`< lg`): Touch-friendly horizontal Year selector tab bar at the top.
  - Desktop (`≥ lg`): GitHub profile-style vertical Year sidebar on the right.
  - Horizontally scrollable heatmap with custom scrollbar and touch gestures.

---

## 🔄 Alur Pengambilan Data GitHub (Data Fetching Flow)

Sistem menggunakan arsitektur hybrid **Server-Side GraphQL Query** dengan **Client-Side In-Memory Cache** untuk performa instan dan hemat kuota API.

```
[ User Klik Tahun / Buka Web ]
           │
           ▼
[ Client (GithubActivity.tsx) ] ── (Cek yearCache di Browser Memory)
           │
     (Jika belum ada di cache)
           │
           ▼
[ Next.js API Route (app/api/github/route.ts) ]
           │
     (Baca GITHUB_TOKEN & GITHUB_USERNAME dari .env)
     (Hitung rentang tanggal: from YYYY-01-01 s/d to YYYY-12-31)
           │
           ▼
[ GitHub GraphQL API (https://api.github.com/graphql) ]
           │
     (Query: contributionCalendar, commitContributionsByRepository, repositoryContributions)
           │
           ▼
[ Server Data Enrichment & Formatting ]
     - Kelompokkan riwayat commit per bulan
     - Hitung persentase bar commit: (Commit Repo / Total Commit) * 100%
     - Smart description enrichment untuk repo tanpa deskripsi
     - Fallback generator jika API offline / rate-limited
           │
           ▼
[ Return JSON Response & Simpan ke yearCache ]
           │
           ▼
[ Render Heatmap, Timeline, & Featured Repositories ]
```

### 1. Data Contributions (Kalender Kotak Hijau)
* **Query Target:** `contributionsCollection(from: $from, to: $to) { contributionCalendar }`
* **Data yang Diambil:**
  * `totalContributions`: Jumlah total kontribusi dalam tahun tersebut.
  * `weeks` $\rightarrow$ `contributionDays`: Array hari yang berisi `date`, `contributionCount`, `color` (`#0e4429`, `#006d32`, `#26a641`, `#39d353`), dan `weekday`.

### 2. Data Activity (Timeline Commit & Repositori)
* **Query Target:** 
  * `commitContributionsByRepository(maxRepositories: 10)`: Menghasilkan nama repo dan jumlah commit (`contributions.totalCount`).
  * `repositoryContributions(first: 10)`: Menghasilkan repositori baru yang dibuat beserta tanggal pembuatannya (`occurredAt`).
* **Perhitungan Bar Hijau:**
  $$\text{Persentase Bar} = \left(\frac{\text{Jumlah Commit di Repo ini}}{\text{Total Commit Semua Repo di Tahun Tersebut}}\right) \times 100\%$$

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons** | [React Icons (`react-icons/fa`, `react-icons/go`)](https://react-icons.github.io/react-icons/) |
| **Theming** | [`next-themes`](https://github.com/pacocoursey/next-themes) |
| **API** | [GitHub GraphQL API v4](https://docs.github.com/en/graphql) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/LorensiusGani/Personal-website.git
cd Personal-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Setup
Buat file `.env` di direktori root project:

```env
# GitHub Personal Access Token (Classic atau Fine-grained dengan scope: read:user, repo)
GITHUB_TOKEN=ghp_your_github_token_here

# GitHub Username
GITHUB_USERNAME=LorensiusGani
```

> **Cara membuat GitHub Token:**
> 1. Buka GitHub $\rightarrow$ **Settings** $\rightarrow$ **Developer Settings** $\rightarrow$ **Personal access tokens** $\rightarrow$ **Tokens (classic)**.
> 2. Klik **Generate new token (classic)**, beri nama (misal: `Portfolio Token`), dan centang scope `repo` & `read:user`.
> 3. Salin token (`ghp_...`) dan masukkan ke `.env`.

### 4. Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

### 5. Build untuk Produksi
```bash
npm run build
npm start
```

---

## 📁 Struktur Direktori

```
personal-website/
├── app/
│   ├── api/
│   │   └── github/
│   │       └── route.ts          # Server-side GitHub GraphQL API Handler
│   ├── Components/
│   │   ├── Navbar.tsx            # Navigation header & Theme toggle
│   │   ├── Hero.tsx              # Hero introduction section
│   │   ├── About.tsx             # About me section
│   │   ├── Portfolio.tsx         # Project showcase section
│   │   ├── GithubActivity.tsx    # GitHub Activity wrapper & state manager
│   │   ├── ContributionGraph.tsx # 52-week calendar & activity timeline
│   │   ├── PinnedRepos.tsx       # Featured 2-column repository cards
│   │   ├── Skills.tsx            # Technical skills & tools
│   │   ├── Footer.tsx            # Quick links (3-2 grid) & copyright
│   │   └── ThemeToggle.tsx       # Sun/Moon dark mode toggle button
│   ├── globals.css               # Tailwind v4 theme variables & custom scrollbar
│   ├── layout.tsx                # Root layout with ThemeProvider wrapper
│   ├── providers.tsx             # Client next-themes Provider wrapper
│   ├── loading.tsx               # Route loading pulse screen
│   └── page.tsx                  # Main portfolio homepage
├── public/                       # Static images & assets
├── .env                          # Environment variables (GITHUB_TOKEN, GITHUB_USERNAME)
├── package.json
└── README.md
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Designed & Developed with ❤️ by **[Lorensius Gani](https://github.com/LorensiusGani)**.

