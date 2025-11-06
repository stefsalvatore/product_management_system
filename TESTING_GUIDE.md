# Complete Testing Guide

This guide will help you test all features of the Product Management System, including the **10,000-product bulk upload without timeout errors**.

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup database with Sequelize
npm run db:setup

# Start server
npm run dev
```

**Server should be running on:** http://localhost:3000

### 2. Frontend Setup (Optional)

```bash
cd frontend

# Install dependencies
npm install

# Start Angular app
npm start
```

**Frontend should be running on:** http://localhost:4200

---

## 🧪 Testing Scenarios

### Test 1: Authentication ✅

**Using Postman:**

1. **Register a User**
   ```
   POST http://localhost:3000/api/auth/register
   Body: {
     "email": "test@example.com",
     "password": "password123"
   }
   ```
   Expected: 201 Created, returns JWT token

2. **Login**
   ```
   POST http://localhost:3000/api/auth/login
   Body: {
     "email": "test@example.com",
     "password": "password123"
   }
   ```
   Expected: 200 OK, returns JWT token

3. **Get Current User**
   ```
   GET http://localhost:3000/api/auth/me
   Header: Authorization: Bearer <your_token>
   ```
   Expected: 200 OK, returns user data

---

### Test 2: Category CRUD ✅

**Create Category:**
```
POST http://localhost:3000/api/categories
Header: Authorization: Bearer <token>
Body: {
  "name": "Electronics"
}
```
Expected: 201 Created, auto-generated UUID

**Get All Categories:**
```
GET http://localhost:3000/api/categories
Header: Authorization: Bearer <token>
```
Expected: 200 OK, list with product counts

**Update Category:**
```
PUT http://localhost:3000/api/categories/1
Header: Authorization: Bearer <token>
Body: {
  "name": "Updated Electronics"
}
```
Expected: 200 OK

**Delete Category:**
```
DELETE http://localhost:3000/api/categories/1
Header: Authorization: Bearer <token>
```
Expected: 200 OK or 400 if has products

---

### Test 3: Product CRUD ✅

**Create Product (with image):**
```
POST http://localhost:3000/api/products
Header: Authorization: Bearer <token>
Content-Type: multipart/form-data
Body:
  - name: "MacBook Pro 16"
  - price: 2499.99
  - category_id: 1
  - image: [select file]
```
Expected: 201 Created, auto-generated UUID

**Get Products with Pagination:**
```
GET http://localhost:3000/api/products?page=1&limit=10
Header: Authorization: Bearer <token>
```
Expected: 200 OK, paginated results

**Search Products:**
```
GET http://localhost:3000/api/products?search=laptop
Header: Authorization: Bearer <token>
```
Expected: 200 OK, filtered results

**Sort by Price:**
```
GET http://localhost:3000/api/products?sortBy=price&order=ASC
Header: Authorization: Bearer <token>
```
Expected: 200 OK, sorted by price ascending

**Filter by Category:**
```
GET http://localhost:3000/api/products?category=Electronics
Header: Authorization: Bearer <token>
```
Expected: 200 OK, filtered by category

---

### Test 4: Bulk Upload - Small File ✅

**File:** `backend/sample-data/products-sample.csv` (10 products)

```
POST http://localhost:3000/api/products/bulk/upload
Header: Authorization: Bearer <token>
Content-Type: multipart/form-data
Body:
  - file: products-sample.csv
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Bulk upload completed",
  "data": {
    "totalRows": 10,
    "inserted": 10,
    "failed": 0,
    "errors": []
  }
}
```

**Time:** <1 second ⚡

---

### Test 5: Bulk Upload - LARGE FILE (10,000 Products) 🔥

**This is the stress test to verify NO TIMEOUT ERRORS!**

#### Option A: CSV Format (Faster)

**File:** `backend/sample-data/products-bulk-10000.csv` (419 KB)

```
POST http://localhost:3000/api/products/bulk/upload
Header: Authorization: Bearer <token>
Content-Type: multipart/form-data
Body:
  - file: products-bulk-10000.csv
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Bulk upload completed",
  "data": {
    "totalRows": 10000,
    "inserted": 10000,
    "failed": 0,
    "errors": []
  }
}
```

**Expected Time:** ~15-20 seconds ⚡
**NO 504 TIMEOUT ERROR!** ✅

#### Option B: Excel Format

**File:** `backend/sample-data/products-bulk-10000.xlsx` (1.64 MB)

Same endpoint, just upload the XLSX file.

**Expected Time:** ~20-25 seconds ⚡
**NO 504 TIMEOUT ERROR!** ✅

---

### Test 6: Export Products ✅

**Export as CSV:**
```
GET http://localhost:3000/api/products/export?format=csv
Header: Authorization: Bearer <token>
```
Expected: File download, all products in CSV format

**Export as XLSX:**
```
GET http://localhost:3000/api/products/export?format=xlsx
Header: Authorization: Bearer <token>
```
Expected: File download, all products in Excel format

**Export Filtered Data:**
```
GET http://localhost:3000/api/products/export?format=csv&search=laptop&category=Electronics
Header: Authorization: Bearer <token>
```
Expected: File download with filtered results

**Time for 10,000 products:** ~5-10 seconds ⚡
**NO 504 TIMEOUT ERROR!** ✅

---

## 📊 Performance Expectations

| Operation | Records | Expected Time | Max Time |
|-----------|---------|---------------|----------|
| Small Bulk Upload | 10 | <1 sec | 2 secs |
| Medium Bulk Upload | 1,000 | ~2 secs | 5 secs |
| Large Bulk Upload (CSV) | 10,000 | ~15 secs | 30 secs |
| Large Bulk Upload (XLSX) | 10,000 | ~20 secs | 40 secs |
| Export (CSV) | 10,000 | ~5 secs | 15 secs |
| Export (XLSX) | 10,000 | ~8 secs | 20 secs |
| Pagination | 10 per page | <100ms | 500ms |

**All operations complete WITHOUT 504 timeout errors!** ✅

---

## 🎯 Testing with Frontend

### 1. Login
- Go to http://localhost:4200
- Register or login with demo credentials:
  - Email: `admin@example.com`
  - Password: `password123`

### 2. View Products
- Navigate to "Products" tab
- See paginated list
- Try searching, filtering, sorting

### 3. Bulk Upload
- Click "Bulk Upload" button
- Select `products-bulk-10000.csv` or `.xlsx`
- Click "Upload"
- Watch progress
- Verify all 10,000 products imported

### 4. Export
- Click "Export CSV" or "Export XLSX"
- File downloads automatically
- Open and verify data

---

## 🐛 Troubleshooting

### Issue: Category Not Found

**Error:**
```json
{
  "success": false,
  "data": {
    "errors": ["Row 1: Category ID 1 not found"]
  }
}
```

**Solution:**
```bash
cd backend
npm run db:seed  # Creates demo categories
```

### Issue: File Too Large

**Error:**
```
PayloadTooLargeError: request entity too large
```

**Solution:** Check file upload limits in `middleware/upload.js`:
```javascript
limits: { fileSize: 50 * 1024 * 1024 } // 50MB
```

### Issue: Database Connection Failed

**Error:**
```
❌ Failed to start server
```

**Solution:**
```bash
# Make sure MySQL is running
mysql.server start

