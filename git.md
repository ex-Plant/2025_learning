1. HOW TO CHANGE LAST COMMIT MESSAGE
- git commit --amend -m "new message"

test

2. HOW TO STOP TRACKING FILES

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
