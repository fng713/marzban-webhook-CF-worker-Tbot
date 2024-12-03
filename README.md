# Telegram Webhook Listener | لیسنر وبهوک تلگرام

This is a serverless JavaScript-based webhook listener designed to process notifications from [Marzban's Webhook System](https://gozargah.github.io/marzban/en/docs/webhook). It formats the incoming data and sends it as a message to a Telegram chat using the Telegram Bot API.

این اسکریپت یک لیسنر وبهوک بر پایه جاوا اسکریپت است که برای پردازش اعلان‌های سیستم وبهوک [مرزبان](https://gozargah.github.io/marzban/en/docs/webhook) طراحی شده است. داده‌های ورودی را فرمت کرده و آن را به یک چت تلگرام ارسال می‌کند.

---

## Features | ویژگی‌ها

- Listens for POST requests with JSON payloads from Marzban.
- Handles various **user events** such as creation, updates, expiration, and restrictions.
- Verifies requests using a secret key for security.
- Automates sending detailed user event notifications to a specified Telegram chat.

- دریافت درخواست‌های POST با بار JSON از مرزبان.
- مدیریت رویدادهای کاربران مانند ایجاد، به‌روزرسانی، انقضا و محدودیت‌ها.
- تایید درخواست‌ها با استفاده از یک کلید مخفی برای امنیت.
- ارسال خودکار اعلان‌های مربوط به رویدادهای کاربران به چت تلگرام مشخص.

---

## Prerequisites | پیش‌نیازها

1. **Telegram Bot Token**: Obtain this by creating a bot with [BotFather](https://core.telegram.org/bots#botfather).
2. **Admin Chat ID**: Identify the chat where notifications will be sent.
3. **Webhook Secret Key**: Configure this to secure incoming webhook requests.
4. **Marzban**: A proxy management system with webhook capabilities enabled.

1. **توکن ربات تلگرام**: این توکن را با ساخت یک ربات از طریق [BotFather](https://core.telegram.org/bots#botfather) دریافت کنید.
2. **شناسه چت ادمین**: چتی که اعلان‌ها به آن ارسال می‌شود را مشخص کنید.
3. **کلید مخفی وبهوک**: برای تایید و امنیت درخواست‌ها از این کلید استفاده کنید.
4. **مرزبان**: سیستمی برای مدیریت پروکسی که قابلیت وبهوک را فعال کرده باشد.

---

## Supported Marzban Webhook Data | داده‌های پشتیبانی‌شده وبهوک مرزبان

Marzban's webhook sends notifications for specific user events. The key data fields you can expect include:

وبهوک مرزبان اعلان‌های مربوط به رویدادهای خاص کاربران را ارسال می‌کند. فیلدهای کلیدی داده شامل موارد زیر است:

- **username**: The username related to the event.  
  **نام کاربری**: نام کاربری مربوط به رویداد.
- **action**: The type of event (e.g., `user_created`, `user_updated`, `user_expired`).  
  **رویداد**: نوع رویداد (مانند `ایجاد کاربر`، `به‌روزرسانی کاربر`، `انقضای کاربر`).
- **enqueued_at**: Timestamp indicating when the event was queued.  
  **زمان ثبت**: زمان ثبت رویداد.
- **tries**: Retry count if notification delivery has failed.  
  **تعداد تلاش‌ها**: تعداد دفعات تلاش در صورت عدم ارسال موفق.
- **Additional fields**:  
  **فیلدهای اضافی**:
  - **admin**: The administrator responsible for the user.  
    **ادمین**: ادمین مسئول کاربر.
  - **status**: The user's current status (e.g., active, inactive).  
    **وضعیت**: وضعیت فعلی کاربر.
  - **data_limit**: The user's data cap in bytes.  
    **محدودیت داده**: مقدار محدودیت داده به بایت.
  - **expire**: The UNIX timestamp of the user's account expiry.  
    **تاریخ انقضا**: زمان انقضای کاربر به فرمت یونیکس.
  - **note**: Additional notes associated with the user.  
    **یادداشت**: یادداشت‌های مرتبط با کاربر.

For a complete list of event types and payload structures, refer to the [official Marzban documentation](https://gozargah.github.io/marzban/en/docs/webhook).  
برای فهرست کامل انواع رویدادها و ساختار داده‌ها، به [مستندات مرزبان](https://gozargah.github.io/marzban/en/docs/webhook) مراجعه کنید.

---

## Example Incoming Payload | مثال بار ورودی

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
