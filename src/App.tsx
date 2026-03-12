/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, Sparkles, Shield, Zap, Github } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-xl tracking-tight">WelcomeApp</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">Pricing</a>
              <a href="#" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">About</a>
              <button className="bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all active:scale-95">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-6 border border-indigo-100">
                <Zap className="w-3 h-3" />
                Now in Beta
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-8 max-w-4xl mx-auto leading-[1.1]">
                Build your next big idea <span className="text-indigo-600">faster</span> than ever.
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                A modern template designed for speed, performance, and developer experience. 
                Start building with React, Tailwind CSS, and Motion today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 flex items-center justify-center gap-2">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto bg-white border border-zinc-200 text-zinc-900 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-zinc-50 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Github className="w-5 h-5" />
                  View on GitHub
                </button>
              </div>
            </motion.div>

            {/* Feature Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="p-8 bg-white rounded-3xl border border-zinc-200 hover:border-indigo-200 transition-all group text-left">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Optimized for speed with Vite and modern React patterns. Your users will love the performance.
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-zinc-200 hover:border-indigo-200 transition-all group text-left">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure by Default</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Built with security best practices in mind. Your data and your users' privacy are our top priority.
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-zinc-200 hover:border-indigo-200 transition-all group text-left">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Beautiful UI</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Crafted with Tailwind CSS for a modern, responsive, and accessible user interface.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg tracking-tight">WelcomeApp</span>
            </div>
            <div className="flex gap-8 text-sm text-zinc-500">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
            <p className="text-sm text-zinc-400">
              © {new Date().getFullYear()} WelcomeApp Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

