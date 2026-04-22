import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Memastikan data selalu terbaru (Anti-Cache)
export const revalidate = 0;

async function getProduct(id: string) {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return product;
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-soft-pink text-dark-gray px-4">
        <h1 className="text-3xl font-serif mb-4 text-center">Produk Tidak Ditemukan</h1>
        <Link href="/" className="px-8 py-3 bg-gold text-white rounded-full hover:bg-gold-hover transition-all shadow-md font-bold">
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
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium flex items-center hover:text-gold transition-colors">
            <span className="mr-2">←</span> Kembali
          </Link>
          <h1 className="text-2xl font-serif tracking-tight text-dark-gray italic text-center flex-1">
            Anne <span className="text-gold">Store</span>
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="bg-ivory rounded-3xl p-6 md:p-10 shadow-sm border border-white flex flex-col md:flex-row gap-10">
          
          {/* Gambar Produk */}
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

          {/* Info Produk */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-gold text-sm font-bold tracking-wider uppercase mb-2">Koleksi Eksklusif</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark-gray mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-gold mb-6">{formattedPrice}</p>
            
            <div className="bg-white/50 rounded-xl p-5 mb-8 border border-gray-100">
              <h3 className="font-bold text-sm mb-2 text-dark-gray uppercase tracking-widest text-xs">Deskripsi Produk</h3>
              <p className="text-gray-600 leading-relaxed italic">{product.description}</p>
            </div>

            <div className="mt-auto">
              {/* PERUBAHAN DISINI: Mengirim ID ke checkout secara real-time */}
              <Link 
                href={`/checkout?id=${product.id}`}
                className="block w-full bg-gold hover:bg-gold-hover text-white text-center font-bold py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-1"
              >
                Pesan Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
