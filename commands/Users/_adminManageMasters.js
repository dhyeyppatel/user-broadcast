/*CMD
  command: /adminManageMasters
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Users<<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin_id");
if (!admin_id || user.telegramid.toString() !== admin_id.toString()) return;

let masters = Bot.getProperty("master_users", []);

let text = "👑 **Manage Master Users**\n\n";

if (masters.length === 0) {
  text += "No master users configured.\n\n";
} else {
  text += "Current Master Users:\n";
  for (let i = 0; i < masters.length; i++) {
    text += "• `" + masters[i] + "`\n";
  }
  text += "\n";
}

text += "*To Add a Master User, send:*\n`/addmaster [user_id]`\n\n";
text += "*To Remove a Master User, send:*\n`/removemaster [user_id]`";

let buttons = [
  [{ title: "🔙 Back to Dashboard", command: "/admin" }]
];

Bot.sendInlineKeyboard(buttons, text);


