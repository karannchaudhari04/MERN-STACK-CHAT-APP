import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, CheckCircle, Link as LinkIcon } from "lucide-react";

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
    <div className="min-h-screen pt-20 pb-10 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="text-gray-400 mt-2">Manage your account settings</p>
          </div>

          {/* Profile Card */}
          <div className="bg-gray-800 rounded-2xl p-6 md:p-8 space-y-6 border border-gray-700">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-28 md:size-36 rounded-full object-cover border-4 border-gray-700 shadow-lg"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-1 right-1 
                    bg-primary hover:scale-110
                    p-2 rounded-full cursor-pointer 
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
              <p className="text-sm text-gray-500">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* User Info */}
            <div className="space-y-5 pt-4">
              <div className="space-y-2">
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <div className="px-4 py-3 bg-gray-900 rounded-xl border border-gray-700 text-white">
                  {authUser?.fullName}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <div className="px-4 py-3 bg-gray-900 rounded-xl border border-gray-700 text-white">
                  {authUser?.email}
                </div>
              </div>
            </div>

            {/* Account Info Section */}
            <div className="mt-6 bg-gray-900 rounded-xl p-5 border border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-4">Account Information</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Member Since</span>
                  </div>
                  <span className="text-white">{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Account Status</span>
                  </div>
                  <span className="text-green-400 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

