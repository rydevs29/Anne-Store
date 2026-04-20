import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

// Kita gunakan data dummy yang sama agar produknya bisa ditemukan
const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Aesthetic Desk Lamp",
    price: 150000,
    description: "Lampu meja minimalis dengan cahaya hangat, cocok untuk dekorasi kamar atau meja kerjaku. Material premium yang kokoh dengan desain modern.",
    image_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
    stock: 10,
  },
  {
    id: "2",
    name: "Scented Candle - Vanilla",
    price: 85000,
    description: "Lilin aromaterapi dengan wangi vanilla yang menenangkan. Terbuat dari bahan alami yang aman, cocok untuk teman bersantai di malam hari.",
    image_url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    stock: 15,
  },
  {
    id: "3",
    name: "Ceramic Mug",
    price: 65000,
    description: "Gelas keramik bergaya rustic untuk menemani ngopi pagi. Desain estetik dan tebal, menjaga suhu minuman lebih lama.",
    image_url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop",
    stock: 20,
  },
];

export default function ProductDetail({ params }: { params: { id: string } }) {
  // Mencari data produk yang diklik berdasarkan ID di URL
  const product = dummyProducts.find((p) => p.id === params.id);

  // Jika ID asal-asalan diketik di URL, tampilkan halaman ini
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-soft-pink text-dark-gray">
        <h1 className="text-3xl font-serif mb-4">Produk Tidak Ditemukan</h1>
        <Link href="/" className="px-6 py-2 bg-gold text-white rounded-full hover:bg-gold-hover transition-colors">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <main className="min-h-screen bg-soft-pink text-dark-gray font-sans pb-12">
      {/* Header Simple */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium flex items-center hover:text-gold transition-colors">
            <span className="mr-2">←</span> Kembali
          </Link>
          <h1 className="text-2xl font-serif tracking-tight text-dark-gray italic">
            Anne <span className="text-gold">Store</span>
          </h1>
          <Link href="/checkout" className="text-sm font-medium hover:text-gold transition-colors">
            Keranjang
          </Link>
        </div>
      </header>

      {/* Konten Utama Detail Produk */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-ivory rounded-3xl p-6 md:p-10 shadow-sm border border-white flex flex-col md:flex-row gap-10">
          
          {/* Bagian Kiri: Gambar Produk */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-inner">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Bagian Kanan: Informasi Produk */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-gold text-sm font-bold tracking-wider uppercase mb-2">
              Koleksi Eksklusif
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark-gray mb-4">
              {product.name}
            </h1>
            
            <p className="text-2xl font-bold text-gold mb-6">
              {formattedPrice}
            </p>
            
            <div className="bg-white/50 rounded-xl p-5 mb-8 border border-gray-100">
              <h3 className="font-bold text-sm mb-2 text-dark-gray">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-auto flex gap-4">
              {/* Tombol Utama yang Mengarah ke Checkout */}
              <Link 
                href="/checkout"
                className="flex-1 bg-gold hover:bg-gold-hover text-white text-center font-bold py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-1"
              >
                Beli Sekarang
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
