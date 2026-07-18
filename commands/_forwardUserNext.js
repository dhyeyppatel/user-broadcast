/*CMD
  command: /forwardUserNext
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

let channel_id = params;
if (!channel_id) return;

let isLooping = User.getProperty("loop_" + channel_id);
if (!isLooping) {
  return; // Loop stopped
}

let channels = Bot.getProperty("channels", {});
if (!channels[channel_id]) {
  User.setProperty("loop_" + channel_id, false, "boolean");
  return Bot.sendMessage("⏹ Channel no longer exists.");
}

let master_users = Bot.getProperty("master_users", []);
let isMaster = master_users.includes(user.telegramid);

let hasAccess = false;
if (isMaster) {
  hasAccess = true;
} else {
  let premium = Bot.getProperty("premium_" + channel_id, []);
  if (premium.includes(user.telegramid)) {
    hasAccess = true;
  }
}

if (!hasAccess) {
  User.setProperty("loop_" + channel_id, false, "boolean");
  return Bot.sendMessage("❌ You lost access to this channel.");
}

let message_id = User.getProperty("msg_" + channel_id);

Api.copyMessage({
  chat_id: user.telegramid,
  from_chat_id: channel_id,
  message_id: message_id,
  on_result: "/afterUserCopy " + channel_id,
  on_error: "/forwardUserError " + channel_id
});

// Increment message id
User.setProperty("msg_" + channel_id, message_id + 1, "integer");

let interval = Bot.getProperty("interval", 3);

// next loop
Bot.run({
  command: "/forwardUserNext " + channel_id,
  run_after: interval
});
