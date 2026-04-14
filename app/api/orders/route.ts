import { NextResponse } from 'next/server';
// import { supabase } from '@/lib/supabase';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer_name, whatsapp, email, total_price, product_name } = body;

    // 1. Simpan pesanan ke database Supabase (contoh logika)
    /*
    const { data, error } = await supabase
      .from('orders')
      .insert([
        { customer_name, whatsapp, email, total_price, status: 'Pending' }
      ]);
      
    if (error) throw error;
    */

    // 2. Kirim Email Invoice Otomatis via Resend (contoh logika)
    /*
    await resend.emails.send({
      from: 'Anne Store <sales@annestore.com>',
      to: email,
      subject: `Invoice Pesanan - ${product_name}`,
      html: `<p>Halo ${customer_name}, terima kasih sudah memesan ${product_name}. Total yang harus ditransfer adalah Rp ${total_price}.</p>`,
    });
    */

    // 3. Buat Link WhatsApp untuk dikembalikan ke pembeli
    const waText = encodeURIComponent(`Halo Anne Store, saya ${customer_name}. Saya mau konfirmasi pembayaran pesanan ${product_name} senilai Rp${total_price}. Ini bukti transfernya ya: `);
    const waLink = `https://wa.me/6281234567890?text=${waText}`; // Ganti dengan nomor kamu nanti

    return NextResponse.json(
      { message: 'Pesanan berhasil dibuat', waLink: waLink },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat memproses pesanan' },
      { status: 500 }
    );
  }
}
