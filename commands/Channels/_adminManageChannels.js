/*CMD
  command: /adminManageChannels
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

let channels = Bot.getProperty("channels", {});

let text = "📺 **Manage Channels**\n\n";

let buttons = [];

if (Object.keys(channels).length === 0) {
  text += "No channels are currently configured.\n";
} else {
  for (let id in channels) {
    let premium = Bot.getProperty("premium_" + id, []);
    text += "🔹 **" + channels[id].name + "**\n";
    text += "ID: `" + id + "`\n";
    text += "Start Msg: " + channels[id].start_id + " | Users: " + premium.length + "\n\n";
    
    buttons.push([{ title: "🔗 1-Time Link: " + channels[id].name, command: "/generateLink " + id }]);
  }
}

text += "\n*To Add a Channel, just forward a message from it to this bot!*\n\n";
text += "*To Remove a Channel, send:*\n`/removechannel [channel_id]`\n\n";

buttons.push([{ title: "🔙 Back to Dashboard", command: "/admin" }]);

Bot.sendInlineKeyboard(buttons, text);



