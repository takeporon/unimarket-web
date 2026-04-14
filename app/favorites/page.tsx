'use client';

import { useState } from 'react';
import { Search, Heart, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

interface FavoriteItem {
  id: string;
  productTitle: string;
  price: number;
  seller: string;
  university: string;
  category: string;
  addedDate: string;
}

const favoriteItems: FavoriteItem[] = [
  {
    id: '1',
    productTitle: 'モンスター24本',
    price: 10000,
    seller: 'あきら',
    university: '東京大学',
    category: '飲料',
    addedDate: '2日前',
  },
  {
    id: '2',
    productTitle: '参考書 化学',
    price: 8000,
    seller: 'たなか',
    university: '京都大学',
    category: '参考書',
    addedDate: '1週間前',
  },
  {
    id: '3',
    productTitle: 'ノート 5冊セット',
    price: 7000,
    seller: 'さとみ',
    university: '大阪大学',
    category: '文房具',
    addedDate: '2週間前',
  },
  {
    id: '4',
    productTitle: '教科書 数学上',
    price: 12000,
    seller: 'ゆうき',
    university: '東京大学',
    category: '教科書',
    addedDate: '3週間前',
  },
  {
    id: '5',
    productTitle: '高級ボールペン 10本セット',
    price: 5500,
    seller: 'じゅんぺい',
    university: '慶応大学',
    category: '文房具',
    addedDate: '1ヶ月前',
  },
];

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>(favoriteItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'すべて' },
    { value: '教科書', label: '教科書' },
    { value: '参考書', label: '参考書' },
    { value: '文房具', label: '文房具' },
    { value: 'その他', label: 'その他' },
  ];

  const filteredFavorites = favorites.filter((item) => {
    const matchesSearch =
      item.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const totalPrice = filteredFavorites.reduce((sum, item) => sum + item.price, 0);

  return (
    <MainLayout>
      <div className="space-y-3">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">ウィッシュリスト</h1>
          <p className="text-xs text-gray-500 mt-1">{filteredFavorites.length} 件</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg border border-gray-200 px-3 py-2 flex items-center gap-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="商品またはユーザーを検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilterCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filterCategory === cat.value
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Favorites List */}
        {filteredFavorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
            <Heart size={48} className="text-gray-300 mb-3" />
            <p className="text-gray-600 text-sm">ウィッシュリストに商品がありません</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFavorites.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 p-3 flex gap-3 hover:shadow-md transition-shadow"
              >
                {/* Product Image Placeholder */}
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs text-gray-500">画像</span>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => router.push(`/products/${item.id}`)}
                    className="text-sm font-semibold text-gray-900 hover:text-cyan-600 text-left"
                  >
                    {item.productTitle}
                  </button>
                  <p className="text-xs text-gray-500 mt-1">{item.seller} (@{item.university})</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold text-gray-900">¥{item.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">{item.addedDate}</p>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFavorite(item.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {filteredFavorites.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">合計金額</span>
              <span className="text-lg font-bold text-gray-900">
                ¥{totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {filteredFavorites.length} 件の商品の合計金額です
            </p>
          </div>
        )}

        {/* Explore Button */}
        {filteredFavorites.length < favoriteItems.length && (
          <button
            onClick={() => router.push('/products')}
            className="w-full px-4 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
          >
            もっと商品を探す
          </button>
        )}
      </div>
    </MainLayout>
  );
}
