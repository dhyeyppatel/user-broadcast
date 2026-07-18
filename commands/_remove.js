/*CMD
  command: /remove
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
  return Bot.sendMessage("❌ Run /setup first");
}

if (user.telegramid.toString() !== admin_id.toString()) {
  return Bot.sendMessage("❌ Not allowed");
}

let id = params;

if (!id) {
  return Bot.sendMessage("Usage:\n/remove <user_id>");
}

id = parseInt(id);

let premium = Bot.getProperty("premium_users", []);

let index = premium.indexOf(id);

if (index > -1) {
  premium.splice(index, 1);
  Bot.setProperty("premium_users", premium, "json");
  Bot.sendMessage("✅ Removed user " + id + " from premium.");
} else {
  Bot.sendMessage("⚠️ User " + id + " is not in the premium list.");
}
