/*CMD
  command: /broadcast
  help: 
  need_reply: true
  auto_retry_time: 
  folder: System

  <<ANSWER
Please send the message you want to broadcast to all users.
(You can send text, images, or forward a message)
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = Bot.getProperty("admin_id");
let masters = Bot.getProperty("master_users", []);

let isAdmin = false;
if (admin_id && user.telegramid.toString() === admin_id.toString()) isAdmin = true;
if (masters.includes(user.telegramid)) isAdmin = true;

if (!isAdmin) {
  return Bot.sendMessage("❌ Not allowed.");
}

// In BJS, if need_reply is true, the user's next message is captured here
let msg = message; // text message
let msg_id = request.message_id;

// We need a list of all users to broadcast to. 
// However, BJS doesn't inherently track a global list of users unless we saved them.
// Let's collect all premium users from all channels + masters.

let channels = Bot.getProperty("channels", {});
let all_users = new Set();

for (let i = 0; i < masters.length; i++) {
  all_users.add(masters[i]);
}

for (let ch_id in channels) {
  let premium = Bot.getProperty("premium_" + ch_id, []);
  for (let i = 0; i < premium.length; i++) {
    all_users.add(premium[i]);
  }
}

// Ensure the admin is in the set
if (admin_id) all_users.add(parseInt(admin_id));

let userArray = Array.from(all_users);

if (userArray.length === 0) {
  return Bot.sendMessage("No users found to broadcast to.");
}

// We will use Api.copyMessage to easily forward whatever they sent
let count = 0;
for (let i = 0; i < userArray.length; i++) {
  Api.copyMessage({
    chat_id: userArray[i],
    from_chat_id: user.telegramid,
    message_id: msg_id
  });
  count++;
}

Bot.sendMessage("✅ Successfully broadcasted message to " + count + " users.");
