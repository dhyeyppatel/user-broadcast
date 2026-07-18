/*CMD
  command: /generateLink
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

let admin_id = Bot.getProperty("admin_id");
if (!admin_id || user.telegramid.toString() !== admin_id.toString()) return;

let channel_id = params;
if (!channel_id) return;

let channels = Bot.getProperty("channels", {});
if (!channels[channel_id]) {
  return Bot.sendMessage("❌ Channel not found.");
}

// Generate random 6-character alphanumeric token
let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let tokenStr = '';
for (let i = 0; i < 6; i++) {
  tokenStr += chars.charAt(Math.floor(Math.random() * chars.length));
}
let token = "invite_" + tokenStr;

Bot.setProperty(token, channel_id, "string");

let botName = bot.name; // In BJS bot.name gets the bot username
let link = "https://t.me/" + botName + "?start=" + token;

Bot.sendMessage("🔗 **Single-Use Invite Link Generated!**\n\nChannel: " + channels[channel_id].name + "\n\nSend this link to the user you want to grant access to:\n`" + link + "`\n\n*(This link can only be used once!)*");
