
// telegram_bot/bot.js
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const config = require('./config.json');
const bot = new TelegramBot(config.token, { polling: true });

async function sendDailyReport() {
  try {
    const res = await axios.get(`https://api.goatcounter.com/api/count?site=aitoolsvault`);
    const visits = res.data.count;
    const message = `Daily Report:\nTotal visits today: ${visits}`;
    await bot.sendMessage(config.chat_id, message);
  } catch (err) {
    console.error('Error fetching GoatCounter data', err);
  }
}

// send on /report command or daily at 9 AM via cron
bot.onText(/\/report/, async (msg) => {
  await sendDailyReport();
  bot.sendMessage(msg.chat.id, 'Report delivered!');
});

console.log('Telegram bot running...');
