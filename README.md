# Aplikasi REST API Notulensi Rapat (MoM) & List Task/Jobdesk

Aplikasi Backend REST API sederhana dan modular menggunakan **Node.js**, **Express.js**, dan **MongoDB (Mongoose)**. Cocok untuk mahasiswa yang sedang mempelajari struktur proyek backend yang rapi.

---

## 📁 Struktur Folder Modular

```text
final-project/
├── config/
│   └── db.js                  # Konfigurasi koneksi ke MongoDB
├── models/
│   ├── Meeting.js             # Schema database untuk Notulensi Rapat (MoM)
│   └── Task.js                # Schema database untuk Task / Jobdesk
├── controllers/
│   ├── meetingController.js   # Logika CRUD dengan async/await & HTTP Status Code (200, 201, 404, 500)
│   └── taskController.js      # Logika CRUD Task/Jobdesk
├── routes/
│   ├── meetingRoutes.js       # Routing endpoint /api/meetings
│   └── taskRoutes.js          # Routing endpoint /api/tasks
├── .env                       # Variabel environment (PORT & MONGO_URI)
├── index.js                   # Entry point utama aplikasi server
└── package.json               # Daftar dependencies dan script
```

---

## ⚙️ Cara Menjalankan Aplikasi

1. **Install Dependencies**
   Jalankan perintah berikut di terminal:
   ```bash
   npm install
   ```

2. **Konfigurasi Database MongoDB**
   Pastikan MongoDB lokal Anda sudah berjalan, atau gunakan MongoDB Atlas di file `.env`:
   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/notulensi_db
   ```

3. **Jalankan Server**
   - Mode Normal:
     ```bash
     npm start
     ```
   - Mode Development (menggunakan Nodemon):
     ```bash
     npm run dev
     ```

---

## 📌 Daftar Endpoint REST API

### 1. Notulensi Rapat / Minutes of Meeting (`/api/meetings`)

| Method | Endpoint | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/meetings` | Membuat notulensi rapat baru | `201 Created`, `500` |
| `GET` | `/api/meetings` | Mengambil seluruh daftar rapat | `200 OK`, `500` |
| `GET` | `/api/meetings/:id` | Mengambil detail 1 rapat beserta list task terkait | `200 OK`, `404 Not Found`, `500` |
| `PUT` / `PATCH` | `/api/meetings/:id` | Memperbarui data notulensi rapat | `200 OK`, `404 Not Found`, `500` |
| `DELETE` | `/api/meetings/:id` | Menghapus notulensi rapat & task terkait | `200 OK`, `404 Not Found`, `500` |

#### Contoh Body Request `POST /api/meetings`:
```json
{
  "title": "Rapat Koordinasi Proyek Akhir Backend",
  "date": "2026-11-20T14:00:00.000Z",
  "location": "Google Meet",
  "notulis": "Hanif",
  "attendees": ["Hanif", "Budi", "Siti"],
  "agenda": "Pembagian tugas pembuatan REST API",
  "discussionSummary": "Membahas struktur folder modular Express dan skema database MongoDB.",
  "decisions": [
    "Menggunakan Express dan Mongoose",
    "Deadline pengumpulan hari Minggu"
  ]
}
```

---

### 2. List Task / Jobdesk (`/api/tasks`)

| Method | Endpoint | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/tasks` | Membuat task/jobdesk baru | `201 Created`, `500` |
| `GET` | `/api/tasks` | Mengambil semua task (bisa filter `?status=Pending&assignee=Hanif`) | `200 OK`, `500` |
| `GET` | `/api/tasks/:id` | Mengambil detail 1 task/jobdesk | `200 OK`, `404 Not Found`, `500` |
| `PUT` / `PATCH` | `/api/tasks/:id` | Mengubah data atau status task (`Pending`, `In Progress`, `Completed`) | `200 OK`, `404 Not Found`, `500` |
| `DELETE` | `/api/tasks/:id` | Menghapus task/jobdesk | `200 OK`, `404 Not Found`, `500` |

#### Contoh Body Request `POST /api/tasks`:
```json
{
  "meetingId": "673e1a2b3c4d5e6f7a8b9c0d",
  "title": "Membuat Controller dan Route Task",
  "description": "Implementasi CRUD dengan async/await dan status code 200, 201, 404, 500",
  "assignee": "Hanif",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2026-11-25T23:59:00.000Z"
}
```
*(Catatan: `meetingId` bersifat opsional, diisi dengan `_id` dari hasil pembuatan Meeting jika task berasal dari rapat tersebut).*
