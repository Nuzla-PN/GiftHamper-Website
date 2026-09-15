'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin, clearError } from '../../features/auth/authSlice';
import { Gift, Eye, EyeOff, Shield } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    }
  }, [token, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(loginAdmin({ email, password }));
    if (loginAdmin.fulfilled.match(result)) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[40%] bg-[#1a1a2e] relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#8B3A62] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#D4AF37] rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="w-20 h-20 bg-[#8B3A62] flex items-center justify-center mb-8 mx-auto">
            <Gift className="text-white" size={36} />
          </div>
          <div className="inline-block px-4 py-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">Admin Control Center</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            GiftHamper<br />Administration
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Manage sellers, orders, products, and everything in between from a single powerful dashboard.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-[60%] bg-[#F8F6F4] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#8B3A62] flex items-center justify-center">
              <Gift className="text-white" size={20} />
            </div>
            <span className="font-bold text-[#1a1a2e]">GiftHamper</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Sign in to your account</h2>
            <p className="text-sm text-gray-500">Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2 font-mono">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="admin@gifthamper.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2 font-mono">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>
                  <Shield size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            GiftHamper Admin &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
