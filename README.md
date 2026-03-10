# 🧮 MathApp

A full-stack mobile application built to help pupils master math theory through interactive, dynamic quizzes and detailed progress tracking.

## ✨ Key Features

* **Customizable Quizzes:** Build targeted math theory tests by selecting specific chapters. Choose lengths of 10, 20, or 40 questions, or tackle a comprehensive review using every question in a chapter.
* **Performance Tracking:** Monitor your mastery with real-time progress updates for your Overall Grade as well as specific subjects (Algebra & Geometry).
* **Chapter-Specific Progress:** Track your completion and success rates within each individual chapter to identify specific areas for improvement.
* **Instant Grading:** Get immediate feedback and score calculations the moment you finish a test session.
* **Secure Authentication:** Safe user accounts, logins, and cloud-synced data powered by Supabase.

## 🛠️ Tech Stack

* **Frontend:** React Native / Expo
* **Language:** TypeScript
* **Backend & Database:** Supabase (PostgreSQL)
* **Authentication:** Supabase Auth

## 🚀 Getting Started

To run this project locally, you will need to configure your own Supabase environment variables.

### Prerequisites
* Node.js installed
* Expo CLI installed
* A Supabase account and project

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/YourUsername/MathApp.git](https://github.com/YourUsername/MathApp.git)
    ```
2.  Navigate to the project directory and install dependencies:
    ```bash
    cd MathApp
    npm install
    ```
3.  Create a `.env` file in the root directory and add your Supabase credentials:
    ```text
    EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
    EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
4.  Start the Expo development server:
    ```bash
    npx expo start
    ```
