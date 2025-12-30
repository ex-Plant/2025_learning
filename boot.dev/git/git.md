# Manual

```shell
  man git
```

# Check remote repo

```shell
    git ls-remote
```

# Change last commit message

_commit --amend_

```shell
    git commit --amend -m "new message"
```

# Stop tracking files

_rm --cached_

```shell
    git rm --cached <filename>
```

# Add new branch

```shell
    git branch <branchname>
```

# Push new branch to remote repo

```shell
    git push -u origin <branchname>
```

# Switch branches

```shell
  git switch <branch_name>

  # switch and create if non existent
  git switch -c <branch_name>

  # or, the old way:
  git checkout <branch_name>
```

# Current branch

```shell
    # local
    git branch
    # remote
    git branch -r
    #all
    git branch -a
```

# Fetch branch from origin

```shell
    git fetch origin
```

# Delete a local branch

```shell
    git branch -d <branch_name>
```

# Delete a remote branch

```shell
    git push origin --delete <branch_name>
    # or
   git push origin :branch_name
```

# Rename branch

```shell
    git branch -m oldname newname
```

# Fetch

- fetches new data from remote but does not merge - useful for checking data before merging

# Pull --no-rebase

Fetches changes from remote
Creates a merge commit that combines the remote changes with your local changes

```shell
  # creates a merge commit
  git pull [<remote>/<branch>] --no-rebase (default)
```

# Pull --rebase

Fetches changes from remote
Temporarily sets aside your local commits
Applies the remote changes
Replays your local commits on top of the updated branch

```shell
      git pull --rebase
```

# Rebase config

```shell
  git config --global pull.rebase true
```

# Reset commit

Reset is a way to _remove commit without leaving the trace of that operation within commit history._

# Reset commit --hard

Changes are reset to a specified commit and everything in between commits is lost.

```shell
    # last commit - keeps all commits and only affects uncommitted changes
    git reset --hard HEAD
    # actually removes the most recent commit from history
    git reset --hard HEAD~1
    # removes changes up until the commit
    git reset --hard <hash>
```

# Reset commit --soft

The --soft option is useful if you just want to go back to a previous commit, but keep all of your changes. Committed changes will be uncommitted and staged, while uncommitted changes will remain staged or unstaged as before.

```shell
    git reset --soft HEAD~1
```

❌ Danger ❌
_I want to stress how dangerous this command can be. If you were to simply delete a committed file, it would be
trivially easy to recover because it is tracked in Git. However, if you used git reset --hard to undo committing
that file, it would be deleted for good._

Always be careful when using git reset --hard. It's a powerful tool, but it's also a dangerous one.

# revert commit

Same as reset but _keeping the commit history_, it will create a revert commit if there are any changes

```shell
   git revert HEAD~1

   # use default message
   git revert HEAD~1 --no-edit

   # do not create commit only stage changes
   git revert HEAD --no-commit
```

# Logging --oneline

```shell
    git log --oneline

    # no interactive pager limit 10
    git --no-pager log -n 10§
```

# Logging --decorate

- short (default)
- full
- no

# Logging --graph

- to see a visual aid

```shell
    git log --oneline --graph
```

# Branch

It's just a named pointer to a specific commit. The commit that branch points to is called the _tip or head of the
branch_.
Because a branch is just a pointer to a commit, they're lightweight and "cheap" resource-wise to create. When you create 10 branches, you're not creating 10 copies of your project on your hard drive.

# Merge

If you merge other_branch into main, Git combines both branches by creating a new commit that has both histories as parents.

_fast-forward merge_

- no merge commit - <feature_branch> has all the commits from the <main_branch> we are merging to
- moves the pointer of the <main_branch> to the tip of the <feature_branch>

# Rebase

Allows to connect two branches into one without creating merge commit.
Usual scenario is the following. We are working on a feature on a separate branch but sb added changes to the main
branch and we want these changes. We could merge <feature_branch> to <main_branch> but this would create an
additional merge commit. We can use rebase to avoid that.

