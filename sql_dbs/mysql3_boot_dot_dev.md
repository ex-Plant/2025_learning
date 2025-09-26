Resources:
https://www.freecodecamp.org/news/a-beginners-guide-to-sql/
https://www.youtube.com/watch?v=KBDSJU3cGkc&t=3054s

https://www.boot.dev

### 1) INTRO 

- *Structured Query Language*, or SQL, is the primary programming language used to manage and interact with relational 
databases. SQL can perform various operations such as creating, updating, reading, and deleting records within a database.

- Although many different databases use the SQL language, most of them will have their own dialect.
- a NoSQL database is a database that does not use SQL (Structured Query Language). Each NoSQL typically has its own way of writing and executing queries
- NoSQL databases are usually non-relational, SQL databases are usually relational
- SQL databases usually have a defined schema, NoSQL databases usually have dynamic schema.
- SQL databases are table-based, NoSQL databases have a variety of different storage methods, such as document, 
  key-value, graph, wide-column, and more.

# Types of NoSQL databases
- Document Database
- Key-Value Store
- Wide-Column
- Graph


# SQL Databases right now are:
- PostgreSQL
- MySQL
- Microsoft SQL Server
- SQLite

*Postgres* is a very powerful, open-source, production-ready SQL database. *SQLite* is a lightweight, embeddable, 
open-source database. SQLite is a serverless database management system (DBMS) that has the ability to run within applications, whereas PostgreSQL uses a Client-Server model and requires a server to be installed and listening on a network, similar to an HTTP server.

### SQLITE has a loose type system - you can actually insert a integer into a TEXT column and it will work ❗


### ALTERING TABLES

# *RENAME*
```sql
ALTER TABLE employees
RENAME TO staff;

ALTER TABLE staff
RENAME COLUMN salary TO invoice;
```

# *DROP ADD*
```sql
ALTER TABLE contractors
DROP COLUMN invoice;

ALTER TABLE contractors
ADD COLUMN invoice INT;
```

### MIGRATIONS
Change of a structure of a db is called a migration.
Migration is a set of changes made to the db like changing the name, dropping, adding column etc.
Good migrations are done in small steps and are ideally reversible. We have to be extra careful with migrations.
We can easily break things. If we alter table name, and our backend was already getting data from that table, it 
will break.

# UP migrations
- moves schema forward

# DOWN migrations
- roles the changes back to the previous state
- Down migrations allow us to:

Undo changes introduced by an up migration
Quickly recover from bugs or compatibility issues in production
Keep our schema consistent across environments (local, staging, production)


**UP MIGRATION**

```sql
    ALTER TABLE projects RENAME TO tasks;
    ALATER TABLE tasks RENAME COLUMN project_id TO task_id;
```

**DOWN MIGRATION**
```sql
  ALTER TABLE tasks RENAME COLUMN task_id TO project_id;
  ALTER TABLE tasks RENAME TO projects;
```

Real World Migration Tools
In real-world projects, we don't run raw SQL migrations. We use tools that help:

Track which migration have been applied.
Organize migrations in files.
Apply and roll back safely.

We can use for example Prisma Migrate when using PRISMA Orm


### DATA TYPES
IN SQLITE there are 5 data types:
- NULL
- INTEGER
- REAL (FLOAT)
- TEXT
- BLOB
- BOOLEAN - Boolean values are written in SQLite queries as true or false, but are recorded as 1 or 0.

```sql
    CREATE TABLE users(
    id INTEGER PRIMARY KEY
    NAME TEXT
    IS_ADMIN INTEGER
    SALARY REAL
    )
```

### CONSTRAINTS
 - UNIQUE
 - NOT NULL
 - PRIMARY KEY

In other dialects of SQL you can ADD CONSTRAINT within an ALTER TABLE statement. SQLite does not support this feature, so when we create our tables we need to make sure we specify all the constraints we want.

### PRIMARY KEY
 - a key is used to define and protect relationships between tables. 
 - primay key is a unique identifier for a record within the table

### FOREIGN KEYS 
 - is used to add a link between two tables, references an id from another table to create a relationship

### SCHEMA
- schema is used to describe how data is organized within a db
- it consists of table names, field names, constraints, relationships etc.


***CRUD***

### CRUD VS HTTP METHODS
- create -> POST
- read - GET
- update -> PUT
- delete -> DELETE

### HTTP CRUD DATABASE LIFECYCLE
***CREATE***
 - front end sends request to the server with some data collected via a form etc using an HTTP method like POST
 - backend receives the request and makes a query to the db using INSERT statement to create a new record
 - once the server has processed that db query was successful it responds to the front end with a status code

```sql
  INSERT INTO users values(1, 'David', 34, 'US', 'DavidDev', 'insertPractice', 0);
  INSERT INTO users values(2, 'Samantha', 29, 'BR', 'Sammy93', 'addingRecords!', 0);
```

***READ***
First, the front-end webpage loads.
The front-end sends an HTTP GET request to a /users endpoint on the back-end server.
The server receives the request.
The server uses a SELECT statement to retrieve the user's record from the users table in the database.
The server converts the row of SQL data into a JSON object and sends it back to the front-end.

### WHERE + IS NULL / IS NOT NULL
```sql
    SELECT * FROM users
    WHERE user_id IS NOT NULL;
```

***DELETE***
```sql
    DELETE FROM users
    WHERE user_id = 1;
```

Deleting data is a very dangerous operations, often impossible or very hard to revert.
Some of the common strategies to get back removed data:

- ***BACKUPS***
YOU SHOULD ALWAYS HAVE A BACKUP STRATEGY IN PLACE. Always turn on automated backups if they are supported by db 
  provider. For example daily backup that can be restored up to one month.

- ***SOFT DELETES***
It is a strategy when you do not actually delete data from your db, only mark it as deleted for example by adding a 
  field is_deleted or deleted_at

***UPDATE***
```sql
    UPDATE users
    SET name = 'John Doe'
    WHERE name IS NULL;
```

### ORM Object-Relational Mapping
- ***ORM*** is a tool that allows performing CRUD operations using a traditional programming language, usually in a 
  form of a library or framework. The main benefit of ORMs is that it maps your db records to objects. 

PROS AND CONS:
- with ORM you have *more simplicity* but *less control* than using raw SQL statements


### RELATIONAL DATABASES
- data represented in tables with *columns* or *fields* that holds attributes of the record
- each row or entry is called a *record*
- typically each record has a unique identifier called *primary key*


### NON RELATIONAL DATABASES
- main difference - they nest data instead of keeping records in separate tables
- This often results in duplicate data within the database. That's obviously less than ideal, but it does have some 
  benefits.


### TWO TYPICAL STRATEGIES USED WITH PRIMARY KEYS
## AUTOINCREMENT
- used typically on the id field to automatically generate next id value when inserting data
-  in SQLite any column that has the INTEGER PRIMARY KEY constraint will auto increment

## UUID 
- used typically on the id field to automatically generate a unique identifier for each record


## COUNT
- Use a COUNT(*) statement to retrieve the number of records in the users table.
```sql 
  SELECT COUNT(*) FROM employees;
```

## WHERE
 - used to query db with some more specific tasks

```sql
  select * from transactions;
  select * from transactions 
  where sender_id IS NOT NULL;
```

# DELETE
```sql
  DELETE FROM employees
  WHERE id = 251;
```
