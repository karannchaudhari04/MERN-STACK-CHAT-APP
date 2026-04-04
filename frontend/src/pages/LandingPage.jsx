

import { Link } from "react-router-dom";
import { MessageSquare, Users, Shield, Zap, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-['Outfit'] relative">
      <Helmet>
        <title>Chatty | Welcome to Realtime Chat</title>
        <meta name="description" content="Connect with friends and colleagues in real-time. Fast, secure, and easy to use chat application." />
      </Helmet>

      {/* Ambient glowing background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-pulse pointer-events-none" />

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="w-20 h-20 relative bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                <MessageSquare className="w-10 h-10 text-indigo-400" />
              </div>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Connecting you <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              in real-time.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Experience lightning-fast messaging with enterprise-grade security. Built for modern teams and communities to thrive.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="inline-flex px-8 py-4 items-center justify-center font-semibold text-slate-300 hover:text-white transition-all bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl hover:shadow-lg"
            >
              Sign In to Account
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto pb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Feature 1 */}
          <motion.div variants={itemVariants} className="group p-8 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-indigo-500/10 cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Zap className="w-7 h-7 text-indigo-400" />
            </div>
            <h3 className="font-bold text-2xl text-slate-100 mb-3">Lightning Fast</h3>
            <p className="text-slate-400 leading-relaxed font-light">Instant delivery orchestration powered by WebSockets ensures you never miss a beat or conversation.</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={itemVariants} className="group p-8 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-purple-500/10 cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Users className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="font-bold text-2xl text-slate-100 mb-3">Vibrant Community</h3>
            <p className="text-slate-400 leading-relaxed font-light">Find, add, and connect with teammates effortlessly through our intuitive real-time member directory.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={itemVariants} className="group p-8 rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-pink-500/10 cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Shield className="w-7 h-7 text-pink-400" />
            </div>
            <h3 className="font-bold text-2xl text-slate-100 mb-3">Military Grade</h3>
            <p className="text-slate-400 leading-relaxed font-light">Your privacy is mathematically guaranteed. Chat payloads are securely handled with modern standards.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800/60 relative z-10 w-full text-center bg-slate-950/50 backdrop-blur-md">
        <p className="text-slate-500 font-medium tracking-wide">© {new Date().getFullYear()} Chatty. Designed for modern teams.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

