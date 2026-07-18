/*CMD
  command: /addchannel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin/Channels<<ANSWER

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
if (p.length < 3) {
  return Bot.sendMessage("Usage:\n/addchannel [channel_id] [start_msg_id] [Name of channel]");
}

let channel_id = p[0];
let start_id = parseInt(p[1]);
let name = p.slice(2).join(" ");

if (isNaN(start_id)) {
  return Bot.sendMessage("❌ start_msg_id must be a number");
}

let channels = Bot.getProperty("channels", {});
channels[channel_id] = {
  name: name,
  start_id: start_id
};

Bot.setProperty("channels", channels, "json");
Bot.sendMessage("✅ Channel added: " + name + " (" + channel_id + ") starting at msg " + start_id);

