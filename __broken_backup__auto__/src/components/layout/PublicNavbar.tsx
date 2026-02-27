import { useLanguageContext } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';

export const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguageContext();

  const NAV_LINKS = [
    { label: t('public.track'), path: ROUTE_PATHS.PUBLIC_TRACKING },
    { label: t('public.services'), path: ROUTE_PATHS.SERVICES },
    { label: t('public.getQuote'), path: ROUTE_PATHS.GET_QUOTE },
    { label: t('public.about'), path: ROUTE_PATHS.ABOUT },
    { label: t('public.news'), path: ROUTE_PATHS.NEWS },
    { label: t('public.contact'), path: ROUTE_PATHS.CONTACT },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0d2c54] text-white py-2 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1 font-medium"><Phone size={12} /> +95 9 897 4477 44</span>
            <span className="hidden sm:flex items-center gap-1 font-medium"><Mail size={12} /> info@britiumexpress.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1 font-medium"><Clock size={12} /> Mon-Sat: 9:00-17:30</span>
            <button 
              onClick={() => setLanguage(language === 'en' ? 'my' : 'en')}
              className="hover:text-[#ff6b00] font-bold uppercase transition-colors"
            >
              {language === 'en' ? 'မြန်မာ' : 'EN'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b h-20 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center w-full">
          <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
            <img src={IMAGES.BRITIUM_LOGO_55} alt="Britium Logo" className="h-14 w-auto" />
            <div className="hidden sm:block leading-none">
              <h1 className="text-xl font-black text-[#0d2c54] uppercase italic tracking-tighter">Britium</h1>
              <span className="text-xs text-[#ff6b00] font-black uppercase tracking-[0.2em]">Express</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-[11px] font-black uppercase tracking-widest transition-colors",
                  location.pathname === link.path ? "text-[#ff6b00]" : "text-slate-600 hover:text-[#ff6b00]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="bg-[#0d2c54] hover:bg-slate-800 text-white font-black text-xs uppercase px-6 h-10 rounded-xl">
              <Link to={ROUTE_PATHS.LOGIN}><LogIn size={14} className="mr-2" /> Staff Login</Link>
            </Button>
          </div>

          <button className="lg:hidden text-[#0d2c54]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
    </>
  );
};