# When to Rebase

git rebase and git merge are different tools.

An advantage of merge is that it preserves the true history of the project. It shows when branches were merged and where. One disadvantage is that it can create a lot of merge commits, which can make the history harder to read and understand.

❌ Warning
_You should never rebase a public branch (like main) onto anything else_. Other developers have it checked out, and
if you change its history, you'll cause a lot of problems for them.

# OK ✅

```shell
    git switch <feature_branch>
    git rebase main
```

# NOT OK ❌

```shell
    git switch main
    git rebase <feature_branch>
```

# config --list

```shell
    cat ~/.gitconfig
    # this will also give us global config
    git config --list

    # for local config
    git config list --local
```

```shell
    git config --list --local
```

# config --get

- single value

```shell
    git config --get user.name
    git config --get user.email
```

# config --add

```shell
    git config --add user.name "new name"
    git config --add user.email "new email"
```

# config --unset

- remove single key

```shell
    git config --unset <key>
```

# config --unset-all

- remove all duplicates with a given key

```shell
    git config --unset-all <key>
```

# config set default branch\*

```shell
    git config --global init.defaultBranch master
```

# config get default branch\*

```shell
    git config --global --get init.defaultBranch master
```

# LOCATIONS

There are several locations where Git can be configured. From more general to more specific, they are:

system: /etc/gitconfig, a file that configures Git for all users on the system
global: ~/.gitconfig, a file that configures Git for all projects of a user
local: .git/config, a file that configures Git for a specific project
worktree: .git/config.worktree, a file that configures Git for part of a project
_If you set a configuration in a more specific location, it will override the same configuration in a more general location._

# Commit hash includes:

- commit creator
- timestamp
- changes

Git under the hood are just files.
_Tree_ - this is how git is storing catalogues
_Blob_ - a way of storing files

# Storing data

Git stores an entire snapshot of files on a per-commit level. This was a surprise to me! I always assumed each commit only stored the changes made in that commit.

Optimization
While it's true that Git stores entire snapshots, it does have some performance optimizations so that your .git directory doesn't get too unbearably large.

Git compresses and packs files to store them more efficiently.
Git deduplicates files that are the same across different commits. If a file doesn't change between commits, Git will only store it once.

# GITHUB

Connect new repo

1. Create local repo
2. git init
3. git commit -m "init commit"
4. github create empty repo
5. copy remote repo link
6. in local repo:

```shell
      git remote add origin <remote_url>
      git push -u origin <branch_name>
```

# Typical team flow

Update my local main branch with git pull origin main
Checkout a new branch for the changes I want to make with git switch -c <branchname>
Make changes to files
git add .
git commit -m "a message describing the changes"
git push origin <branchname> (I push to the new branch name, not main)
Open a pull request on GitHub to merge my changes into main
Ask a team member to review my pull request
Once approved, click the "Merge" button on GitHub to merge my changes into main
Delete my feature branch, and repeat with a new branch for the next set of changes

# .gitignore

Your .gitignore file does not necessarily need to be at the root of your project.

It's fairly common to have multiple .gitignore files in different directories throughout a project. A nested .gitignore file only applies to the directory it's in and its subdirectories.

# .gitignore patterns

- order matters - patterns can override each other

```shell
# ignore all txt files
*.txt

# ignore all txt files except important.txt
*.txt
!important.txt

# rooted patterns - ignore only main.py from the root dir (root being where .gitignore is)
/main.py
```

# What to ignore

Ignore things that can be generated (e.g. compiled code, minified files, etc.)
Ignore dependencies (e.g. node_modules, venv, packages, etc.)
Ignore things that are personal or specific to how you like to work (e.g. editor settings)
Ignore things that are sensitive or dangerous (e.g. .env files, passwords, API keys, etc.)
