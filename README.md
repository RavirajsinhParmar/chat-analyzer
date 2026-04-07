# 📊 WhatsApp Chat Analyzer

A full-stack application that analyzes exported WhatsApp chat data and provides insights like active users, joins, and consistent participants.

---

## 🚀 Features

- 📂 Upload WhatsApp `.txt` chat file
- 📊 Visualize **daily active users**
- 📈 Track **new participants (joins)**
- 👥 Identify **consistent users (active ≥ 4 days)**
- 🎯 Supports:
  - Android & iPhone exports
  - Multi-line messages
  - System messages (joins, leaves, etc.)

- 💅 Modern UI with drag & drop upload
- ⚡ Fast and scalable parsing

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Recharts

### Backend

- Node.js
- Express.js
- Multer (file upload)
- Day.js (date handling)

---

## 📁 Project Structure

```
client/    → Frontend (React + Vite)
server/    → Backend (Node + Express)
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/RavirajsinhParmar/whatsapp-analyzer.git
cd whatsapp-analyzer
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
```

Run server:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

## How It Works

1. Upload exported WhatsApp chat (`.txt`)
2. Backend parses messages using regex
3. Data is processed into:
   - Daily active users
   - Joins per day
   - Consistent users

4. Frontend visualizes results using charts

---

## Key Challenges Solved

- Parsing **multiple WhatsApp formats**
- Handling **multiline messages**
- Supporting **Android & iOS exports**
- Cleaning **real-world messy data (Unicode, spacing)**

---

## Future Improvements

- Advanced analytics (top users, peak hours)
- Dark mode
- Date range filters
- Deployment (Vercel + Render)

---

## Author

Your Name
GitHub: https://github.com/RavirajsinhParmar

---
