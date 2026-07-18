/*CMD
  command: /set
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin/System<<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var admin_id = Bot.getProperty("admin_id");

if (!admin_id) {
  return Bot.sendMessage("❌ Run /setup first");
}

if (user.telegramid.toString() !== admin_id.toString()) {
  return Bot.sendMessage("❌ Not allowed");
}

let p = params ? params.split(" ") : [];

if (p.length < 2) {
  return Bot.sendMessage(
    "Usage:\n" +
    "/set interval [seconds]\n" +
    "/set timeout [seconds]"
  );
}

let prop = p[0].toLowerCase();
let val = parseInt(p[1]);

if (isNaN(val)) {
  return Bot.sendMessage("❌ Value must be a number");
}

if (prop === "interval") {
  Bot.setProperty("interval", val, "integer");
} else if (prop === "timeout") {
  Bot.setProperty("auto_delete_time", val, "integer");
} else {
  return Bot.sendMessage("❌ Invalid property. Use interval or timeout.");
}

Bot.sendMessage("✅ Set " + prop + " to " + val);

