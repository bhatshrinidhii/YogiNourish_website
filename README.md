# 🧘‍♀️ YogiNourish - Personalized Yoga & Nutrition Web App

YogiNourish is a full-stack web application that provides **personalized yoga and nutrition plans** based on user-reported health issues. Designed for **physical, mental, and emotional well-being**, the app offers customized wellness content, expert-reviewed recommendations, and a clean, responsive interface.

## 🚀 Features

- ✅ User Authentication (Login/Sign Up/Forgot Password)
- 🧘 Yoga Pose Guide (Surya Namaskar with images and videos)
- 🥗 Personalized Nutrition Plan (Based on health issue)
- 📋 Health Issue Selector (Dropdown + text input)
- ⭐ Feedback System (Star ratings + comments)
- 🎨 Light/Dark Theme Toggle
- 🔔 Notification Reminder
- 👩‍⚕️ Doctor Recommendation
- 💡 Help & Support Section
- 📱 Responsive UI with multiple pages (Profile, Dashboard, Result)

---

## 📁 Folder Structure

```

project-root/
├── backend/            # Node.js + Express backend (API server)
│   └── index.js
├── login/              # React frontend
│   ├── src/
│   │   ├── App.js
│   │   ├── firebase.js
│   │   ├── Auth.css
│   │   └── images/
│   │       ├── pose1.jpg ...
│   └── public/
└── README.md

````

---

## 🛠️ Tech Stack

| Layer     | Tech                                |
|-----------|-------------------------------------|
| Frontend  | React.js, CSS                       |
| Backend   | Node.js, Express                    |
| Auth      | Firebase Authentication             |
| Database  | Firebase Firestore                  |
| Hosting   | Localhost (for development)         |

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/bhatshrinidhii/YogiNourish_website.git
cd yoginourish
````

---

### 2️⃣ Backend Setup (Node + Express)

```bash
cd backend
npm install
node index.js
```

> This starts the backend server at `http://localhost:5000`

---

### 3️⃣ Frontend Setup (React App)

```bash
cd login
npm install
npm start
```

> This starts the frontend React app at `http://localhost:3000`

---

## ⚙️ Environment Variables

### 🔥 Firebase Config (`src/firebase.js`)

Make sure you have your Firebase config set up properly:

```js
// Example
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourapp",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
```


## 🔐 Firebase Auth Rules (Optional)

If you're using Firebase Firestore:

```json
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /feedback/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🙋‍♂️ Developer Notes

* This app is beginner-friendly and mobile-optimized.
* Ensure the backend and frontend are running in **parallel**.
* Feedback is stored in Firebase's `feedback` collection.
* You can integrate more health conditions by expanding the backend logic.

---

## 🌟 Feedback

If you liked the project, please give it a ⭐ on GitHub!

---

🧘‍♂️ *Stay healthy. Stay nourished. Use YogiNourish.*

---
