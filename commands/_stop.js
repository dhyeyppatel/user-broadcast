/*CMD
  command: /stop
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

/*
Stops forwarding loop
*/

if (user.telegramid != 1123135015) {
  return Bot.sendMessage("❌ Not allowed");
}

Bot.setProperty("forward_loop", false, "boolean");

Bot.sendMessage("⏹ Premium auto forwarding stopped.");
