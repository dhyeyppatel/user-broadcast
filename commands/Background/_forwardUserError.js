/*CMD
  command: /forwardUserError
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

if (!options) return;

let channel_id = params;
if (!channel_id) return;

let errDesc = "";
if (options.result && options.result.description) {
  errDesc = options.result.description;
} else if (options.error && options.error.description) {
  errDesc = options.error.description;
} else {
  errDesc = JSON.stringify(options);
}

if (errDesc.includes("message to copy not found") || errDesc.includes("message not found")) {
  let count = User.getProperty("missing_" + channel_id, 0);
  count++;
  User.setProperty("missing_" + channel_id, count, "integer");
  
  if (count > 20) {
    User.setProperty("loop_" + channel_id, false, "boolean");
    Bot.sendMessage("⏹ **Auto-forwarding halted for " + channel_id + "**\nReached " + count + " consecutive missing messages (End of channel reached).");
  }
} else if (errDesc.includes("bot was blocked by the user") || errDesc.includes("user is deactivated")) {
  User.setProperty("loop_" + channel_id, false, "boolean");
}


