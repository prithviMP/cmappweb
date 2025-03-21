import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../lib/utils/auth';
import useAuthStore from '../../lib/store/useAuthStore';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f1f7]">
      <div className="flex w-full max-w-[1200px] bg-white rounded-xl overflow-hidden">
        <div className="w-1/2 p-8">
          <div className="mb-8">
            <img
              src="/group-18186.svg"
              alt="NETZE.HOMES Logo"
              className="h-8"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-12 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the password"
                className="h-12 rounded-lg"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {/* Implement forgot password */}}
                className="text-[#577bff] text-sm hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#577bff] hover:bg-[#4a69d9] text-white rounded-lg"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>

        <div className="w-1/2 bg-[#f8f9fe] flex items-center justify-center p-8">
          <img
            src="/Image.png"
            alt="Construction Site Illustration"
            className="w-full h-auto"
            style={{
              objectFit: 'contain',
              maxHeight: '80vh'
            }}
          />
        </div>
      </div>
    </div>
  );
};