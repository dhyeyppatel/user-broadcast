/*CMD
  command: /menu
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /start
  group: 
CMD*/

let channels = Bot.getProperty("channels", {});
let master_users = Bot.getProperty("master_users", []);

let isMaster = master_users.includes(user.telegramid);

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
      text: text,
      command: "/selectChannel " + channel_id
    }]);
  }
}

if (buttons.length === 0) {
  Bot.sendMessage("You do not have access to any channels.");
} else {
  Bot.sendInlineKeyboard(buttons, "📺 **Available Channels**\nSelect a channel to start or stop auto-forwarding messages to your inbox.");
}
