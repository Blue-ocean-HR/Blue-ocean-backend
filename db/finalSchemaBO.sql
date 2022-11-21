DROP TABLE IF EXISTS pantry cascade;

CREATE TABLE pantry(
    id BIGSERIAL NOT NULL,
    user_id BIGINT NOT NULL,
    pantry_ingredient VARCHAR() NOT NULL,
    expiry_date BIGINT NOT NULL,
    category VARCHAR() NOT NULL
);

ALTER TABLE
    pantry ADD PRIMARY KEY(id);

DROP TABLE IF EXISTS favorites cascade;

CREATE TABLE favorites(
    id BIGSERIAL NOT NULL,
    recipe_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL
);

ALTER TABLE
    favorites ADD PRIMARY KEY(id);

DROP TABLE IF EXISTS users cascade;

CREATE TABLE users(
    id BIGSERIAL NOT NULL,
    email VARCHAR() NOT NULL
);

ALTER TABLE
    users ADD PRIMARY KEY(id);

DROP TABLE IF EXISTS recipes cascade;

CREATE TABLE recipes(
    id BIGSERIAL NOT NULL,
    title VARCHAR() NOT NULL,
    recipes_ingredients VARCHAR[] NOT NULL,
    directions VARCHAR[] NOT NULL,
    link VARCHAR() NOT NULL,
    source VARCHAR() NOT NULL
);

ALTER TABLE
    recipes ADD PRIMARY KEY(id);

COPY recipes (id, answer_id, url)

FROM '/Users/andrewarsenault/Desktop/BOcsvs/recipes.csv'

DELIMITER ',' CSV QUOTE '\"';""

DROP TABLE IF EXISTS recipe_ingredients cascade;

CREATE TABLE recipe_ingredients(
    id BIGSERIAL NOT NULL,
    recipes_id BIGINT NOT NULL,
    ingredients_name VARCHAR() NOT NULL
);

ALTER TABLE
    recipe_ingredients ADD PRIMARY KEY(id);

COPY recipe_ingredients (id, ingredients_name, recipes_id)

FROM '/Users/andrewarsenault/Desktop/BOcsvs/bo-ingredients.csv'

DELIMITER ',' CSV HEADER QUOTE '\"';""


 ---FK---
ALTER TABLE
    pantry ADD CONSTRAINT pantry_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id);
ALTER TABLE
    favorites ADD CONSTRAINT favorites_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id);
ALTER TABLE
    recipe_ingredients ADD CONSTRAINT recipe_ingredients_recipes_id_foreign FOREIGN KEY(recipes_id) REFERENCES recipes(id);
ALTER TABLE
    favorites ADD CONSTRAINT favorites_recipe_id_foreign FOREIGN KEY(recipe_id) REFERENCES recipes(id);