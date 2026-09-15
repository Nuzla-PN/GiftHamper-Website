'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../features/auth/authSlice';
import { User, Mail, FileText, Image, Loader2, Save, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { seller, loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: '',
    description: '',
    avatar: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (seller) {
      setForm({
        name: seller.name || '',
        description: seller.description || '',
        avatar: seller.avatar || '',
      });
    }
  }, [seller]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaved(false);
    await dispatch(updateProfile(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <span className="section-badge">Profile</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-3">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your seller profile</p>
      </div>

      {/* Profile card */}
      <div className="card">
        {/* Avatar + info header */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-gray-100">
          <div
            className="w-20 h-20 flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ background: '#8B3A62' }}
          >
            {form.avatar ? (
              <img src={form.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-2xl font-bold">
                {seller?.name?.charAt(0)?.toUpperCase() || 'S'}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{seller?.name}</h2>
            <p className="text-sm text-gray-400">{seller?.email}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] mt-1" style={{ color: '#D4AF37' }}>
              Seller Account
            </p>
          </div>
        </div>

        {/* Success message */}
        {saved && (
          <div className="flex items-center gap-2 border border-emerald-200 bg-emerald-50 text-emerald-600 px-4 py-3 text-sm mb-6">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                className="input-field pl-10"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          {/* Email (disabled) */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                disabled
                className="input-field pl-10 bg-gray-50 text-gray-400 cursor-not-allowed"
                value={seller?.email || ''}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-wider">
              Email cannot be changed
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                rows={4}
                className="input-field pl-10"
                placeholder="Tell customers about your gift hamper business..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>

          {/* Avatar URL */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
              Avatar URL
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                className="input-field pl-10"
                placeholder="https://example.com/avatar.jpg"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              />
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              {loading ? (
                <div className="spinner" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
