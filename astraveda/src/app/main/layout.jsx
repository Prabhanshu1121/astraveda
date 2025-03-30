export default function ProductsLayout({
    children,
    category,
    product
  }: {
    children: React.ReactNode
    category: React.ReactNode
    product: React.ReactNode
  }) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Category sidebar - shows in all views */}
          <aside className="md:w-1/4">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <CategoryList />
            {category}
          </aside>
  
          {/* Main content area */}
          <main className="flex-1">
            {product || children}
          </main>
        </div>
      </div>
    )
  }