
# 📁 DocuVault – Document Management System

DocuVault is a modern document management system built using **Vue 3**, **Vuetify 3**, **Pinia**, and **Vite**. It supports secure document uploads, filtering, previews (PDF/Image), tagging, and downloading—all within a sleek and mobile-friendly UI.

---

## 🚀 Tech Stack

| Tech            | Description                             |
|-----------------|-----------------------------------------|
| Vue 3           | Frontend Framework                      |
| Vite            | Lightning-fast dev server & bundler     |
| Vuetify 3       | UI Component Library (Material Design)  |
| Pinia           | State Management                        |
| Axios           | HTTP Client                             |
| Vue Router      | Client-side Routing                     |
| JWT Decode      | Token decoding for auth/refresh flows   |
| Moment.js       | Date/time handling                      |

---

## 📂 Project Folder Structure

```
src/
├── assets/                  # Static assets (images, fonts)
├── components/              # Reusable UI components
│   └── common/              # Global dialogs/snackbars etc.
├── constants/               # Static constants (messages, etc.)
├── layouts/                 # Layouts (AuthLayout, DefaultLayout)
├── pages/                   # Top-level route views
│   ├── LoginView.vue
│   ├── DashboardView.vue
│   └── ...
├── plugins/                 # Vuetify, Axios setup
├── router/                  # Vue Router setup
├── stores/                  # Pinia stores (snackbar, auth, preview)
├── utils/                   # Utility functions (rules, helpers)
├── App.vue
└── main.js
```

---

## 📦 Key Packages

| Package                | Usage                                        |
|------------------------|----------------------------------------------|
| `vue`                  | Core framework                               |
| `vuetify`              | Material Design UI                           |
| `pinia`                | Store management                             |
| `vue-router`           | Routing                                      |
| `axios`                | HTTP client with interceptors                |
| `jwt-decode`           | Decode JWT tokens                            |
| `moment`               | Handle date comparisons                      |
| `@mdi/font`            | Material Design Icons                        |
| `vite-plugin-vue-devtools` | Optional: Vue DevTools in Vite dev mode  |

---

## ⚙️ Project Setup

### 1. Clone & Install

```bash
git clone https://github.com/your-username/docuvault.git
cd docuvault
npm install
```

### 2. Run Dev Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

---

## 🧩 Features

### ✅ Auth
- Login with mobile number + password
- JWT-based auth with automatic refresh
- Route-based layout switching (Auth vs Default)

### ✅ Dashboard
- Smart file search: by category, tags, or date range
- Live filtering and listing
- File previews: PDFs and images inline
- Download individual files or as ZIP
- Global Snackbar for feedback

### ✅ File Upload
- Upload form with:
  - Type → Dynamic category dropdown
  - Tagging with chips/autocomplete
  - File selection (PDF/Image only)
  - Remarks and date picker
- Opens from FAB button using component `ref`

---

## 📌 Global Features

- `rules.js` → Centralized form validations
- `messages.js` → Centralized app messages
- `snackBarStore` → Global toast system via `$showToast`
- `axios.js` → Global Axios config with interceptors, refresh token handling

---

## 🧠 Author

**Tarun Rao**  
[LinkedIn](https://linkedin.com/in/l-tarun-rao) · [Email](mailto:l.tarun.rao1@gmail.com)

---

## 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Vuetify, LLC
