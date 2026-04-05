/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Phone, Star, Menu as MenuIcon, X, ArrowRight, ExternalLink, Quote, ChefHat, Heart, UtensilsCrossed } from 'lucide-react';
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FullMenu from './pages/FullMenu';

const UBER_EATS_LINK = "https://www.ubereats.com/lk/store/hi-naan-gampaha/HZnKIcXzSaWT7IHmJiYxQg?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas";

type BranchId = 'gampaha' | 'kottawa';

const branchData = {
  gampaha: {
    id: 'gampaha',
    name: "Gampaha Branch",
    shortName: "Gampaha",
    address: "414 Colombo Rd, Gampaha 11000, Sri Lanka",
    hours: "7:00 AM – 10:00 PM (Early Breakfast)",
    phone: "070 638 2823",
    phoneLink: "+94706382823",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.3292354139103!2d80.0066082!3d7.0877798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fbac7f7db327%3A0x2d4a08d171d8d744!2sHi%20Naan%20Restaurant%20-%20Gampaha!5e0!3m2!1sen!2slk!4v1775193860545!5m2!1sen!2slk",
    uberEats: UBER_EATS_LINK,
    reviews: "290+ Reviews",
    rating: "4.6"
  },
  kottawa: {
    id: 'kottawa',
    name: "Kottawa Branch",
    shortName: "Kottawa",
    address: "133/2f Highlevel Road, Kottawa, Sri Lanka",
    hours: "11:00 AM – 11:00 PM",
    phone: "070 606 0890",
    phoneLink: "+94706060890",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7922.8856401888415!2d79.97338384553834!3d6.83739328051648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25155bc5c85d3%3A0xa203cbefae1f625d!2sHi%20NaaN%20Restaurant%20-%20Kottawa!5e0!3m2!1sen!2slk!4v1775193760561!5m2!1sen!2slk",
    uberEats: UBER_EATS_LINK,
    reviews: "2,000+ Reviews",
    rating: "4.6"
  }
};

export const BranchContext = createContext<{
  branch: BranchId;
  setBranch: (b: BranchId) => void;
  data: typeof branchData['gampaha'];
}>({
  branch: 'gampaha',
  setBranch: () => {},
  data: branchData.gampaha
});

const menuItems = [
  {
    category: "Dum Biryani",
    description: "Slow-cooked in a sealed vessel to retain moisture and aromatic intensity.",
    items: [
      { name: "Chicken Dum Biryani", price: "LKR 1,584+" },
      { name: "Prawn Dum Biryani", price: "LKR 1,848+" },
      { name: "Mutton Dum Biryani", price: "LKR 1,925+" },
      { name: "Beef Dum Biryani", price: "LKR 2,230+" },
      { name: "Egg Dum Biryani", price: "LKR 1,094+" },
    ]
  },
  {
    category: "Naan & Kulcha",
    description: "Artisanal tandoor-baked breads, stuffed and flavored.",
    items: [
      { name: "Cheese Naan", price: "LKR 740" },
      { name: "Butter Naan", price: "LKR 560" },
      { name: "Kochchi Naan", price: "LKR 600" },
      { name: "Hi Special Mixed Naan", price: "LKR 830" },
      { name: "Cheesy Chicken Kulcha", price: "LKR 970" },
      { name: "Paneer Kulcha", price: "LKR 930" },
    ]
  },
  {
    category: "Naan Kottu",
    description: "Our hybrid USP. Chopped naan absorbing spicy masala gravies.",
    items: [
      { name: "Hi Special Cheese Naan Mix", price: "LKR 1,716+" },
      { name: "Naan Kottu Mix Chicken", price: "LKR 1,254+" },
      { name: "Naan Kottu Mix Seafood", price: "LKR 1,419+" },
      { name: "Naan Kottu Mix Mutton", price: "LKR 2,140+" },
      { name: "Naan Kottu Mix Beef", price: "LKR 1,870+" },
    ]
  },
  {
    category: "Quick Bites",
    description: "Hi! On the Go. Wraps, Pasta, and Salads.",
    items: [
      { name: "Cheesy Chicken Wrap", price: "LKR 1,122+" },
      { name: "Tandoori Chicken Wrap", price: "LKR 913+" },
      { name: "Chicken Pasta", price: "LKR 1,925" },
      { name: "Prawns Ever Salad", price: "LKR 1,848" },
    ]
  }
];

