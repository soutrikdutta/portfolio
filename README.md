# Minimalist Personal Portfolio — Soutrik Dutta

A dark-mode-first, human-designed personal portfolio crafted with clean typography, selective frosted glass, generous whitespace, and restrained subtle motion.

---

## ✦ Core Design Principles

- **No AI Aesthetic Tropes**: Zero excessive gradients, glowing blobs, sci-fi meshes, animated particles, 3D tilt gimmicks, or oversized display typography.
- **Selective Frosted Glass**: Used purposefully on the floating navigation bar, the contact form, and key interactive accents using `backdrop-filter: blur(...)` and low-contrast borders.
- **Quiet Typography**: Inter typography with medium headings, generous line-height, and editorial hierarchy.
- **Authentic Journey**: Minimal vertical timeline highlighting schooling at St. Stephen's School, Dum Dum (2025) and B.Tech CSE (AI/ML) at Techno India University (2026–2029).
- **Subtle Motion**: Staggered name entrance, smooth scroll indicator, and project hover micro-interactions respecting `prefers-reduced-motion`.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📝 Customization

All personal information, social links, journey milestones, projects, skills, and experience placeholders are centralized in:

📂 [`src/portfolio.config.ts`](./src/portfolio.config.ts)

Simply edit this single file to update:
- Your name, headline, and bio
- Journey items and dates
- Selected projects and links
- Skills categories
- Upcoming experience blocks
- Email and phone dialer link (`tel:`)

---

## 📬 Contact Form Configuration

The contact form is pre-configured to support free email dispatch without exposing secrets in your frontend:
1. Get a free access key at [web3forms.com](https://web3forms.com).
2. Create a `.env` file in the project root:
   ```env
   VITE_WEB3FORMS_KEY=your_access_key_here
   ```
Messages will be delivered straight to your inbox with live validation and clean success/error feedback.
