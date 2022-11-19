------------
---Tables---
------------

---Pantry---
DROP TABLE IF EXISTS pantry cascade;

CREATE TABLE "pantry"(
    "id" BIGSERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pantry_ingredient" VARCHAR(255) NOT NULL,
    "expiry_date" BIGINT NOT NULL,
    "category" VARCHAR(255) NOT NULL
);

ALTER TABLE
    "pantry" ADD PRIMARY KEY("id");

---Favorites---
DROP TABLE IF EXISTS favorites cascade;

CREATE TABLE "favorites"(
    "id" BIGSERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL
);

ALTER TABLE
    "favorites" ADD PRIMARY KEY("id");

---Users---
DROP TABLE IF EXISTS users cascade;

CREATE TABLE "users"(
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL
);

ALTER TABLE
    "users" ADD PRIMARY KEY("id");

---Recipes---
DROP TABLE IF EXISTS recipes cascade;

CREATE TABLE "recipes"(
    "id" BIGSERIAL NOT NULL,
    "recipe_name" VARCHAR(255) NOT NULL,
    "instructions" VARCHAR[] NOT NULL,
    "link" VARCHAR(255) NOT NULL
);

ALTER TABLE
    "recipes" ADD PRIMARY KEY("id");

---Recipe_Ingredients---
DROP TABLE IF EXISTS recipe_ingredients cascade;

CREATE TABLE "recipe_ingredients"(
    "id" BIGSERIAL NOT NULL,
    "recipes_id" INTEGER NOT NULL,
    "ingredients_id" INTEGER NOT NULL
);

ALTER TABLE
    "recipe_ingredients" ADD PRIMARY KEY("id");

---Ingredients---
DROP TABLE IF EXISTS ingredients cascade;

CREATE TABLE "ingredients"(
    "id" BIGSERIAL NOT NULL,
    "ingredient_name" VARCHAR(255) NOT NULL
);

ALTER TABLE
    "ingredients" ADD PRIMARY KEY("id");
-------------
---Imports---
-------------



------------------
---Foreign Keys---
------------------
ALTER TABLE
    "pantry" ADD CONSTRAINT "pantry_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "favorites" ADD CONSTRAINT "favorites_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredients_id_foreign" FOREIGN KEY("ingredients_id") REFERENCES "ingredients"("id");
ALTER TABLE
    "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipes_id_foreign" FOREIGN KEY("recipes_id") REFERENCES "recipes"("id");
ALTER TABLE
    "favorites" ADD CONSTRAINT "favorites_recipe_id_foreign" FOREIGN KEY("recipe_id") REFERENCES "recipes"("id");

--------------
---Indexing---
--------------