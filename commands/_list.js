/*CMD
  command: /list
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

let premium = Bot.getProperty("premium_users", []);

if (premium.length == 0) {

  return Api.sendMessage({
    text: "❌ No premium users"
  });

}

Api.sendMessage({
  text:
    "👥 Premium Users:\n\n" +
    premium.join("\n")
});
