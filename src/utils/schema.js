import { integer, pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre', { length: 256 }),
  precio: integer('precio'),
  valor: integer('valor'),
  stock: integer('stock'),
  fechaDeCreacion: timestamp('fecha_creacion').defaultNow()
})

export const productsRelations = relations(products, ({ many }) => ({
  productsToCategories: many(productsToCategoriesRelations)
}))

export const categories = pgTable('categorias', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre', { length: 256 }),
  descripcion: varchar('descripcion', { length: 256 })
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  productsToCategories: many(productsToCategoriesRelations)
}))

export const productsToCategories = pgTable('products_to_categories', {
  productId: integer('product_id').notNull().references(() => products.id),
  categorieId: integer('categorie_id').notNull().references(() => categories.id)
})

export const productsToCategoriesRelations = relations(productsToCategories, ({ one }) => ({
  categorie: one(categories, {
    fields: [productsToCategories.categorieId],
    references: [categories.id]
  }),
  product: one(products, {
    fields: [productsToCategories.productId],
    references: [products.id]
  })
}))
