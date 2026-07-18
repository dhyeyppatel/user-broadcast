/*CMD
  command: /removechannel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Channels

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

let channel_id = params;
if (!channel_id) {
  return Bot.sendMessage("Usage:\n/removechannel [channel_id]");
}

let channels = Bot.getProperty("channels", {});

if (channels[channel_id]) {
  delete channels[channel_id];
  Bot.setProperty("channels", channels, "json");
  Bot.sendMessage("✅ Channel removed.");
} else {
  Bot.sendMessage("⚠️ Channel not found.");
}



