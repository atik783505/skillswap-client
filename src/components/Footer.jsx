import { Link, Button } from "@heroui/react";
// Gravity UI থেকে প্রয়োজনীয় আইকনগুলো ইম্পোর্ট করা হয়েছে
import { Globe, ArrowRight } from "@gravity-ui/icons";
import { FaXTwitter } from "react-icons/fa6";

// মডার্ন স্কিল সোয়াপ আইকন লোগো
const SkillSwapLogo = () => (
  <svg
    className="h-6 w-6 text-emerald-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 text-slate-400 py-12 px-6 md:px-12">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* কলাম ১: ব্র্যান্ড ইনফো ও সোশ্যাল আইকন (Gravity UI Icons) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <SkillSwapLogo />
            <p className="font-bold text-xl tracking-tight text-white">
              Skill<span className="text-emerald-500">Swap</span>
            </p>
          </div>
          <p className="text-xs leading-relaxed text-slate-500 max-w-xs">
            The premium micro-tasking ecosystem for the modern era. Quality execution, guaranteed.
          </p>
          <div className="flex items-center gap-4 mt-2">
            {/* Gravity UI মডার্ন X/Twitter আইকন */}
            <FaXTwitter className="h-5 w-5 text-slate-400 hover:text-white transition-colors cursor-pointer" />
            {/* Gravity UI গ্লোব আইকন */}
            <Globe className="h-5 w-5 text-slate-400 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>

        {/* কলাম ২: Marketplace লিংক */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-white tracking-wide">Marketplace</h4>
          <ul className="flex flex-col gap-2 text-xs">
            <li><Link href="/tasks" className="text-slate-500 hover:text-emerald-400 transition-colors">Browse Tasks</Link></li>
            <li><Link href="/freelancers" className="text-slate-500 hover:text-emerald-400 transition-colors">Browse Freelancers</Link></li>
            <li><Link href="/pricing" className="text-slate-500 hover:text-emerald-400 transition-colors">Premium Tiers</Link></li>
          </ul>
        </div>

        {/* কলাম ৩: Legal লিংক */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-white tracking-wide">Legal</h4>
          <ul className="flex flex-col gap-2 text-xs">
            <li><Link href="/terms" className="text-slate-500 hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-slate-500 hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/security" className="text-slate-500 hover:text-emerald-400 transition-colors">Security</Link></li>
          </ul>
        </div>

        {/* কলাম ৪: কন্ট্যাক্ট সাপোর্ট ও নিউজলেটার ইনপুট */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-white tracking-wide">Contact Support</h4>
          <div className="text-xs">
            <p className="text-slate-500">Need help with a project?</p>
            <Link href="mailto:support@skillswap.com" className="text-emerald-400 font-medium hover:underline mt-1 block">
              support@skillswap.com
            </Link>
          </div>
          
          {/* নিউজলেটার ইনপুট বক্স */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-md p-1 mt-2 focus-within:border-slate-700 transition-all">
            <input 
              type="email" 
              placeholder="Task updates via email" 
              className="bg-transparent text-xs text-white px-3 py-1.5 outline-none w-full placeholder:text-slate-600"
            />
            <Button 
              isIconOnly
              size="sm"
              className="bg-transparent text-emerald-500 hover:text-emerald-400 min-w-0 p-1"
              aria-label="Subscribe"
            >
              {/* Gravity UI ArrowRight আইকন */}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

      </div>

      {/* বটম সেকশন: কপিরাইট টেক্সট */}
      <div className="w-11/12 mx-auto max-w-5xl border-t border-slate-900 pt-6 text-center">
        <p className="text-xxs text-slate-600">
          © 2026 SkillSwap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}