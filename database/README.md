# Database Setup

This directory contains database initialization scripts.

## Files

- `init.sql` - SQL initialization script that creates the database schema and inserts sample data

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Usage

The database is automatically initialized when the MySQL container starts with the `init.sql` script.
