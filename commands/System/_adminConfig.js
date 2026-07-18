/*CMD
  command: /adminConfig
  help: 
  need_reply: false
  auto_retry_time: 
  folder: System<<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (!admin_id || user.telegramid.toString() !== admin_id.toString()) return;

let interval = Bot.getProperty("interval", 3);
let timeout = Bot.getProperty("auto_delete_time", 6);

let text = "⚙️ **Configuration**\n\n";
text += "• **Forward Interval**: " + interval + " seconds\n";
text += "• **Auto-Delete Timeout**: " + timeout + " seconds\n\n";

text += "*To change interval, send:*\n`/set interval [seconds]`\n\n";
text += "*To change timeout, send:*\n`/set timeout [seconds]`";

let buttons = [
  [{ title: "🔙 Back to Dashboard", command: "/admin" }]
];

Bot.sendInlineKeyboard(buttons, text);


