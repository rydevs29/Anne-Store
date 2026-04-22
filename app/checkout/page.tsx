"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// Komponen utama dalam Suspense agar useSearchParams tidak error saat build
function CheckoutContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ambil data produk secara real-time berdasarkan ID dari URL
  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (data) setProduct(data);
      setIsLoading(false);
    }
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;
    
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const customerName = formData.get("name") as string;
    const customerWa = formData.get("whatsapp") as string;
    const customerEmail = formData.get("email") as string;

    const adminWaNumber = "6281285433850";
    const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency", currency: "IDR", minimumFractionDigits: 0
    }).format(product.price);

    const message = `Halo Anne Store! 🛍️\nSaya ingin memesan:\n\n*Detail Pemesan:*\n- Nama: ${customerName}\n- No. HP: ${customerWa}\n- Email: ${customerEmail}\n\n*Ringkasan Pesanan:*\n- Produk: ${product.name}\n- Total Pembayaran: *${formattedPrice}*\n\nMohon info nomor rekeningnya ya. Terima kasih! ✨`;

    const waUrl = `https://wa.me/${adminWaNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(waUrl, "_blank");
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-pink">
        <p className="animate-pulse text-gold font-bold italic">Memuat detail pesanan...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-soft-pink p-4 text-center">
        <h1 className="text-2xl font-serif mb-4 text-dark-gray">Ups! Produk tidak ditemukan</h1>
        <Link href="/" className="bg-gold text-white px-6 py-2 rounded-full font-bold">Kembali Belanja</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-soft-pink py-12 px-4 font-sans text-dark-gray">
      <div className="max-w-2xl mx-auto">
        <Link href={`/product/${product.id}`} className="inline-block mb-6 text-sm font-medium hover:text-gold transition-colors">
          ← Kembali
        </Link>

        <div className="bg-ivory rounded-3xl shadow-sm p-6 sm:p-10 border border-white">
          <h1 className="text-3xl font-serif font-bold text-dark-gray mb-2">Selesaikan Pesanan</h1>
          
          <div className="bg-white/60 rounded-xl p-5 mb-8 border border-gray-100 flex items-center justify-between mt-6">
            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Produk Pilihan</h2>
              <p className="font-bold text-dark-gray text-lg">{product.name}</p>
            </div>
            <div className="text-right">
              <span className="text-gold font-bold text-xl">
                Rp {product.price.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-dark-gray mb-2">Nama Lengkap</label>
              <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none" placeholder="Nama kamu" />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-gray mb-2">WhatsApp</label>
              <input type="tel" name="whatsapp" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none" placeholder="08123..." />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-gray mb-2">Email</label>
              <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold outline-none" placeholder="email@kamu.com" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full mt-8 bg-gold hover:bg-gold-hover text-white font-bold py-4 rounded-xl transition-all shadow-md disabled:opacity-70">
              {isSubmitting ? "Menyiapkan Pesan..." : "Konfirmasi & Pesan via WA"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

// Komponen wrapper untuk menangani Suspense
export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-soft-pink"></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
