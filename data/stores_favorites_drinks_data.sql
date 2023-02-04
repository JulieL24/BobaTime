DROP TABLE IF EXISTS favorite_stores; 

CREATE TABLE stores(
    store_id SERIAL NOT NULL UNIQUE,
    store_name TEXT NOT NULL,
    store_url TEXT NOT NULL,
    image_url TEXT NOT NULL,
    rating REAL NOT NULL,
    phone TEXT NULL,
    location TEXT NOT NULL
);

CREATE TABLE favorite_stores(
    favorite_store_id SERIAL NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    store_id TEXT NOT NULL REFERENCES stores("business_id") ON DELETE CASCADE
);

SELECT setval('stores_store_id_seq', (SELECT MAX(store_id) + 1 FROM stores));
SELECT setval('favorite_stores_favorite_store_id_seq', (SELECT MAX(favorite_store_id) + 1 FROM favorite_stores));
