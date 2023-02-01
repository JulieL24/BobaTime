DROP TABLE IF EXISTS favorite_stores; 

CREATE TABLE favorite_stores(
    favorite_store_id SERIAL NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    business_id TEXT NOT NULL,
    business_name TEXT NOT NULL,
    business_url TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT setval('favorite_stores_favorite_store_id_seq', (SELECT MAX(favorite_store_id) + 1 FROM favorite_stores));
