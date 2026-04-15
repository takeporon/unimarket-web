import webpush from 'web-push';
import { getAllSubscriptions, removeSubscription } from '@/lib/pushStore';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@unimarket.jp';

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, body: messageBody, url, tag } = body;

    if (!title || !messageBody) {
      return Response.json(
        { error: 'title と body は必須です' },
        { status: 400 }
      );
    }

    const subscriptions = getAllSubscriptions();

    if (subscriptions.length === 0) {
      return Response.json(
        { success: false, message: '購読者がいません', sent: 0 },
        { status: 200 }
      );
    }

    const payload = JSON.stringify({
      title,
      body: messageBody,
      icon: '/logo.png',
      badge: '/logo.png',
      url: url || '/home',
      tag: tag || 'unimarket-notification',
    });

    let sent = 0;
    let failed = 0;

    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(sub, payload);
          sent++;
        } catch (error: unknown) {
          const statusCode = (error as { statusCode?: number }).statusCode;
          if (statusCode === 404 || statusCode === 410) {
            removeSubscription(sub.endpoint);
          }
          failed++;
        }
      })
    );

    return Response.json({
      success: true,
      message: `${sent}件送信、${failed}件失敗`,
      sent,
      failed,
      total: results.length,
    });
  } catch {
    return Response.json({ error: 'サーバーエラー' }, { status: 500 });
  }
}
