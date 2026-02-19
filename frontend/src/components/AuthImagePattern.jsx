
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-gray-800 p-12">
      <div className="max-w-md text-center">
        {/* Abstract pattern */}
        <div className="grid grid-cols-4 gap-3 mb-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl transition-all duration-500 ${
                i % 3 === 0 
                  ? "bg-primary/30 scale-90" 
                  : i % 2 === 0 
                    ? "bg-primary/10 scale-75" 
                    : "bg-primary/20 scale-100"
              }`}
            />
          ))}
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-gray-400 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;

