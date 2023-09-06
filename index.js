const { default: axios } = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const methods = require('./methods.js');
const token = '5639667193:AAFNDaUNu5hbZhx25oAHddkYPx6sg23ytlk';
// const token = "5924351010:AAERx4S7IBxFSyqu8xuDB0y_5KSnLMdTGEo";
let lastpostID = 720;
const channelID = -1001771182977;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    console.log("Message is " + msg);
})

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, resp);
});
let now = new Date();
function sendMessage(channelId, content) {
    console.log(methods.imgurlFormatter(content.cover_img));
    bot.sendPhoto(channelId, methods.imgurlFormatter(content.cover_img), {
        parse_mode: "HTML",
        caption: `<b>${content.title}</b>

${methods.someContent(content.voice_text)}

👉<a href="https://ittime.uz/post/${content.slug}"> Batafsil o'qish</a>
    `
    })
}
function postChecker() {
    axios.get('http://aytishnik.uz/back/recent5.php')
        .then((response) => {
            if (response.data[0].id != lastpostID) {
                sendMessage(channelID, response.data[0])
                lastpostID = response.data[0].id;
            }
        });
}
setInterval(postChecker, 1000 * 60 * 3);


bot.on('message', (msg) => {
    const chatId = -1001771182977;
    let idPost = Number(msg.text.split('/id ')[1])
    if (msg.text.startsWith("/id") && (msg.from.id == 1712270797 || msg.from.id == 702213093)) {
        axios.get("http://aytishnik.uz/back/recent5.php?quantity=350")
            .then((response) => {
                let found = response.data.find(post => post.id == idPost);
                if (found) {
                    sendMessage(channelID, found);
                    bot.sendMessage(msg.from.id, "Jo'natdik, @ittime_uz");
                }
                else bot.sendMessage(msg.from.id, "Unaqa post yo'gakan-u, brat")
            })
    }
})