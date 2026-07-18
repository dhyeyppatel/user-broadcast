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

if (user.telegramid != 1123135015) {
  return Bot.sendMessage("❌ Not allowed");
}

let storage_channel = -1003445406523;

let start_message_id = 100;

let interval = 3;

// AUTO DELETE AFTER (seconds)
let auto_delete_time = 6;

Bot.setProperty("forward_loop", true, "boolean");

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
