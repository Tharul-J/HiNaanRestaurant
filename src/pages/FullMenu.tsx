import { useState, useContext, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fullMenuData } from '../data/menuData';

// We need to import the BranchContext from App.tsx, but since App.tsx is the entry point, 
// it might be better to move BranchContext to a separate file or just pass it.
// Let's assume we can import it, or we can just redefine it if needed.
// Actually, let's extract BranchContext to a separate file later, or just use the one from App.tsx.
import { BranchContext } from '../App';

const images = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop", // Biryani
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop", // Samosa/Snacks
  "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=800&auto=format&fit=crop", // Curry
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop", // Tikka
  "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop", // Naan
  "https://images.unsplash.com/photo-1697155406055-2db32d47ca07?q=80&w=800&auto=format&fit=crop"  // Pan filled with rice and broccoli
];

export default function FullMenu() {
  const { branch, data } = useContext(BranchContext);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', ...fullMenuData.map(c => c.category)];
  
  const filteredMenu = activeCategory === 'All' 
    ? fullMenuData 
    : fullMenuData.filter(c => c.category === activeCategory);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        
        if (isEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const scrollAmount = window.innerWidth < 768 ? 316 : 416;
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-950 text-stone-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-saffron-500 hover:text-saffron-400 transition-colors font-bold w-fit">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="flex items-center gap-6 justify-between sm:justify-end">
            <div className="text-right">
              <span className="text-stone-400 text-sm font-bold uppercase tracking-widest">Viewing Menu For</span>
              <p className="text-xl font-black text-saffron-500">{data.name}</p>
            </div>
            <a href={data.uberEats} target="_blank" rel="noopener noreferrer" className="bg-saffron-500 hover:bg-saffron-400 text-charcoal-950 px-6 py-3 rounded-full font-bold transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] whitespace-nowrap">
              Order Now
            </a>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our Full Menu</h1>
          <p className="text-stone-400 text-lg max-w-2xl">Explore our complete selection of authentic Indian fusion dishes, from our signature tandoor-baked naan to our slow-cooked Dum Biryani.</p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-stone-400 mr-2">
            <Filter size={20} /> <span className="font-bold uppercase tracking-wider text-sm">Filter:</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
                activeCategory === cat 
                  ? 'bg-saffron-500 text-charcoal-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                  : 'bg-charcoal-900 text-stone-300 hover:bg-charcoal-800 border border-charcoal-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-16 mb-24">
          {filteredMenu.map((section, idx) => (
            <motion.div 
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-charcoal-900 rounded-[2rem] p-8 md:p-12 border border-charcoal-800"
            >
              <div className="mb-8 border-b border-charcoal-800 pb-6">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-saffron-400 mb-2">{section.category}</h2>
                <p className="text-stone-400">{section.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {section.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start border-b border-charcoal-800/50 pb-4">
                    <span className="font-bold text-lg">{item.name}</span>
                    <span className="text-saffron-500 font-bold text-right ml-4 whitespace-pre-line">
                      {item.price[branch as keyof typeof item.price] || item.price.gampaha}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-8 bg-charcoal-950 overflow-hidden border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-3xl font-serif font-bold text-stone-50">A Glimpse of Our Food</h2>
        </div>
        <div 
          ref={scrollRef}
          className="flex gap-4 px-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar scroll-smooth"
        >
          {images.map((img, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden shrink-0 snap-center border border-charcoal-800">
              <img src={img} alt={`Gallery food ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 opacity-90 hover:opacity-100" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
