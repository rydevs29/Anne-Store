import Image from "next/image";
import Link from "next/link"; // Tambahan: Import Link untuk pindah halaman
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  // Format harga ke Rupiah
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    // 1. Tag <div> terluar diganti jadi <Link> biar seluruh kartu bisa diklik
    // 2. "bg-white" diganti jadi "bg-ivory" sesuai request Bu Triana
    <Link 
      href={`/product/${product.id}`} 
      className="group flex flex-col bg-ivory rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
    >
      {/* Area Gambar */}
      <div className="relative w-full aspect-square bg-soft-pink/20 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Area Teks & Tombol */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-dark-gray mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
          <span className="text-gold font-bold text-lg">
            {formattedPrice}
          </span>
          {/* Tag <button> diganti <div> agar tidak error saat dibungkus <Link> */}
          <div className="bg-gold group-hover:bg-gold-hover text-white text-sm font-medium px-4 py-2 rounded-full transition-colors shadow-sm">
            Beli
          </div>
        </div>
      </div>
    </Link>
  );
}
