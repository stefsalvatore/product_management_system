# System Architecture

## Overview

This document provides a visual representation of the Product Management System architecture.

---

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                      http://localhost:4200                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │ (REST API Calls)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    ANGULAR FRONTEND                          │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Login /    │  │  Dashboard   │  │   Products   │      │
│  │   Register   │  │  Component   │  │  Component   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Categories   │  │    Users     │  │  Auth Guard  │      │
│  │  Component   │  │  Component   │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌────────────────────────────────────────────────┐         │
│  │         Services Layer                          │         │
│  │  • API Service (HTTP Client)                   │         │
│  │  • Auth Service (Token Management)             │         │
│  └────────────────────────────────────────────────┘         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │ Authorization: Bearer <JWT>
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  NODE.JS + EXPRESS API                       │
│                   http://localhost:3000                      │
│                                                               │
│  ┌────────────────────────────────────────────────┐         │
│  │              Routes Layer                       │         │
│  │  • /api/auth/*    - Authentication             │         │
│  │  • /api/users/*   - User Management            │         │
│  │  • /api/categories/* - Category Management     │         │
│  │  • /api/products/*   - Product Management      │         │
│  └────────────────────────────────────────────────┘         │
│                         │                                     │
│  ┌────────────────────────────────────────────────┐         │
│  │            Middleware Layer                     │         │
│  │  • CORS                                         │         │
│  │  • JWT Authentication                           │         │
│  │  • Request Validation                           │         │
│  │  • File Upload (Multer)                        │         │
│  └────────────────────────────────────────────────┘         │
│                         │                                     │
│  ┌────────────────────────────────────────────────┐         │
│  │           Controllers Layer                     │         │
│  │  • authController - Login/Register             │         │
│  │  • userController - User CRUD                  │         │
│  │  • categoryController - Category CRUD          │         │
│  │  • productController - Product CRUD            │         │
│  │                      Bulk Upload/Export        │         │
│  └────────────────────────────────────────────────┘         │
│                         │                                     │
│  ┌────────────────────────────────────────────────┐         │
│  │              Models Layer                       │         │
│  │  • User Model                                   │         │
│  │  • Category Model                               │         │
│  │  • Product Model                                │         │
│  └────────────────────────────────────────────────┘         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ SQL Queries
                         │ (MySQL2 Connection Pool)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      MYSQL DATABASE                          │
│                   localhost:3306                             │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    users     │  │  categories  │  │   products   │      │
│  │              │  │              │  │              │      │
│  │ • id         │  │ • id         │  │ • id         │      │
│  │ • email      │  │ • unique_id  │  │ • unique_id  │      │
│  │ • password   │  │ • name       │  │ • name       │      │
│  │ • created_at │  │ • created_at │  │ • image      │      │
│  │ • updated_at │  │ • updated_at │  │ • price      │      │
│  │              │  │              │  │ • category_id│──┐   │
│  └──────────────┘  └───────┬──────┘  │ • created_at │  │   │
│                            │          │ • updated_at │  │   │
│                            │          └──────────────┘  │   │
│                            │                             │   │
│                            └─────────────────────────────┘   │
│                                   (Foreign Key)              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow Diagram

### Example: Get Products with Pagination

```
┌─────────┐                           ┌─────────┐
│ Browser │                           │ Angular │
└────┬────┘                           └────┬────┘
     │                                      │
     │  1. User clicks "Products" tab      │
     │────────────────────────────────────>│
     │                                      │
     │                                      │ 2. products.component.ts
     │                                      │    calls loadProducts()
     │                                      │
     │                                      │ 3. api.service.ts
     │                                      │    getProducts(params)
     │                                      │
     │                                      │ 4. HTTP GET Request
     │                                      │    /api/products?page=1&limit=10
     │                                      │    Header: Authorization: Bearer <token>
     │                                      ▼
     │                              ┌──────────────┐
     │                              │   Express    │
     │                              │   Server     │
     │                              └──────┬───────┘
     │                                     │
     │                                     │ 5. Route Handler
     │                                     │    GET /api/products
     │                                     │
     │                                     │ 6. Auth Middleware
     │                                     │    Verify JWT Token
     │                                     │
     │                                     │ 7. productController
     │                                     │    .getAllProducts()
     │                                     │
     │                                     │ 8. Product Model
     │                                     │    .getAll(options)
     │                                     ▼
     │                              ┌──────────────┐
     │                              │    MySQL     │
     │                              └──────┬───────┘
     │                                     │
     │                                     │ 9. Execute SQL:
     │                                     │    SELECT p.*, c.name
     │                                     │    FROM products p
     │                                     │    LEFT JOIN categories c
     │                                     │    ORDER BY created_at
     │                                     │    LIMIT 10 OFFSET 0
     │                                     │
     │                                     │ 10. Return Results
     │                              ┌──────┴───────┐
     │                              │   Express    │
     │                              └──────┬───────┘
     │                                     │
     │                                     │ 11. Format Response
     │                                     │     { success, data, pagination }
     │                                     │
     │  12. HTTP 200 Response              │
     │  JSON: { success: true, data: [...] }
     │<────────────────────────────────────│
     │                                      │
     │                                      │ 13. Subscribe callback
     │                                      │     Update products array
     │                                      │
     │  14. Render products table           │
     │<─────────────────────────────────────│
     │                                      │
```

---

## 🔐 Authentication Flow

```
┌─────────┐                ┌─────────┐              ┌─────────┐
│  User   │                │ Angular │              │ Backend │
└────┬────┘                └────┬────┘              └────┬────┘
     │                          │                        │
     │ 1. Enter credentials     │                        │
     │─────────────────────────>│                        │
     │                          │                        │
     │                          │ 2. POST /auth/login    │
     │                          │    { email, password } │
     │                          │───────────────────────>│
     │                          │                        │
     │                          │                        │ 3. Verify password
     │                          │                        │    bcrypt.compare()
     │                          │                        │
     │                          │                        │ 4. Generate JWT
     │                          │                        │    jwt.sign()
     │                          │                        │
     │                          │ 5. Return token        │
     │                          │<───────────────────────│
     │                          │    { token, user }     │
     │                          │                        │
     │                          │ 6. Store token         │
     │                          │    localStorage        │
     │                          │                        │
     │ 7. Redirect to dashboard │                        │
     │<─────────────────────────│                        │
     │                          │                        │
     │ 8. Access products       │                        │
     │─────────────────────────>│                        │
     │                          │                        │
     │                          │ 9. GET /products       │
     │                          │    Header: Bearer token│
     │                          │───────────────────────>│
     │                          │                        │
     │                          │                        │ 10. Verify JWT
     │                          │                        │     jwt.verify()
     │                          │                        │
     │                          │ 11. Return data        │
     │                          │<───────────────────────│
     │                          │                        │
     │ 12. Display products     │                        │
     │<─────────────────────────│                        │
     │                          │                        │
```

---

## 📤 Bulk Upload Flow

```
User selects CSV/XLSX file
          │
          ▼
┌─────────────────────┐
│  Angular Frontend   │
│  File Upload Form   │
└──────────┬──────────┘
           │
           │ POST /products/bulk/upload
           │ FormData with file
           ▼
┌─────────────────────┐
│  Multer Middleware  │
│  Save to uploads/   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────┐
│  productController.bulkUpload   │
└──────────┬──────────────────────┘
           │
           ├──> Parse CSV (csv-parser)
           │    or XLSX (xlsx library)
           │
           ├──> Stream data row by row
           │    (No full load in memory)
           │
           ├──> Validate each row:
           │    • Check required fields
           │    • Verify category_id exists
           │    • Validate price format
           │
           ├──> Batch insert (1000 at a time)
           │    ┌──────────────────────┐
           │    │  Batch 1: rows 1-1000│
           │    │  INSERT INTO products│
           │    └──────────────────────┘
           │    ┌──────────────────────┐
           │    │  Batch 2: rows 1001-2000│
           │    │  INSERT INTO products│
           │    └──────────────────────┘
           │    (Repeat for all batches)
           │
           ├──> Collect errors
           │    (Invalid rows tracked)
           │
           ├──> Delete uploaded file
           │    (Cleanup temporary file)
           │
           ▼
┌────────────────────────────┐
│  Return Response           │
│  {                         │
│    success: true,          │
│    totalRows: 10000,       │
│    inserted: 9500,         │
│    failed: 500,            │
│    errors: [...]           │
│  }                         │
└────────────────────────────┘
           │
           ▼
     Angular updates UI
     Shows success message
```

**Why No Timeout?**
- Streaming (not loading entire file)
- Batch processing (1000 rows/batch)
- No response held until complete
- Efficient memory usage

---

## 📥 Export Flow

```
User clicks "Export CSV"
          │
          ▼
┌─────────────────────┐
│  Angular Frontend   │
└──────────┬──────────┘
           │
           │ GET /products/export?format=csv
           ▼
┌─────────────────────────────────┐
│  productController.exportProducts│
└──────────┬──────────────────────┘
           │
           ├──> Query products from DB
           │    SELECT * FROM products
           │    (No LIMIT - get all)
           │
           ├──> Create CSV writer
           │    (csv-writer library)
           │
           ├──> Stream to response
           │    ┌──────────────────┐
           │    │  Header row      │
           │    ├──────────────────┤
           │    │  Product 1       │
           │    │  Product 2       │
           │    │  ...             │
           │    │  Product N       │
           │    └──────────────────┘
           │    (Written incrementally)
           │
           ├──> Set headers:
           │    Content-Type: text/csv
           │    Content-Disposition: attachment
           │
           ▼
┌────────────────────────────┐
│  File Download Starts      │
│  Browser saves file        │
└────────────────────────────┘

**Why No Timeout?**
- Streaming response (not buffering)
- Data written incrementally
- Connection stays alive
- No memory issues
```

---

## 🗄️ Database Relationships

```
┌──────────────────┐
│     users        │
│                  │
│  PK: id          │
│      email       │
│      password    │
└──────────────────┘
         │
         │ (No foreign keys)
         │
         ▼
    (Used for authentication only)


┌──────────────────┐         ┌──────────────────┐
│   categories     │         │    products      │
│                  │         │                  │
│  PK: id          │◄────────│  PK: id          │
│      unique_id   │    │    │      unique_id   │
│      name        │    │    │      name        │
│                  │    │    │      image       │
│                  │    │    │      price       │
│                  │    └────│  FK: category_id │
└──────────────────┘         │      created_at  │
                             │      updated_at  │
                             └──────────────────┘

Relationship Type: One-to-Many
- One Category can have many Products
- Each Product must belong to one Category
- CASCADE DELETE: Deleting category deletes products
- RESTRICT: Prevented if products exist
```

---

## 📦 File Structure by Layer

### Presentation Layer (Frontend)
```
Components:
  ├─ Login Component
  ├─ Register Component
  ├─ Dashboard Component
  ├─ Products Component
  ├─ Categories Component
  └─ Users Component

Services:
  ├─ API Service (HTTP)
  └─ Auth Service (Token)

Guards:
  └─ Auth Guard (Route Protection)
```

### Application Layer (Backend)
```
Routes:
  ├─ /api/auth/*
  ├─ /api/users/*
  ├─ /api/categories/*
  └─ /api/products/*

Controllers:
  ├─ authController
  ├─ userController
  ├─ categoryController
  └─ productController

Middleware:
  ├─ auth (JWT verification)
  ├─ upload (File handling)
  └─ validator (Request validation)
```

### Data Layer
```
Models:
  ├─ User Model
  ├─ Category Model
  └─ Product Model

Database:
  └─ MySQL (Connection Pool)
```

---

## 🔧 Technology Decisions

| Layer | Technology | Why? |
|-------|-----------|------|
| Frontend | Angular 17 | Modern, TypeScript, Component-based |
| Backend | Express.js | Lightweight, Fast, Popular |
| Database | MySQL | Relational data, ACID compliance |
| Auth | JWT | Stateless, Scalable |
| Password | bcrypt | Industry standard, Secure |
| File Upload | Multer | Express-compatible, Simple |
| CSV/Excel | csv-parser, xlsx | Streaming support, Memory efficient |
| Validation | express-validator | Express integration, Comprehensive |

---

## 🚀 Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────┐
│                   INTERNET                       │
└───────────────────┬─────────────────────────────┘
                    │
          ┌─────────┴──────────┐
          │                    │
          ▼                    ▼
┌──────────────────┐  ┌──────────────────┐
│  Frontend CDN    │  │   Backend API    │
│  (Static Files)  │  │   (Node.js)      │
│  Angular Build   │  │   Load Balanced  │
└──────────────────┘  └─────────┬────────┘
                                │
                                │
                      ┌─────────┴──────────┐
                      │                    │
                      ▼                    ▼
              ┌──────────────┐    ┌──────────────┐
              │   MySQL DB   │    │  File Store  │
              │  (Master)    │    │  (S3/Cloud)  │
              └──────────────┘    └──────────────┘
```

---

## 📊 Performance Considerations

### Database Optimization
- Indexed columns: `email`, `unique_id`, `name`, `category_id`, `price`
- Connection pooling (10 connections)
- Query optimization with EXPLAIN
- Proper JOIN usage

### API Performance
- Pagination (default 10 items)
- Streaming for large files
- Batch processing for bulk operations
- Efficient SQL queries

### Frontend Performance
- Lazy loading (future enhancement)
- Component optimization
- HTTP caching
- Minimal bundle size

---

## 🔒 Security Layers

```
Level 1: Frontend
  ├─ Input validation
  ├─ Auth guard (route protection)
  └─ Token storage (localStorage)

Level 2: API
  ├─ CORS protection
  ├─ JWT verification
  ├─ Request validation
  └─ File type validation

Level 3: Business Logic
  ├─ Authorization checks
  ├─ Data validation
  └─ Error handling

Level 4: Database
  ├─ Foreign key constraints
  ├─ Unique constraints
  ├─ SQL injection prevention
  └─ Password hashing
```

---

This architecture ensures:
✅ Scalability
✅ Security
✅ Performance
✅ Maintainability
✅ Testability

---

For more details, see:
- [README.md](README.md) - Full documentation
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
