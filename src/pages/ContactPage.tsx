
export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-[#0d2c54] py-20 text-center text-white">
        <h1 className="text-4xl font-black mb-2 uppercase italic tracking-tighter">Get in Touch</h1>
        <p className="opacity-70 text-sm">We are here to assist you with your logistics needs.</p>
      </div>

      <div className="container mx-auto px-4 -mt-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border">
            <h3 className="text-2xl font-black text-[#0d2c54] mb-8 uppercase tracking-tighter">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Your Name" className="h-12 border-2" />
                <Input placeholder="Phone Number" className="h-12 border-2" />
              </div>
              <Input placeholder="Subject" className="h-12 border-2" />
              <Textarea placeholder="How can we help you?" className="min-h-[150px] border-2" />
              <Button className="w-full h-14 bg-[#ff6b00] hover:bg-[#e66000] text-white font-black uppercase tracking-widest">
                Send Message <Send className="ml-2" size={18} />
              </Button>
            </form>
          </div>

          {/* Locations */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-[#0d2c54] mb-8 uppercase tracking-tighter">Our Locations</h3>
            <BranchCard 
              icon={<Building2 />} 
              title="Yangon Head Office" 
              addr="No. 277, Corner of Anawrahta Road and Bo Moe Gyo St., East Dagon Township." 
              phone="09-897447744"
            />
            <BranchCard 
              icon={<MapPin />} 
              title="Mandalay Hub" 
              addr="Serving Upper Myanmar Region." 
              phone="09-422299994"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const BranchCard = ({ icon, title, addr, phone }: any) => (
  <div className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-l-8 border-l-[#0d2c54] shadow-sm">
    <div className="text-[#ff6b00] mt-1">{icon}</div>
    <div>
      <h6 className="font-black text-[#0d2c54] uppercase text-sm mb-1">{title}</h6>
      <p className="text-xs text-slate-500 mb-2 leading-relaxed">{addr}</p>
      <p className="text-sm font-bold text-blue-700 flex items-center gap-1">
        <Phone size={14} /> {phone}
      </p>
    </div>
  </div>
);