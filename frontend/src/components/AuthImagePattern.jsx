import { motion } from "framer-motion";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-xl p-12 relative overflow-hidden border-l border-slate-800">

      {/* Decorative ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full mix-blend-multiply blur-[80px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full mix-blend-multiply blur-[80px] animate-pulse pointer-events-none delay-1000" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="max-w-md text-center relative z-10"
      >
        {/* Abstract pattern */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`aspect-square rounded-2xl border border-slate-700/50 shadow-lg ${i % 3 === 0
                  ? "bg-indigo-600/30 shadow-indigo-500/20"
                  : i % 2 === 0
                    ? "bg-purple-600/20 shadow-purple-500/10"
                    : "bg-slate-800 shadow-slate-900/50"
                }`}
            />
          ))}
        </div>
        <h2 className="text-4xl font-extrabold text-slate-100 mb-4 tracking-tight">{title}</h2>
        <p className="text-slate-400 text-lg leading-relaxed font-light">{subtitle}</p>
      </motion.div>
    </div>
  );
};
export default AuthImagePattern;
