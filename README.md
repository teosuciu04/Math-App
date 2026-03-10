# 🧮 MathApp

A full-stack mobile application built to help pupils master math theory through interactive, dynamic quizzes and detailed progress tracking.

## ✨ Key Features

* **Customizable Quizzes:** Users can dynamically generate tests by selecting specific target chapters. Tests can be configured to contain 10, 20, or 40 questions, or scale up to include the total number of questions for each chapter for a comprehensive exam.
* **Instant Grading & Feedback:** Automatically calculates and displays the user's grade immediately upon completing a test session.
* **Granular Progress Tracking:** A dedicated dashboard allows users to visualize their learning journey. Progress is tracked and segmented by:
    * Overall Grade
    * Core Subjects (Algebra vs. Geometry)
    * Individual Chapter mastery
* **Secure Authentication:** Protected user accounts, login flows, and cloud-synced data storage.

## 🛠️ Tech Stack

* **Frontend:** React Native / Expo
* **Language:** TypeScript
* **Backend & Database:** Supabase (PostgreSQL)
* **Authentication:** Supabase Auth

## 📸 Screenshots
> *Add a screenshot of your quiz screen and your progress tracking dashboard here!*

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
