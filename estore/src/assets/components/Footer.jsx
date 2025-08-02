import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react'; // or your preferred icons

function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <p className="text-sm text-gray-600 text-center md:text-left">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </p>

        {/* Social Media */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-500 hover:text-blue-600 transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-500 transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-500 hover:text-pink-500 transition">
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
