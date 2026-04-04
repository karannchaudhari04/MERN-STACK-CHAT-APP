import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, MessageSquare, User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950 font-['Outfit'] relative overflow-hidden">
      <Helmet>
        <title>Chatty | Create Account</title>
      </Helmet>

      {/* Ambient background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 w-full h-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="w-full max-w-md space-y-8 bg-slate-900/60 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] border border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
        >
          {/* Logo */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-inner"
              >
                <MessageSquare className="w-8 h-8 text-indigo-400" />
              </motion.div>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">Create Account</h1>
            <p className="text-slate-400 mt-3 font-light">Get started for free today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                className="w-full pl-12 pr-5 py-4 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-light"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="space-y-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="email"
                className="w-full pl-12 pr-5 py-4 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-light"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative space-y-1">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-12 py-4 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-light pr-12"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-800 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-slate-500" />
                ) : (
                  <Eye className="h-5 w-5 text-slate-500" />
                )}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <p className="text-center text-slate-400 pt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends and stay in touch."
      />
    </div>
  );
};
export default SignUpPage;
