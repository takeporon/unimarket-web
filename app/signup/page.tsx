'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface SignupForm {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  university: string;
  faculty: string;
  department: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    university: '',
    faculty: '',
    department: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // 大学リスト（サンプル）
  const universities = [
    '東京大学',
    '京都大学',
    '大阪大学',
    '東京工業大学',
    'その他',
  ];

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // メール検証
    if (!form.email) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!form.email.includes('@ac.jp')) {
      newErrors.email = '大学メールアドレス（ac.jpドメイン）を使用してください';
    }

    // パスワード検証
    if (!form.password) {
      newErrors.password = 'パスワードを入力してください';
    } else if (form.password.length < 6) {
      newErrors.password = 'パスワードは6文字以上です';
    }

    if (!form.passwordConfirm) {
      newErrors.passwordConfirm = 'パスワードを再入力してください';
    } else if (form.password !== form.passwordConfirm) {
      newErrors.passwordConfirm = 'パスワードが一致しません';
    }

    // ニックネーム検証
    if (!form.nickname) {
      newErrors.nickname = 'ニックネームを入力してください';
    }

    // 大学選択検証
    if (!form.university) {
      newErrors.university = '大学を選択してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    // TODO: API呼び出し
    setTimeout(() => {
      console.log('新規登録:', form);
      setIsLoading(false);
      // TODO: ログイン画面またはメール確認画面へ
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-green-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <span className="text-3xl font-bold text-white">U</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">UniMarket</h1>
        <p className="text-gray-600 text-sm mt-2">新規登録</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            大学メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="student@university.ac.jp"
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white text-sm`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white text-sm`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Password Confirm Field */}
        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード（確認） <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="passwordConfirm"
              type={showPasswordConfirm ? 'text' : 'password'}
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.passwordConfirm ? 'border-red-500' : 'border-gray-300'
              } bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white text-sm`}
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswordConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.passwordConfirm && (
            <p className="text-red-500 text-xs mt-1">{errors.passwordConfirm}</p>
          )}
        </div>

        {/* Nickname Field */}
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
            ニックネーム <span className="text-red-500">*</span>
          </label>
          <input
            id="nickname"
            type="text"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            placeholder="太郎"
            maxLength={20}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.nickname ? 'border-red-500' : 'border-gray-300'
            } bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white text-sm`}
          />
          {errors.nickname && <p className="text-red-500 text-xs mt-1">{errors.nickname}</p>}
        </div>

        {/* University Selection */}
        <div>
          <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
            大学 <span className="text-red-500">*</span>
          </label>
          <select
            id="university"
            name="university"
            value={form.university}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.university ? 'border-red-500' : 'border-gray-300'
            } bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white text-sm`}
          >
            <option value="">選択してください</option>
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
          {errors.university && <p className="text-red-500 text-xs mt-1">{errors.university}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg bg-yellow-400 text-gray-900 font-bold text-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
        >
          {isLoading ? '登録中...' : '新規登録'}
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-6 text-center text-gray-600 text-sm">
        すでにアカウントをお持ちですか？{' '}
        <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
          ログイン
        </Link>
      </p>
    </div>
  );
}
