/*CMD
  command: /setup
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (chat.chat_type !== "private") {

  return Api.sendMessage({
    text: "❌ Use in private chat"
  });

}

var currentAdmin = Bot.getProperty("admin_id");

if (currentAdmin) {

  return Api.sendMessage({
    text:
      "🚫 Admin already set:\n<code>" +
      currentAdmin +
      "</code>",
    parse_mode: "HTML"
  });

}

Bot.setProperty(
  "admin_id",
  user.telegramid,
  "string"
);

Api.setMyCommands({
  commands: [
    { command: "menu", description: "Show available channels" },
    { command: "status", description: "Show admin status" },
    { command: "setup", description: "Setup Admin" }
  ]
});

Api.sendMessage({
  text:
    "✅ Setup completed\n\n" +
    "👑 Admin ID:\n<code>" +
    user.telegramid +
    "</code>\n\n" +
    "Menu commands configured.",
  parse_mode: "HTML"
});
