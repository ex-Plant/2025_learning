
#   Change last commit message
*commit --amend*
```shell
    git commit --amend -m "new message"
```

# Stop tracking files
*rm --cached*
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

# Reset commit
Reset is a way to *remove commit without leaving the trace of that operation within commit history.*

*--hard*
Changes are reset to a specified commit and everything in between commits is lost.
```shell
    # last commit - keeps all commits and only affects uncommitted changes
    git reset --hard HEAD
    # actually removes the most recent commit from history
    git reset --hard HEAD~1
```

Changes are reset to a specified commit but are not lost - you can still stage and commit them. 
*--soft*
```shell
    git reset --soft HEAD~1
```

# Revert commit
Same as reset but *keeping the commit history*, it will create a revert commit if there are any changes
```shell
   git revert HEAD~1    
   
   # use default message
   git revert HEAD~1 --no-edit
   
   # do not create commit only stage changes
   git revert HEAD --no-commit 
```

# Logging
```shell
    git log --oneline

```




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
  ````
