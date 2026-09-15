'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loginSeller, clearError } from '../../features/auth/authSlice';
import { Gift, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: '', password: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (token) router.replace('/dashboard');
  }, [token, router]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginSeller(form));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand */}
      <div
        className={`hidden lg:flex lg:w-[40%] relative overflow-hidden transition-all duration-700 ${
          mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}
        style={{ background: '#1A1A2E' }}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 15px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10" style={{ background: '#8B3A62' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10" style={{ background: '#D4AF37' }} />

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="w-16 h-16 flex items-center justify-center mb-8" style={{ background: '#8B3A62' }}>
            <Gift className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">GiftHamper</h1>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: '#D4AF37' }}>
            Seller Portal
          </p>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Manage your gift hamper products, track orders, and grow your business — all from one dashboard.
          </p>

          <div className="mt-12 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ background: '#D4AF37' }} />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div
        className={`flex-1 flex items-center justify-center px-6 py-12 transition-all duration-700 delay-150 ${
          mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}
        style={{ background: '#FDF5F3' }}
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-12 h-12 flex items-center justify-center" style={{ background: '#8B3A62' }}>
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GiftHamper</h1>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#8B3A62' }}>
                Seller Portal
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-sm text-gray-500 mt-1">Sign in to manage your store</p>
          </div>

          {error && (
            <div className="border border-red-200 bg-red-50 text-red-600 px-4 py-3 text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  className="input-field pl-10"
                  placeholder="seller@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2"
            >
              {loading ? (
                <div className="spinner" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-semibold hover:underline"
              style={{ color: '#8B3A62' }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
