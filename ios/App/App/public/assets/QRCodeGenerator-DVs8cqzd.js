import{r as c,j as e,m as g,A as v,d as p,p as j,t as N,o as k}from"./index-D804g98s.js";import{u as a}from"./index-DN3uEgdD.js";import{C}from"./copy-yo9mUJZf.js";import{D as L}from"./download-22_gvdIc.js";import{P as R}from"./printer-BLoPvIrF.js";function $(...t){return N(k(t))}function T({data:t,size:r=256,label:l,onGenerated:n}){const[h,u]=c.useState(!1),[x,f]=c.useState(!0),i=`https://api.qrserver.com/v1/create-qr-code/?size=${r}x${r}&data=${encodeURIComponent(t)}&margin=10&bgcolor=ffffff`;c.useEffect(()=>{n&&n(i)},[i,n]);const b=async()=>{try{await navigator.clipboard.writeText(t),u(!0),a.success("Tracking ID copied to clipboard"),setTimeout(()=>u(!1),2e3)}catch{a.error("Failed to copy tracking code")}},w=async()=>{try{const d=await(await fetch(i)).blob(),m=window.URL.createObjectURL(d),s=document.createElement("a");s.href=m,s.download=`shipment-qr-${t}.png`,document.body.appendChild(s),s.click(),document.body.removeChild(s),window.URL.revokeObjectURL(m),a.success("QR Code saved successfully")}catch{a.error("Failed to download QR code")}},y=()=>{const o=window.open("","_blank");if(!o){a.error("Please allow popups to print shipment labels");return}const d=`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Britium Logistics - Shipment Label [${t}]</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono:wght@700&display=swap');
            body { 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              margin: 0; 
              font-family: 'Inter', sans-serif; 
              color: #0b0c10;
              background: #fff;
            }
            .label-card { 
              border: 3px solid #D4AF37; 
              padding: 50px; 
              border-radius: 24px; 
              text-align: center; 
              max-width: 400px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            }
            .qr-image { width: ${r}px; height: ${r}px; margin-bottom: 24px; border: 1px solid #eee; }
            .meta { 
              font-size: 11px; 
              text-transform: uppercase; 
              letter-spacing: 0.25em; 
              color: #666; 
              margin-bottom: 8px;
              font-weight: 600;
            }
            .id-text { 
              font-family: 'JetBrains Mono', monospace; 
              font-size: 28px; 
              font-weight: 800; 
              color: #0b0c10;
              letter-spacing: -0.5px;
              margin-bottom: 20px;
            }
            .footer { 
              margin-top: 40px; 
              font-size: 10px; 
              color: #999; 
              border-top: 1px solid #eee;
              padding-top: 15px;
            }
            @media print {
              body { height: auto; }
              .label-card { border: 2px solid #000; box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="label-card">
            <div class="meta">Britium Enterprise Logistics</div>
            <img src="${i}" class="qr-image" />
            <div class="meta">Tracking Manifest ID</div>
            <div class="id-text">${l||t}</div>
            <div class="footer">
              © 2026 Britium Logistics System • Generated 2026-02-19
            </div>
          </div>
          <script>
            window.onload = () => {
              setTimeout(() => {
                window.print();
                window.onafterprint = () => window.close();
              }, 500);
            };
          <\/script>
        </body>
      </html>
    `;o.document.write(d),o.document.close()};return e.jsxs("div",{className:"flex flex-col items-center gap-8 py-6",children:[e.jsxs(g.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},transition:{type:"spring",stiffness:260,damping:20},className:"relative group",children:[e.jsx("div",{className:"luxury-glass p-1.5 rounded-[2.5rem] bg-gradient-to-br from-luxury-gold/40 via-luxury-gold/5 to-transparent shadow-luxury",children:e.jsxs("div",{className:"bg-luxury-obsidian rounded-[2.2rem] p-8 flex flex-col items-center border border-white/10",children:[e.jsxs("div",{className:"relative aspect-square bg-white p-6 rounded-[1.5rem] overflow-hidden shadow-inner ring-1 ring-black/5",children:[e.jsx(v,{mode:"wait",children:x&&e.jsx(g.div,{exit:{opacity:0},className:"absolute inset-0 flex items-center justify-center bg-white z-10",children:e.jsx("div",{className:"w-10 h-10 border-4 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin"})},"loader")}),e.jsx("img",{src:i,alt:"Shipment QR",loading:"eager",className:$("w-full h-full object-contain mix-blend-multiply transition-opacity duration-500",x?"opacity-0":"opacity-100"),onLoad:()=>f(!1),style:{width:r,height:r}})]}),(l||t)&&e.jsxs("div",{className:"mt-8 text-center w-full",children:[e.jsx("p",{className:"text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-2",children:"Secure Tracking Manifest"}),e.jsx("p",{className:"font-mono text-2xl font-black text-primary tracking-tighter",children:l||t})]})]})}),e.jsx("div",{className:"absolute -inset-8 bg-luxury-gold/5 blur-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 w-full max-w-[420px]",children:[e.jsxs(p,{variant:"outline",onClick:b,className:"flex flex-col items-center gap-2 h-auto py-6 border-white/5 bg-white/5 hover:bg-white/10 hover:border-luxury-gold/40 transition-all group",children:[e.jsx("div",{className:"p-2.5 rounded-full bg-luxury-gold/10 group-hover:bg-luxury-gold/20 transition-colors",children:h?e.jsx(j,{className:"w-5 h-5 text-green-500"}):e.jsx(C,{className:"w-5 h-5 text-luxury-gold"})}),e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-muted-foreground",children:"Copy ID"})]}),e.jsxs(p,{variant:"outline",onClick:w,className:"flex flex-col items-center gap-2 h-auto py-6 border-white/5 bg-white/5 hover:bg-white/10 hover:border-luxury-gold/40 transition-all group",children:[e.jsx("div",{className:"p-2.5 rounded-full bg-luxury-gold/10 group-hover:bg-luxury-gold/20 transition-colors",children:e.jsx(L,{className:"w-5 h-5 text-luxury-gold"})}),e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-muted-foreground",children:"Save PNG"})]}),e.jsxs(p,{variant:"outline",onClick:y,className:"flex flex-col items-center gap-2 h-auto py-6 border-white/5 bg-white/5 hover:bg-white/10 hover:border-luxury-gold/40 transition-all group",children:[e.jsx("div",{className:"p-2.5 rounded-full bg-luxury-gold/10 group-hover:bg-luxury-gold/20 transition-colors",children:e.jsx(R,{className:"w-5 h-5 text-luxury-gold"})}),e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-muted-foreground",children:"Print"})]})]}),e.jsx("div",{className:"text-center px-6",children:e.jsx("p",{className:"text-[11px] text-muted-foreground/50 italic max-w-[320px] leading-relaxed",children:"Logistics tracking artifacts are cryptographically generated and compliant with 2026 enterprise standards."})})]})}export{T as Q};
