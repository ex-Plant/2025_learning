
# cd 
  - change directory: ` cd /path/to/directory`
  -  next level: `cd ..`
  - go back ` cd -`
  -  to HOME `cd ~`
  - ROOT `cd /`

# Relative vs. Absolute Paths
# Absolute Path:
- Specifies the full path from the root of the file system.
- cd /Users/username/projects

# Relative Path:
- Relative Path: Specifies the path relative to the current working directory
- cd projects/new_project

# ls
  - list directory content : `ls`
  - with hidden files : `ls -a`
  - list files from a nested directory: `ls directory_name`
# &&
  - combine commands:
    - `command1 && command2`
    - `cd .. && ls-` 

# mv 
 - rename a file or directory: `mv old_name new_name`

# mkdir
  - create a directory: 
    - `mkdir dir_name`
    - `mkdir newdir/subdir`

# touch 
  - create an empty file: 
    - `touch file_name.fileExtension`
    - `touch newdir/file_name.fileExtension`

# echo 
  - Create a file and write some content: `echo "some text " > fileName.fileExtension`
  - Print text: `echo hello`
  - Print shell variable: `echo $SHELL` // /bin/zsh

# cp
- Copy from source to destination: ` cp .env.example .env`

# pwd 
  - print current dir

# rm 
  - remove a file: `rm file_name`
  - remove a directory: `rm dir_name`
  - remove not empty directory: `rm -rf dir_name` / `rm -r dir_name`

*recurse* or *recursive* means that the operation should be applied to all files and subdirectories within a directory

# whoami
  - print current user: `whoami`

# node --eval
Executing node code straight from cli
- `node --eval "code to be executed"`

Example of creating prettierignore file 
- `node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"`

# clear 
- clear terminal: `clear` / `cmnd + l` /-

# history 
- print history of commands: `history`


# cat 
- print file content: `cat fileName.fileExtension`
