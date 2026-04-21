import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// Fungsi untuk mengambil data dari database
async function getProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Gagal mengambil data:", error);
    return [];
  }
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-soft-pink text-dark-gray font-sans">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-serif tracking-tight text-dark-gray italic">
            Anne <span className="text-gold">Store</span>
          </h1>
          <nav>
            <Link 
              href="/checkout" 
              className="bg-gold hover:bg-gold-hover text-white px-5 py-2 rounded-full text-sm font-bold shadow-md transition-all"
            >
              Keranjang ({products.length > 0 ? "!" : "0"})
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Temukan Barang Favoritmu</h2>
          <p className="text-gray-600 italic max-w-2xl mx-auto">
            Koleksi pilihan yang diambil langsung dari database kami.
          </p>
        </div>

        {/* Jika produk kosong */}
        {products.length === 0 && (
          <p className="text-center text-gray-500 italic">Belum ada produk yang tersedia.</p>
        )}

        {/* Tampilan Grid Produk Asli */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
