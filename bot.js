const TelegramBot = require('node-telegram-bot-api');
const fetchOtp = require('./seven1tel');

const botToken = '8158421139:AAE0m6KiBw8ymz6VsUfqBPrfas6G3a-wGzs';
const chatId = '-4868114985';

const bot = new TelegramBot(botToken);
const username = 'Tamim0987';
const password = '81548154';

async function checkAndSendOtp() {
  try {
    const otp = await fetchOtp(username, password);
    console.log("📥 ফেচ করা OTP:", otp);

    if (otp) {
      const msg = `🟢 নতুন OTP পাওয়া গেছে:\n\n🔢 *${otp}*`;
      bot.sendMessage(chatId, msg, { parse_mode: 'Markdown' });
    }
  } catch (e) {
    console.error('❌ OTP ফেচ করার সময় সমস্যা:', e.message);
  }
}

setInterval(checkAndSendOtp, 1000);