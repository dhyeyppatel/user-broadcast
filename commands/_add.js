/*CMD
  command: /add
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

var admin_id = Bot.getProperty("admin_id");

if (!admin_id) {
  return Api.sendMessage({
    text: "❌ Run /setup first"
  });
}

if (user.telegramid.toString() !== admin_id.toString()) {
  return Api.sendMessage({
    text: "🚫 Only admin"
  });
}

let id = params;

if (!id) {
  return Api.sendMessage({
    text: "Usage:\n/addpremium user_id"
  });
}

id = parseInt(id);

let premium = Bot.getProperty("premium_users", []);

if (!premium.includes(id)) {

  premium.push(id);

  Bot.setProperty(
    "premium_users",
    premium,
    "json"
  );
}

Api.sendMessage({
  text:
    "✅ Added to premium:\n<code>" +
    id +
    "</code>",
  parse_mode: "HTML"
});
