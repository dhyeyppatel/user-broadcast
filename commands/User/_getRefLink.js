/*CMD
  command: /getRefLink
  help: 
  need_reply: false
  auto_retry_time: 
  folder: User

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let channel_id = params;
if (!channel_id) return;

let channels = Bot.getProperty("channels", {});
if (!channels[channel_id]) {
  return Bot.sendMessage("❌ Channel not found.");
}

let botName = bot.name;
let link = "https://t.me/" + botName + "?start=ref_" + channel_id + "_" + user.telegramid;

let req = Bot.getProperty("req_refs_" + channel_id, 0);

Bot.sendMessage("🤝 **Your Referral Link for " + channels[channel_id].name + "**\n\nShare this link with your friends. You need **" + req + "** total referrals to unlock this channel automatically!\n\n`" + link + "`");

