# Quick Start Guide

This guide will help you get the Product Management System up and running in **5 minutes**.

## Prerequisites Check
```bash
# Check Node.js (should be v16+)
node --version

# Check npm
npm --version

# Check MySQL (should be running)
mysql --version
```

## Step 1: Setup Backend (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure database (edit .env file with your MySQL password)
# Update DB_PASSWORD in .env file

# Initialize database (creates database and tables)
npm run init-db

# Start backend server
npm run dev
```

You should see:
```
✅ Database connected successfully
🚀 Server is running on port 3000
```

## Step 2: Setup Frontend (2 minutes)

Open a **new terminal** window:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Angular development server
npm start
```

You should see:
```
✔ Browser application bundle generation complete.
** Angular Live Development Server is listening on localhost:4200 **
```

## Step 3: Access the Application (1 minute)

1. Open browser: http://localhost:4200
2. Click **"Register"**
3. Create account with:
   - Email: `admin@test.com`
   - Password: `password123`
4. You're automatically logged in!

## Step 4: Test the System

### Create a Category
1. Click **"Categories"** tab
2. Click **"Add Category"**
3. Enter: `Electronics`
4. Click **"Add Category"**

### Add a Product
1. Click **"Products"** tab
2. Click **"Add Product"**
3. Fill in:
   - Name: `iPhone 15 Pro`
   - Price: `999.99`
   - Category: `Electronics`
   - Image: (optional - upload any image)
4. Click **"Add Product"**

### Test Bulk Upload
1. Click **"Bulk Upload"**
2. Select file: `backend/sample-data/products-sample.csv`
3. Click **"Upload"**
4. See products imported!

### Test Export
1. Click **"Export CSV"** or **"Export XLSX"**
2. File downloads automatically

### Test Search & Filter
1. Type product name in search box
2. Type category name in filter box
3. Click **"Search"**
4. Click on **"Price"** column header to sort

## Default Ports

- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:4200
- **MySQL**: localhost:3306

## Test with Postman

1. Open Postman
2. Import: `postman-collection/Product-Management-API.postman_collection.json`
3. Run **"Login User"** request (token auto-saves)
4. Test any endpoint!

## Common Issues

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Port 4200 already in use
```bash
# Kill process on port 4200
lsof -ti:4200 | xargs kill -9
```

### Database connection failed
```bash
# Start MySQL
mysql.server start
# or
sudo systemctl start mysql
```

### Can't create database
```bash
# Login to MySQL and create manually
mysql -u root -p
CREATE DATABASE product_management;
exit;
```

## API Health Check

Test if backend is running:
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## What's Next?

- Read the full [README.md](README.md) for detailed documentation
- Explore all API endpoints in Postman
- Check out the code structure
- Customize the styling
- Add more features!

## Assignment Submission Checklist

✅ Backend running on port 3000
✅ Frontend running on port 4200
✅ Database created and initialized
✅ Can register and login
✅ User CRUD works
✅ Category CRUD works
✅ Product CRUD works
✅ Pagination works
✅ Sorting by price works
✅ Search by name works
✅ Filter by category works
✅ Bulk upload works (no timeout)
✅ Export works (no timeout)
✅ Postman collection attached

## Architecture Overview

```
Frontend (Angular:4200)
    ↓ HTTP Requests
Backend (Express:3000)
    ↓ SQL Queries
Database (MySQL:3306)
```

All set! 🎉 Your Product Management System is ready!
