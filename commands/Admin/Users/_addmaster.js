/*CMD
  command: /addmaster
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin/Users<<ANSWER

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
  return Bot.sendMessage("Usage:\n/addmaster [user_id]");
}

id = parseInt(id);

let masters = Bot.getProperty("master_users", []);

if (!masters.includes(id)) {
  masters.push(id);
  Bot.setProperty("master_users", masters, "json");
}

Bot.sendMessage("✅ Added master user: " + id);