const allReviews = [
  { branch: 'gampaha', text: "Naan was very soft and fresh. Mr. Chamidu served us — customer service was excellent and friendly. Will definitely visit again.", author: "Google Reviewer", rating: 4 },
  { branch: 'gampaha', text: "Butter chicken and naan were amazing. Mr. Anuhas was super friendly and explained the menu. Chef Devin is really supportive.", author: "Google Reviewer", rating: 5 },
  { branch: 'gampaha', text: "Naan and tikka masala were absolutely delicious, and the environment was pleasant. Server Chamindu helped choose items — very professional.", author: "Google Reviewer", rating: 5 },
  { branch: 'gampaha', text: "Special thanks to Mr. Adithya for providing me with informative plus extraordinary service. Food was really tasty and fresh. I highly recommend Hi Naan to any food lover out there.", author: "Anonymous", rating: 5 },
  { branch: 'gampaha', text: "Superb place to experience the best quality Naan in Gampaha area, and the boy whose name is Sadew was very supportive to us.", author: "Anonymous", rating: 5 },
  { branch: 'gampaha', text: "Best place for naan😍 Customer service is very good & we met superb staff member called Chaminda Aloka superb service.", author: "Anonymous", rating: 5 },
  { branch: 'gampaha', text: "We ordered the cheese naan and prawn masala curry, and both were absolutely delicious.", author: "Anonymous", rating: 5 },
  { branch: 'gampaha', text: "Delicious. Mixed naan so tasty. Really good place in Gampaha.", author: "Anonymous", rating: 5 },
  { branch: 'kottawa', text: "The best biryani eaten in Sri Lanka has an amazing taste.", author: "Sanjeewa Sanju", rating: 5 },
  { branch: 'kottawa', text: "Highly recommended @kottawa Hi naan.", author: "Nirma Elvitigala", rating: 5 },
  { branch: 'kottawa', text: "2 types of Naan, butter chicken and aloo parata. It was very good!", author: "Helen Thambyahpillai", rating: 5 },
  { branch: 'kottawa', text: "Delicious naan and a cozy atmosphere make this place a must-visit in Kottawa!", author: "Anonymous", rating: 5 },
  { branch: 'kottawa', text: "It is one of the go-to places in and around Kottawa and worth stop by for a good Naan experience out of Colombo.", author: "Anonymous", rating: 5 }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useContext(BranchContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-charcoal-950/95 backdrop-blur-md text-stone-50 py-4 shadow-2xl border-b border-saffron-500/20' : 'bg-transparent text-stone-50 py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <a href="#" className="font-serif text-3xl font-black tracking-tight text-saffron-500">Hi! naan</a>
            <span className="hidden sm:inline-block bg-charcoal-800 text-stone-300 text-xs font-bold px-2 py-1 rounded-md border border-charcoal-700">{data.shortName}</span>
          </div>
          <div className="hidden md:flex items-center space-x-10 font-medium">
            <a href="#about" className="hover:text-saffron-400 transition-colors">Our Story</a>
            <a href="#menu" className="hover:text-saffron-400 transition-colors">Menu</a>
            <a href="#reviews" className="hover:text-saffron-400 transition-colors">Reviews</a>
            <a href="#location" className="hover:text-saffron-400 transition-colors">Find Us</a>
            <a href={data.uberEats} target="_blank" rel="noopener noreferrer" className="bg-saffron-500 hover:bg-saffron-400 text-charcoal-950 px-6 py-2.5 rounded-full font-bold transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              Order Online <ExternalLink size={16} />
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-50 hover:text-saffron-400">
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal-950 text-stone-50 overflow-hidden border-b border-saffron-500/20"
          >
            <div className="px-4 pt-4 pb-8 space-y-4 shadow-2xl font-medium text-lg">
              <a href="#about" onClick={() => setIsOpen(false)} className="block px-3 py-2 hover:text-saffron-400">Our Story</a>
              <a href="#menu" onClick={() => setIsOpen(false)} className="block px-3 py-2 hover:text-saffron-400">Menu</a>
              <a href="#reviews" onClick={() => setIsOpen(false)} className="block px-3 py-2 hover:text-saffron-400">Reviews</a>
              <a href="#location" onClick={() => setIsOpen(false)} className="block px-3 py-2 hover:text-saffron-400">Find Us</a>
              <a href={data.uberEats} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-saffron-500 font-bold">Order on Uber Eats</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const heroImages = [
  "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=1000&auto=format&fit=crop", // Food lot on green leaf plate
  "https://images.unsplash.com/photo-1644677867331-03f28942e35c?q=80&w=1000&auto=format&fit=crop", // White plate topped with rice and vegetables
  "https://images.unsplash.com/photo-1644677859469-701242656fa8?q=80&w=1000&auto=format&fit=crop", // Plate of food on red table cloth
  "https://images.unsplash.com/photo-1562059390-a761a084768e?q=80&w=1000&auto=format&fit=crop"  // Wrapped food with gravies
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { branch, setBranch, data } = useContext(BranchContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-950 pt-20">
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2000&auto=format&fit=crop" 
          alt="Delicious Indian Food" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-charcoal-950/80 to-charcoal-950"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 text-left">
          
          {/* Branch Selector */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex bg-charcoal-900/80 backdrop-blur-md p-1.5 rounded-full w-fit mb-8 border border-charcoal-800 shadow-xl"
          >
            <button 
              onClick={() => setBranch('kottawa')}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${branch === 'kottawa' ? 'bg-saffron-500 text-charcoal-950 shadow-md' : 'text-stone-400 hover:text-stone-50'}`}
            >
              Kottawa Branch
            </button>
            <button 
              onClick={() => setBranch('gampaha')}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${branch === 'gampaha' ? 'bg-saffron-500 text-charcoal-950 shadow-md' : 'text-stone-400 hover:text-stone-50'}`}
            >
              Gampaha Branch
            </button>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-bold text-stone-50 mb-6 leading-[1.1]"
          >
            The Best <br/><span className="text-saffron-500 italic drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Naan & Biryani</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-stone-300 mb-10 max-w-lg font-light leading-relaxed"
          >
            Experience the aromatic complexity of Dum Biryani and our signature artisanal Naan in {data.shortName}.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#menu" className="bg-saffron-500 hover:bg-saffron-400 text-charcoal-950 px-8 py-4 rounded-full font-black text-lg transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2">
              View Menu <ArrowRight size={20} />
            </a>
            <a href={data.uberEats} target="_blank" rel="noopener noreferrer" className="bg-charcoal-800/80 backdrop-blur-md border border-charcoal-700 hover:bg-charcoal-700 hover:border-saffron-500/50 text-stone-50 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
              Order Delivery <ExternalLink size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:w-1/2 relative hidden md:block"
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 bg-saffron-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
            <div className="w-full h-full rounded-full border-[4px] border-saffron-500/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden bg-charcoal-900">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  src={heroImages[currentImage]} 
                  alt="Hero Food" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-charcoal-900 border border-saffron-500/30 text-stone-50 p-6 rounded-3xl shadow-2xl z-20 rotate-[-5deg] backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <Star size={20} className="text-saffron-500" fill="currentColor" />
                <span className="font-black text-xl">{data.rating}</span>
              </div>
              <p className="font-bold text-sm text-saffron-500 uppercase tracking-wider">{data.reviews}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Marquee = () => {
  const { data } = useContext(BranchContext);
  return (
    <div className="bg-saffron-500 py-4 overflow-hidden flex whitespace-nowrap border-y border-saffron-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] relative z-20">
      <div className="animate-marquee flex items-center gap-8 text-charcoal-950 font-black uppercase tracking-widest text-xl">
        <span>🔥 The Best Naan & Biryani</span>
        <span>•</span>
        <span>Authentic Dum Biryani</span>
        <span>•</span>
        <span>{data.name}</span>
        <span>•</span>
        <span>🔥 The Best Naan & Biryani</span>
        <span>•</span>
        <span>Authentic Dum Biryani</span>
        <span>•</span>
        <span>{data.name}</span>
        <span>•</span>
        <span>🔥 The Best Naan & Biryani</span>
        <span>•</span>
        <span>Authentic Dum Biryani</span>
        <span>•</span>
        <span>{data.name}</span>
        <span>•</span>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-charcoal-900 overflow-hidden border-b border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative h-[600px] w-full hidden lg:block">
            <motion.img 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop" 
              alt="Chef cooking" 
              className="absolute top-0 left-0 w-3/4 h-[400px] object-cover rounded-[2rem] shadow-2xl z-10 border border-charcoal-700"
              referrerPolicy="no-referrer"
            />
            <motion.img 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              src="https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=1000&auto=format&fit=crop" 
              alt="Restaurant interior" 
              className="absolute bottom-0 right-0 w-2/3 h-[350px] object-cover rounded-[2rem] shadow-2xl border-8 border-charcoal-900 z-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-saffron-500 rounded-full z-30 flex flex-col items-center justify-center text-charcoal-950 font-black text-center leading-tight shadow-[0_0_30px_rgba(245,158,11,0.4)] border-8 border-charcoal-900">
              <UtensilsCrossed size={28} className="mb-1" />
              <span className="text-xs uppercase tracking-widest">100%<br/>Authentic</span>
            </div>
          </div>

          <div className="lg:pl-10">
            <span className="text-saffron-500 font-bold tracking-widest uppercase text-sm block mb-4">The Hi! Experience</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-stone-50 mb-8 leading-tight">The Art of <br/><span className="text-saffron-500">Dum & Tandoor</span></h2>
            <p className="text-stone-300 text-xl mb-8 leading-relaxed font-light">
              Witness the rhythmic slapping of naan dough against the walls of the tandoor and the careful portioning of biryani from massive steaming pots. Our open-concept kitchens deliver transparency and freshness you can taste.
            </p>
            
            <div className="space-y-6 mt-10">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-charcoal-800 border border-charcoal-700 text-saffron-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <ChefHat size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-stone-50 mb-1">Authentic Dum Process</h4>
                  <p className="text-stone-400">Our signature biryani is slow-cooked in a sealed vessel to retain moisture and aromatic intensity.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-saffron-500 text-charcoal-950 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <Heart size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-stone-50 mb-1">Artisanal Naan</h4>
                  <p className="text-stone-400">Beyond basic tandoori bread, we offer stuffed and flavored naans that act as standalone meals.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Menu = () => {
  const { data } = useContext(BranchContext);
  return (
    <section id="menu" className="py-32 bg-charcoal-950 text-stone-50 relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-saffron-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-saffron-500 font-bold tracking-widest uppercase text-sm block mb-4">Our Menu</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight">Flavors that <br/><span className="text-stone-400 italic">speak for themselves</span></h2>
          </div>
          <Link to="/menu" className="bg-saffron-500 hover:bg-saffron-400 text-charcoal-950 px-8 py-4 rounded-full font-bold transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 whitespace-nowrap">
            Order Full Menu <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Naan - Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 relative rounded-[2rem] overflow-hidden min-h-[450px] group border border-charcoal-800"
          >
            <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop" alt="Dum Biryani" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent p-10 flex flex-col justify-end">
              <h3 className="text-4xl font-serif font-bold text-saffron-400 mb-2">{menuItems[0].category}</h3>
              <p className="text-stone-300 mb-8 max-w-md">{menuItems[0].description}</p>
              <div className="space-y-4 max-w-md">
                {menuItems[0].items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-stone-500/30 pb-2">
                    <span className="font-bold text-xl">{item.name}</span>
                    <span className="text-saffron-400 text-sm font-bold uppercase tracking-wider">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Curries - Tall Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 relative rounded-[2rem] overflow-hidden min-h-[450px] group border border-charcoal-800"
          >
            <img src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop" alt="Naan & Kulcha" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/80 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-3xl font-serif font-bold text-saffron-400 mb-2">{menuItems[1].category}</h3>
              <p className="text-stone-300 mb-6 text-sm">{menuItems[1].description}</p>
              <div className="space-y-3">
                {menuItems[1].items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-stone-500/20 pb-2">
                    <span className="font-bold text-sm">{item.name}</span>
                    <span className="text-saffron-400 text-xs font-bold uppercase tracking-wider">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Wraps - Medium Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-5 relative rounded-[2rem] overflow-hidden min-h-[300px] group border border-charcoal-800"
          >
            <img src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop" alt="Quick Bites" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-70" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-3xl font-serif font-bold text-saffron-400 mb-2">{menuItems[3].category}</h3>
              <p className="text-stone-300 mb-4 text-sm">{menuItems[3].description}</p>
              <div className="space-y-3">
                {menuItems[3].items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-stone-500/30 pb-2">
                    <span className="font-bold">{item.name}</span>
                    <span className="text-saffron-400 text-xs font-bold uppercase tracking-wider">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Staples - Wide Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-7 relative rounded-[2rem] overflow-hidden min-h-[300px] group bg-saffron-500 text-charcoal-950 flex flex-col md:flex-row items-center shadow-[0_0_30px_rgba(245,158,11,0.15)]"
          >
            <div className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center h-full z-10">
              <h3 className="text-4xl font-serif font-bold mb-4">{menuItems[2].category}</h3>
              <p className="text-charcoal-800 mb-8 text-lg font-medium">{menuItems[2].description}</p>
              <div className="space-y-4">
                {menuItems[2].items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-charcoal-950/20 pb-2">
                    <span className="font-bold text-xl">{item.name}</span>
                    <span className="bg-charcoal-950 text-saffron-500 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 h-full absolute md:relative inset-0 md:inset-auto opacity-20 md:opacity-100">
              <img src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop" alt="Naan Kottu" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1617692855027-33b14f061079?q=80&w=800&auto=format&fit=crop", // Cooked food on white ceramic plate
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop", // Chicken Curry
    "https://images.unsplash.com/photo-1712757248842-04f6e3844374?q=80&w=800&auto=format&fit=crop", // Wooden table topped with bowls of food
    "https://images.unsplash.com/photo-1710091691780-c7eb0dc50cf8?q=80&w=800&auto=format&fit=crop", // Bowl of curry rice and pita bread
    "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=800&auto=format&fit=crop", // Cooked meat on pan
    "https://images.unsplash.com/photo-1621964197881-85b7e2ada98a?q=80&w=800&auto=format&fit=crop", // Green and brown vegetable dish
    "https://images.unsplash.com/photo-1749409291833-3653aeb94a2c?q=80&w=800&auto=format&fit=crop", // Delicious noodles dish
    "https://images.unsplash.com/photo-1736239093375-34f0a2f33c7d?q=80&w=800&auto=format&fit=crop", // Black plate topped with fried food
    "https://images.unsplash.com/photo-1764304733301-3a9f335f0c67?q=80&w=800&auto=format&fit=crop", // Chicken curry in a white bowl
    "https://images.unsplash.com/photo-1697155406055-2db32d47ca07?q=80&w=800&auto=format&fit=crop"  // Pan filled with rice and broccoli
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        
        if (isEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by roughly one image width + gap
          const scrollAmount = window.innerWidth < 768 ? 316 : 416; // 300px/400px + 16px gap
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 bg-charcoal-950 overflow-hidden border-t border-charcoal-800">
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
  );
};

const Reviews = () => {
  const { data, branch } = useContext(BranchContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const branchReviews = allReviews.filter(r => r.branch === branch);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        
        if (isEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const scrollAmount = window.innerWidth < 768 ? 324 : 424; // 300px/400px + 24px gap
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [branch]);

  return (
    <section id="reviews" className="py-32 bg-charcoal-900 border-t border-charcoal-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-saffron-500 font-bold tracking-widest uppercase text-sm block mb-4">Testimonials</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-stone-50 mb-4">Loved by locals in {data.shortName}</h2>
            <div className="flex items-center gap-3 text-stone-300">
              <span className="font-black text-3xl text-stone-50">{data.rating}</span>
              <div className="flex text-saffron-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={28} fill="currentColor" className={i === 4 && data.rating !== "5.0" ? "opacity-50" : ""} />)}
              </div>
              <span className="text-stone-400 font-bold uppercase tracking-wider text-sm ml-2">Based on {data.reviews}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-6 px-4 sm:px-6 lg:px-8 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory hide-scrollbar scroll-smooth"
      >
        {branchReviews.map((review, idx) => (
          <div 
            key={idx}
            className={`min-w-[300px] md:min-w-[400px] h-[350px] p-10 rounded-[2rem] relative border shrink-0 snap-center ${idx % 2 === 1 ? 'bg-saffron-500 text-charcoal-950 shadow-[0_0_30px_rgba(245,158,11,0.2)] border-saffron-400' : 'bg-charcoal-950 text-stone-50 shadow-xl border-charcoal-800'}`}
          >
            <Quote size={48} className={`mb-6 opacity-20 ${idx % 2 === 1 ? 'text-charcoal-950' : 'text-saffron-500'}`} />
            <div className={`flex mb-6 ${idx % 2 === 1 ? 'text-charcoal-950' : 'text-saffron-500'}`}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "opacity-30" : ""} />
              ))}
            </div>
            <p className="text-lg font-medium mb-10 leading-relaxed line-clamp-4">"{review.text}"</p>
            <div className="flex items-center gap-4 absolute bottom-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${idx % 2 === 1 ? 'bg-charcoal-950 text-saffron-500' : 'bg-charcoal-800 text-saffron-500'}`}>
                {review.author === '[Anonymous]' ? 'A' : review.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm uppercase tracking-wider">{review.author === '[Anonymous]' ? 'Anonymous' : review.author}</p>
                <p className={`text-xs font-bold ${idx % 2 === 1 ? 'text-charcoal-950/60' : 'text-stone-500'}`}>Google Review</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Location = () => {
  const { data } = useContext(BranchContext);
  return (
    <section id="location" className="py-32 bg-charcoal-950 relative border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-charcoal-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-charcoal-800">
          
          <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center text-stone-50">
            <span className="text-saffron-500 font-black tracking-widest uppercase text-sm block mb-4">Find Us</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-10 leading-tight">Drop by for a <br/><span className="text-saffron-500 italic">bite.</span></h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-charcoal-950 border border-charcoal-800 text-saffron-500 p-3 rounded-2xl"><MapPin size={24} /></div>
                <div>
                  <h4 className="font-black text-xl mb-1">{data.name}</h4>
                  <p className="font-medium text-lg text-stone-400 whitespace-pre-line">{data.address.replace(', ', '\n')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-charcoal-950 border border-charcoal-800 text-saffron-500 p-3 rounded-2xl"><Clock size={24} /></div>
                <div>
                  <h4 className="font-black text-xl mb-1">Hours</h4>
                  <p className="font-medium text-lg text-stone-400">Monday – Sunday<br/><span className="text-saffron-500 text-sm">{data.hours}</span></p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-charcoal-950 border border-charcoal-800 text-saffron-500 p-3 rounded-2xl"><Phone size={24} /></div>
                <div>
                  <h4 className="font-black text-xl mb-1">Phone</h4>
                  <p className="font-medium text-lg text-stone-400"><a href={`tel:${data.phoneLink}`} className="hover:text-saffron-500 transition-colors">{data.phone}</a></p>
                </div>
              </div>
            </div>
            
            <div id="order" className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <a href={`tel:${data.phoneLink}`} className="bg-charcoal-950 border border-charcoal-700 hover:bg-charcoal-800 text-saffron-500 px-6 py-4 rounded-full font-black text-center transition-colors flex items-center justify-center gap-2">
                <Phone size={20} /> Call {data.shortName}
              </a>
              <a href={data.uberEats} target="_blank" rel="noopener noreferrer" className="bg-saffron-500 hover:bg-saffron-400 text-charcoal-950 px-8 py-4 rounded-full font-black text-center transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 w-full sm:w-auto">
                Order on Uber Eats
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 min-h-[500px] relative">
            <iframe 
              key={data.id}
              src={data.mapEmbed} 
              width="100%" 
              height="100%" 
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={`Hi Naan ${data.shortName} Location`}
              className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { data } = useContext(BranchContext);
  return (
    <footer className="bg-charcoal-950 text-stone-400 py-16 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="font-serif text-4xl font-black text-saffron-500">Hi! naan</span>
          <p className="mt-2 text-sm text-stone-500 font-medium">{data.name} • Sri Lankan-style naan & Indian-fusion</p>
        </div>
        
        <div className="flex gap-8 font-bold">
          <a href="https://web.facebook.com/p/Hi-Naan-100091545111911/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="hover:text-saffron-400 transition-colors">Facebook</a>
          <a href="https://www.instagram.com/hinaanfood/" target="_blank" rel="noopener noreferrer" className="hover:text-saffron-400 transition-colors">Instagram</a>
          <a href={data.uberEats} target="_blank" rel="noopener noreferrer" className="hover:text-saffron-400 transition-colors">Uber Eats</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-charcoal-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between font-medium">
        <p>&copy; {new Date().getFullYear()} Hi Naan Restaurant. All rights reserved.</p>
        <p className="mt-2 md:mt-0 text-stone-500">Part of the Hi Naan Multi-Branch Chain</p>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Menu />
      <Gallery />
      <Reviews />
      <Location />
    </>
  );
};

export default function App() {
  const [branch, setBranch] = useState<BranchId>('kottawa');

  return (
    <BranchContext.Provider value={{ branch, setBranch, data: branchData[branch] }}>
      <BrowserRouter basename="/HiNaanRestaurant/">
        <div className="min-h-screen bg-charcoal-950 selection:bg-saffron-500 selection:text-charcoal-950">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<FullMenu />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </BranchContext.Provider>
  );
}
