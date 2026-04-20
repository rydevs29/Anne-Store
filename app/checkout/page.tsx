"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Data dummy produk (Nanti kita buat agar dinamis sesuai barang yang diklik)
  const product = {
    name: "Aesthetic Desk Lamp",
    price: 150000,
  };

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Ambil data yang diketik pembeli di form
    const formData = new FormData(e.currentTarget);
    const customerName = formData.get("name") as string;
    const customerWa = formData.get("whatsapp") as string;
    const customerEmail = formData.get("email") as string;

    // 2. Nomor Admin (Nomor Kamu)
    const adminWaNumber = "6281285433850";

    // 3. Merakit Teks Otomatis untuk WhatsApp
    const message = `Halo Anne Store! 🛍️\nSaya ingin mengonfirmasi pesanan saya:\n\n*Detail Pemesan:*\n- Nama: ${customerName}\n- No. HP: ${customerWa}\n- Email: ${customerEmail}\n\n*Ringkasan Pesanan:*\n- Produk: ${product.name}\n- Total Pembayaran: *${formattedPrice}*\n\nMohon info nomor rekeningnya ya. Terima kasih! ✨`;

    // 4. Ubah teks menjadi format link internet
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${adminWaNumber}?text=${encodedMessage}`;

    // 5. Loading sebentar, lalu buka WhatsApp
    setTimeout(() => {
      setIsLoading(false);
      window.open(waUrl, "_blank"); // Membuka tab WhatsApp baru
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-soft-pink py-12 px-4 font-sans text-dark-gray">
      <div className="max-w-2xl mx-auto">
        
        {/* Tombol Kembali */}
        <Link href="/" className="inline-block mb-6 text-sm font-medium hover:text-gold transition-colors">
          ← Kembali ke Toko
        </Link>

        {/* Kotak Form Checkout */}
        <div className="bg-ivory rounded-3xl shadow-sm p-6 sm:p-10 border border-white">
          <h1 className="text-3xl font-serif font-bold text-dark-gray mb-2">Selesaikan Pesanan</h1>
          <p className="text-gray-500 italic mb-8">Isi data diri kamu untuk proses pengiriman.</p>
          
          {/* Ringkasan Pesanan yang Dibeli */}
          <div className="bg-white/60 rounded-xl p-5 mb-8 border border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Pesanan Anda</h2>
              <p className="font-bold text-dark-gray text-lg">{product.name}</p>
            </div>
            <div className="text-right">
              <span className="text-gold font-bold text-xl">{formattedPrice}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-dark-gray mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                name="name" 
                required 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:outline-none bg-white" 
                placeholder="Masukkan nama kamu" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-gray mb-2">Nomor WhatsApp Kamu</label>
              <input 
                type="tel" 
                name="whatsapp" 
                required 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:outline-none bg-white" 
                placeholder="08123456789" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-gray mb-2">Email (Untuk Invoice)</label>
              <input 
                type="email" 
                name="email" 
                required 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold focus:outline-none bg-white" 
                placeholder="email@contoh.com" 
              />
            </div>

            {/* Tombol Ajaib WhatsApp */}
            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full mt-8 bg-gold hover:bg-gold-hover text-white font-bold py-4 rounded-xl transition-all shadow-md transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none flex justify-center items-center gap-2"
            >
              {isLoading ? (
                "Menyiapkan Pesanan..."
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  Pesan via WhatsApp
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
