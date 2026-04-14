'use client';

import { useState } from 'react';
import { Edit2, LogOut, Heart, Package, Star, MapPin, Mail, Phone } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  university: string;
  email: string;
  phone: string;
  bio: string;
  rating: number;
  reviews: number;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  purchaseCount: number;
  wishlistCount: number;
  sellCount: number;
}

const userProfile: UserProfile = {
  id: 'user123',
  name: 'あきら',
  avatar: 'A',
  university: '東京大学',
  email: 'akira@ac.jp',
  phone: '090-XXXX-XXXX',
  bio: 'テキスト本や参考書をよく販売しています。丁寧な対応を心がけています。',
  rating: 4.8,
  reviews: 24,
  postalCode: '100-0001',
  prefecture: '東京都',
  city: '千代田区',
  address: '丸の内1-1-1',
  purchaseCount: 12,
  wishlistCount: 5,
  sellCount: 18,
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const displayProfile = isEditing ? editedProfile : userProfile;

  return (
    <MainLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">マイプロフィール</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 px-3 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm font-semibold"
            >
              <Edit2 size={16} />
              編集
            </button>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-cyan-700">{displayProfile.avatar}</span>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-xl font-bold w-full border-b border-gray-300 pb-1 focus:outline-none focus:border-cyan-500"
                />
              ) : (
                <p className="text-xl font-bold text-gray-900">{displayProfile.name}</p>
              )}
              <p className="text-sm text-gray-600">{displayProfile.university}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold">
                  {displayProfile.rating} ({displayProfile.reviews} 件)
                </span>
              </div>
            </div>
          </div>

          {isEditing ? (
            <textarea
              value={editedProfile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-cyan-500 mb-3"
              rows={2}
            />
          ) : (
            <p className="text-sm text-gray-600">{displayProfile.bio}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{displayProfile.purchaseCount}</p>
            <p className="text-xs text-gray-600">購入数</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{displayProfile.wishlistCount}</p>
            <p className="text-xs text-gray-600">ウィッシュリスト</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <p className="text-2xl font-bold text-gray-900">{displayProfile.sellCount}</p>
            <p className="text-xs text-gray-600">販売数</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
          <p className="font-bold text-sm text-gray-900">連絡先情報</p>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-gray-500" />
            {isEditing ? (
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="flex-1 border-b border-gray-300 text-sm pb-1 focus:outline-none focus:border-cyan-500"
              />
            ) : (
              <p className="text-sm text-gray-900">{displayProfile.email}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-gray-500" />
            {isEditing ? (
              <input
                type="tel"
                value={editedProfile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="flex-1 border-b border-gray-300 text-sm pb-1 focus:outline-none focus:border-cyan-500"
              />
            ) : (
              <p className="text-sm text-gray-900">{displayProfile.phone}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-gray-600" />
            <p className="font-bold text-sm text-gray-900">配送先住所</p>
          </div>
          {['postalCode', 'prefecture', 'city', 'address'].map((field) => (
            <div key={field}>
              <p className="text-xs text-gray-500 mb-1">
                {field === 'postalCode' && '郵便番号'}
                {field === 'prefecture' && '都道府県'}
                {field === 'city' && '市区町村'}
                {field === 'address' && '住所'}
              </p>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile[field as keyof UserProfile] as string}
                  onChange={(e) => handleInputChange(field as keyof UserProfile, e.target.value)}
                  className="w-full border-b border-gray-300 text-sm pb-1 focus:outline-none focus:border-cyan-500"
                />
              ) : (
                <p className="text-sm font-semibold text-gray-900">
                  {displayProfile[field as keyof UserProfile]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 text-sm font-semibold">
            <Heart size={18} className="text-red-500" />
            ウィッシュリスト
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 text-sm font-semibold">
            <Package size={18} className="text-blue-500" />
            販売中の商品
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveProfile}
                className="flex-1 px-4 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500"
              >
                保存する
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300"
              >
                キャンセル
              </button>
            </>
          ) : (
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300">
              <LogOut size={20} />
              ログアウト
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
