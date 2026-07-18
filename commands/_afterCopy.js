/*CMD
  command: /afterCopy
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!options || !options.result) return;

let delete_after = parseInt(Bot.getProperty("auto_delete_time"));

// Reset missing count on success
Bot.setProperty("missing_count", 0, "integer");

// result contains sent message data
let sent_message_id = options.result.message_id;

let chat_id = params;

// schedule delete
Bot.run({
  command: "/deleteMessage",

  options: {
    chat_id: chat_id,
    message_id: sent_message_id
  },

  run_after: delete_after
});
