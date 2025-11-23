Main Domain A Record:
wykonczymy.com.pl A 91.211.222.29

- A records: Point subdomains to IP addresses (webmail, cpanel, ftp, www, etc.)

- CNAME records: Aliases (mail.wykonczymy points to wykonczymy)

- SRV records: Service records (CalDAV, CardDAV for calendar/contacts sync)

- TXT records: Text records for email authentication and verification

1. MX Record (Mail Exchange) ⭐⭐⭐
   tells the world where to send emails.

2. SPF Record (TXT) ⭐⭐
   This authorizes which servers can send email on behalf of your domai

DKIM Record (TXT) ⭐⭐
This cryptographically signs your emails to prove they're legitimate.

Mail Server A Record ⭐

Your current TTL (Time To Live) is 3600 seconds = 1 hour. This means:

- When you change DNS records, it can take up to 1 hour for the change to propagate worldwide

- We need to lower this to 300-600 seconds BEFORE migration day (we'll do this later)

E mail migration to a new server

Step 1.1: Lower DNS TTL (Do This First - 24-48h Before Migration)
Why: So DNS changes propagate faster during the actual switch.

- The SPF TXT record (the one with v=spf1)

- The DKIM TXT record (default.\_domainkey)

- The A record for wykonczymy.com.pl

- The CNAME for mail.wykonczymy.com.pl

Step 1.2: Document Current Email Passwords
Step 1.3: Backup Current Emails

Step 1.4: Set Up New Email Accounts on SeoHost
Create the same 3 email accounts:

Get New Email Server Details from SeoHost

PHASE 2: EMAIL MIGRATION (Day 2 - Migration Day)

Step 2.1: Migrate Email Content

We'll use IMAP sync to copy emails from old to new server.

Step 2.2: Test New Email Server

PHASE 3: DNS SWITCH (Still Day 2)

Step 3.1: Get New DNS Records from SeoHost

In SeoHost cPanel:

1. Go to Email Deliverability

2. Note the recommended:

   - MX record

   - SPF record

   - DKIM record (if different)

   Step 3.2: Update DNS Records

Go to OLD cPanel (current hosting) → Zone Editor:

A. Update MX Record

1. Click "Edytuj" on MX record for wykonczymy.com.pl

2. Change destination to new server (probably stays mail.wykonczymy.com.pl but verify with SeoHost)

3. Keep Priority: 0

4. TTL: 300

5. Save

B. Update A Record for Mail Subdomain

1. Find mail.wykonczymy.com.pl (currently CNAME)

2. You may need to delete CNAME and create new A record pointing to new IP

3. Or change it to point to new server IP

C. Update SPF Record

1. Edit the TXT record with v=spf1

2. Update IP addresses to include new SeoHost server IP

3. Example: v=spf1 ip4:[NEW_IP] a mx ~all

D. Update DKIM Record (if different)

1. Get new DKIM from SeoHost (Email Deliverability)

2. Update default.\_domainkey.wykonczymy.com.pl TXT record

Step 3.3: Verification (15-30 min after DNS change)

1. Send test email TO one of the accounts

2. Check it arrives in new server (SeoHost webmail)

3. Send email FROM the account

4. Check it's not marked as spam

Step 4.1: Final Email Sync
Check old server webmail

Step 4.2: Update User Email Clients
Update incoming server password to NEW password

Step 4.3: Monitor for 7 Days

- Keep old hosting active for at least 7 days

- Check old webmail occasionally for straggler emails

- Forward any that arrive to new server

Step 4.4: Restore DNS TTL (After 7 days)

Once everything is stable:

1. Change TTL back to 3600 on all email-related DNS records

2. This reduces DNS query load

Why isn't TTL 300 by default?

Trade-off between speed vs. server load:

Higher TTL (3600 = 1 hour):

- ✅ Reduces DNS server queries (less load, lower costs)

- ✅ Faster for users (cached locally for longer)

- ❌ Slower to propagate changes (takes up to 1 hour)

Lower TTL (300 = 5 minutes):

- ✅ Changes propagate faster (5 minutes)

- ❌ More DNS queries to your nameservers (higher load)

- ❌ Slightly slower for end users (re-checks DNS more often)

Why hosts set it high by default:

- Most sites rarely change DNS records

- Reduces infrastructure costs

- Saves bandwidth

When to lower it:

- Before planned changes (like your migration)

- Then raise it back after changes are stable

Checking TTl from cli

```zsh

# MX Record
dig wykonczymy.com.pl MX +noall +answer

# SPF Record
dig wykonczymy.com.pl TXT +noall +answer

# DKIM Record
dig default._domainkey.wykonczymy.com.pl TXT +noall +answer

# Mail subdomain
dig mail.wykonczymy.com.pl +noall +answer
```
