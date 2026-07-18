/*CMD
  command: /forwardNext
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

let storage_channel = Bot.getProperty("storage_channel");

let interval = parseInt(Bot.getProperty("interval"));

let message_id = parseInt(Bot.getProperty("current_message_id"));

if (!Bot.getProperty("forward_loop")) {

  Bot.sendMessage("⏹ Forwarding stopped.");

  return;
}

let premium = Bot.getProperty("premium_users", []);

if (premium.length == 0) {

  Bot.sendMessage("❌ No premium users.");

  return;
}

// send to all premium users
for (let i = 0; i < premium.length; i++) {

  Api.copyMessage({
    chat_id: premium[i],
    from_chat_id: storage_channel,
    message_id: message_id,

    on_result: "/afterCopy " + premium[i],
    on_error: "/forwardError " + premium[i]
  });

}

// increment message id
Bot.setProperty(
  "current_message_id",
  message_id + 1,
  "integer"
);

// next loop
Bot.run({
  command: "/forwardNext",
  run_after: interval
});
