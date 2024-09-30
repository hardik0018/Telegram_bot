const { axiosInstance } = require("./axios");

const sendMessage = (messageObj, messageText) => {
  return axiosInstance.get("sendMessage", {
    chat_id: messageObj.chat.id,
    text: messageText,
  });
};

const handleMessage = (messageObj) => {
  const messageText = messageObj.text || "";
  console.log(messageText);
  if (messageText.charAt(0) == "/") {
    const command = messageText.substr(1);
    console.log(command);
    switch (command) {
      case "start":
        return sendMessage(messageObj, "Hi Welcome");
      case "status":
        return sendMessage(messageObj, "Under Process");
      default:
        return sendMessage(messageObj, "Hey hi i donnot konw ");
    }
  } else {
    return sendMessage(messageObj, messageText);
  }
};

module.exports = { handleMessage };
