import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-12">
          Choose Your Platform
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            to="/facebook"
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-4">
              <Facebook className="w-20 h-20 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Facebook</h2>
              <p className="text-gray-600 text-center">
                Connect with friends, share updates, and join communities
              </p>
            </div>
          </Link>

          <Link
            to="/instagram"
            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-4">
              <Instagram className="w-20 h-20 text-pink-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Instagram</h2>
              <p className="text-gray-600 text-center">
                Share photos, stories, and explore visual content
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}