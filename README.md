# ⌚ Orbis Mods – Custom Watch E-Commerce Web App

A full-stack e-commerce web application for Orbis Mods, a fictional watch modification brand, where users can browse Seiko mod parts, add them to a cart, and securely place orders using Stripe. Built with **React**, **Firebase**, and **Stripe**.

---

## 🚀 Features

- 🔐 **User Authentication** (Email/Password + Google login via Firebase Auth)
- 🛍️ **Products Page** — Display watch mod components fetched from Firestore
- 🛒 **Shopping Cart** — Add/remove items, quantity adjustment, and cart summary
- 💳 **Checkout & Payments** — Stripe integration for secure payments
- 📦 **Order History** — View all past purchases (user-specific)
- 📬 **User Profile** — Store shipping info (name, address, phone, etc.)
- 📧 **Order Confirmation Emails** — Automatically sent using MailerSend & Firebase Functions
- ✅ **Thank You Page** — Confirmation after a successful order
- 🔐 **Protected Routes** — Only logged-in users can access checkout or profile pages
- ⚙️ **Admin Ready** — Orders can be viewed from Firestore or extended with an admin dashboard
- 🔔 **Toast Notifications** — User-friendly alerts for login, payment, etc.

---

## 🛠️ Tech Stack

| Frontend          | Backend / DB       | Payments     | Email Service   |
|-------------------|--------------------|--------------|-----------------|
| React             | Firebase Firestore | Stripe       | MailerSend      |
| React Router DOM  | Firebase Auth      | Node.js (API) | Firebase Functions |
| React Bootstrap   | Firebase Hosting   |              |                 |

---

## 📦 Setup Instructions

### 🔧 Prerequisites

- Node.js & npm installed
- Firebase CLI: `npm install -g firebase-tools`
- A Firebase project (Firestore, Authentication, Hosting, and Functions enabled)
- Stripe account + MailerSend account

---

### 🚨 Firebase Configuration

1. Create a `.env` file in the root:
   ```env
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
2. Configure Firebase with your credentials inside /src/firebase.js
3. Set MailerSend API key: firebase functions:config:set mailersend.key="YOUR_MAILERSEND_API_KEY"

### 📦 Install & Run

npm install
npm start

To deploy:
firebase deploy --only hosting

To deploy functions:
firebase deploy --only functions

### 📁 Folder Structure
├── public/
├── src/
│   ├── Components/
│   │   ├── Products.js
│   │   ├── ShoppingCart.js
│   │   ├── CheckoutForm.js
│   │   ├── OrderHistory.js
│   │   ├── UserAccount.js
│   │   └── ...
│   ├── firebase.js
│   ├── App.js
│   └── index.js
├── functions/
│   └── index.js (email confirmation logic)
├── .env
├── firebase.json
└── README.md

### 📸 Screenshots
Home Page:
![Orbis HomePage](https://github.com/user-attachments/assets/ca8bf2c9-536e-4d1f-8791-a1ed018222bb)

Products Page:
![Orbis Products Page](https://github.com/user-attachments/assets/25d5042e-4bdf-456a-97fb-57821c4cf90a)

Shopping Cart:
![Orbis ShoppingCart](https://github.com/user-attachments/assets/fbe220c3-66c9-4b5b-8b13-e7cce012d009)

Checkout Page:
![Orbis Checkout](https://github.com/user-attachments/assets/6eafbd4a-29d3-40b8-87ab-719d6bf240cb)

My Account Page:
![Orbis MyAccount](https://github.com/user-attachments/assets/7d532a9a-9c07-4533-a222-d61f0f23251c)

Order History Page:
![Orbis OrderHistory](https://github.com/user-attachments/assets/0d24002c-3f7e-44dc-a0a2-102a14386a75)

### 🙋‍♂️ Author
Nathan Carr
3rd Year Project — Atlantic Technological University
Email: nathancarr18@gmail.com

### 📝 License
This project is for educational purposes only. All product images and branding used are for demonstration.

