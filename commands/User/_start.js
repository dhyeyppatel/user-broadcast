/*CMD
  command: /start
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

if (params) {
  let token = params;
  
  if (token.startsWith("ref_")) {
    // format: ref_channelID_inviterID
    let parts = token.split("_");
    if (parts.length === 3) {
      let target_channel = parts[1];
      let inviter_id = parseInt(parts[2]);
      
      let hasJoined = User.getProperty("joined_" + target_channel);
      if (!hasJoined && user.telegramid !== inviter_id) {
        User.setProperty("joined_" + target_channel, true, "boolean");
        
        let ref_count = Bot.getProperty("refs_" + target_channel + "_" + inviter_id, 0);
        ref_count++;
        Bot.setProperty("refs_" + target_channel + "_" + inviter_id, ref_count, "integer");
        
        let channels = Bot.getProperty("channels", {});
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
  } else {
    // It's an invite code / redeem code
    let target_channel = Bot.getProperty(token);
    if (target_channel) {
      let channels = Bot.getProperty("channels", {});
      let premium = Bot.getProperty("premium_" + target_channel, []);
      if (!premium.includes(user.telegramid)) {
        premium.push(user.telegramid);
        Bot.setProperty("premium_" + target_channel, premium, "json");
        Bot.sendMessage("🎉 **Access Granted!**\nYou have successfully redeemed the code and been added to " + (channels[target_channel] ? channels[target_channel].name : "the channel") + ".");
      } else {
        Bot.sendMessage("⚠️ You already have access to this channel.");
      }
      // Destroy token
      Bot.setProperty(token, null, "string");
    } else {
      Bot.sendMessage("❌ This invite/redeem code is invalid or has already been used.");
    }
  }
}

// Always show the menu after processing
Bot.runCommand("/menu");
