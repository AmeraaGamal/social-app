# Social App 🚀

A modern, responsive Social Media Application built with **React.js**, **NextUI**, and **TanStack Query**. This project demonstrates advanced frontend techniques including real-time data fetching, image uploads, and seamless user experiences.

## ✨ Features

- **User Authentication**: Secure Login and Registration using JWT.
- **Dynamic Feed**: Real-time post updates with descending order (newest first).
- **Post Creation**: 
    - Support for text and image uploads.
    - Live image preview before posting.
    - Smart validation (prevents empty posts).
    - Image-only posts support (handled via invisible-space workaround for API compatibility).
- **Interactions**:
    - Detailed post view with comments.
    - Ability to add comments to any post.
- **Modern UI/UX**:
    - Built with **NextUI** components for a premium feel.
    - Fully responsive design using **Tailwind CSS**.
    - Loading states and skeletons for a smooth feel.
- **State Management**: Optimized data fetching and caching using **TanStack Query (React Query)**.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite
- **UI Framework**: NextUI, Tailwind CSS
- **Data Fetching**: Axios, TanStack Query (v5)
- **Forms & Validation**: React Hook Form, Zod
- **Icons**: React Icons, FontAwesome

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/AmeraaGamal/social-app.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## 🌐 API Reference

The app interacts with the **Route Academy Social API**:
- **Base URL**: `https://route-posts.routemisr.com`
- **Auth**: JWT via `Authorization: Bearer <token>`

---
Built with by [Amira Gamal](https://github.com/AmeraaGamal)
