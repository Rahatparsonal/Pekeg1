const axios = require('axios');
const cheerio = require('cheerio');

let lastOtp = "";

async function fetchOtp(username, password) {
  const session = axios.create({ withCredentials: true });

  try {
    await session.post('http://94.23.120.156/ints/client/', new URLSearchParams({
      username, password
    }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const res = await session.get('http://94.23.120.156/ints/client/SMSCDRStats');
    const $ = cheerio.load(res.data);

    const firstRow = $('table tbody tr').first();
    const tds = $(firstRow).find('td');

    // Debug: show all td data
    console.log("🧪 Table Row Data:");
    tds.each((i, el) => {
      console.log(`Column ${i}:`, $(el).text().trim());
    });

    const otp = tds.eq(4).text().trim();

    if (otp && otp !== lastOtp) {
      lastOtp = otp;
      return otp;
    }

    return null;

  } catch (error) {
    console.error("❌ OTP ফেচ করার সময় সমস্যা:", error.message);
    return null;
  }
}

module.exports = fetchOtp;