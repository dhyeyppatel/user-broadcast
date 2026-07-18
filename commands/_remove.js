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

let p = params ? params.split(" ") : [];

if (p.length < 2) {
  return Bot.sendMessage("Usage:\n/remove <user_id> <channel_id>");
}

let id = parseInt(p[0]);
let channel_id = p[1];

if (isNaN(id)) {
  return Bot.sendMessage("❌ user_id must be a number");
}

let propName = "premium_" + channel_id;
let premium = Bot.getProperty(propName, []);

let index = premium.indexOf(id);

if (index > -1) {
  premium.splice(index, 1);
  Bot.setProperty(propName, premium, "json");
  Bot.sendMessage("✅ Removed user " + id + " from channel " + channel_id);
} else {
  Bot.sendMessage("⚠️ User " + id + " is not in channel " + channel_id);
}
