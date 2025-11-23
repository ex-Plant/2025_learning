### EMAILS

Different protocols handle exchanging emails.

SMTP - Simple Mail Transfer Protocol
Used to send email to some server. Used for outgoing messages
Common ports:

- 25 -> server to server
- 465 - legacy client to server
- 587 - client to server (with auth)

POP3 - Post Office Protocol
Downloading emails from the server to client.
By default removes emails from server once downladed (can be configured).
Usefule when downloading emails to a single device. Not modern IMAP used more nowedays.

- 110 (plain)
- 995 (secure POP3S)

IMAP - Internet Message Access Protocol
Modern default used by services like gmail.
Accessing emails on the server from multiple devices, syncing state (unread, read etc.)

- 143 - plain
- 993 - secure (IMAPS)

MIME - Multipurpose Internet Mail Extensions
Letting emails include not just text, but also images, attachments, HTML formatting, emojis.

Emails heavily relies on DNS records especially
MX - mail exchange
SPF, DKIM, DMARC - used for auth and anti spam

### Sending email using python

```py
import smtplib
from email.message import EmailMessage

# Create the email
msg = EmailMessage()
msg["From"] = "you@example.com"
msg["To"] = "friend@example.com"
msg["Subject"] = "Hello from Python"
msg.set_content("This is a test email sent using Python's smtplib!")

# Connect to your mail server
# For Gmail, use smtp.gmail.com and port 587
with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
    smtp.starttls()  # Encrypt the connection
    smtp.login("you@example.com", "your-app-password")
    smtp.send_message(msg)

print("Email sent successfully!")

```

### Sending email using SendGrid

```py
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

message = Mail(
    from_email="you@example.com",
    to_emails="friend@example.com",
    subject="Hello via SendGrid",
    plain_text_content="Hi there! Sent using SendGrid API.",
)

try:
    sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
    response = sg.send(message)
    print(f"Status code: {response.status_code}")
except Exception as e:
    print(e)
```

### using sendgrid from within terminal

```zsh
curlf
-X POST
--url https://api.sendgrid.com/v3/mail/send
-H "Authorization: Bearer $SENDGRID_API_KEY"
-H "Content-Type:application/json"
  -d '{
        "personalizations": [{ "to": [{ "email": "friend@example.com" }] }],
        "from": { "email": "you@example.com" },
        "subject": "Hello from curl!",
        "content": [{ "type": "text/plain", "value": "This email was sent from my terminal using SendGrid API." }]
      }'
```

Idempotencja
An idempotent operation is one that can be applied multiple times without changing the result beyond the first application.

Example 1: HTTP Methods

- GET → idempotent: Fetching a resource doesn’t change it.

- PUT → idempotent: Updating a resource to a specific state is deterministic.

Whether you PUT /user/42 { "active": true } once or ten times, the result is the same — user 42 ends up active.

- POST → not idempotent: Each call typically creates new data (e.g., a new record or entry).

- DELETE → idempotent: Deleting the same resource multiple times still results in “it’s gone.”

- PATCH -> not idemopotent; You can update the same resources twice, for example adding more text to a string, and every time it will be different.

Idempotency guarantees safety in retries — especially important for network operations.

If a request times out and the client retries, you don’t accidentally create duplicates or corrupt state.

# NOT idempotent

INSERT INTO users (name) VALUES ('Alice');
// if you run it twice you will end up with tow users Alice

# idempotent-like

UPDATE users SET active = false WHERE id = 42;

# idempotent function

const abs = (x) => Math.abs(x);
abs(abs(-7)); // => 7
abs() doesn’t change outcome on repeated application → idempotent.
