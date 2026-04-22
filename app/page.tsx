import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// BARIS SAKTI: Memaksa Vercel untuk selalu mengambil data terbaru detik itu juga
export const revalidate = 0;

// Fungsi mengambil data asli dari Supabase
async function getProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return products || [];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-soft-pink text-dark-gray font-sans">
      
      {/* Header / Hero Section */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-serif tracking-tight text-dark-gray italic">
            Anne <span className="text-gold">Store</span>
          </h1>
          <nav>
            <Link 
              href="/checkout" 
              className="inline-block bg-gold hover:bg-gold-hover text-white px-5 py-2 rounded-full text-sm font-bold shadow-md transition-all"
            >
              Keranjang ({products.length})
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Temukan Barang Favoritmu
          </h2>
          <p className="text-gray-600 italic max-w-2xl mx-auto">
            Koleksi pilihan yang diambil langsung dari database kami.
          </p>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 italic">Belum ada produk di database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
