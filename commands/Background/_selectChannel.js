/*CMD
  command: /selectChannel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Background

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let channel_id = params;
if (!channel_id) return;

let channels = Bot.getProperty("channels", {});
if (!channels[channel_id]) {
  return Bot.sendMessage("Channel no longer exists.");
}

let master_users = Bot.getProperty("master_users", []);
let isMaster = master_users.includes(user.telegramid);
let admin_id = Bot.getProperty("admin_id");
if (admin_id && user.telegramid.toString() === admin_id.toString()) {
  isMaster = true;
}

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
  return Bot.sendMessage("❌ You do not have access to this channel.");
}

let isLooping = User.getProperty("loop_" + channel_id);

if (isLooping) {
  // Stop looping
  User.setProperty("loop_" + channel_id, false, "boolean");
  Bot.sendMessage("⏹ Auto-forwarding stopped for " + channels[channel_id].name);
} else {
  // Start looping
  User.setProperty("loop_" + channel_id, true, "boolean");
  
  // Initialize current msg ID if not set
  let current_msg = User.getProperty("msg_" + channel_id);
  if (!current_msg) {
    User.setProperty("msg_" + channel_id, channels[channel_id].start_id, "integer");
  }
  
  User.setProperty("missing_" + channel_id, 0, "integer");

  Bot.sendMessage("✅ Auto-forwarding started for " + channels[channel_id].name + ".\nMessages will begin arriving shortly.");
  
  // Trigger first loop
  let interval = Bot.getProperty("interval", 3);
  Bot.run({
    command: "/forwardUserNext " + channel_id,
    run_after: interval
  });
}


