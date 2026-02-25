import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function NewsPage() {
  const posts = [
    { title: "Expanding our Mandalay Hub", date: "2026-02-20", excerpt: "New facilities to serve Upper Myanmar faster." },
    { title: "International Shipping Rates Update", date: "2026-02-15", excerpt: "New competitive rates for USA and UK air cargo." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-[#0d2c54] py-20 text-center text-white">
        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">News & Updates</h1>
        <p className="opacity-70 text-sm">Stay informed with Britium Express.</p>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="bg-white rounded-3xl shadow-lg overflow-hidden border transition-transform hover:-translate-y-2">
              <div className="h-48 bg-slate-200" />
              <div className="p-8">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase mb-4">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={12} /> Admin</span>
                </div>
                <h3 className="text-xl font-black text-[#0d2c54] mb-4 uppercase tracking-tighter leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 mb-6">{post.excerpt}</p>
                <button className="text-[#ff6b00] font-black text-xs uppercase flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}