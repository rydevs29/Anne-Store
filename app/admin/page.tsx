"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
  });

  // 1. Fungsi mengambil data produk dari Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
    if (error) console.error(error);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Fungsi menambah produk baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("products").insert([
      {
        name: formData.name,
        price: parseInt(formData.price),
        description: formData.description,
        image_url: formData.image_url,
      },
    ]);

    if (error) {
      alert("Gagal menambah produk: " + error.message);
    } else {
      alert("Produk berhasil ditambah!");
      setFormData({ name: "", price: "", description: "", image_url: "" });
      fetchProducts(); // Refresh daftar produk
    }
    setLoading(false);
  };

  // 3. Fungsi menghapus produk
  const deleteProduct = async (id: string) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (!error) fetchProducts();
    }
  };

  return (
    <main className="min-h-screen bg-soft-pink p-4 md:p-8 font-sans text-dark-gray">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold italic">
            Anne <span className="text-gold">Admin</span>
          </h1>
          <Link href="/" className="text-sm bg-white px-4 py-2 rounded-full shadow-sm">
            Lihat Toko ↗
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Tambah Produk */}
          <section className="bg-ivory p-6 rounded-3xl shadow-sm border border-white h-fit">
            <h2 className="text-xl font-serif font-bold mb-6">Tambah Produk Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nama Produk"
                required
                className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-gold outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Harga (Contoh: 150000)"
                required
                className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-gold outline-none"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              <textarea
                placeholder="Deskripsi Produk"
                required
                className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-gold outline-none h-24"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="URL Gambar (Unsplash/Link)"
                required
                className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-gold outline-none"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold hover:bg-gold-hover text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan Produk"}
              </button>
            </form>
          </section>

          {/* Daftar Produk */}
          <section className="space-y-4">
            <h2 className="text-xl font-serif font-bold mb-6">Daftar Produk ({products.length})</h2>
            <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-gold text-sm font-bold">Rp {product.price.toLocaleString("id-ID")}</p>
                  </div>
                  <button 
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-400 hover:text-red-600 p-2"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
