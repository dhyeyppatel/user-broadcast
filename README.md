# CommonThread Premium Auto-Forwarding Bot

A powerful, multi-channel Telegram auto-forwarding bot built on [Bots.Business](https://bots.business). This bot is designed to drip-feed historical messages from private/public Telegram channels directly to individual users at a configurable pace. It comes fully equipped with automated referral systems, single-use invite links, user management, and an interactive Owner Dashboard.

❤️ *Powered by @commonthread*

---

## 🌟 Key Features

*   **Multi-Channel Drip-Feeds**: Users can subscribe to multiple channels at once. The bot will automatically forward messages one-by-one from a starting ID, pausing/resuming on command.
*   **Hassle-Free Channel Setup**: No more hunting for Channel IDs or Message IDs. Just forward a message from your channel to the bot, and it will register automatically!
*   **Automated Referral System**: Lock premium channels behind a referral wall. Set a required invite count (e.g., 5 invites). Users can generate their unique referral link via the `/profile` menu, and the bot will track invites and automatically unlock the channel for them when they reach the goal.
*   **Single-Use Invite Links**: Want to grant access to a user manually without asking for their ID? Just generate a 1-Time Invite Link from the dashboard. Once the user clicks it, they get access and the link deletes itself.
*   **Global Broadcast**: Instantly send an announcement (text, image, video, or forwarded message) to every single user who has access to your bot.
*   **Interactive Owner Dashboard**: A beautiful inline keyboard menu for owners to manage settings and channels without typing complex commands.
*   **Master Users**: Add co-admins or VIPs as "Master Users". They bypass all restrictions and can view all channels.

---

## 🚀 Initial Setup

1.  **Import to Bots.Business**: Import this repository into a new Bots.Business project.
2.  **Run Setup**: Send `/setup` to the bot in Telegram. This will register your Telegram ID as the **Owner/Admin** and set up the interactive Telegram Menu button.
3.  **Ensure Bot is Admin in Channels**: Your bot **MUST** be an administrator in the channels you want to forward messages from (it needs access to read messages).

---

## 📚 Command Documentation

### 👤 User Commands (Available to everyone)
*   **/start** or **/menu** — Opens the User Menu. Displays an interactive list of all unlocked channels. Clicking a channel toggles the drip-feed on or off.
*   **/profile** — Opens the User Profile. Shows locked channels, referral progress, and provides buttons to generate unique referral links.
*   **/stop**, **/pause**, or **/stopAll** — Instantly pauses all active auto-forwarding loops for the user.

### 👑 Owner Dashboard
*   **/admin** — Opens the **Owner Dashboard**. From here you can view stats and manage channels and configuration.
*   **/setup** — Sets you as the Admin. (Only the bot creator should run this).

### 📺 Channel Management (Admin Only)
*   **Add a Channel**: Simply **forward a message** from your channel to the bot. It will automatically detect the Channel ID and Starting Message ID!
*   **/removechannel [channel_id]** — Deletes a channel from the bot.
*   **/setReferrals [channel_id] [required_count]** — Sets the number of referrals a user needs to unlock a specific channel. (Set to `0` to disable).

### 👥 User Management (Admin Only)
*   **1-Time Links**: Use the `/admin` dashboard -> *Manage Channels* -> click `🔗 1-Time Link` to generate a single-use invite link for a specific channel.
*   **/addmaster [user_id]** — Grants a user **Master Access**. They will bypass all restrictions and can view all current and future channels.
*   **/removemaster [user_id]** — Revokes Master Access from a user.
*   *(Manual Add)* **/add [user_id] [channel_id]** — Grants a specific user access to a specific channel.
*   *(Manual Remove)* **/remove [user_id] [channel_id]** — Revokes a user's access from a specific channel.

### ⚙️ System & Config (Admin Only)
*   **/broadcast** — Prompts you to send a message (text, media, forward) and then blasts it to all users of the bot.
*   **/set interval [seconds]** — Sets the delay between forwarded messages (e.g., `/set interval 5` for 5 seconds).
*   **/set timeout [seconds]** — Sets the auto-delete timeout. The bot will automatically delete the forwarded message from the user's inbox after this many seconds.

---

## 📁 File Structure
The bot commands are fully categorized for easy navigation in the Bots.Business editor:
*   `Channels/` - Handlers for adding/removing channels, referral config, and 1-time links.
*   `System/` - Core admin setup, the interactive dashboard, broadcast, and the catch-all (`*`) forward listener.
*   `Users/` - Manual addition/removal of users and masters.
*   `User/` - End-user facing menus like `/menu` and `/profile`.
*   `Background/` - The core auto-forwarding engine, looping logic, and auto-deletion scripts.