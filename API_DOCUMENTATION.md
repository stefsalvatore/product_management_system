# API Documentation

Complete API reference for the Product Management System.

**Base URL**: `http://localhost:3000/api`

## Authentication

All endpoints except `/auth/register` and `/auth/login` require JWT authentication.

**Header Format**:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Authentication Endpoints

### 1.1 Register User

**Endpoint**: `POST /auth/register`

**Description**: Create a new user account

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Validation**:
- Email must be valid format
- Password minimum 6 characters

**Success Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": 1,
    "email": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

### 1.2 Login User

**Endpoint**: `POST /auth/login`

**Description**: Authenticate user and get JWT token

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": 1,
    "email": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 1.3 Get Current User

**Endpoint**: `GET /auth/me`

**Description**: Get authenticated user details

**Headers**: `Authorization: Bearer <token>`

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 2. User Management Endpoints

### 2.1 Get All Users

**Endpoint**: `GET /users`

**Headers**: `Authorization: Bearer <token>`

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "user@example.com",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 2.2 Get User By ID

**Endpoint**: `GET /users/:id`

**Headers**: `Authorization: Bearer <token>`

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 2.3 Create User

**Endpoint**: `POST /users`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "password": "password123"
}
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "userId": 2,
    "email": "newuser@example.com"
  }
}
```

---

### 2.4 Update User

**Endpoint**: `PUT /users/:id`

**Headers**: `Authorization: Bearer <token>`

**Request Body** (all fields optional):
```json
{
  "email": "updated@example.com",
  "password": "newpassword123"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "User updated successfully"
}
```

---

### 2.5 Delete User

**Endpoint**: `DELETE /users/:id`

**Headers**: `Authorization: Bearer <token>`

**Success Response** (200):
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## 3. Category Management Endpoints

### 3.1 Get All Categories

**Endpoint**: `GET /categories`

**Headers**: `Authorization: Bearer <token>`

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "unique_id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Electronics",
      "product_count": 5,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 3.2 Get Category By ID

**Endpoint**: `GET /categories/:id`

**Headers**: `Authorization: Bearer <token>`

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "unique_id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Electronics",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 3.3 Create Category

**Endpoint**: `POST /categories`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "name": "Electronics"
}
```

**Success Response** (201):
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": 1,
    "unique_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

---

### 3.4 Update Category

**Endpoint**: `PUT /categories/:id`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "name": "Updated Electronics"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Category updated successfully"
}
```

---

### 3.5 Delete Category

**Endpoint**: `DELETE /categories/:id`

**Headers**: `Authorization: Bearer <token>`

**Success Response** (200):
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Error Response** (400 - if category has products):
```json
{
  "success": false,
  "message": "Cannot delete category with existing products"
}
```

---

## 4. Product Management Endpoints

### 4.1 Get All Products (with Pagination, Sort, Search)

**Endpoint**: `GET /products`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page |
| sortBy | string | created_at | Sort column (name, price, created_at) |
| order | string | DESC | Sort order (ASC, DESC) |
| search | string | "" | Search by product name |
| category | string | "" | Filter by category name |

**Example Request**:
```
GET /products?page=1&limit=10&sortBy=price&order=ASC&search=laptop&category=electronics
```

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "unique_id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "MacBook Pro 16",
      "image": "/uploads/images/product-1234567890.jpg",
      "price": 2499.99,
      "category_id": 1,
      "category_name": "Electronics",
      "category_unique_id": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

---

### 4.2 Get Product By ID

**Endpoint**: `GET /products/:id`

**Headers**: `Authorization: Bearer <token>`

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "unique_id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "MacBook Pro 16",
    "image": "/uploads/images/product-1234567890.jpg",
    "price": 2499.99,
    "category_id": 1,
    "category_name": "Electronics",
    "category_unique_id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 4.3 Create Product

**Endpoint**: `POST /products`

**Headers**:
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Form Data**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Product name |
| price | number | Yes | Product price (decimal) |
| category_id | number | Yes | Category ID |
| image | file | No | Product image (jpg, png, gif) |

**Success Response** (201):
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "unique_id": "123e4567-e89b-12d3-a456-426614174000"
  }
}
```

---

### 4.4 Update Product

**Endpoint**: `PUT /products/:id`

**Headers**:
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Form Data** (all optional):
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | No | Product name |
| price | number | No | Product price |
| category_id | number | No | Category ID |
| image | file | No | New product image |

**Success Response** (200):
```json
{
  "success": true,
  "message": "Product updated successfully"
}
```

---

### 4.5 Delete Product

**Endpoint**: `DELETE /products/:id`

**Headers**: `Authorization: Bearer <token>`

**Success Response** (200):
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

### 4.6 Bulk Upload Products

**Endpoint**: `POST /products/bulk/upload`

**Headers**:
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Form Data**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| file | file | Yes | CSV or XLSX file |

**CSV/XLSX Format**:
```csv
name,price,category_id,image
Product Name,99.99,1,
Another Product,149.99,1,
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Bulk upload completed",
  "data": {
    "totalRows": 100,
    "inserted": 95,
    "failed": 5,
    "errors": [
      "Row 10: Category ID 999 not found",
      "Row 25: Missing required fields"
    ]
  }
}
```

**Features**:
- Processes large files without timeout
- Validates each row
- Batch inserts (1000 records at a time)
- Returns detailed error report

---

### 4.7 Export Products (CSV)

**Endpoint**: `GET /products/export`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| format | string | Yes | Export format (csv or xlsx) |
| search | string | No | Filter by product name |
| category | string | No | Filter by category |

**Example Request**:
```
GET /products/export?format=csv&search=laptop&category=electronics
```

**Success Response** (200):
- Returns file download
- Content-Type: `text/csv` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- Content-Disposition: `attachment; filename=products.csv`

**Features**:
- Streams data (no memory issues)
- Handles large datasets without timeout
- Includes all product details

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details (in development mode)"
}
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production use, consider adding:
- Rate limiting middleware (express-rate-limit)
- API key authentication
- Request throttling

---

## Notes

1. **Authentication**: Store JWT token securely (localStorage/sessionStorage)
2. **File Uploads**: Max file size is 10MB for images, 50MB for bulk files
3. **Pagination**: Default page size is 10, maximum is 100
4. **Bulk Upload**: Processes up to 100,000 records efficiently
5. **Export**: No limit on export size (uses streaming)

---

## Testing Tips

### Using cURL

**Register**:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Login**:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get Products** (with token):
```bash
curl -X GET "http://localhost:3000/api/products?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

Import the collection from `postman-collection/Product-Management-API.postman_collection.json` for easier testing.

---

## Support

For issues or questions, refer to the main [README.md](README.md) or check the troubleshooting section.
