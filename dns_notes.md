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

- Tells the world which server handles email for your domain

- Example:

  wykonczymy.com.pl MX Priority: 0 mail.wykonczymy.com.pl

- Without this, no one knows where to send emails for @wykonczymy.com.pl.

---

4. TXT Record

- A “note” attached to your domain — plain text data.

- Used for many modern purposes, especially email security:

  - SPF ("Sender Policy Framework") → defines which servers may send mail for your domain.

  v=spf1 ip4:91.211.222.29 a mx ~all

  - DKIM ("DomainKeys Identified Mail") → a cryptographic key to prove emails haven’t been forged.

  default.\_domainkey TXT v=DKIM1; k=rsa; p=MII...

  - DMARC (if present) → sets rules for how receiving mail servers should handle authentication failures.

---

5. SRV Record (Service Record)

- Defines a service (port + protocol), mostly used by things like VoIP, chat, calendars, autodiscovery.

- Example (from your zone file):

  \_caldav.\_tcp.wykonczymy.com.pl. SRV Priority:0 Port:2080 Target:s53.smarthost.pl

- For email migration, not critical.

---

6. NS Record (NameServer)

- Defines which DNS servers host your zone (authoritative servers).

- Example:

  wykoncymy.com.pl NS dns1.seohost.pl

- These usually live at your registrar/host.

---

7. PTR Record (Pointer/Reverse DNS) (not in your cPanel zone editor)

- Maps IP → domain name (the reverse of an A record).

