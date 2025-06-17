
# 🏡 REKALAND - Platform Properti Modern Indonesia

<div align="center">
  <img src="public/lovable-uploads/rekaland-logo-full.png" alt="Rekaland Logo" width="300"/>
  
  [![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-ff69b4.svg)](https://lovable.dev)
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue.svg)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Backend-green.svg)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Styling-38B2AC.svg)](https://tailwindcss.com/)
</div>

## 📋 Deskripsi Project

**REKALAND** adalah platform properti modern yang dirancang khusus untuk memenuhi kebutuhan properti masyarakat Indonesia. Platform ini menyediakan solusi lengkap untuk pencarian, pengelolaan, dan transaksi properti dengan teknologi terdepan.

### 🎯 Visi & Misi
- **Visi**: Menjadi platform properti terdepan yang memberikan solusi hunian berkualitas untuk seluruh masyarakat Indonesia
- **Misi**: Menyediakan properti berkualitas dengan harga kompetitif dan lokasi strategis melalui teknologi digital yang mudah digunakan

## ✨ Fitur Utama

### 🏠 Untuk Pengguna Umum
- **Pencarian Properti**: Filter berdasarkan lokasi, harga, dan tipe properti
- **Katalog Lengkap**: Tampilan detail properti dengan gambar dan spesifikasi
- **Kategori Properti**:
  - 📦 Kavling Kosongan
  - 🏗️ Kavling Bangunan  
  - 🏡 Kavling Siap Huni
- **Sistem Pembayaran Fleksibel**: Cash dan cicilan/kredit
- **Maps Integration**: Lokasi properti terintegrasi dengan peta
- **Authentication**: Login/Register dengan email atau Google

### 👨‍💼 Untuk Pengelola Properti
- **Dashboard Admin**: Panel lengkap untuk mengelola properti
- **Upload Properti**: Form lengkap dengan upload gambar
- **Manajemen Konten**: Editor konten dinamis
- **Verifikasi Status**: Sistem approval untuk pengelola baru
- **Analytics**: Monitoring performa dan statistik

### 🛠️ Untuk Super Admin
- **User Management**: Kelola pengguna dan pengelola properti
- **Content Management**: Editor halaman dan konten website
- **System Settings**: Konfigurasi Supabase dan pengaturan sistem
- **Real-time Sync**: Sinkronisasi data real-time
- **Publication Panel**: Manajemen deployment dan koneksi database

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** - Library JavaScript untuk UI
- **TypeScript** - Type safety dan developer experience
- **Vite** - Build tool dan development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Component library modern
- **Framer Motion** - Animasi dan transisi
- **React Router** - Navigation dan routing
- **React Hook Form + Zod** - Form handling dan validasi

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL Database
  - Authentication & Authorization
  - Real-time subscriptions
  - File Storage
  - Row Level Security (RLS)

### Tools & Libraries
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **TanStack Query** - Data fetching dan caching
- **React Google reCAPTCHA** - Security
- **Date-fns** - Date manipulation

## 📁 Struktur Project

```
src/
├── components/           # Komponen reusable
│   ├── admin/           # Komponen dashboard admin
│   ├── layout/          # Layout dan navigation
│   ├── products/        # Komponen properti
│   ├── ui/              # Shadcn/UI components
│   └── ...
├── pages/               # Halaman aplikasi
├── hooks/               # Custom React hooks
├── integrations/        # Integrasi external services
│   └── supabase/        # Konfigurasi Supabase
├── types/               # TypeScript definitions
├── lib/                 # Utility functions
└── layouts/             # Layout templates
```

## 🛠️ Setup Development

### Prerequisites
- Node.js >= 18
- npm atau yarn
- Akun Supabase

### Installation

1. **Clone repository**
```bash
git clone https://github.com/username/rekaland.git
cd rekaland
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
# Buat file .env.local
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Setup Supabase Database**
```bash
# Jalankan SQL migrations di Supabase SQL Editor
# File: src/integrations/supabase/enableRealtime.sql
```

5. **Run development server**
```bash
npm run dev
```

6. **Open browser**
```
http://localhost:5173
```

## 🗄️ Database Schema

### Tabel Utama
- **properties** - Data properti
- **property_managers** - Pengelola properti
- **profiles** - Profil pengguna
- **user_roles** - Sistem role pengguna
- **contents** - Konten dinamis
- **testimonials** - Testimoni pengguna

### Fitur Database
- Row Level Security (RLS) untuk keamanan data
- Real-time subscriptions untuk update langsung
- File storage untuk gambar properti
- Multi-role authentication system

## 👥 User Roles

### 🌟 Super Admin
- Email: `rekaland.idn@gmail.com`
- Full access ke semua fitur
- Mengelola pengguna dan sistem

### 👨‍💼 Property Manager
- Pendaftaran melalui `/admin-register`
- Mengelola properti setelah approval
- Dashboard khusus pengelola

### 👤 Regular User
- Browsing dan pencarian properti
- Menyimpan properti favorit
- Kontak untuk inquiry

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deploy ke Platform
Platform ini dapat di-deploy ke:
- **Vercel** (Recommended)
- **Netlify**
- **Railway**
- **Render**

### Environment Variables Production
```bash
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 📱 Responsive Design

Platform ini fully responsive dengan breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔒 Security Features

- **Row Level Security (RLS)** pada semua tabel sensitif
- **Authentication** dengan email/password dan Google OAuth
- **Authorization** berbasis role untuk akses fitur
- **Input validation** dengan Zod schema
- **XSS Protection** dan sanitization

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📞 Contact & Support

- **Website**: [rekaland.com](https://rekaland.com)
- **Email**: rekaland.idn@gmail.com
- **Developer**: [GitHub Profile](https://github.com/username)

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Lovable](https://lovable.dev) - AI-powered development platform
- [Supabase](https://supabase.com) - Backend infrastructure
- [Shadcn/UI](https://ui.shadcn.com) - Component library
- [Tailwind CSS](https://tailwindcss.com) - CSS framework

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk kemajuan industri properti Indonesia</p>
  <p>© 2024 REKALAND. All rights reserved.</p>
</div>
