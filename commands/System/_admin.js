/*CMD
  command: /admin
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

let admin_id = Bot.getProperty("admin_id");

if (!admin_id) {
  return Bot.sendMessage("❌ Run /setup first");
}
if (user.telegramid.toString() !== admin_id.toString()) {
  return Bot.sendMessage("❌ Not allowed");
}

let channels = Bot.getProperty("channels", {});
let masters = Bot.getProperty("master_users", []);
let interval = Bot.getProperty("interval", 3);
let timeout = Bot.getProperty("auto_delete_time", 6);

let text = "👑 **Owner Dashboard**\n\n";
text += "Welcome to the administration panel. From here you can manage all aspects of the broadcast bot.\n\n";
text += "📊 **Quick Stats:**\n";
text += "• Total Channels: " + Object.keys(channels).length + "\n";
text += "• Master Users: " + masters.length + "\n";
text += "• Forward Interval: " + interval + "s\n";
text += "• Auto-Delete Timeout: " + timeout + "s\n\n";
text += "Select an option below:\n\n_Powered by @commonthread_ ❤️";

let buttons = [
  [{ title: "📺 Manage Channels", command: "/adminManageChannels" }],
  [{ title: "👑 Manage Master Users", command: "/adminManageMasters" }],
  [{ title: "⚙️ Configuration", command: "/adminConfig" }]
];

Bot.sendInlineKeyboard(buttons, text);



