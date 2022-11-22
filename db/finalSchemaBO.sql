---PANTRY TABLE---

DROP TABLE IF EXISTS pantry cascade;

CREATE TABLE pantry (
    id BIGSERIAL,
    user_id BIGINT NULL DEFAULT NULL,
    pantry_ingredient VARCHAR NULL DEFAULT NULL,
    expiry_date BIGINT NULL DEFAULT NULL,
    category VARCHAR NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

---FAVORITES TABLE---

DROP TABLE IF EXISTS favorites cascade;

CREATE TABLE favorites(
    id BIGSERIAL NOT NULL,
    recipe_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY(id)
);

---USERS TABLE---

DROP TABLE IF EXISTS users cascade;

CREATE TABLE users(
    id BIGSERIAL NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    PRIMARY KEY(id)
);

---RECIPES TABLE---

DROP TABLE IF EXISTS recipes cascade;

CREATE TABLE recipes(
    id BIGSERIAL NOT NULL,
    title VARCHAR NOT NULL,
    recipes_ingredients VARCHAR[] NOT NULL,
    directions VARCHAR[] NOT NULL,
    link VARCHAR NOT NULL,
    PRIMARY KEY(id)
);

COPY recipes (id, title, recipes_ingredients, directions, link)

FROM '/Users/andrewarsenault/Desktop/BOcsvs/recipes1.csv'

DELIMITER ',' CSV QUOTE '"';

---RECIPE_INGREDIENTS TABLE---

DROP TABLE IF EXISTS recipe_ingredients cascade;

CREATE TABLE recipe_ingredients(
    id BIGSERIAL NOT NULL,
    recipes_id BIGINT NOT NULL,
    ingredients_name VARCHAR NOT NULL,
    PRIMARY KEY(id)
);

COPY recipe_ingredients (ingredients_name, recipes_id)

FROM '/Users/andrewarsenault/Desktop/BOcsvs/bo-ingredients.csv'

DELIMITER ',' CSV HEADER QUOTE '"';

 ---FOREIGN KEYS---
ALTER TABLE
    pantry ADD CONSTRAINT pantry_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id);
ALTER TABLE
    favorites ADD CONSTRAINT favorites_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id);
ALTER TABLE
    recipe_ingredients ADD CONSTRAINT recipe_ingredients_recipes_id_foreign FOREIGN KEY(recipes_id) REFERENCES recipes(id);
ALTER TABLE
    favorites ADD CONSTRAINT favorites_recipe_id_foreign FOREIGN KEY(recipe_id) REFERENCES recipes(id);

---EXTENSIONS---
CREATE EXTENSION IF NOT EXISTS pg_trgm;

---INDEXING---
CREATE INDEX pantry_pantry_ingredient ON pantry (pantry_ingredient);
CREATE INDEX users_email ON users (email);

CREATE INDEX IF NOT EXISTS ingredients_name_gist
    ON public.recipe_ingredients USING gist
    (ingredients_name COLLATE pg_catalog."default" gist_trgm_ops)
    INCLUDE(ingredients_name)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.recipe_ingredients
    CLUSTER ON ingredients_name_gist;

---INSERT DEFAULT USER---
INSERT INTO users (email) values ('guest')

-- ---SELECT MAX PKEY---
-- SELECT setval('favorites_id_seq', COALESCE((SELECT MAX(id)+1 FROM favorites), 1), false);

-- SELECT setval('recipe_ingredients_id_seq', COALESCE((SELECT MAX(id)+1 FROM recipe_ingredients), 1), false);

-- SELECT setval('pantry_id_seq', COALESCE((SELECT MAX(id)+1 FROM pantry), 1), false);

-- SELECT setval('recipes_id_seq', COALESCE((SELECT MAX(id)+1 FROM recipes), 1), false);

-- SELECT setval('users_id_seq', COALESCE((SELECT MAX(id)+1 FROM users), 1), false);

