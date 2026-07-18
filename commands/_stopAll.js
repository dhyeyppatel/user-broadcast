/*CMD
  command: /stopAll
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /stop, /pause
  group: 
CMD*/

let channels = Bot.getProperty("channels", {});

let stopped = 0;
for (let channel_id in channels) {
  let isLooping = User.getProperty("loop_" + channel_id);
  if (isLooping) {
    User.setProperty("loop_" + channel_id, false, "boolean");
    stopped++;
  }
}

if (stopped > 0) {
  Bot.sendMessage("⏸ **All active auto-forwarding loops have been paused.**\nRun /menu to resume them anytime.");
} else {
  Bot.sendMessage("⚠️ You don't have any active loops running right now.");
}
