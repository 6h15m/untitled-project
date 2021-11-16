-- 초기화
DROP TABLE big_categories;
DROP TABLE small_categories;
DROP TABLE products;
DROP TABLE users;
DROP TABLE tags;
DROP TABLE options;
DROP TABLE option_properties;

CREATE TABLE big_categories (
    big_category_id INT PRIMARY KEY,
    big_category_name VARCHAR
);

CREATE TABLE small_categories (
    small_category_id INT PRIMARY KEY,
    small_category_name VARCHAR,
    big_category_id INT,
    FOREIGN KEY (big_category_id) REFERENCES big_categories (big_category_id)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR,
    small_category_id INT,
    FOREIGN KEY (small_category_id) REFERENCES small_categories (small_category_id)
);

CREATE TABLE users (
    user_id VARCHAR PRIMARY KEY,
    user_password VARCHAR,
    user_role VARCHAR
);

CREATE TABLE tags (
    tag_id INT PRIMARY KEY,
    tag_name VARCHAR
);

CREATE TABLE options (
    option_id INT PRIMARY KEY,
    option_name VARCHAR
);

CREATE TABLE option_properties (
    option_property_id INT PRIMARY KEY,
    option_property_name VARCHAR,
    option_property_additional_price INT,
    option_id INT,
    FOREIGN KEY (option_id) REFERENCES options (option_id)
);

-- 중간 테이블
CREATE TABLE products_tags (
    product_id INT,
    tag_id INT,
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (tag_id) REFERENCES tags (tag_id)
);

CREATE TABLE products_options (
    product_id INT,
    option_id INT,
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (option_id) REFERENCES options (option_id)
);

-- 장바구니 관련 테이블
CREATE TABLE detailed_products (
    detailed_product_id INT PRIMARY KEY,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE detailed_products_option_properties (
    detailed_product_id INT,
    option_property_id INT,
    FOREIGN KEY (detailed_product_id) REFERENCES detailed_products (detailed_product_id),
    FOREIGN KEY (option_property_id) REFERENCES option_properties (option_property_id)
);

CREATE TABLE carts (
    user_id VARCHAR,
    detailed_product_id INT,
    cart_product_amount INT,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (detailed_product_id) REFERENCES detailed_products (detailed_product_id)
);

INSERT INTO big_categories VALUES
    (1, 'Apparel'),
    (2, 'Accessories'),
    (3, 'Stationary');

INSERT INTO small_categories VALUES
    (1, 'Hoodies', 1),
    (2, 'T-shirts', 1),
    (3, 'Pants', 1),
    (4, 'Pouches', 2),
    (5, 'Bags', 2),
    (6, 'Keychains', 2),
    (7, 'Jewelry', 2),
    (8, 'Tin Cases', 3),
    (9, 'Mouse Pads', 3),
    (10, 'Pens', 3);

INSERT INTO products VALUES
    (1, 'Overweight Hoodie', 1),
    (2, 'Crop Hoodie', 1),
    (3, 'Crop T-shirt', 2),
    (4, 'Character T-shirt', 2),
    (5, 'Half Pants', 3),
    (6, 'Wide-fit Pants', 3),
    (7, 'Cross Bag', 5),
    (8, 'Tote Bag', 5),
    (9, 'Eco Bag', 5),
    (10, 'Necklace', 7),
    (11, 'Steel Ring', 7),
    (12, 'Square Tin Case', 8),
    (13, 'Circle Tin Case', 8),
    (14, 'Long Mouse Pad', 9),
    (15, 'Short Mouse Pad', 9),
    (16, 'Clip Pen', 10);

INSERT INTO users VALUES
    ('test_a', 'test_a', 'admin'),
    ('test_c', 'test_c', 'customer');

INSERT INTO tags VALUES
    (1, 'Trendy'),
    (2, 'Modern'),
    (3, 'Useful'),
    (4, 'Summer'),
    (5, 'Deskterior');

INSERT INTO options VALUES
    (1, 'Color'),
    (2, 'Size');

INSERT INTO option_properties VALUES
    (1, 'Red', 0, 1),
    (2, 'Black', 0, 1),
    (3, 'Blue', 0, 1),
    (4, 'White', 0, 1),
    (5, 'S', 0, 2),
    (6, 'M', 2000, 2),
    (7, 'L', 5000, 2),
    (8, 'XL', 7000, 2);

INSERT INTO products_tags VALUES
    (1, 1),
    (3, 1),
    (3, 4),
    (8, 2),
    (11, 2),
    (14, 5),
    (15, 5),
    (16, 3);

INSERT INTO products_options VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2),
    (10, 1),
    (11, 1),
    (16, 1);