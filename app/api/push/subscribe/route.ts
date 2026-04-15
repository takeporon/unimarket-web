import { addSubscription, removeSubscription, getSubscriptionCount } from '@/lib/pushStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subscription } = body;

    if (!subscription || !subscription.endpoint) {
      return Response.json({ error: '購読情報が不正です' }, { status: 400 });
    }

    addSubscription(subscription);

    return Response.json({
      success: true,
      message: '購読を登録しました',
      count: getSubscriptionCount(),
    });
  } catch {
    return Response.json({ error: 'サーバーエラー' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { endpoint } = body;

    if (!endpoint) {
      return Response.json({ error: 'endpointが必要です' }, { status: 400 });
    }

    removeSubscription(endpoint);

    return Response.json({ success: true, message: '購読を解除しました' });
  } catch {
    return Response.json({ error: 'サーバーエラー' }, { status: 500 });
  }
}
