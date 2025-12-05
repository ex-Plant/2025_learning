### IMPORTING EXPORTING DB in

I didn't find a simpler way to do that in neon but it can be done via terminal if we have postgres and pb_dump installed

```zsh
    postgres --version
    pg_dump --version

```

# Export

### Raw dump — ideal for quick local backups or snapshots.

```zsh
    pg_dump <imported_db_connedtion_string> > <name_of_imported_db>

    pg_dump 'postgresql://neondb_owner:SIALALALALALALA@ep-morning-pine-agqbgsck-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require' > database_backup.sql
```

- Dumps the entire database schema and data.
- Includes ownership and privilege info (default behavior).
- Does not add DROP statements, so if you restore into an existing database, you may get “relation already exists” errors.
- It’s a clean, literal snapshot, directly restorable on the same or similar Postgres environment.

✅ Quick, simple backup
❌ Not ideal for restoring elsewhere or incremental backups
❌ Might conflict with existing objects when restoring

### Clean portable backup

Ideal for migrations, automations CI/CD pipelines.

```zsh
pg_dump "$POSTGRES_URL" --no-owner --no-privileges --clean --if-exists -f backup-$(date +%Y%m%d-%H%M%S).sql

```

--no-owner - Excludes ownership information from the dump. - This ensures that when you restore the dump into another database, it won't try to recreate the same owners/users.
--no-privileges - Skips privilege (GRANT/REVOKE) statements. - Useful when restoring into a database with a different user structure or permissions model.  
--clean - Adds DROP statements before each object (tables, views, etc.). - So if you restore into an existing database, it will delete those objects first.  
--if-exists - Works with --clean; prevents errors if an object doesn’t exist. - The drop commands become conditional (e.g., DROP TABLE IF EXISTS ...).  
-f moodbox-backup-$(date +%Y%m%d-%H%M%S).sql - Specifies the output file name.

✅ Clean, idempotent script — can restore safely to any database  
✅ Portable between environments (local, staging, prod, etc.)  
✅ Safe to automate via cron or CI

# Import

❗Note: Make sure the new database is empty or be prepared for potential conflicts if tables already exist.

```zsh
    psql  <connection_string> < <db_file_name>
    psql 'postgresql://neondb_owner:SIALALALALALALA@ep-morning-pine-agqbgsck-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require' < database_backup.sql

```

### GitHib Actions

GitHub Action is an automated workflow within GitHub's cloud that runs whenever a specific event happen in repo.
Part of CI/CD.

It is basially a YAML config file that defines:

1. When should something happen
2. What env it should run in (Ubuntu, Windows, Mac)
3. Which steps to execute

Each workflow runs in VM (Virtual Machine) or a container.
Steps can:

- run shell commands
- execute small scripts
- use community made actions

Each workflow can include multiple jobs, and each job can include multiple steps.

Example flow:

1. Trigger (manual, schedule, or after push).

2. Spin up workflow runner (e.g., ubuntu-latest (good choice for most cases) vs mac or windows ).

3. Fetch your repo (optional if you need scripts stored there).

4. Run backup command(s).

5. Transfer backup somewhere safe (like your remote server, AWS S3, etc).

Why it matters

- Automation — repeatable, reliable tasks (like backups, deployment, CI tests).

- Visibility — each run’s logs stay visible under “Actions” in GitHub.

- Security — secrets are stored encrypted (Settings → Secrets and variables), and each run has restricted permissions.

- Scalability — easy to extend or combine with other workflows.

YAML stands for YAML Ain’t Markup Language (yeah, recursive acronym — dev humor).

It’s a data serialization language — a human-readable way to express structured data (similar to JSON, but cleaner for configs).

GitHub Actions uses it because it’s:

- lightweight

- declarative (you describe what happens, not how)

- easy to read/write

- supported by many CI/CD tools

CRON JOB - a scheduled task on a Unix/Linux server.

```text
0 1 * * * /usr/local/bin/backup_neon.sh
```

It means:

- Minute 0

- Hour 1

- Every day of month

- Every month

- Every day of week

→ So this runs your backup_neon.sh every night at 01:00.

How to allow github action to connect to a server"
Get SSH (Secure Shell Script )

```zsh
mkdir -p ~/.ssh
cd ~/.ssh
ssh-keygen -t ed25519 -C "github-backup-bot"

```

Just press enter for defaults. It will create two files:

```text
text
id_ed25519        ← private key (DO NOT share)
id_ed25519.pub    ← public key
```

Add the public key to authorized keys:

```sh
cat id_ed25519.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

You can later add a cleanup cron on your server to delete backups older than 30 days:

```zsh
0 3 * * * find /var/backups/moodbox -type f -mtime +30 -delete
```

How to connect to a remote server

```zsh
ssh username@your-server-ip
```

switch to SSH keys (optional but highly recommended)

You can generate a secure keypair on your local machine once:

```zsh
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Just hit enter at all prompts.

This creates:
~/.ssh/id_ed25519 ← private key (keep secret)
~/.ssh/id_ed25519.pub ← public key (safe to share)

Copy the public key to your server:
ssh-copy-id username@your-server-ip

Now when you connect again, SSH will use your private key automatically — no password needed.
apt = package manager

```zsh
sudo apt-get update
sudo apt-get install -y postgresql-client
```

HOW TO ESTABLISH SSH CONNECTION WITH SEOHOST SERVER

If i understand right, I need it to allow secure connection to sftp (via github acitons) but I was not able to conenct using ssh from terminal

W ustawieniach panelu (NIE DIRECT ADMIN SERWERA) - serwery - uzytkownik (to nasz serwer) - włącz SSH.

Po otrzymaniu maila z seohost
Direct admin -> funkcje zaawansowane -> klucze ssh
Tworzymy nowy klucz
Klikamy autoryzuj
Przechodzimy do menagera plikow
Pobieramy klucz
Wrzucamy klucz do ~/.ssh

```sh
chmod 600 ~/.ssh/seohost_seohost
```

600 means
Owner: read + write
Group: none
Others: none

Próbujemy się połaczyć (nie działa 🙃)

```zsh
ssh -p <port_number> <user>@<server>
```

### Postgres connetion string structure

```text
postgres://<user>:<password>@<host>:<port>/<database_name>
```

Host: ep-morning-pine-agqbgsck-pooler.c-2.eu-central-1.aws.neon.tech
Port: Not specified → defaults to 5432 (PostgreSQL's standard port)

Template: postgres://<user>:<password>@<host>:<port>/<database_name>
Your URL: postgresql://user:pass@host/database?sslmode=require

Explicit:

Host: ep-morning-pine-agqbgsck-pooler.c-2.eu-central-1.aws.neon.tech
Port: Not specified → defaults to 5432 (PostgreSQL's standard port)
