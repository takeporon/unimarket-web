'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send, Phone, Info, MoreVertical } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

interface Message {
  id: string;
  sender: 'user' | 'seller';
  text: string;
  timestamp: string;
}

interface ChatDetail {
  id: string;
  seller: {
    name: string;
    avatar: string;
    university: string;
    rating: number;
    reviews: number;
    responseTime: string;
  };
  productTitle: string;
  messages: Message[];
}

// サンプルデータ
const getChatDetail = (id: string): ChatDetail => {
  const chats: { [key: string]: ChatDetail } = {
    '1': {
      id: '1',
      seller: {
        name: 'あきら',
        avatar: 'A',
        university: '東京大学',
        rating: 4.8,
        reviews: 24,
        responseTime: '平均 15分',
      },
      productTitle: 'モンスター24本',
      messages: [
        {
          id: '1',
          sender: 'seller',
          text: 'こんにちは！こちらの商品にご興味をお持ちでしょうか？',
          timestamp: '14:00',
        },
        {
          id: '2',
          sender: 'user',
          text: 'はい。配送は可能ですか？',
          timestamp: '14:15',
        },
        {
          id: '3',
          sender: 'seller',
          text: 'はい、配送可能です。送料込みで◯◯円になります。',
          timestamp: '14:20',
        },
        {
          id: '4',
          sender: 'user',
          text: 'ありがとうございます',
          timestamp: '14:30',
        },
      ],
    },
    '2': {
      id: '2',
      seller: {
        name: 'たなか',
        avatar: 'T',
        university: '京都大学',
        rating: 4.5,
        reviews: 12,
        responseTime: '平均 30分',
      },
      productTitle: '参考書 化学',
      messages: [
        {
          id: '1',
          sender: 'seller',
          text: '化学の参考書、いかがですか？',
          timestamp: '09:00',
        },
        {
          id: '2',
          sender: 'user',
          text: '配送料金についてお聞きしたいのですが',
          timestamp: '10:15',
        },
      ],
    },
    '3': {
      id: '3',
      seller: {
        name: 'さとみ',
        avatar: 'S',
        university: '大阪大学',
        rating: 5.0,
        reviews: 8,
        responseTime: '平均 5分',
      },
      productTitle: 'ノート 5冊セット',
      messages: [
        {
          id: '1',
          sender: 'seller',
          text: '購入ありがとうございました！',
          timestamp: '12:00',
        },
        {
          id: '2',
          sender: 'seller',
          text: '本日中に発送させていただきます。',
          timestamp: '12:05',
        },
      ],
    },
  };
  return chats[id] || chats['1'];
};

export default function ChatDetailPage() {
  const router = useRouter();
  const params = useParams();
  const chatId = typeof params.id === 'string' ? params.id : '1';
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatDetail, setChatDetail] = useState<ChatDetail | null>(null);

  useEffect(() => {
    const chat = getChatDetail(chatId);
    setChatDetail(chat);
    setMessages(chat.messages);
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessageText('');

    // シミュレーション：1秒後に返信
    setTimeout(() => {
      const replyMessage: Message = {
        id: (messages.length + 2).toString(),
        sender: 'seller',
        text: 'かしこまりました。ご確認ありがとうございます。',
        timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 1000);
  };

  if (!chatDetail) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={24} className="text-gray-900" />
            </button>
            <div>
              <p className="font-bold text-gray-900">{chatDetail.seller.name}</p>
              <p className="text-xs text-gray-500">{chatDetail.productTitle}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center ml-auto">
              <span className="text-sm font-bold text-cyan-700">{chatDetail.seller.avatar}</span>
            </div>
          </div>
        </div>

        {/* Seller Info Row */}
        <div className="flex items-center gap-4 text-xs text-gray-600 bg-gray-50 -mx-4 px-4 py-2 rounded">
          <div className="flex items-center gap-1">
            <span>⭐ {chatDetail.seller.rating}</span>
            <span>({chatDetail.seller.reviews}件)</span>
          </div>
          <div>返信時間: {chatDetail.seller.responseTime}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold">
            <Phone size={16} />
            連絡する
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold">
            <Info size={16} />
            プロフィール
          </button>
          <button className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-900 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - Fixed Bottom */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex gap-2">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="メッセージを入力..."
          className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-cyan-500 text-white rounded-lg px-4 py-2 hover:bg-cyan-600 transition-colors flex items-center justify-center"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
