# 📝 MyBlog - A Modern Blogging Platform

A **full-stack blogging platform** built with **Next.js, Strapi, and Redux Toolkit Query**. It provides a seamless experience for users to **create, read, and engage** with blogs. 🖊️✨

## 🚀 Features

### ✅ **Authentication & User Management**
- Secure **JWT-based authentication** using **Strapi**.
- **User registration & login** functionality.
- Protected routes for **authenticated users**.
- Persistent login using **Redux Toolkit Query**.

### 📚 **Blog Management**
- 📝 **Create, Edit & Delete Blogs** *(Authenticated users only)*
- 📖 **Read Blogs** with optimized content rendering.
- 🏷️ **Categorization** of blogs (Tech, Health, Business, etc.).
- 🔗 **SEO-friendly URLs** with automatic slug generation.

### 🌟 **Blog Features**
- 🌠 **Featured Blogs**: Display top blogs with `IsFeatured` flag.
- 🖼️ **Image Upload**: Attach thumbnails using Strapi’s media library.
- 🗂️ **Pagination & Filtering** for enhanced readability.

### ❤️ **User Engagement**
- 👍 **Like System**: Users can like/unlike blog posts.
- 💬 **Comments Section**: Users can add & read comments.
- ⭐ **Featured Comments**: Show only `IsFeatured` comments for better visibility.

### 🎨 **Modern UI with Material UI & Framer Motion**
- Fully **responsive** UI with **Material-UI**.
- **Framer Motion** animations for smooth transitions.
- **Dark & Light Mode** *(Future Update ⏳)*.

### 📊 **Optimized Performance**
- **Next.js Server-Side Rendering (SSR)** for better SEO.
- **useMemo & useCallback** for optimized re-renders.
- **API Caching** with **Redux Toolkit Query**.

### 🔍 **SEO & Social Sharing**
- **Dynamic Metadata** for SEO using `<Head>` (Page Router) or `generateMetadata()` (App Router).
- **OpenGraph & Twitter Meta Tags** for social media previews.

## 🛠️ **Tech Stack**
- **Frontend**: Next.js, React, Redux Toolkit Query, Material UI, Framer Motion.
- **Backend**: Strapi (Headless CMS) with PostgreSQL/MySQL.
- **Authentication**: JWT-based authentication.
- **State Management**: Redux Toolkit Query.
- **Deployment**: Vercel (Frontend), Strapi (Backend on Railway/Render).

## 🚀 **Getting Started**
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-username/myblog.git
cd myblog
