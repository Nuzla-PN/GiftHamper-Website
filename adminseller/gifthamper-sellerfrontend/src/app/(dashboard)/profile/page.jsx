'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../features/auth/authSlice';
import { User, Mail, FileText, Image, Loader2, Save } from 'lucide-react';

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
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your seller profile</p>
      </div>

      <div className="card">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center overflow-hidden">
            {form.avatar ? (
              <img src={form.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-2xl font-bold">
                {seller?.name?.charAt(0)?.toUpperCase() || 'S'}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{seller?.name}</h2>
            <p className="text-gray-400">{seller?.email}</p>
          </div>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                className="input-field pl-10"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                disabled
                className="input-field pl-10 bg-gray-50 text-gray-500 cursor-not-allowed"
                value={seller?.email || ''}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                rows={4}
                className="input-field pl-10"
                placeholder="Tell customers about your gift hamper business..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="url"
                className="input-field pl-10"
                placeholder="https://example.com/avatar.jpg"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
