import { eq } from 'drizzle-orm'
import { db } from '../utils/db.js'
import { products } from '../utils/schema.js'

export async function getProducts (req, res) {
  const allProducts = await db.select().from(products)

  return res.status(200).json(allProducts)
}

export async function getProduct (req, res) {
  const { id } = req.params
  const product = await db.select().from(products).where(eq(products.id, id))

  if (!product) return res.status(404).json({ message: 'Not found' })

  return res.status(200).json(product)
}

export async function createProduct (req, res) {
  const { nombre, precio, stock, valor } = req.body

  const product = await db.insert(products).values({ nombre, precio, stock, valor }).returning()

  return res.status(200).json(product)
}

export async function updateProduct (req, res) {
  const { id } = req.params
  const body = req.body

  const updatedProduct = await db.update(products)
    .set(body)
    .where(eq(products.id, id))
    .returning()

  return res.status(200).json(updatedProduct)
}

export async function deleteProduct (req, res) {
  await db.delete(products).where(eq(products.id, req.params.id))

  return res.send('OK')
}
