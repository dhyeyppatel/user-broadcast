/*CMD
  command: /forwardError
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

if (!options) return;

let errDesc = "";
if (options.result && options.result.description) {
  errDesc = options.result.description;
} else if (options.error && options.error.description) {
  errDesc = options.error.description;
} else {
  errDesc = JSON.stringify(options);
}

let target_id = parseInt(params); // Passed via /forwardError <user_id>
let current_msg_id = Bot.getProperty("current_message_id");

if (errDesc.includes("message to copy not found") || errDesc.includes("message not found")) {
  // Only track missing count once per message_id
  let last_failed = Bot.getProperty("last_failed_id", 0);
  if (last_failed !== current_msg_id) {
    Bot.setProperty("last_failed_id", current_msg_id, "integer");
    
    let count = Bot.getProperty("missing_count", 0);
    count++;
    Bot.setProperty("missing_count", count, "integer");
    
    // Halt if missing for too many consecutive IDs
    if (count > 20) {
      Bot.setProperty("forward_loop", false, "boolean");
      
      let admin_id = Bot.getProperty("admin_id");
      if (admin_id) {
        Bot.sendMessageToChatWithId(admin_id, "⏹ **Auto-forwarding halted**\nReached " + count + " consecutive missing messages (End of channel reached).");
      }
    }
  }
} else if (errDesc.includes("bot was blocked by the user") || errDesc.includes("user is deactivated")) {
  // Remove user from premium array
  if (target_id) {
    let premium = Bot.getProperty("premium_users", []);
    let index = premium.indexOf(target_id);
    if (index > -1) {
      premium.splice(index, 1);
      Bot.setProperty("premium_users", premium, "json");
      
      let admin_id = Bot.getProperty("admin_id");
      if (admin_id) {
        Bot.sendMessageToChatWithId(admin_id, "⚠️ Removed user " + target_id + " from premium because they blocked the bot.");
      }
    }
  }
}
