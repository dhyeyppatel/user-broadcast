/*CMD
  command: /setReferrals
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

let p = params ? params.split(" ") : [];
if (p.length < 2) {
  return Bot.sendMessage("Usage:\n/setReferrals [channel_id] [required_count]\n\nSet required_count to 0 to disable referrals for this channel.");
}

let channel_id = p[0];
let req = parseInt(p[1]);

if (isNaN(req)) {
  return Bot.sendMessage("❌ Required count must be a number.");
}

let channels = Bot.getProperty("channels", {});
if (!channels[channel_id]) {
  return Bot.sendMessage("❌ Channel not found.");
}

Bot.setProperty("req_refs_" + channel_id, req, "integer");

if (req > 0) {
  Bot.sendMessage("✅ Users must now invite **" + req + "** people to unlock **" + channels[channel_id].name + "**.");
} else {
  Bot.sendMessage("✅ Referral system disabled for **" + channels[channel_id].name + "**.");
}
