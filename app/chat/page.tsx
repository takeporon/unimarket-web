'use client';

import { useState } from 'react';
import { MessageCircle, ChevronLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ChatMessage {
  id: string;
  seller: {
    name: string;
    avatar: string;
    university: string;
  };
  productTitle: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

// サンプルデータ
const chatList: ChatMessage[] = [
  {
    id: '1',
    seller: {
      name: 'あきら',
      avatar: 'A',
      university: '東京大学',
    },
    productTitle: 'モンスター24本',
    lastMessage: 'こちらへのご質問ですが、在庫はまだあります',
    timestamp: '今日 14:30',
    unread: true,
  },
  {
    id: '2',
    seller: {
      name: 'たなか',
      avatar: 'T',
      university: '京都大学',
    },
    productTitle: '参考書 化学',
    lastMessage: '配送料金についてですが...',
    timestamp: '昨日 10:15',
    unread: false,
  },
  {
    id: '3',
    seller: {
      name: 'さとみ',
      avatar: 'S',
      university: '大阪大学',
    },
    productTitle: 'ノート 5冊セット',
    lastMessage: '購入ありがとうございました！',
    timestamp: '3日前',
    unread: false,
  },
];

export default function ChatPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chatList.filter((chat) =>
    chat.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.productTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <span className="text-lg font-bold text-gray-900">メッセージ</span>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="ユーザーまたは商品を検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="bg-white">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageCircle size={48} className="text-gray-300 mb-3" />
            <p className="text-gray-600 text-sm">メッセージがありません</p>
          </div>
        ) : (
          filteredChats.map((chat, index) => (
            <button
              key={chat.id}
              onClick={() => router.push(`/chat/${chat.id}`)}
              className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                index !== filteredChats.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-cyan-700">{chat.seller.avatar}</span>
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900 text-sm">{chat.seller.name}</p>
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{chat.productTitle}</p>
                <p
                  className={`text-sm truncate ${
                    chat.unread ? 'font-semibold text-gray-900' : 'text-gray-600'
                  }`}
                >
                  {chat.lastMessage}
                </p>
              </div>

              {/* Unread Badge */}
              {chat.unread && (
                <div className="w-3 h-3 rounded-full bg-cyan-500 flex-shrink-0 mt-1" />
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
