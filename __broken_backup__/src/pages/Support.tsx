        <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter italic">Support Center</h1>
        <p className="opacity-80 max-w-xl mx-auto">Need help with your delivery or account?</p>
      </div>

      <div className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-black text-[#0d2c54] mb-6 uppercase tracking-tight">Common Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-bold">How fast is domestic delivery?</AccordionTrigger>
                <AccordionContent>
                  We offer Same-Day delivery for Yangon and Next-Day delivery for Mandalay and Nay Pyi Taw priority routes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-bold">What is the "Golden Triangle"?</AccordionTrigger>
                <AccordionContent>
                  It is our daily express network connecting Myanmar's three major economic hubs: Yangon, Mandalay, and Nay Pyi Taw.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border">
            <h3 className="text-xl font-black text-[#0d2c54] mb-6 uppercase">Direct Assistance</h3>
            <div className="space-y-4">
              <a href="https://wa.me/959897447744" className="flex items-center gap-4 p-4 bg-white rounded-2xl border hover:border-[#ff6b00] transition-colors shadow-sm">
                <MessageCircle className="text-green-500" />
                <div>
                  <p className="font-bold text-sm">WhatsApp Chat</p>
                  <p className="text-xs text-slate-500">Fastest response for tracking.</p>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border shadow-sm">
                <Phone className="text-blue-500" />
                <div>
                  <p className="font-bold text-sm">+95 9 897 4477 44</p>
                  <p className="text-xs text-slate-500">Customer Support Line.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}