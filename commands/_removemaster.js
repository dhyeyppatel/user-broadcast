/*CMD
  command: /removemaster
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
  return Bot.sendMessage("Usage:\n/removemaster [user_id]");
}

id = parseInt(id);

let masters = Bot.getProperty("master_users", []);

let index = masters.indexOf(id);
if (index > -1) {
  masters.splice(index, 1);
  Bot.setProperty("master_users", masters, "json");
  Bot.sendMessage("✅ Removed master user: " + id);
} else {
  Bot.sendMessage("⚠️ User is not a master user.");
}
