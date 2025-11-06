# Setup Instructions After Unzipping

## Important: This ZIP file does not contain node_modules folders

To keep the file size small, the `node_modules` folders have been excluded. You need to install dependencies after unzipping.

---

## Quick Setup (5 minutes)

### 1. Backend Setup
```bash
cd assignment/backend
npm install          # Installs all dependencies (~2 minutes)
npm run db:setup     # Creates database, runs migrations, seeds data
npm run dev          # Starts server on port 3000
```

**Demo Credentials:**
- Email: admin@example.com
- Password: password123

### 2. Frontend Setup (in new terminal)
```bash
cd assignment/frontend
npm install          # Installs all dependencies (~3 minutes)
npm start            # Starts Angular app on port 4200
```

### 3. Access Application
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/health

---

## What's Included

### Source Code
✅ Complete backend (Node.js + Express + Sequelize + MySQL)
✅ Complete frontend (Angular 17)
✅ Database migrations and seeders
✅ All CRUD operations with authentication

### Test Files
✅ Sample CSV (10 products) - `backend/sample-data/products-sample.csv`
✅ Large CSV (10,000 products) - `backend/sample-data/products-bulk-10000.csv`
✅ Large XLSX (10,000 products) - `backend/sample-data/products-bulk-10000.xlsx`

### Documentation
✅ README.md - Main documentation
✅ API_DOCUMENTATION.md - API reference
✅ REQUIREMENTS_CHECKLIST.md - Requirements verification
✅ TESTING_GUIDE.md - Testing instructions
✅ SUBMISSION_EMAIL.md - Email template

### Postman Collection
✅ Product-Management-API.postman_collection.json

---

## Prerequisites

Before running npm install, ensure you have:
- Node.js (v16 or higher)
- MySQL (v8 or higher) running
- npm or yarn

---

## Database Configuration

Update `backend/.env` with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=product_management
```

---

## File Size Information

- **Zipped:** ~619 KB
- **After npm install:** ~670 MB total
  - Backend node_modules: ~57 MB
  - Frontend node_modules: ~376 MB
  - Source code + docs: ~2 MB

---

## Troubleshooting

### If backend fails to start:
1. Make sure MySQL is running
2. Update credentials in `backend/.env`
3. Run `npm run db:setup` again

### If frontend fails to start:
1. Delete `frontend/.angular` folder
2. Run `npm install` again
3. Run `npm start`

---

## Support

For detailed instructions, see:
- [README.md](README.md) - Complete setup guide
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - How to test all features
- [REQUIREMENTS_CHECKLIST.md](REQUIREMENTS_CHECKLIST.md) - Verify all requirements

---

**Ready to submit!** 🚀
