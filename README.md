# BRAINZAP

![BrainZap Banner](./public/quiz-result.png)

**BRAINZAP** is an interactive, AI-powered quiz platform designed to supercharge your learning experience. Whether you're brushing up on programming skills or diving into something new, BRAINZAP adapts to your level and helps you grow — one question at a time.

---

## Features

- **AI-Generated Quizzes**: Personalized quizzes based on your chosen language and skill level.
- **Personalized Quiz Generation**: Choose your preferred programming language, difficulty level, and number of questions.
- **Progress Tracking**: Monitor your performance and improvements over time.
- **Streak System**: Stay motivated by maintaining your daily quiz streaks.
- **Quiz History**: Access and review your previously taken quizzes.
- **Smart Feedback**: Receive AI-generated feedback after completing quizzes.
- **Subscription System**: Unlock premium features through Stripe-powered subscriptions.
- **Premium Blogging**: Premium users can post blogs and share insights with the community.
- **Blog Interactions**: All users can read and like blog posts.
- **Responsive Design**: Seamless experience across desktop and mobile devices.
- **Leaderboard System**: Compete with others through global and category-specific leaderboards.
- **Social Media Sharing**: Share quiz scores and achievements directly to social platforms.
- **Printable Answer Sheets**: Print completed quiz answer sheets for offline review or documentation.
- **Achievements & Badges**: Unlock and collect achievements based on quiz performance and streaks.
- **Enhanced Quiz History**: View detailed stats and review any past quiz attempts.
- **Admin Dashboard**:
  - View total users, total revenue, and total feedback.
  - Visual analytics via graph charts.
- **Feedback Management**: Admins can view, mark as read, or delete user feedback submissions.
- **User Management (Admin Only)**:
  - Promote users to admin role.
  - Temporarily lock users (e.g., for 1 hour).
  - Permanently delete user accounts.

---

## Tech Stack

### Frontend

- **React.js** – Modern JavaScript library for building fast and interactive UIs
- **React Router DOM** – Client-side routing for seamless navigation
- **Tailwind CSS** & **tailwindcss-animate** – Utility-first CSS framework with animation support
- **Shadcn UI**, **Radix UI**, **DaisyUI** – Accessible, customizable, and themeable UI component libraries
- **Framer Motion** & **Motion One** – High-performance animation libraries
- **Lucide React Icons**, **React Icons**, **Lottie React** – Scalable icons and animation support
- **React Fast Marquee** – Smooth, customizable text animations
- **React Toastify**, **SweetAlert2**, **React Hot Toast** – User-friendly toast and alert notifications
- **Tiptap Editor** – Rich-text editor with support for images, links, code blocks, placeholders, and text alignment
- **React Helmet** & **React Helmet Async** – Manage document head for SEO optimization
- **Axios** – Promise-based HTTP client for browser and Node.js
- **Confetti & Star Ratings** – For gamified interactions and achievements
- **HTML2Canvas** & **jsPDF** – For exporting printable quiz answer sheets
- **Recharts** – For rendering responsive and customizable charts (used in dashboards)
- **Firebase** – Used for authentication and real-time data handling (if applicable)

### Backend

- **Node.js** – JavaScript runtime for server-side logic
- **Express.js** – Minimal and fast web application framework
- **GraphQL** – Flexible query language for building APIs
- **MongoDB** – Scalable and flexible NoSQL database
- **React Query** – For server state management with GraphQL and REST APIs

### Authentication & Payments

- **Firebase** – Authentication, hosting, and real-time data
- **Stripe.js** & **React Stripe.js** – Seamless and secure payment integration

### Utilities & Dev Tools

- **Axios** – Promise-based HTTP client for API communication
- **Date-fns** – Modern date utility library
- **Class Variance Authority (CVA)** & **clsx** – Class merging and conditional styling
- **Tailwind Merge** – Prevent class conflicts when combining Tailwind classes

### Development & Tooling

- **Vite** – Lightning-fast frontend build tool
- **ESLint** – Code linting to ensure consistent style and catch errors early
- **DaisyUI** – Tailwind CSS component library for rapid prototyping

---

## 🔍 How It Works

1. **Login to Your Account**: Log in and start taking quizzes. To unlock all premium features, purchase a subscription for full access.
2. **Personalized Quiz Generation**: Choose your preferred programming language, difficulty level, and number of questions.
3. **Take the Quiz**: Instantly receive an AI-generated quiz tailored to your inputs.
4. **Get Smart Feedback**: Review your answers with instant AI-generated feedback for each question.
5. **Track Daily Progress**: Build a streak by taking at least one quiz every day.

---

## Live Demo

Explore the live version of BRAINZAP here: [BRAINZAP Live](https://brain-zap-99226.web.app/)

---

Made by Team **CodeXplorers**
