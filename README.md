# Node.js Machine Test — Category & Product Management

A simple web application built for the Node.js machine test assignment.
It covers Category and Product CRUD operations with server-side pagination.

---

## Tech Stack

| Layer        | Technology          |
|--------------|---------------------|
| Runtime      | Node.js             |
| Framework    | Express.js          |
| View Engine  | EJS                 |
| Database     | MySQL (RDBMS)       |
| Styling      | Bootstrap 5 (CDN)   |
| DB Driver    | mysql2              |

---

## Features

- Category Master — List, Add, Edit, Delete
- Product Master — List, Add, Edit, Delete
- Product list shows ProductId, ProductName, CategoryId, CategoryName (via SQL JOIN)
- Server-side pagination — page size 10, only current page records pulled from DB using LIMIT and OFFSET

---

## Project Structure

```
project/
├── db.js                  ← MySQL connection
├── index.js               ← App entry point
├── schema.sql             ← Run this to set up the database
├── README.md
├── package.json
├── routes/
│   ├── category.js        ← Category routes
│   └── product.js         ← Product routes
└── views/
    ├── partials/
    │   └── header.ejs     ← Shared navbar
    ├── categoryList.ejs
    ├── categoryForm.ejs
    ├── productList.ejs
    └── productForm.ejs
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [MySQL](https://dev.mysql.com/downloads/) v5.7 or higher
- MySQL Workbench or any MySQL client

---

## Setup Instructions

### Step 1 — Clone or Download the Project and Database Setup


```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

Open MySQL Workbench and run the schema.sql file included in this project.
It will create the database, both tables, and insert sample data automatically.

```bash
# Or run via terminal
mysql -u root -p < schema.sql
```

### Step 2 — Configure Database Connection

Open db.js and update with your MySQL credentials:

```js
const db = mysql.createPool({
    host    : 'localhost',
    user    : 'root',           // your MySQL username
    password: 'your_password',  // your MySQL password
    database: 'nimap_products'
});
```

### Step 3 — Install Dependencies
```bash
npm install
```

This will install all required packages: express, mysql2, and ejs.

If for any reason packages are missing, install them manually:
```bash
npm install express mysql2 ejs
```

### Step 4 — Run the App

```bash
node index.js
```

### Step 5 — Open in Browser

```
http://localhost:3000
```

You will land on the Category list page automatically.

---

## How Pagination Works

The product list uses server-side pagination with a page size of 10.

Only the records for the current page are pulled from MySQL using LIMIT and OFFSET.

| Page | Records Fetched | SQL Used              |
|------|-----------------|-----------------------|
| 1    | 1  to 10        | LIMIT 10 OFFSET 0     |
| 2    | 11 to 20        | LIMIT 10 OFFSET 10    |
| 9    | 81 to 90        | LIMIT 10 OFFSET 80    |

---

## Pages Available

| Page           | URL                  |
|----------------|----------------------|
| Category List  | /categories          |
| Add Category   | /categories/add      |
| Edit Category  | /categories/edit/:id |
| Product List   | /products            |
| Add Product    | /products/add        |
| Edit Product   | /products/edit/:id   |
