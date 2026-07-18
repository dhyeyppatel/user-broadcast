/*CMD
  command: /status
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var admin_id = Bot.getProperty("admin_id");

if (!admin_id) {
  return Bot.sendMessage("❌ Run /setup first");
}

if (user.telegramid.toString() !== admin_id.toString()) {
  return Bot.sendMessage("❌ Not allowed");
}

let isRunning = Bot.getProperty("forward_loop") ? "✅ Running" : "⏹ Stopped";
let msgId = Bot.getProperty("current_message_id", "Not set");
let channel = Bot.getProperty("storage_channel", "Not set");
let interval = Bot.getProperty("interval", "Not set");
let timeout = Bot.getProperty("auto_delete_time", "Not set");
let missingCount = Bot.getProperty("missing_count", 0);

let premium = Bot.getProperty("premium_users", []);

let text = "📊 **Bot Status**\n\n" +
  "Loop Status: " + isRunning + "\n" +
  "Current Msg ID: " + msgId + "\n" +
  "Missing Count: " + missingCount + "\n" +
  "Total Premium Users: " + premium.length + "\n\n" +
  "⚙️ **Configuration**\n" +
  "Storage Channel: " + channel + "\n" +
  "Interval: " + interval + "s\n" +
  "Auto-Delete Timeout: " + timeout + "s";

Bot.sendMessage(text);