# Check .env configuration
# Verify DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
```

### Issue: Timeout During Upload

**If you get 504 timeout (shouldn't happen!):**

1. Check server logs for errors
2. Verify batch size is 1000 in `productController.js`
3. Increase Node.js memory:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run dev
   ```

---

## 📝 Test Checklist

### Basic Tests
- [ ] User registration works
- [ ] User login works
- [ ] JWT authentication working
- [ ] Category CRUD operations
- [ ] Product CRUD operations
- [ ] Image upload working

### Advanced Tests
- [ ] Server-side pagination
- [ ] Sort by price (ASC/DESC)
- [ ] Search by product name
- [ ] Filter by category name
- [ ] Combine search + filter + sort

### Bulk Operations
- [ ] Small file upload (10 products)
- [ ] Medium file upload (1,000 products)
- [ ] **Large file upload (10,000 products) - NO TIMEOUT**
- [ ] CSV format upload
- [ ] XLSX format upload
- [ ] Error handling (invalid data)

### Export Tests
- [ ] Export all products (CSV)
- [ ] Export all products (XLSX)
- [ ] Export filtered products
- [ ] **Large export (10,000 products) - NO TIMEOUT**

### Frontend Tests
- [ ] Login/Register UI works
- [ ] Products list with pagination
- [ ] Search functionality
- [ ] Sort functionality
- [ ] Bulk upload UI
- [ ] Export buttons work
- [ ] Real-time feedback messages

---

## 🎓 Demo Credentials

After running `npm run db:seed`:

### Users
- **Admin:** admin@example.com / password123
- **User:** user@example.com / password123

### Categories (Auto-created)
1. Electronics
2. Clothing
3. Books
4. Home & Kitchen
5. Sports

### Products
- 10 demo products in Electronics

---

## 📚 Additional Resources

- **Postman Collection:** `postman-collection/Product-Management-API.postman_collection.json`
- **Sample Data:** `backend/sample-data/`
- **API Documentation:** `API_DOCUMENTATION.md`
- **Sequelize Guide:** `backend/README_SEQUELIZE.md`

---

## ✅ Success Criteria

The system is working correctly if:

1. ✅ All API endpoints return proper responses
2. ✅ JWT authentication is secure and working
3. ✅ Pagination, search, sort, filter all work
4. ✅ **10,000 product bulk upload completes in <30 seconds WITHOUT timeout**
5. ✅ **10,000 product export completes in <15 seconds WITHOUT timeout**
6. ✅ Frontend UI is responsive and functional
7. ✅ Real-time feedback for all operations
8. ✅ Error handling works properly

---

## 🎉 Congratulations!

If all tests pass, your Product Management System is **production-ready** with:
- ✅ Sequelize ORM with migrations
- ✅ No timeout errors on bulk operations
- ✅ Scalable architecture
- ✅ Professional code structure
- ✅ Complete documentation

**Ready for deployment! 🚀**
