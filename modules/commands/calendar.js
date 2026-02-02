module.exports.config = {
  name: "calendar",
  version: "2.0",
  hasPermssion: 0,
  credits: "Hridoy + GPT",
  description: "Full upgraded calendar with Bangla, English, Arabic and time",
  commandCategory: "utility",
  usages: "[optional]",
  cooldowns: 5
};

module.exports.run = async ({ event, api }) => {
  const d = new Date();

  // Months & Days
  const months = {
    en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    bn: ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],
    ar: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]
  };

  const days = {
    en: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    bn: ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
    ar: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]
  };

  // Convert numbers to Bangla
  function toBanglaNumber(num) {
    const bnNums = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return num.toString().split("").map(d=>bnNums[d]||d).join("");
  }

  // Time
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  // 12H format & greeting
  let ampm = hours >= 12 ? "PM" : "AM";
  let greeting = hours < 12 ? "Good Morning 🌞" : (hours < 18 ? "Good Afternoon 🌤️" : "Good Evening 🌙");
  let displayHour = hours % 12 || 12;

  // Zero padding
  displayHour = displayHour.toString().padStart(2,"0");
  minutes = minutes.toString().padStart(2,"0");
  seconds = seconds.toString().padStart(2,"0");

  const dayIndex = d.getDay();
  const date = d.getDate();
  const monthIndex = d.getMonth();
  const year = d.getFullYear();

  // Stylish reply message
  const message = `
✨📅  𝐂𝐮𝐫𝐫𝐞𝐧𝐭 𝐃𝐚𝐭𝐞 & 𝐓𝐢𝐦𝐞  ✨

${greeting}

🇬🇧 English: ${days.en[dayIndex]}, ${date} ${months.en[monthIndex]} ${year} | ⏰ ${displayHour}:${minutes}:${seconds} ${ampm}
🇧🇩 Bangla : ${days.bn[dayIndex]}, ${toBanglaNumber(date)} ${months.bn[monthIndex]} ${toBanglaNumber(year)} | ⏰ ${toBanglaNumber(displayHour)}:${toBanglaNumber(minutes)}:${toBanglaNumber(seconds)} ${ampm}
🇸🇦 Arabic : ${days.ar[dayIndex]}, ${date} ${months.ar[monthIndex]} ${year} | ⏰ ${displayHour}:${minutes}:${seconds} ${ampm}

💫 আজকের দিনটি শুভ হোক! 💫
`;

  return api.sendMessage(message, event.threadID);
};
