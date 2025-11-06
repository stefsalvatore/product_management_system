# Backend - Sequelize ORM Setup

This backend uses **Sequelize ORM** for database operations with MySQL, following industry best practices with migrations, models, and seeders.

## 🗂️ Project Structure

```
backend/
├── config/
│   └── database.js          # Sequelize configuration
├── migrations/              # Database migrations
│   ├── 20240101000001-create-users.js
│   ├── 20240101000002-create-categories.js
│   └── 20240101000003-create-products.js
├── models/                  # Sequelize models
│   ├── index.js            # Model loader
│   ├── user.js             # User model with bcrypt hooks
│   ├── category.js         # Category model with UUID
│   └── product.js          # Product model with UUID
├── seeders/                # Database seeders
│   ├── 20240101000001-demo-users.js
│   ├── 20240101000002-demo-categories.js
│   └── 20240101000003-demo-products.js
├── controllers/            # Business logic
├── routes/                 # API routes
├── middleware/             # Express middleware
├── .sequelizerc           # Sequelize CLI configuration
└── package.json
```

## 📦 Installation

```bash
cd backend
npm install
```

## ⚙️ Database Setup

### Option 1: Complete Setup (Recommended for first time)

```bash
# Creates database, runs migrations, and seeds data
npm run db:setup
```

This single command will:
1. Create the database
2. Run all migrations (create tables)
3. Seed demo data (users, categories, products)

### Option 2: Step-by-Step Setup

```bash
# 1. Create database
npm run db:create

# 2. Run migrations (create tables)
npm run db:migrate

# 3. Seed demo data
npm run db:seed
```

## 🚀 Start Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## 📜 Available NPM Scripts

### Database Management

| Command | Description |
|---------|-------------|
| `npm run db:create` | Create the database |
| `npm run db:drop` | Drop the database |
| `npm run db:migrate` | Run all pending migrations |
| `npm run db:migrate:undo` | Undo last migration |
| `npm run db:migrate:undo:all` | Undo all migrations |
| `npm run db:seed` | Run all seeders |
| `npm run db:seed:undo` | Undo all seeders |
| `npm run db:reset` | Reset database (undo migrations, migrate, seed) |
| `npm run db:setup` | Complete setup (create, migrate, seed) |

### Server

| Command | Description |
|---------|-------------|
| `npm start` | Start server in production mode |
| `npm run dev` | Start server with nodemon (auto-reload) |

## 🗄️ Database Schema

### Users Table
```javascript
{
  id: INTEGER (PK, AUTO_INCREMENT),
  email: STRING (UNIQUE),
  password: STRING (hashed with bcrypt),
  created_at: DATE,
  updated_at: DATE
}
```

### Categories Table
```javascript
{
  id: INTEGER (PK, AUTO_INCREMENT),
  unique_id: STRING(36) (UUID, UNIQUE, auto-generated),
  name: STRING (UNIQUE),
  created_at: DATE,
  updated_at: DATE
}
```

### Products Table
```javascript
{
  id: INTEGER (PK, AUTO_INCREMENT),
  unique_id: STRING(36) (UUID, UNIQUE, auto-generated),
  name: STRING,
  image: STRING,
  price: DECIMAL(10,2),
  category_id: INTEGER (FK -> categories.id),
  created_at: DATE,
  updated_at: DATE
}
```

## 🔧 Sequelize Models

### User Model Features
- **Password Hashing**: Automatic bcrypt hashing via `beforeCreate` and `beforeUpdate` hooks
- **Password Verification**: Instance method `verifyPassword(password)`
- **JSON Serialization**: Password automatically excluded from JSON output

### Category Model Features
- **UUID Generation**: Auto-generates UUID via `beforeCreate` hook
- **Associations**: `hasMany` relationship with Products
- **Cascade Delete**: Deleting category deletes associated products

### Product Model Features
- **UUID Generation**: Auto-generates UUID via `beforeCreate` hook
- **Associations**: `belongsTo` relationship with Category
- **Validation**: Price validation (minimum 0, decimal)

## 📝 Creating New Migrations

```bash
# Generate a new migration file
npx sequelize-cli migration:generate --name migration-name

# Example: Add new column
npx sequelize-cli migration:generate --name add-description-to-products
```

## 📝 Creating New Seeders

```bash
# Generate a new seeder file
npx sequelize-cli seed:generate --name seeder-name

# Example: Add more demo data
npx sequelize-cli seed:generate --name add-more-products
```

## 🔄 Migration Examples

### Example Migration File

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tablename', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // ... other columns
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tablename');
  }
};
```

## 🌱 Seeder Examples

### Example Seeder File

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tablename', [
      {
        column1: 'value1',
        column2: 'value2',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tablename', null, {});
  }
};
```

## 🔍 Using Models in Controllers

```javascript
const { User, Category, Product } = require('../models');

// Find all
const users = await User.findAll();

// Find by primary key
const user = await User.findByPk(1);

// Find one with condition
const user = await User.findOne({ where: { email: 'user@example.com' } });

// Create
const user = await User.create({ email: 'new@example.com', password: 'password123' });

// Update
await user.update({ email: 'updated@example.com' });

// Delete
await user.destroy();

// With associations
const products = await Product.findAll({
  include: [{
    model: Category,
    as: 'category'
  }]
});

// Pagination
const { count, rows } = await Product.findAndCountAll({
  limit: 10,
  offset: 0,
  order: [['created_at', 'DESC']]
});
```

## 🔐 Environment Variables

Create a `.env` file with:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=product_management
DB_PORT=3306

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# Server
PORT=3000
NODE_ENV=development
```

## ✅ Demo Data

After running `npm run db:seed`, you'll have:

### Users
- `admin@example.com` / `password123`
- `user@example.com` / `password123`

### Categories
- Electronics
- Clothing
- Books
- Home & Kitchen
- Sports

### Products
- 10 demo products in Electronics category

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check MySQL is running
mysql.server status

# Start MySQL
mysql.server start

# Verify credentials in .env file
```

### Migration Errors
```bash
# Undo last migration
npm run db:migrate:undo

# Undo all and start fresh
npm run db:migrate:undo:all
npm run db:migrate
```

### Seeder Errors
```bash
# Undo all seeders
npm run db:seed:undo

# Run seeders again
npm run db:seed
```

### Reset Everything
```bash
# Complete reset (careful - deletes all data!)
npm run db:drop
npm run db:setup
```

## 📚 Sequelize Resources

- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [Migrations Guide](https://sequelize.org/docs/v6/other-topics/migrations/)
- [Model Basics](https://sequelize.org/docs/v6/core-concepts/model-basics/)
- [Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)

## 🎯 Benefits of Using Sequelize

✅ **Type Safety**: Models provide structure and validation
✅ **Migrations**: Version control for database schema
✅ **Seeders**: Easy test data management
✅ **Associations**: Clean relationship handling
✅ **Query Builder**: Prevent SQL injection
✅ **Hooks**: Automatic actions (password hashing, UUID generation)
✅ **Database Agnostic**: Easy to switch databases
✅ **Production Ready**: Battle-tested ORM

## 🚦 Quick Start Commands

```bash
# First time setup
cd backend
npm install
npm run db:setup
npm run dev

# Access API
curl http://localhost:3000/health
```

---

**That's it! Your backend is now using Sequelize ORM following industry best practices.** 🎉
