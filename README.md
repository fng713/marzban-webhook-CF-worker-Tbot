
###

<p align="center">
 <a href="./README.md">
 English
 </a>
 /
 <a href="./README-fa.md">
 فارسی
 </a>
</p>

###


# Telegram Webhook Listener

This is a serverless JavaScript-based webhook listener designed to process notifications from [Marzban's Webhook System](https://gozargah.github.io/marzban/en/docs/webhook). It formats the incoming data and sends it as a message to a Telegram chat using the Telegram Bot API.

## Features

- Listens for POST requests with JSON payloads from Marzban.
- Handles various **user events** such as creation, updates, expiration, and restrictions.
- Verifies requests using a secret key for security.
- Automates sending detailed user event notifications to a specified Telegram chat.

## Prerequisites

1. **Telegram Bot Token**: Obtain this by creating a bot with [BotFather](https://core.telegram.org/bots#botfather).
2. **Admin Chat ID**: Identify the chat where notifications will be sent.
3. **Webhook Secret Key**: Configure this to secure incoming webhook requests.
4. **Marzban**: A proxy management system with webhook capabilities enabled.

## Supported Marzban Webhook Data

Marzban's webhook sends notifications for specific user events. The key data fields you can expect include:

- **username**: The username related to the event.
- **action**: The type of event (e.g., `user_created`, `user_updated`, `user_expired`).
- **enqueued_at**: Timestamp indicating when the event was queued.
- **tries**: Retry count if notification delivery has failed.
- **Additional fields**:
  - **admin**: The administrator responsible for the user.
  - **status**: The user's current status (e.g., active, inactive).
  - **data_limit**: The user's data cap in bytes.
  - **expire**: The UNIX timestamp of the user's account expiry.
  - **note**: Additional notes associated with the user.

For a complete list of event types and payload structures, refer to the [official Marzban documentation](https://gozargah.github.io/marzban/en/docs/webhook).

### Example Payload and Notification

Incoming JSON payload from Marzban:

```json
{
  "username": "example_user",
  "action": "user_created",
  "enqueued_at": 1680506457.636369,
  "tries": 0,
  "user": {
    "admin": { "username": "admin_user" },
    "status": "active",
    "data_limit": 5368709120,
    "expire": 1700000000,
    "note": "Welcome package"
  }
}
```

Formatted Telegram message:

```
Action: user_created
Username: example_user
Admin: admin_user
Status: active
Data Limit: 5 GB
Expiry: 30 days
Note: Welcome package
```

## Deployment

1. Deploy the script to a serverless platform (e.g., [Cloudflare Workers](https://workers.cloudflare.com/), [AWS Lambda](https://aws.amazon.com/lambda/)).
2. Configure Marzban to send webhook notifications to your deployed URL.
3. Test the integration by triggering user events in Marzban.

## References

- [Marzban Webhook Documentation](https://gozargah.github.io/marzban/en/docs/webhook)
- [Telegram Bot API](https://core.telegram.org/bots/api)


###

<h1 align="left">Donation</h1>

###

<p align="left">https://nowpayments.io/donation/FNG</p>

###
