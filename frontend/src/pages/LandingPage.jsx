

import { Link } from "react-router-dom";
import { MessageSquare, Users, Shield, Zap } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Chatty
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with friends and colleagues in real-time. Fast, secure, and easy to use chat application.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="btn btn-primary btn-lg"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-gray-900"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="card bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700">
            <div className="card-body items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-white">Fast & Real-time</h3>
              <p className="text-gray-400">Instant messaging with real-time updates</p>
            </div>
          </div>

          <div className="card bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700">
            <div className="card-body items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-white">Connect with Others</h3>
              <p className="text-gray-400">Find and chat with friends easily</p>
            </div>
          </div>

          <div className="card bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700">
            <div className="card-body items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-white">Secure</h3>
              <p className="text-gray-400">Your messages are protected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-6 bg-gray-900/50 text-base-content border-t border-gray-700">
        <div>
          <p className="text-gray-400">© 2024 Chatty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

