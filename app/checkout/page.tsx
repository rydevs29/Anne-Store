"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Data dummy produk yang sedang dibeli (Nanti diambil dari state/keranjang)
  const product = {
    name: "Aesthetic Desk Lamp",
    price: 150000,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Ambil data dari form
    const formData = new FormData(e.currentTarget);
    const data = {
      customer_name: formData.get("name"),
      whatsapp: formData.get("whatsapp"),
      email: formData.get("email"),
      product_name: product.name,
      total_price: product.price,
    };

    // Nanti di sini kita akan panggil API Route (fetch '/api/orders') 
    // untuk simpan ke Supabase dan trigger Resend Email
    
    setTimeout(() => {
      alert("Pesanan berhasil dibuat! Silakan cek WA/Email kamu.");
      // Redirect atau memunculkan link WhatsApp di sini
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ivory py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-10 border border-gray-100">
        <h1 className="text-2xl font-bold text-dark-gray mb-6">Selesaikan Pesanan</h1>
        
        {/* Ringkasan Pesanan */}
        <div className="bg-soft-pink/10 rounded-xl p-4 mb-8 border border-soft-pink/30">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">Ringkasan Pesanan</h2>
          <div className="flex justify-between items-center text-dark-gray font-medium">
            <span>{product.name}</span>
            <span>Rp {product.price.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-dark-gray mb-1">Nama Lengkap</label>
            <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-soft-pink focus:outline-none" placeholder="Masukkan nama kamu" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-gray mb-1">Nomor WhatsApp</label>
            <input type="tel" name="whatsapp" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-soft-pink focus:outline-none" placeholder="08123456789" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-gray mb-1">Email (Untuk Invoice)</label>
            <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-soft-pink focus:outline-none" placeholder="email@contoh.com" />
          </div>

          <button type="submit" disabled={isLoading} className="w-full mt-6 bg-gold hover:bg-gold-hover text-white font-bold py-3 rounded-xl transition-colors shadow-sm disabled:opacity-70">
            {isLoading ? "Memproses..." : "Pesan & Konfirmasi Pembayaran"}
          </button>
        </form>
      </div>
    </div>
  );
}
