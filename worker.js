const TELEGRAM_BOT_TOKEN = 'Telegram Bot Token';
const TELEGRAM_CHAT_ID = 'Admin Chat ID';
const WEBHOOK_SECRET = 'Your Secret key'; // The secret key

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Read the raw request body
  const requestBody = await request.json();
  


  // Construct a meaningful message
  const message = `Action: ${requestBody[0].action}\nUsername: ${requestBody[0].username}\nAdmin: ${requestBody[0].user.admin.username}\nStatus: ${requestBody[0].user.status}\nData Limit: ${Math.floor(requestBody[0].user.data_limit/(1024 ** 3))}Gb\nExpiry: ${Math.floor((requestBody[0].user.expire - Date.now() / 1000) / 86400)} days\nNote: ${requestBody[0].user.note}`;

  // Send the message to Telegram
  await sendToTelegram(message);

  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  console.log('Telegram API response:', result);
}
