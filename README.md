
# Firebase CRUD Task App

A secure **Task Management Application** built with **Next.js 14 (App Router)**, **TypeScript**, **Firebase Authentication**, and **Firestore**. Users can register, log in, and manage personal tasks with full **CRUD functionality** — all data is private to the logged-in user.

> **Live Demo**: (https://firebase-task-manager-qpd6.vercel.app/login) 

---

## Features

- **Firebase Email/Password Authentication**
- **Protected Routes** – Only logged-in users can access the dashboard
- **Personalized Greeting** – "Hello, user@example.com"
- **Task CRUD Operations**:
  - Create tasks with title, description, and priority
  - View all personal tasks
  - Toggle task completion
  - Edit existing tasks
  - Delete tasks permanently
- **Realtime Firestore Sync**
- **Responsive & Modern UI** with Tailwind CSS and Lucide icons

---

## Technologies Used

| Technology        | Purpose |
|-------------------|--------|
| **Next.js 14**    | App Router, Server Components, SSR |
| **TypeScript**    | Type-safe development |
| **Firebase Auth** | User registration & login |
| **Firestore**     | NoSQL database for tasks |
| **Tailwind CSS**  | Styling |
| **Lucide React**  | Beautiful icons |
| **Vercel**        | Deployment |

---

## Project Structure

```
app/
├── login/page.tsx          → Login page
├── register/page.tsx       → Registration page
├── page.tsx                → Dashboard (protected)
├── components/
│   ├── TaskForm.tsx        → Add/Edit form
│   ├── TaskList.tsx        → Task display & actions
│   └── ProtectedRoute.tsx  → Auth guard
├── lib/
│   ├── firebase.ts         → Firebase config
│   └── taskService.ts      → CRUD helpers
├── types/task.ts           → Task interface
└── context/AuthContext.tsx → Global auth state
```

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/muhetopeace/Firebase-Task-Manager-.git
cd firebase-task-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> Get these values from your [Firebase Console](https://console.firebase.google.com/)

### 4. Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Demo Account (For Grading)

> **Use this account to test the app**

```
Email:    muhetobpeace@gmail.com
Password: test1234
```

> This user has **2 pre-created tasks** in Firestore for demonstration.

---

## Screenshots



## Deployment

Deployed on **Vercel**:
https://firebase-task-manager-qpd6.vercel.app/login

> Automatically deploys on every push to `main`

---

## GitHub Repository

[https://github.com/muhetopeace/Firebase-Task-Manager-](https://github.com/muhetopeace/Firebase-Task-Manager)

> 7 commits included: 
> - 'initial commit'
> - ``
> - `feat: add Firestore CRUD operations`
> - `fix: resolve email case sensitivity in queries`
> - `style: improve UI with Tailwind and Lucide`

---

## Assignment Compliance

| Requirement                        | Done |
|-----------------------------------|--------|
| Firebase Auth (Register/Login)    | Yes |
| Protected Dashboard Route         | Yes |
| CRUD Operations                   | Yes |
| Task Model with `userEmail`       | Yes |
| Personalized Greeting             | Yes |
| Firestore `tasks` Collection      | Yes |
| TypeScript Interface              | Yes |
| 10+ Git Commits                   | 7 commit |
| Deployed on Vercel                | Yes |
| Demo Account with Tasks           | Yes |
| README with All Sections          | Yes |

---

## Author

**Peace B**  
Kigali, Rwanda  
November 11, 2025

