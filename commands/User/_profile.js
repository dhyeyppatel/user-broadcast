/*CMD
  command: /profile
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

let channels = Bot.getProperty("channels", {});

let text = "👤 **Your Profile**\n\nID: `" + user.telegramid + "`\n\n";

text += "🤝 **Referral Program**\nInvite friends to unlock channels automatically!\n\n";

let buttons = [];

for (let channel_id in channels) {
  let req = Bot.getProperty("req_refs_" + channel_id, 0);
  
  if (req > 0) {
    let hasAccess = false;
    let master_users = Bot.getProperty("master_users", []);
    let admin_id = Bot.getProperty("admin_id");
    
    if (admin_id && user.telegramid.toString() === admin_id.toString()) hasAccess = true;
    if (master_users.includes(user.telegramid)) hasAccess = true;
    
    let premium = Bot.getProperty("premium_" + channel_id, []);
    if (premium.includes(user.telegramid)) hasAccess = true;
    
    let refs = Bot.getProperty("refs_" + channel_id + "_" + user.telegramid, 0);
    
    text += "🔹 **" + channels[channel_id].name + "**\n";
    if (hasAccess) {
      text += "Status: ✅ Unlocked\n";
    } else {
      text += "Status: 🔒 Locked\n";
      text += "Referrals: " + refs + " / " + req + "\n";
      buttons.push([{ title: "🔗 Get Invite Link for " + channels[channel_id].name, command: "/getRefLink " + channel_id }]);
    }
    text += "\n";
  }
}

if (buttons.length === 0 && Object.keys(channels).length > 0) {
  text += "*(No channels currently require referrals, or you have already unlocked them all!)*\n";
} else if (Object.keys(channels).length === 0) {
  text += "*(No channels available)*\n";
}

Bot.sendInlineKeyboard(buttons, text);

