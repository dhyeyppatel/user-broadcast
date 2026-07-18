/*CMD
  command: /status
  help: 
  need_reply: false
  auto_retry_time: 
  folder: System<<ANSWER

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

let channels = Bot.getProperty("channels", {});
let masters = Bot.getProperty("master_users", []);

let text = "📊 **Bot Status**\n\n";
text += "👑 Master Users: " + masters.length + "\n\n";
text += "📺 **Channels:**\n";

for (let id in channels) {
  let premium = Bot.getProperty("premium_" + id, []);
  text += "- " + channels[id].name + " (" + id + ")\n";
  text += "  Start Msg ID: " + channels[id].start_id + "\n";
  text += "  Premium Users: " + premium.length + "\n";
}

if (Object.keys(channels).length === 0) {
  text += "No channels configured.";
}

Bot.sendMessage(text);


