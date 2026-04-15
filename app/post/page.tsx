'use client';

import { useState } from 'react';
import { Camera, X, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

const categories = [
  '教科書',
  '参考書',
  '文房具',
  '電子機器',
  '生活用品',
  '飲食物',
  'その他',
];

const conditions = [
  '新品・未使用',
  'ほぼ未使用',
  '目立った傷や汚れなし',
  'やや傷や汚れあり',
  '傷や汚れあり',
];

const shippingOptions = [
  '手渡し（キャンパス内）',
  '発送（送料出品者負担）',
  '発送（送料購入者負担）',
];

export default function PostPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [shipping, setShipping] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageAdd = () => {
    // TODO: 実際のファイルアップロード処理
    if (images.length < 4) {
      setImages([...images, `placeholder-${images.length + 1}`]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title || !price || !category || !condition || !shipping) return;

    setIsSubmitting(true);
    // TODO: API呼び出し
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/home');
    }, 1000);
  };

  const isValid = title && price && category && condition && shipping;

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-16 pb-24">
        <div className="px-4 pt-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900">出品する</h1>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              商品の写真（最大4枚）
            </label>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((_, index) => (
                <div key={index} className="relative w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                  <button
                    onClick={() => handleImageRemove(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <button
                  onClick={handleImageAdd}
                  className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors flex-shrink-0"
                >
                  <Camera size={24} />
                  <span className="text-xs mt-1">{images.length}/4</span>
                </button>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              商品名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: 数学教科書 線形代数入門"
              maxLength={40}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:border-gray-500 transition-colors"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{title.length}/40</p>
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              商品の説明
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="商品の状態や特徴を記入してください"
              rows={4}
              maxLength={1000}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:border-gray-500 transition-colors resize-none"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{description.length}/1000</p>
          </div>

          {/* Category */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              カテゴリ <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    category === cat
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              商品の状態 <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {conditions.map((cond) => (
                <button
                  key={cond}
                  onClick={() => setCondition(cond)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    condition === cond
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              配送方法 <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {shippingOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setShipping(opt)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    shipping === opt
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              販売価格 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                min="100"
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 bg-white text-lg font-bold focus:outline-none focus:border-gray-500 transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">円</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">100円以上で設定してください</p>
          </div>
        </div>

        {/* Submit Button - Fixed */}
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
          <button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-lg font-bold text-base transition-colors ${
              isValid && !isSubmitting
                ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? '出品中...' : '出品する'}
          </button>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
