/*CMD
  command: /afterUserCopy
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

if (!options || !options.result) return;

let channel_id = params;
if (!channel_id) return;

let delete_after = parseInt(Bot.getProperty("auto_delete_time", 6));

// Reset missing count on success
User.setProperty("missing_" + channel_id, 0, "integer");

let sent_message_id = options.result.message_id;

// schedule delete
Bot.run({
  command: "/deleteMessage",
  options: {
    chat_id: user.telegramid,
    message_id: sent_message_id
  },
  run_after: delete_after
});


