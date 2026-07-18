/*CMD
  command: /start
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

let storage_channel = Bot.getProperty("storage_channel") || -1003445406523;

let start_message_id = Bot.getProperty("current_message_id") || 1;

let interval = Bot.getProperty("interval") || 10;

// AUTO DELETE AFTER (seconds)
let auto_delete_time = Bot.getProperty("auto_delete_time") || 600;

Bot.setProperty("forward_loop", true, "boolean");
// Reset missing count
Bot.setProperty("missing_count", 0, "integer");

Bot.setProperty(
  "current_message_id",
  start_message_id,
  "integer"
);

Bot.setProperty(
  "storage_channel",
  storage_channel,
  "integer"
);

Bot.setProperty(
  "interval",
  interval,
  "integer"
);

Bot.setProperty(
  "auto_delete_time",
  auto_delete_time,
  "integer"
);

Bot.sendMessage(
  "✅ Auto forwarding started\n\n" +
  "⏱ Interval: " + interval + " sec\n" +
  "🗑 Auto Delete: " + auto_delete_time + " sec"
);

Bot.run({
  command: "/forwardNext",
  run_after: interval
});
