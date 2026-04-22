"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
}

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState<"url" | "gallery">("gallery");
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "", // Untuk opsi URL
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // Untuk opsi Galeri

  // 1. Cek Status Login Saat Halaman Dibuka
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Ambil Data Produk (Hanya jalan kalau sudah login)
  useEffect(() => {
    if (session?.user?.email === "annestore961@gmail.com") {
      fetchProducts();
    }
  }, [session]);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  // 3. Fungsi Login & Logout
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/admin` }
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // 4. Fungsi Simpan Produk (Bisa URL / Galeri)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.image_url;

      // Kalau user pilih upload dari galeri
      if (uploadType === "gallery" && imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`; // Nama file acak biar nggak bentrok
        
        // Upload ke Supabase Storage (Bucket bernama 'products')
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, imageFile);

        if (uploadError) throw new Error("Gagal upload gambar. Pastikan bucket 'products' sudah dibuat dan public.");

        // Ambil URL public dari gambar yang baru diupload
        const { data: { publicUrl } } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        finalImageUrl = publicUrl;
      }

      if (!finalImageUrl) throw new Error("Gambar wajib diisi (URL atau Galeri)!");

      // Simpan ke database
      const { error: dbError } = await supabase.from("products").insert([
        {
          name: formData.name,
          price: parseInt(formData.price),
          description: formData.description,
          image_url: finalImageUrl,
        },
      ]);

      if (dbError) throw dbError;

      alert("Produk berhasil ditambah! 🎉");
      setFormData({ name: "", price: "", description: "", image_url: "" });
      setImageFile(null);
      fetchProducts();

    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 5. Fungsi Hapus Produk
  const deleteProduct = async (id: string) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (!error) fetchProducts();
    }
  };

  // === TAMPILAN JIKA SEDANG CEK LOGIN ===
  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-soft-pink">Memeriksa akses...</div>;
  }

  // === TAMPILAN JIKA BELUM LOGIN ===
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-soft-pink text-dark-gray p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-sm w-full">
          <h1 className="text-2xl font-serif font-bold mb-2">Admin Login</h1>
          <p className="text-sm text-gray-500 mb-6">Area khusus pengelola toko.</p>
          <button 
            onClick={signInWithGoogle}
            className="w-full bg-white border border-gray-200 text-dark-gray font-bold py-3 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-3 transition-colors"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5"/>
            Masuk dengan Google
          </button>
          <Link href="/" className="block mt-4 text-sm text-gold hover:underline">← Kembali ke Toko</Link>
        </div>
      </div>
    );
  }

  // === TAMPILAN JIKA EMAIL SALAH (BUKAN BOS) ===
  if (session.user.email !== "annestore961@gmail.com") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-soft-pink text-dark-gray p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-md w-full border border-red-100">
          <div className="text-4xl mb-4">🚫</div>
          <h1 className="text-xl font-bold mb-2 text-red-500">Akses Ditolak!</h1>
          <p className="text-gray-600 mb-6">
            Email <b>{session.user.email}</b> tidak memiliki izin untuk masuk ke halaman ini. Hanya pemilik toko yang diperbolehkan.
          </p>
          <button onClick={signOut} className="bg-dark-gray text-white px-6 py-2 rounded-full font-bold">
            Keluar
          </button>
        </div>
      </div>
    );
  }

  // === TAMPILAN DASHBOARD ADMIN (JIKA EMAIL BENAR) ===
  return (
    <main className="min-h-screen bg-soft-pink p-4 md:p-8 font-sans text-dark-gray">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white/50 p-4 rounded-2xl">
          <div>
            <h1 className="text-2xl font-serif font-bold italic">
              Anne <span className="text-gold">Admin</span>
            </h1>
            <p className="text-xs text-gray-500">Login sebagai: {session.user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="text-sm bg-white border px-4 py-2 rounded-full shadow-sm hover:text-gold">Lihat Toko</Link>
            <button onClick={signOut} className="text-sm bg-red-50 text-red-500 px-4 py-2 rounded-full shadow-sm">Logout</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* BAGIAN KIRI: Form Tambah Produk */}
          <section className="bg-ivory p-6 md:p-8 rounded-3xl shadow-sm border border-white h-fit">
            <h2 className="text-xl font-serif font-bold mb-6">Tambah Produk Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Nama Produk</label>
                <input type="text" required className="w-full p-3 mt-1 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-gold outline-none" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Harga (Rp)</label>
                <input type="number" required className="w-full p-3 mt-1 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-gold outline-none" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Deskripsi</label>
                <textarea required className="w-full p-3 mt-1 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-gold outline-none h-24" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>

              {/* Opsi Pilih Gambar */}
              <div className="bg-white p-4 rounded-xl border border-gray-100">
                <label className="text-xs font-bold text-gray-500 uppercase mb-3 block">Sumber Gambar</label>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="uploadType" checked={uploadType === "gallery"} onChange={() => setUploadType("gallery")} /> Galeri HP
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="uploadType" checked={uploadType === "url"} onChange={() => setUploadType("url")} /> Link URL
                  </label>
                </div>

                {uploadType === "gallery" ? (
                  <input type="file" accept="image/*" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-soft-pink file:text-dark-gray hover:file:bg-gold hover:file:text-white transition-all" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                ) : (
                  <input type="url" placeholder="https://..." required className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-gold outline-none text-sm" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                )}
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold-hover text-white font-bold py-4 rounded-xl transition-all shadow-md mt-4 disabled:opacity-50">
                {loading ? "Mengunggah..." : "Simpan Produk"}
              </button>
            </form>
          </section>

          {/* BAGIAN KANAN: Daftar Produk */}
          <section className="bg-white/50 p-6 rounded-3xl border border-white">
            <h2 className="text-xl font-serif font-bold mb-6">Etalase Toko ({products.length})</h2>
            <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2">
              {products.length === 0 ? <p className="text-sm italic text-gray-500">Belum ada produk.</p> : null}
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-gold text-sm font-bold">Rp {product.price.toLocaleString("id-ID")}</p>
                  </div>
                  <button onClick={() => deleteProduct(product.id)} className="bg-red-50 text-red-500 hover:bg-red-100 p-3 rounded-xl transition-colors">
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
