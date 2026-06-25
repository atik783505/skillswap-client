"use client";

import { useState } from "react";
import { Avatar, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { FiEdit2 } from "react-icons/fi";
import { EditProfileModal } from "@/components/EditProfileModal";

export default function MyProfile() {
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">

        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl backdrop-blur-sm">
          <Avatar className="w-32 h-32 text-large ring-4 ring-emerald-500/20 shadow-lg">
            <Avatar.Image 
              alt={session?.user?.name || "User"} 
              src={session?.user?.image || "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"} 
            />
            <Avatar.Fallback className="text-2xl font-bold bg-slate-800">
              {session?.user?.name?.slice(0, 2).toUpperCase() || "JD"}
            </Avatar.Fallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">{session?.user?.name || "Atikur Rahman"}</h1>
            <p className="text-slate-400 text-lg mb-6">{session?.user?.email || "atik13672@gmail.com"}</p>
            <Button 
              onPress={() => setIsOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 h-12 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              startContent={<FiEdit2 size={18} />}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isOpen} 
        onOpenChange={setIsOpen} 
        user={session?.user} 
      />
    </div>
  );
}