# Product Management System

A full-stack product management application built with **Angular**, **Node.js/Express**, and **MySQL**. This system provides complete CRUD operations for users, categories, and products with advanced features like bulk upload, report generation, server-side pagination, sorting, and search.

## Features

### Backend (Node.js + Express + MySQL)
- **JWT Authentication** - Secure user registration and login
- **User Management** - Complete CRUD operations
- **Category Management** - Create and manage product categories with auto-generated UUIDs
- **Product Management** - Full CRUD with image upload support
- **Advanced Product List API**:
  - Server-side pagination
  - Sorting by price (ascending/descending)
  - Search by product name
  - Filter by category name
- **Bulk Upload** - Upload thousands of products via CSV/XLSX without timeout errors
- **Report Generation** - Export products to CSV/XLSX format without timeout errors
- **RESTful API** - Clean and well-structured endpoints

### Frontend (Angular)
- **Responsive UI** - Clean and modern interface
- **Authentication** - Login/Register with JWT token management
- **Dashboard** - Centralized management interface
- **User Management** - View, create, edit, and delete users
- **Category Management** - Manage product categories
- **Product Management**:
  - View products with pagination
  - Search and filter products
  - Sort by price
  - Create/Edit products with image upload
  - Bulk upload products from CSV/XLSX
  - Export products to CSV/XLSX
- **Real-time Feedback** - Success/error messages for all operations

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize (with migrations & seeders)
- **Database**: MySQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Timeout Handling**: connect-timeout
- **File Upload**: Multer
- **CSV Parsing**: csv-parser, csv-writer
- **Excel Handling**: xlsx
- **Validation**: express-validator
- **UUID Generation**: uuid

### Frontend
- **Framework**: Angular 17
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Forms**: Angular Forms (Template-driven)
- **Styling**: Custom CSS

## Project Structure

```
assignment/
├── backend/                    # Node.js Backend
│   ├── config/
│   │   └── database.js        # Sequelize configuration
│   ├── migrations/            # Database migrations
│   │   ├── 20240101000001-create-users.js
│   │   ├── 20240101000002-create-categories.js
│   │   └── 20240101000003-create-products.js
│   ├── models/                # Sequelize models
│   │   ├── index.js          # Model loader
│   │   ├── user.js           # User model
│   │   ├── category.js       # Category model
│   │   └── product.js        # Product model
│   ├── seeders/               # Database seeders
│   │   ├── 20240101000001-demo-users.js
│   │   ├── 20240101000002-demo-categories.js
│   │   └── 20240101000003-demo-products.js
│   ├── controllers/           # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── categoryController.js
│   │   └── productController.js
│   ├── middleware/            # Express middleware
│   │   ├── auth.js           # JWT authentication
│   │   ├── upload.js         # File upload handling
│   │   └── validator.js      # Request validation
│   ├── routes/                # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── productRoutes.js
│   ├── uploads/               # Uploaded files storage
│   ├── sample-data/           # Sample CSV for bulk upload
│   ├── .sequelizerc          # Sequelize CLI config
│   ├── .env                   # Environment variables
│   ├── .env.example           # Example environment file
│   ├── package.json
│   ├── server.js              # Main server file
│   └── README_SEQUELIZE.md    # Sequelize documentation
│
├── frontend/                   # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── products/
│   │   │   │   ├── categories/
│   │   │   │   └── users/
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts
│   │   │   │   └── auth.service.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── app.module.ts
│   │   │   └── app.component.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── postman-collection/        # Postman API collection
│   └── Product-Management-API.postman_collection.json
│
└── README.md
```

## Database Schema

