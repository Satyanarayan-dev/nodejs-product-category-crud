CREATE Database nimap_products;
USE nimap_products;

CREATE TABLE Category (
    CategoryId   INT AUTO_INCREMENT,
    CategoryName VARCHAR(100) NOT NULL,
    PRIMARY KEY (CategoryId)
);


CREATE TABLE Product (
    ProductId   INT AUTO_INCREMENT,
    ProductName VARCHAR(100) NOT NULL,
    CategoryId  INT,
    PRIMARY KEY (ProductId),
    CONSTRAINT fk_category
        FOREIGN KEY (CategoryId)
        REFERENCES Category(CategoryId)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

INSERT INTO Category (CategoryName) VALUES ('Electronics');
INSERT INTO Category (CategoryName) VALUES ('Clothing');
INSERT INTO Category (CategoryName) VALUES ('Furniture');
INSERT INTO Category (CategoryName) VALUES ('Books');
INSERT INTO Category (CategoryName) VALUES ('Sports');

INSERT INTO Product (ProductName, CategoryId) VALUES ('Laptop',         1);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Smartphone',     1);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Headphones',     1);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Smart Watch',    1);
INSERT INTO Product (ProductName, CategoryId) VALUES ('T-Shirt',        2);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Jeans',          2);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Jacket',         2);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Dining Table',   3);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Office Chair',   3);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Bookshelf',      3);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Sofa',           3);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Node.js Book',   4);
INSERT INTO Product (ProductName, CategoryId) VALUES ('MySQL Guide',    4);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Cricket Bat',    5);
INSERT INTO Product (ProductName, CategoryId) VALUES ('Football',       5);