- Important for email delivery (so other servers trust your server isn't a spammer).

---

Putting It Together (Your Case)

For wykonczymy.com.pl, here’s what each relevant record does:

- A: connects your domain name to your web/mail server IP

- CNAME (mail.): alias so email clients can use mail.wykonczymy.com.pl instead of remembering the main domain/IP

- MX: points email delivery to the mail server (via that mail. alias or directly to the A record)

- TXT (SPF/DKIM): email security/anti-spam checks

- TXT (miscellanous, like \_acme-challenge): used for SSL certificate verification (Let’s Encrypt, etc.)

- SRV: services like calendar/contacts discovery (not critical unless using MS Outlook/Exchange-like features)

---

✅ So your intuition is correct:

- A CNAME is a type of record usually used for subdomains (like mail., www., etc.), and it simply forwards that subdomain to another domain rather than pointing it directly to an IP.

wykonczymy.com.pl vs www.wykonczymy.com.pl

1. Root Domain (a.k.a. Apex Domain)

wykonczymy.com.pl

    wykonczymy.com.pl

- This is your main domain (sometimes called the "bare domain").

- It usually has an A record pointing to an IP address:

  wykonczymy.com.pl A 91.211.222.29

---

2. Subdomain www.

   www.wykonczymy.com.pl

- This is simply a subdomain of the root domain.

- It is not special from a DNS perspective — it could point anywhere.

- Common setup: a CNAME pointing to the root domain, like:

  www.wykonczymy.com.pl CNAME wykonczymy.com.pl

Meaning: "www" is just an alias for the main domain."

---

Why It Matters

- Visitors typing wykonczymy.com.pl go directly to the apex domain’s IP.

- Visitors typing www.wykonczymy.com.pl first resolve the alias → then go to the same IP.

- They’re intended to end up in the same place (the website).

- But technically, they’re two separate records in DNS → which means they can even point to different servers if you set them that way.

🌍 What is the Source of Truth for DNS?

- The source of truth for DNS (MX, A, TXT, etc.) is the authoritative nameservers for your domain.

- Whoever controls the nameservers (NS records at your domain registrar) controls which DNS zone is "live" for the internet.

1. Where Nameservers Are Defined

When you register your domain (say via home.pl, OVH, GoDaddy, etc.), that registrar lets you set NS (nameserver) records.

Example for your domain:

    wykonczymy.com.pl  NS  dns.sahost.pl
    wykonczymy.com.pl  NS  dns2.sahost.pl


    2. Adding Records in SeoHost ≠ Truth Yet

Even though you added your domain to SeoHost and it can generate DNS records inside its own panel…

- Those records are meaningless globally until you point your NS to SeoHost’s nameservers or manually copy the records into your current DNS provider (dns.sahost.pl in your case).

So yes, you can "add google.com" in SeoHost and give it an MX record — but unless the registrar for google.com points its nameservers to SeoHost → nobody on the planet will use them.

---

3. What MX (and others) Really Means

- MX record is always looked up via the domain’s authoritative nameservers.

- If your domain’s NS = dns.sahost.pl, then the MX record in the zone on Sahost is the truth.

- If later you change NS to hns1.seohost.pl / hns2.seohost.pl, then the MX configured inside SeoHost will become truth.

✅ Example Flow

Current Setup

1. Someone sends mail to adrian@wykonczymy.com.pl

2. Their server asks: “What are the NS for wykonczymy.com.pl?” → returns dns.sahost.pl

3. Asks those NS: “What’s the MX for wykonczymy.com.pl?”

4. Answer: wykonczymy.com.pl MX 0 wykonczymy.com.pl. → which resolves to your old server’s IP

5. Email goes to old server

After Migration

1. You either:

   - Change the MX record at Sahost’s DNS to h50.seohost.pl,

   - Or change the domain’s NS at registrar to point to SeoHost’s nameservers.

2. Then world lookup of MX finds h50.seohost.pl.

3. Mail flows to SeoHost.

---

⚖️ Simple Rule

👉 The only real source of truth is the nameservers your domain registrar is currently pointing to.

- Adding domains, MX, SPF etc. to SeoHost is local config → waiting.

- Propagation happens only when you update DNS either by editing records at current DNS host (Sahost), or by switching NS to SeoHost.

---

✅ So yes, you are exactly right in your thinking: you can "add whatever you want on my server," but it isn’t global truth until you (or the registrar) delegate DNS authority to that server.

wykonczymy.com.pl. 3600 IN NS dns.zshost.pl.
wykonczymy.com.pl. 3600 IN NS dns2.zshost.pl.
wykonczymy.com.pl. 3600 IN NS dns3.zshost.pl.

✅ Co to oznacza

1. Twoje domena jest kupiona w home.pl (czyli home.pl = rejestrator).

2. Ale home.pl nie trzyma Twoich DNS-ów – bo serwery nazw (NS) wskazują na zshost.pl.

   - dns.zshost.pl

   - dns2.zshost.pl

   - dns3.zshost.pl

👉 To oznacza, że źródłem prawdy dla rekordów A, MX, T

📌 Ile tu jest warstw?

- Home.pl (rejestrator) – tylko "trzyma" domenę w rejestrze i informuje świat: “prawdziwe serwery DNS tej domeny są pod adresem dns.zshost.pl / dns2… / dns3…”

- zshost.pl (serwery nazw) – to one odpowiadają światu na pytania: “Jaki jest MX dla wykonczymy.com.pl?” “Jaki jest A record?”

- Twój cPanel (na serwerze hostingu) – tam edytujesz Zone Editor → i te wpisy idą właśnie do tych serwerów NS (dns.zshost.pl).

🌍 Jak działa układ domena–rejestrator–DNS–hosting?

1. Rejestr domeny (registry)

- Globalna baza kto jest właścicielem domeny (dla .pl to NASK).

2. Rejestrator (u Ciebie: home.pl)

- To pośrednik, przez którego kupiłeś domenę.

- On ma możliwość dizerktować (=ustawić) które serwery namiarowe (NS) są przypisane do Twojej domeny.

- Ale rejestrator nie zawsze hostuje stronę / pocztę, on tylko mówi: “NS dla tej domeny to …”

👉 Dlatego napisałem wcześniej „źródło prawdy jest rejestrator” – czyli rejestrator wskazuje, kto jest źródłem prawdy.

Ale… sam rejestrator nie odpowiada zawsze na pytania DNS! Tylko wskazuje, gdzie leży ta strefa.

3. Serwery nazw (NS, authoritative DNS)

- To one są właściwym źródłem prawdy → odpowiadają światu: “MX tego domeny to …, A to …, TXT to …”

- W Twoim przypadku: dns.zshost.pl, dns2.zshost.pl, dns3.zshost.pl.

- Dlatego jak robisz zmiany w cPanel (Zone Editor), to w rzeczywistości edytujesz rekordy właśnie tych serwerów NS.

---

4. Hosting

- To jest serwer (np. Smarthost, SeoHost), na którym fizycznie stoi Twoja stronka i serwer pocztowy.

- Aby świat się z nim łączył, dane z DNS (na serwerach NS) muszą wskazywać na IP Twojego hostingu (dla A) czy na hostname serwera poczty (dla MX).

📌 Jak to u Ciebie wygląda

-

Rejestrator: home.pl

➝ On mówi tylko: „zapytaj dns.zshost.pl, dns2, dns3 — one mają prawdę o tej domenie”.

- NS (źródło prawdy DNS): dns.zshost.pl, dns2, dns3

➝ Tutaj faktycznie siedzą Twoje rekordy MX/A/TXT, które edytowałeś w cPanel.

- Hosting: serwery Smarthost (bo widziałem wpisy s53.smarthost.pl).

Internet pyta o wykoncymy.com.pl
⬇
Registry (.pl) → mówi: sprawdź u rejestratora home.pl
⬇
home.pl mówi: NS to dns.zshost.pl, dns2, dns3
⬇
dns.zshost.pl odpowiada:
A = 91.211.222.29
MX = wykonczymy.com.pl
TXT = SPF, DKIM …
⬇
Hosting (Smarthost) obsługuje zapytania, bo to jego IP wskazuje A/MX

✅ Wniosek

- Rejestrator (home.pl) → nie jest tym samym co hosting.

- „Źródło prawdy” technicznie jest tam, gdzie wskazują NS (czyli teraz zshost.pl).

- To co pisałem wcześniej: „źródło prawdy = rejestrator” → dokładniej trzeba rozumieć jako:

👉 „Rejestrator decyduje, które NS są źródłem prawdy.”

Ale faktyczna prawda = serwery NS, które on wskazał.

👉 Dopóki kontrolujesz domenę w home.pl (rejestratorze), jesteś panem całej sytuacji.

Your message: ok i do not see any of these
I have a test domain ready and it seems i need to move files therejust not sure how to connect dbClaude 4.5 SonnetSearchAttachRetryAssistant Reply: Perfect! You have a test domain ready at srv95341.seohost.com.plThe message says "This is the default page. To change it, upload files to the public*html directory"Next StepsStep 1: First, let's create the databaseIn DirectAdmin, look for one of these menu items:
MySQL Management
Zarządzanie MySQL
Bazy danych (Databases)
Account Manager → MySQL Management
Can you navigate there and take a screenshot? I need to see the database creation interface.Step 2: Once database is created, we'll upload filesYou'll upload the two Duplicator files to the public_html directory:
installer.php
archive.zip
Then run the installer at: http://srv95341.seohost.com.pl/installer.phpThe installer will ask for the database credentials, and that's how you "connect" the database.👉 Can you find the MySQL/Database section in DirectAdmin and show me what it looks like?We need to create:
Database name
Database user
Database password
RetryClaude 4.5 SonnetClaude 4.5 Sonnet24.59 tok/sec288 tokensTime-to-First: 4.3 secYour message: cant find php versionClaude 4.5 SonnetSearchAttachRetryAssistant Reply: Perfect! I can see the database creation form. And I can see important info at the bottom:Database host: localhost ✅Now let's create the database:Create DatabaseFill in the form:
Nazwa bazy danych (Database name): test (already filled)
Nazwa użytkownika (Username): test (already filled)
Hasło (Password): I can see it's auto-generated: EKntDBuj5UtcwQJzF3um
👉 Click the green "UTWÓRZ" (CREATE) buttonWrite down these credentials (you'll need them for the installer):textDB Name: srv95341_test
DB User: srv95341_test
DB Pass: EKntDBuj5UtcwQJzF3um
DB Host: localhost
Note: DirectAdmin usually prefixes database names and usernames with your account name (srv95341*), so the actual names will be srv95341_testAbout PHP version:Don't worry about it for now - we'll check it after upload. If there are issues, we can adjust it later. Most modern hosts default to PHP 8.x anyway.👉 Click "UTWÓRZ" and let me know when the database is created! Then we'll upload the Duplicator files. 🎯RetryClaude 4.5 SonnetClaude 4.5 Sonnet25.33 tok/sec345 tokensTime-to-First: 7.1 secYour message: it is createdClaude 4.5 SonnetSearchAttachRetryAssistant Reply: Excellent! ✅ Database created.Write down your credentials:textDB Name: srv95341_test
DB User: srv95341_test  
DB Pass: EKntDBuj5UtcwQJzF3um
DB Host: localhost
Step 3: Upload Duplicator FilesGo to File Manager in DirectAdmin:
Look for Zarządzanie plikami or File Manager in the left menu
Navigate to public_html or domains/srv95341.seohost.com.pl/public_html
Upload both Duplicator files:
installer.php
archive.zip
How to upload:
Look for an Upload button in the file manager
Or drag and drop the files
Make sure they go into the public_html directory (the one that shows when you visit srv95341.seohost.com.pl)
👉 Can you navigate to the File Manager and upload those two files?Once uploaded, we'll visit http://srv95341.seohost.com.pl/installer.php to run the migration! 📤RetryClaude 4.5 SonnetClaude 4.5 Sonnet31.75 tok/sec286 tokensTime-to-First: 4.6 secYour message: ok installerClaude 4.5 SonnetSearchAttachRetryAssistant Reply: Amazing! 🎉 The installer is running and has already filled in your database credentials!Everything looks correct:
✅ Host: localhost
✅ Database: srv95341_test
✅ User: srv95341_test
✅ Password: (filled in)
Next StepClick the blue "Validate" button at the bottom right.This will:
Test the database connection
Check if the archive can be extracted
Verify everything is ready for installation
👉 Click "Validate" and let me know:
Does it show green checkmarks/success?
Or are there any errors/warnings?
We're very close! 🚀RetryClaude 4.5 SonnetClaude 4.5 Sonnet44.76 tok/sec182 tokensTime-to-First: 3.4 secYour message: i think it is ok ?Claude 4.5 SonnetSearchAttachRetryAssistant Reply: Yes, looks good! The form is filled correctly. I can see there are collapsible sections for Options and Validation.👉 Click the "Validate ✓" button (blue button on the right)This will run tests and expand the Validation section to show you if everything passed.After you click it, the Validation section should expand and show:
Green checkmarks ✅ if all tests pass
Or red X marks ❌ if there are issues
Go ahead and click "Validate" - let me know what you see! 🔍RetryClaude 4.5 SonnetClaude 4.5 Sonnet31.84 tok/sec142 tokensTime-to-First: 4.3 secYour message: Claude 4.5 SonnetSearchAttachRetryAssistant Reply: Excellent! ✅✅✅ All validation tests passed!You can see:
✅ General - Pass
✅ File System - Pass
✅ PHP config - Pass
ℹ️ Database - Notice (just a version notice, not an error)
The message at the bottom says the site will be in maintenance mode during installation - that's normal.Next Step: Run InstallationScroll down - you should see:
A checkbox to accept terms
A "Next" or "Install" button
👉 What do you see below the validation section?Check the terms box and click the button to proceed with the installation! We're almost there! 🎯RetryClaude 4.5 SonnetClaude 4.5 Sonnet34.21 tok/sec188 tokensTime-to-First: 5.3 secYour message: Claude 4.5 SonnetSearchAttachRetryAssistant Reply: Perfect! You're on Step 3 of 4: Update DataThis is where Duplicator updates the database and replaces old URLs with new ones.What to do:You can see several tabs at the top:
Engine
Admin Account
Plugins
WP-Config
The settings shown are fine - these are advanced options for database search/replace.👉 Simply click the blue "Next ►" button at the bottom rightThis will:
Import the database
Replace all old URLs (wykonczymy.com.pl) with the new temporary URL (srv95341.seohost.com.pl)
Update all settings
About the Admin Account tab:
I see there are existing admin users (AdminZS, demoadmin, webwardenzs). You can keep your existing passwords - don't need to reset them unless you want to.Just click "Next ►" to proceed! 🚀RetryClaude 4.5 Sonnet

Perfect! Let's move to the new server. 🚀

Phase 3: SeoHost Setup

Step 1: Set PHP Version in DirectAdmin

- Log into SeoHost DirectAdmin

- Look for PHP Settings or PHP Version Selector

- Set it to PHP 8.4 (to match your old server)

Step 2: Create MySQL Database

- In DirectAdmin, find MySQL Management or Database Management

- Click Create New Database

- Fill in:

  - Database name: (e.g., wykonczymy_db)

  - Username: (e.g., wykonczymy_user)

  - Password: (create a strong one)

- Write these down:

  DB Name: ******\_\_\_******
  DB User: ******\_\_\_******
  DB Pass: ******\_\_\_******
  DB Host: localhost

Step 3: Find your temporary URL

Look in DirectAdmin for one of these:

- A temporary URL like http://server-ip/~username

- Or under domain settings, a preview/temporary domain

- Or we can create subdomain: test.wykonczymy.com.pl

---

👉 Can you:

1. Log into SeoHost DirectAdmin

2. Set PHP to 8.4

3. Create the database and share the credentials with me (DB name, user, pass)

4. Tell me if you see a temporary URL option, or should we use a subdomain?

Once you have those, we'll upload the Duplicator files! 📦

Next Steps: DNS Switchover & Go Live

Before we switch DNS, we need to prepare a few things:

---

Step 1: Update URLs in WordPress (Preparation)

Right now your site is set to srv95341.seohost.com.pl, but we need it to use your real domain.

We have two options:

Option A: Update URLs now, then switch DNS

- Log into WordPress admin at http://srv95341.seohost.com.pl/wp-admin

- Go to Settings → General

- Change both URLs to https://wykonczymy.com.pl

- Save (site will break temporarily on test URL, but that's okay)

- Then switch DNS immediately

🔍 2️⃣ Check Overall Email Health (Tools)
Mail‑Tester → <https://www.mail-tester.com>
