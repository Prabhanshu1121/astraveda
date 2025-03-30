import ProductGrid from '@/components/products/ProductGrid'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const products = await fetchProductsByCategory(params.category)
  
  return (
    <div>
      <h1 className="text-2xl font-bold capitalize mb-6">
        {params.category.replace('-', ' ')}
      </h1>
      <ProductGrid products={products} />
    </div>
  )
}

async function fetchProductsByCategory(category: string) {
  const res = await fetch(`http://localhost:3000/api/products/category/${category}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}