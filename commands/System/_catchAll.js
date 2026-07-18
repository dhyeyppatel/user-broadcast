/*CMD
  command: *
  help: 
  need_reply: false
  auto_retry_time: 
  folder: System

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Catch forwarded messages from channels
if (request.forward_from_chat && request.forward_from_chat.type === "channel") {
  let admin_id = Bot.getProperty("admin_id");
  let masters = Bot.getProperty("master_users", []);
  
  let isAdmin = false;
  if (admin_id && user.telegramid.toString() === admin_id.toString()) isAdmin = true;
  if (masters.includes(user.telegramid)) isAdmin = true;
  
  if (isAdmin) {
    let channel_id = request.forward_from_chat.id;
    let channel_title = request.forward_from_chat.title;
    let message_id = request.forward_from_message_id;
    
    let channels = Bot.getProperty("channels", {});
    channels[channel_id] = {
      name: channel_title,
      start_id: message_id
    };
    Bot.setProperty("channels", channels, "json");
    
    Bot.sendMessage("✅ **Channel Automatically Registered!**\n\nName: " + channel_title + "\nID: `" + channel_id + "`\nStarting Message ID: " + message_id);
    return;
  }
}

