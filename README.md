# Gawdee Customer Storefront 🌿

Welcome to the **Gawdee Frontend Storefront** — a modern, responsive e-commerce web application built for **Gawdee Pure Organic & Farm Products**.

![Gawdee Banner](public/vite.svg)

---

## 🌟 Key Features

- **Modern Organic Design**: Crafted with a curated color palette (Forest Green `#113826`, Warm Cream `#FAF8F5`, Accent Gold `#D4AF37`) and responsive micro-animations.
- **Product Gallery & Carousel**: Interactive full image showcase supporting up to **12 images** per product with Next/Prev arrow navigation and horizontal thumbnail strip.
- **Variant & Stock Selection**: Live price calculation based on pack sizes (e.g. 500ml vs 1L) and stock availability badges.
- **Unified Cart Management**: Seamless cart drawer supporting both guest users (`localStorage`) and logged-in user cart synchronization (`POST /api/v2/cart`).
- **Streamlined Checkout**: Integrated checkout flow submitting 1:1 order payloads to `POST /api/v2/create-order`.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS 3](https://tailwindcss.com/) + Custom HSL Design System
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **SEO & Meta**: Custom Meta Tag Manager (`react-helmet-async` compatible)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd Gawdee_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (`.env`):
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v2
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## 📁 Directory Structure

```
Gawdee_frontend/
├── public/                # Static assets & images
├── src/
│   ├── assets/            # Global brand styles & logos
│   ├── component/         # Reusable UI components (Header, Footer, ProductCard)
│   ├── helper/            # Axios API wrappers & interceptors
│   ├── pages/             # Page views (Home, ProductDetails, CheckoutPage, etc.)
│   └── utils/             # Cart storage & product data normalizers
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔗 Related Repositories

- **Backend API**: [gawdee-backend](https://github.com/devlamys/gawdee-backend.git)
- **Admin Panel**: [Gawdee_admin](https://github.com/devlamys/Gawdee_admin.git)
