# SkyDevOps Solution — Backend API

Full backend service for SkyDevOps Solution website.

## Tech Stack
- Node.js + Express
- MongoDB Atlas (Database)
- JWT Authentication
- Nodemailer (Email)
- Render (Hosting)

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in your values in .env
```

### 3. Create first admin account
```bash
node seed.js
```

### 4. Start server
```bash
npm start          # production
npm run dev        # development (nodemon)
```

---

## API Endpoints

### Public Endpoints (No auth required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/api/auth/login` | Admin login |
| POST | `/api/applications/apply` | Submit internship application |
| POST | `/api/contact` | Submit contact form |

### Admin Endpoints (JWT required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/me` | Get current admin |
| GET | `/api/applications` | Get all applications |
| GET | `/api/applications/:id` | Get single application |
| PATCH | `/api/applications/:id/status` | Update application status |
| DELETE | `/api/applications/:id` | Delete application |
| GET | `/api/applications/stats/summary` | Get dashboard stats |
| GET | `/api/contact` | Get all contact inquiries |
| PATCH | `/api/contact/:id/status` | Update contact status |
| DELETE | `/api/contact/:id` | Delete contact |

---

## Application Status Flow
```
pending → reviewed → shortlisted → selected ✅
                   → rejected ❌
```

---

## Deploy on Render

1. Push to GitHub
2. Go to render.com → New Web Service
3. Connect your repo
4. Set:
   - Build command: `npm install`
   - Start command: `node server.js`
5. Add environment variables from .env
6. Deploy!

---

## Connect Frontend

Replace `YOUR_BACKEND_URL` with your Render URL:

```javascript
// Submit internship form
const res = await fetch('https://YOUR_BACKEND_URL.onrender.com/api/applications/apply', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

// Submit contact form
const res = await fetch('https://YOUR_BACKEND_URL.onrender.com/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(contactData)
});
```