### Users Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, encrypted)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Categories Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- unique_id (VARCHAR, UUID, UNIQUE)
- name (VARCHAR, UNIQUE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Products Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- unique_id (VARCHAR, UUID, UNIQUE)
- name (VARCHAR)
- image (VARCHAR)
- price (DECIMAL)
- category_id (INT, FOREIGN KEY)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn
- Angular CLI (optional, for Angular development)

### 1. Clone the Repository
```bash
cd assignment
```

### 2. Backend Setup

#### Step 1: Install Dependencies
```bash
cd backend
npm install
```

#### Step 2: Configure Environment
Update the `.env` file with your MySQL credentials:
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=product_management
DB_PORT=3306

JWT_SECRET=product_management_secret_key_2024_secure
JWT_EXPIRE=7d

UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
```

#### Step 3: Initialize Database with Sequelize
```bash
npm run db:setup
```
This will:
- Create the database
- Run all migrations (create tables with indexes)
- Seed demo data (users, categories, products)

**Alternative**: Step-by-step setup
```bash
npm run db:create   # Create database
npm run db:migrate  # Run migrations
npm run db:seed     # Seed demo data
```

#### Step 4: Start Backend Server
```bash
npm run dev
```
Server will run on: http://localhost:3000

### Backend Database Management Scripts

The backend now uses **Sequelize ORM** with migrations and seeders:

```bash
npm run db:create        # Create database
npm run db:drop          # Drop database
npm run db:migrate       # Run migrations
npm run db:migrate:undo  # Undo last migration
npm run db:seed          # Run seeders
npm run db:seed:undo     # Undo seeders
npm run db:reset         # Reset and reseed database
npm run db:setup         # Complete setup (create + migrate + seed)
```

### 3. Frontend Setup

#### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

#### Step 2: Start Frontend
```bash
npm start
```
Frontend will run on: http://localhost:4200

## Usage

### 1. Register a New User
- Open http://localhost:4200
- Click "Register"
- Enter email and password
- You'll be automatically logged in

### 2. Create Categories
- Go to "Categories" tab
- Click "Add Category"
- Enter category name (e.g., "Electronics")

### 3. Add Products
**Option 1: Single Product**
- Go to "Products" tab
- Click "Add Product"
- Fill in details and upload image
- Click "Add Product"

**Option 2: Bulk Upload**
- Click "Bulk Upload"
- Select CSV or XLSX file (see sample format in `backend/sample-data/products-sample.csv`)
- Click "Upload"

### 4. Manage Products
- **Search**: Type product name in search box
- **Filter**: Enter category name to filter
- **Sort**: Click on "Price" column header to sort
- **Edit**: Click "Edit" button on any product
- **Delete**: Click "Delete" button on any product
- **Export**: Click "Export CSV" or "Export XLSX" to download

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users (All protected)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Categories (All protected)
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Products (All protected)
- `GET /api/products` - Get products (with pagination, sort, search)
  - Query params: `page`, `limit`, `sortBy`, `order`, `search`, `category`
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (multipart/form-data)
- `PUT /api/products/:id` - Update product (multipart/form-data)
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/bulk/upload` - Bulk upload products (CSV/XLSX)
- `GET /api/products/export` - Export products (format: csv or xlsx)

## Testing with Postman

1. Import the collection from `postman-collection/Product-Management-API.postman_collection.json`
2. Run "Login User" request - token will be automatically saved
3. Test any protected endpoint

## Bulk Upload Format

### CSV Format
```csv
name,price,category_id,image
Product Name,99.99,1,
Another Product,149.99,1,
```

### XLSX Format
Same columns as CSV:
- **name** (required): Product name
- **price** (required): Product price (decimal)
- **category_id** (required): Existing category ID
- **image** (optional): Image path

## Key Features Implementation

### 1. No Timeout Errors (504)
The application implements multiple strategies to prevent timeout errors:

**Timeout Configuration:**
- Server timeout set to 5 minutes (300 seconds) using `connect-timeout` middleware
- Explicit timeout error handling with 504 status code response
- Server-level timeout configuration for long-running operations

**Bulk Upload:**
- Processes files in batches of 1000 records
- Uses streaming for CSV parsing
- Implements chunked database inserts
- Successfully tested with 10,000+ products without timeout

**Report Generation:**
- Streams data directly to response
- No memory buffering for large datasets
- Efficient query with proper indexing
- Successfully tested exporting 10,000+ products without timeout

### 2. Server-Side Pagination
```javascript
// Example: Get page 2 with 10 items, sorted by price ascending
GET /api/products?page=2&limit=10&sortBy=price&order=ASC
```

### 3. Search & Filter
```javascript
// Search by product name and filter by category
GET /api/products?search=laptop&category=electronics
```

### 4. Security
- Passwords encrypted with bcrypt (10 salt rounds)
- JWT-based authentication
- Protected routes with middleware
- Input validation on all endpoints

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| DB_HOST | MySQL host | localhost |
| DB_USER | MySQL user | root |
| DB_PASSWORD | MySQL password | - |
| DB_NAME | Database name | product_management |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | Token expiration | 7d |

## Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify database credentials in `.env`
- Run `npm run init-db` to create database

### Frontend can't connect to API
- Ensure backend is running on port 3000
- Check CORS is enabled in backend
- Verify API URL in frontend service

### Bulk upload fails
- Check CSV/XLSX format matches sample
- Ensure category IDs exist in database
- Verify file size is within limits

## Future Enhancements
- Add role-based access control (Admin/User)
- Implement Redis for caching
- Add product variants and inventory tracking
- Implement real-time notifications
- Add data analytics dashboard
- Implement soft delete for records

## License
This project is created for assignment purposes.

## Contact
For any queries regarding this assignment, please contact the developer.
