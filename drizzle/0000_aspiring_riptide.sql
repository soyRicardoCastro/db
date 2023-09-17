CREATE TABLE IF NOT EXISTS "categorias" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(256),
	"descripcion" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(256),
	"precio" integer,
	"valor" integer,
	"stock" integer,
	"fecha_creacion" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products_to_categories" (
	"product_id" integer NOT NULL,
	"categorie_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products_to_categories" ADD CONSTRAINT "products_to_categories_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products_to_categories" ADD CONSTRAINT "products_to_categories_categorie_id_categorias_id_fk" FOREIGN KEY ("categorie_id") REFERENCES "categorias"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
