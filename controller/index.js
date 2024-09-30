const { handleMessage } = require("./lib/Telegram");

const handler = async (req, method) => {
  const { body } = req;
  if (body) {
    const messageObj = body.message;
    await handleMessage(messageObj);
  }
  return;
};

module.exports = { handler };
