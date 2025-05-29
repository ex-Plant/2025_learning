1. HOW TO CHANGE LAST COMMIT MESSAGE
- git commit --amend -m "new message"

2. HOW TO STOP TRACKING FILES

**REMOVED CACHED FILES FROM GIT**
- add file to git ignore
- git rm --cached 'filename'

Method 1: Starting in Terminal

Create project directory

mkdir my-new-project
cd my-new-project

Initialize Git

git init

Create initial files

echo "# My Project" > README.md

Stage and commit

git add .
git commit -m "Initial commit"

Create GitHub repository

GitHub → + → New repository


Name project
Choose public/private
Optionally add README, .gitignore, license

Clone to local machine

git clone 'url'

Current  branch
- git branch

All branches git branch -a

Add new branch 
- git branch 'branchName' 


If you can't see a remote branch
- git fetch origin 

Delete a branch
- git branch --delete 'branchName'


*PUSHING LOCAL BRANCH TO REMOTE*
git push -u origin <branch name>

*RESET COMMIT*
Reset is a way to remove commit without leaving the trace of that operation within commit history 

- git reset --hard HEAD~1
  Revert commit and remove all the changes from it - it will simply revert the repo and local files to specified commit
- git reset --soft HEAD~1
  Removes the commit from commit list but keep changes from the commit in the staging area meaning that i can commit 
  them if i want - changes are not lost 

*REVERT COMMIT*
Same as reset but keeping the commit history
Revert to last commit
- git revert HEAD 
- git revert HEAD~1
- git revert HEAD<commit hash>

git revert HEAD --no-edit — this uses the default message.
git revert HEAD --no-commit — this stages the changes, and then you run git commit -m "your message".

*GIG LOG*
- git log
- git log --oneline
