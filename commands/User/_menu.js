/*CMD
  command: /menu
  help: 
  need_reply: false
  auto_retry_time: 
  folder: User<<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /start
  group: 
CMD*/

let channels = Bot.getProperty("channels", {});

// Handle /start payloads
if (params) {
  if (params.startsWith("invite_")) {
    let token = params;
    let target_channel = Bot.getProperty(token);
    if (target_channel) {
      // Valid invite link!
      let premium = Bot.getProperty("premium_" + target_channel, []);
      if (!premium.includes(user.telegramid)) {
        premium.push(user.telegramid);
        Bot.setProperty("premium_" + target_channel, premium, "json");
        Bot.sendMessage("🎉 **Access Granted!**\nYou have been added to " + channels[target_channel].name + " via invite link.");
      } else {
        Bot.sendMessage("⚠️ You already have access to this channel.");
      }
      // Destroy token
      Bot.setProperty(token, null, "string");
    } else {
      Bot.sendMessage("❌ This invite link is invalid or has already been used.");
    }
  } else if (params.startsWith("ref_")) {
    // format: ref_channelID_inviterID
    let parts = params.split("_");
    if (parts.length === 3) {
      let target_channel = parts[1];
      let inviter_id = parseInt(parts[2]);
      
      let hasJoined = User.getProperty("joined_" + target_channel);
      if (!hasJoined && user.telegramid !== inviter_id) {
        User.setProperty("joined_" + target_channel, true, "boolean");
        
        let ref_count = Bot.getProperty("refs_" + target_channel + "_" + inviter_id, 0);
        ref_count++;
        Bot.setProperty("refs_" + target_channel + "_" + inviter_id, ref_count, "integer");
        
        Bot.sendMessageToChatWithId(inviter_id, "🎉 Someone joined using your referral link for " + (channels[target_channel] ? channels[target_channel].name : "a channel") + "!\nYou now have " + ref_count + " referrals.");
        
        let req_refs = Bot.getProperty("req_refs_" + target_channel, 999999);
        if (ref_count >= req_refs) {
          let premium = Bot.getProperty("premium_" + target_channel, []);
          if (!premium.includes(inviter_id)) {
            premium.push(inviter_id);
            Bot.setProperty("premium_" + target_channel, premium, "json");
            Bot.sendMessageToChatWithId(inviter_id, "🎊 **Congratulations!**\nYou reached the referral goal and unlocked access to " + (channels[target_channel] ? channels[target_channel].name : "the channel") + "!");
          }
        }
      }
    }
  }
}

let master_users = Bot.getProperty("master_users", []);

let isMaster = master_users.includes(user.telegramid);
let admin_id = Bot.getProperty("admin_id");

if (admin_id && user.telegramid.toString() === admin_id.toString()) {
  isMaster = true;
}

let buttons = [];

for (let channel_id in channels) {
  let hasAccess = false;
  
  if (isMaster) {
    hasAccess = true;
  } else {
    let premium = Bot.getProperty("premium_" + channel_id, []);
    if (premium.includes(user.telegramid)) {
      hasAccess = true;
    }
  }

  if (hasAccess) {
    let isLooping = User.getProperty("loop_" + channel_id);
    let name = channels[channel_id].name;
    let text = isLooping ? "⏹ Stop " + name : "▶️ Start " + name;
    
    buttons.push([{
      title: text,
      command: "/selectChannel " + channel_id
    }]);
  }
}

if (buttons.length === 0) {
  Bot.sendMessage("You do not have access to any channels.\n\n_Powered by @commonthread_ ❤️");
} else {
  buttons.push([{ title: "⏸ Pause All", command: "/stopAll" }]);
  Bot.sendInlineKeyboard(buttons, "📺 **Available Channels**\nSelect a channel to start or stop auto-forwarding messages to your inbox.\n\n_Powered by @commonthread_ ❤️");
}

