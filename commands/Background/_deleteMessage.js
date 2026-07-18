/*CMD
  command: /deleteMessage
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Backgroundanswer: 

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!options) return;

Api.deleteMessage({
  chat_id: options.chat_id,
  message_id: options.message_id
});


