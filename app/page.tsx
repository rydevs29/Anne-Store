import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

// Nanti ini diganti dengan fetch data dari Supabase.
// Ini data dummy sementara agar UI bisa langsung terlihat.
const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Aesthetic Desk Lamp",
    price: 150000,
    description: "Lampu meja minimalis dengan cahaya hangat, cocok untuk dekorasi kamar atau meja kerjaku.",
    image_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
    stock: 10,
  },
  {
    id: "2",
    name: "Scented Candle - Vanilla",
    price: 85000,
    description: "Lilin aromaterapi dengan wangi vanilla yang menenangkan.",
    image_url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    stock: 15,
  },
  {
    id: "3",
    name: "Ceramic Mug",
    price: 65000,
    description: "Gelas keramik bergaya rustic untuk menemani ngopi pagi.",
    image_url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
    stock: 20,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-dark-gray font-sans selection:bg-soft-pink selection:text-dark-gray">
      
      {/* Header / Hero Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-dark-gray">
            Anne<span className="text-gold">Store</span>.
          </h1>
          <nav>
            <button className="text-sm font-medium bg-soft-pink/30 text-dark-gray px-4 py-2 rounded-full hover:bg-soft-pink/50 transition-colors">
              Keranjang (0)
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Temukan Barang Favoritmu
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Koleksi barang-barang estetik dan berkualitas yang dipilih langsung untuk melengkapi gaya hidupmu.
          </p>
        </div>

        {/* Product Grid - Responsif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </main>
  );
}
