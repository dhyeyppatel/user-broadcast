/*CMD
  command: /add
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Users<<ANSWER

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

let p = params ? params.split(" ") : [];

if (p.length < 2) {
  return Api.sendMessage({
    text: "Usage:\n/add [user_id] [channel_id]"
  });
}

let id = parseInt(p[0]);
let channel_id = p[1];

if (isNaN(id)) {
  return Api.sendMessage({ text: "❌ user_id must be a number" });
}

let channels = Bot.getProperty("channels", {});
if (!channels[channel_id]) {
  return Api.sendMessage({ text: "❌ Channel " + channel_id + " does not exist." });
}

let propName = "premium_" + channel_id;
let premium = Bot.getProperty(propName, []);

if (!premium.includes(id)) {
  premium.push(id);
  Bot.setProperty(propName, premium, "json");
}

Api.sendMessage({
  text: "✅ Added user <code>" + id + "</code> to channel <b>" + channels[channel_id].name + "</b>",
  parse_mode: "HTML"
});


