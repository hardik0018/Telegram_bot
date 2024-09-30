const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const sendMessage = (id, message) => {
  bot.sendMessage(id, message);
};

bot.on("message", (message) => {
  const { id } = message.from;
  const messageText = message.text || "";
  if (messageText.charAt(0) == "/") {
    const command = messageText.substr(1);
    console.log(command);
    switch (command) {
      case "start":
        return sendMessage(id, "Hi Welcome");
      case "status":
        return sendMessage(id, "Under Process");
      default:
        return sendMessage(id, "Hey hi i donnot konw ");
    }
  } else {
    return sendMessage(id, 'Command Not valid');
  }
});
