-- 초기화
DROP TABLE big_categories CASCADE;
DROP TABLE small_categories CASCADE;
DROP TABLE products CASCADE;
DROP TABLE users CASCADE;
DROP TABLE tags CASCADE;
DROP TABLE options CASCADE;
DROP TABLE option_properties CASCADE;
DROP TABLE detailed_products CASCADE;
DROP TABLE detailed_products_option_properties;
DROP TABLE carts;
DROP TABLE products_tags CASCADE;
DROP TABLE products_options CASCADE;

CREATE TABLE big_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE small_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    big_category_id INT,
    FOREIGN KEY (big_category_id) REFERENCES big_categories (id)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    price INT,
    small_category_id INT,
    FOREIGN KEY (small_category_id) REFERENCES small_categories (id)
);

CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    password VARCHAR,
    role VARCHAR
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE option_properties (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    additional_price INT,
    base BOOLEAN,
    option_id INT,
    FOREIGN KEY (option_id) REFERENCES options (id)
);

-- 중간 테이블
CREATE TABLE products_tags (
    product_id INT,
    tag_id INT,
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (tag_id) REFERENCES tags (id)
);

CREATE TABLE products_options (
    product_id INT,
    option_id INT,
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (option_id) REFERENCES options (id)
);

-- 장바구니 관련 테이블
CREATE TABLE detailed_products (
    id SERIAL PRIMARY KEY,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE detailed_products_option_properties (
    detailed_product_id INT,
    option_property_id INT,
    FOREIGN KEY (detailed_product_id) REFERENCES detailed_products (id),
    FOREIGN KEY (option_property_id) REFERENCES option_properties (id)
);

CREATE TABLE carts (
    user_id VARCHAR,
    detailed_product_id INT,
    product_amount INT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (detailed_product_id) REFERENCES detailed_products (id)
);

-- 샘플 데이터
INSERT INTO big_categories (name) VALUES
    ('Apparel'),
    ('Accessories'),
    ('Stationary');

INSERT INTO small_categories (name, big_category_id) VALUES
    ('Hoodies', 1),
    ('T-shirts', 1),
    ('Pants', 1),
    ('Pouches', 2),
    ('Bags', 2),
    ('Keychains', 2),
    ('Jewelry', 2),
    ('Tin Cases', 3),
    ('Mouse Pads', 3),
    ('Pens', 3);

INSERT INTO products (name, price, small_category_id) VALUES
    ('Overweight Hoodie', 25000, 1),
    ('Crop Hoodie', 20000, 1),
    ('Crop T-shirt', 12000, 2),
    ('Character T-shirt', 13000, 2),
    ('Half Pants', 17000, 3),
    ('Wide-fit Pants', 18000, 3),
    ('Cross Bag', 30000, 5),
    ('Tote Bag', 32000, 5),
    ('Eco Bag', 15000, 5),
    ('Necklace', 18500, 7),
    ('Steel Ring', 16000, 7),
    ('Square Tin Case', 10000, 8),
    ('Circle Tin Case', 11000, 8),
    ('Long Mouse Pad', 16000, 9),
    ('Short Mouse Pad', 14000, 9),
    ('Clip Pen', 8000, 10);

INSERT INTO users VALUES
    ('test_a', 'test_a', 'admin'),
    ('test_c', 'test_c', 'customer');

INSERT INTO tags (name) VALUES
    ('Trendy'),
    ('Modern'),
    ('Useful'),
    ('Summer'),
    ('Deskterior');

INSERT INTO options (name) VALUES
    ('Color'),
    ('Size');

INSERT INTO option_properties (name, additional_price, base, option_id)VALUES
    ('Red', 0, true, 1),
    ('Black', 0, false, 1),
    ('Blue', 0, false, 1),
    ('White', 0, false, 1),
    ('S', 0, true, 2),
    ('M', 2000, false, 2),
    ('L', 5000, false, 2),
    ('XL', 7000, false, 2);

INSERT INTO products_tags (product_id, tag_id) VALUES
    (1, 1),
    (3, 1),
    (3, 4),
    (8, 2),
    (11, 2),
    (14, 5),
    (15, 5),
    (16, 3);

INSERT INTO products_options (product_id, option_id) VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1),
    (7, 1),
    (8, 1),
    (9, 1),
    (10, 1),
    (11, 1),
    (12, 1),
    (13, 1),
    (14, 1),
    (15, 1),
    (16, 1);