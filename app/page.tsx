import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

// JANGAN DIHAPUS: Ini data dummy sementara agar UI terlihat ada isinya
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
    // Background utama diubah jadi Pink (bg-soft-pink)
    <main className="min-h-screen bg-soft-pink text-dark-gray font-sans">
      
      {/* Header / Hero Section */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          {/* Logo dengan font feminim (serif), miring (italic), dan TANPA titik */}
          <h1 className="text-3xl font-serif tracking-tight text-dark-gray italic">
            Anne <span className="text-gold">Store</span>
          </h1>
          <nav>
            {/* Tombol Keranjang warna Emas (Gold) */}
            <button className="bg-gold hover:bg-gold-hover text-white px-5 py-2 rounded-full text-sm font-bold shadow-md transition-all">
              Keranjang (0)
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          {/* Font judul juga diubah jadi serif agar lebih feminim */}
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Temukan Barang Favoritmu
          </h2>
          <p className="text-gray-600 italic max-w-2xl mx-auto">
            Koleksi barang-barang estetik dan berkualitas yang dipilih langsung untuk melengkapi gaya hidupmu.
          </p>
        </div>

        {/* Product Grid - Tetap memanggil komponen ProductCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </main>
  );
}
