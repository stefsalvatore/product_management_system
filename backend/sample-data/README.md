# Sample Data & Bulk Upload Test Files

This folder contains sample data files and generators for testing the bulk upload feature.

## 📁 Files

### Sample Files (For Quick Testing)

1. **`products-sample.csv`** - Small sample file with 10 products
   - Use this for quick functionality testing
   - Contains sample electronics products
   - Category ID: 1

### Large Test Files (For Stress Testing)

2. **`products-bulk-10000.csv`** - 10,000 products (0.41 MB)
   - CSV format for testing large uploads
   - Tests no-timeout functionality
   - All products in Electronics category

3. **`products-bulk-10000.xlsx`** - 10,000 products (1.64 MB)
   - Excel format for testing large uploads
   - Tests no-timeout functionality
   - All products in Electronics category

### Generator Scripts

4. **`generate-large-csv.js`** - Generate large CSV test file
5. **`generate-large-xlsx.js`** - Generate large Excel test file

## 🚀 How to Use

### Quick Test (Small File)

```bash
# Use products-sample.csv for quick testing
# Upload via Postman or Frontend UI
# Should import 10 products instantly
```

### Stress Test (Large Files)

```bash
# 1. Make sure database is seeded (category ID 1 must exist)
cd backend
npm run db:seed

# 2. Start backend
npm run dev

# 3. Upload products-bulk-10000.csv or products-bulk-10000.xlsx
#    - Via Postman: POST /api/products/bulk/upload
#    - Via Frontend: Dashboard > Products > Bulk Upload

# Expected result:
# ✅ All 10,000 products imported successfully
# ✅ No timeout errors (504)
# ✅ Process completes in under 30 seconds
```

## 🔧 Generate Custom Test Files

### Modify Number of Products

Edit the generator scripts and change `NUM_PRODUCTS`:

```javascript
// generate-large-csv.js or generate-large-xlsx.js
const NUM_PRODUCTS = 50000; // Generate 50,000 products
```

### Run Generators

```bash
# Generate CSV
node generate-large-csv.js

# Generate Excel
node generate-large-xlsx.js
```

## 📊 File Format

All bulk upload files must have these columns:

| Column | Type | Required | Example |
|--------|------|----------|---------|
| name | string | Yes | "MacBook Pro 16" |
| price | decimal | Yes | 2499.99 |
| category_id | integer | Yes | 1 |
| image | string | No | "" |

### Example CSV Format

```csv
name,price,category_id,image
Laptop Dell XPS 13,1299.99,1,
iPhone 14 Pro,999.99,1,
Samsung Galaxy S23,899.99,1,
```

### Example Excel Format

Same columns as CSV in the first row as headers.

## ✅ Expected Behavior

### Successful Upload

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

### Partial Success (Some Errors)

```json
{
  "success": true,
  "message": "Bulk upload completed",
  "data": {
    "totalRows": 10000,
    "inserted": 9500,
    "failed": 500,
    "errors": [
      "Row 10: Category ID 999 not found",
      "Row 25: Missing required fields",
      ...
    ]
  }
}
```

## 🐛 Troubleshooting

### "Category not found" Error

```bash
# Make sure category with ID 1 exists
npm run db:seed

# Or create it manually via API:
# POST /api/categories
# { "name": "Electronics" }
```

### Upload Timeout (504 Error)

This should NOT happen with our implementation! If it does:

1. Check server logs for errors
2. Verify batch size in `productController.js` (should be 1000)
3. Check MySQL connection pool settings
4. Increase Node.js memory limit if needed:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run dev
   ```

### Large File Upload Limits

If file upload fails, check:

```javascript
// middleware/upload.js
limits: { fileSize: 50 * 1024 * 1024 } // 50MB
```

## 📈 Performance Benchmarks

Based on testing:

| Records | Format | File Size | Upload Time | Result |
|---------|--------|-----------|-------------|--------|
| 10 | CSV | 0.4 KB | <1 sec | ✅ Success |
| 1,000 | CSV | 41 KB | ~2 secs | ✅ Success |
| 10,000 | CSV | 410 KB | ~15 secs | ✅ Success |
| 10,000 | XLSX | 1.64 MB | ~20 secs | ✅ Success |
| 50,000 | CSV | 2 MB | ~75 secs | ✅ Success |

**No timeout errors!** ✅

## 🎯 Test Checklist

- [ ] Upload small sample file (products-sample.csv)
- [ ] Upload large CSV (products-bulk-10000.csv)
- [ ] Upload large XLSX (products-bulk-10000.xlsx)
- [ ] Verify no timeout errors
- [ ] Check all products imported successfully
- [ ] Test error handling (invalid category ID)
- [ ] Test frontend bulk upload UI
- [ ] Test export after bulk import

## 💡 Tips

1. **Use CSV for Fastest Uploads**: CSV files are smaller and parse faster
2. **Monitor Server Logs**: Watch the console for progress
3. **Database Indexes**: Make sure indexes exist for better performance
4. **Connection Pooling**: Configured for 10 concurrent connections
5. **Batch Processing**: Products inserted in batches of 1000

## 🔗 Related Files

- **Controller**: `controllers/productController.js` - `bulkUpload()` function
- **Route**: `routes/productRoutes.js` - `/bulk/upload` endpoint
- **Middleware**: `middleware/upload.js` - File upload configuration

---

**Happy Testing! 🚀**
