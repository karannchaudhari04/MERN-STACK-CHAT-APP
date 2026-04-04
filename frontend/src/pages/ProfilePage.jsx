import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-28 pb-10 bg-slate-950 font-['Outfit'] relative overflow-hidden">
      <Helmet>
        <title>Chatty | Your Profile</title>
      </Helmet>

      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">Profile</h1>
            <p className="text-slate-400 mt-2 font-light">Manage your account settings</p>
          </div>

          {/* Profile Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-10 space-y-8 border border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">

            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25"></div>
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-32 md:size-40 rounded-full object-cover border-4 border-slate-900 shadow-2xl relative z-10"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-1 right-2 
                    bg-indigo-600 hover:bg-indigo-500 hover:scale-110 shadow-lg shadow-indigo-500/30
                    p-3 rounded-full cursor-pointer z-20
                    transition-all duration-200
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-slate-500 font-light mt-2">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* User Info */}
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="text-sm text-slate-400 flex items-center gap-2 font-medium">
                  <User className="w-4 h-4 text-indigo-400" />
                  Full Name
                </div>
                <div className="px-5 py-4 bg-slate-950/50 rounded-xl border border-slate-800 text-slate-100 font-light">
                  {authUser?.fullName}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-slate-400 flex items-center gap-2 font-medium">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  Email Address
                </div>
                <div className="px-5 py-4 bg-slate-950/50 rounded-xl border border-slate-800 text-slate-100 font-light">
                  {authUser?.email}
                </div>
              </div>
            </div>

            {/* Account Info Section */}
            <div className="mt-8 bg-slate-950/30 rounded-2xl p-6 border border-slate-800">
              <h2 className="text-lg font-semibold text-slate-100 mb-5">Account Information</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-800">
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="font-medium">Member Since</span>
                  </div>
                  <span className="text-slate-100 font-light">{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="font-medium">Account Status</span>
                  </div>
                  <span className="text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full text-sm">Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
