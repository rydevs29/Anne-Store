"use client";

import { useState } from "react";
// Nanti di-uncomment jika Supabase sudah terhubung:
// import { supabase } from "@/lib/supabase"; 

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Logika simpan ke Supabase akan diletakkan di sini nanti.
    // Mulai dari upload gambar ke Storage, lalu simpan teks ke tabel 'products'.
    
    setTimeout(() => {
      alert("Produk berhasil ditambahkan!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-ivory py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-dark-gray">Tambah Produk Baru</h1>
          <p className="text-sm text-gray-500">Masukkan detail barang jualanmu di sini.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Nama Produk */}
          <div>
            <label className="block text-sm font-medium text-dark-gray mb-2">Nama Produk</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-pink focus:border-transparent transition-all"
              placeholder="Contoh: Lampu Meja Estetik"
            />
          </div>

          {/* Input Harga */}
          <div>
            <label className="block text-sm font-medium text-dark-gray mb-2">Harga (Rp)</label>
            <input 
              type="number" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-pink focus:border-transparent transition-all"
              placeholder="150000"
            />
          </div>

          {/* Input Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-dark-gray mb-2">Deskripsi</label>
            <textarea 
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-soft-pink focus:border-transparent transition-all"
              placeholder="Jelaskan detail barang ini..."
            />
          </div>

          {/* Input File Gambar */}
          <div>
            <label className="block text-sm font-medium text-dark-gray mb-2">Foto Produk</label>
            <input 
              type="file" 
              accept="image/*"
              required
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-soft-pink/20 file:text-dark-gray hover:file:bg-soft-pink/40 transition-all"
            />
          </div>

          {/* Tombol Simpan */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gold hover:bg-gold-hover text-white font-semibold py-3 rounded-xl transition-colors shadow-sm disabled:opacity-70"
          >
            {isLoading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </form>
      </div>
    </div>
  );
}
