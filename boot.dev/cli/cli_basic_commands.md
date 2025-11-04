*.zshrc*

# ifconfig.me - public IP
- get ip address of local network

# ipconfig getiffaddr en0 - local IP
- address of the device (router) in your local network

# history
- print history of commands: `history`

# cat
- print file content: `cat fileName.fileExtension`

# man
- manual 
```zsh
    man man
    man ls
    man grep
```
*/* - search
*n* - next result
*N* go back
3

# nano
- command to edit files within the terminal
```zsh
    nano .zshrc
```

# chown
```zsh
    sudo chown newUserName fileName
    sudo chown -R root contacts 
    
```

# chmod
```zsh
   #recursively
   chmod -R u=rwx, g=0, o= DIRECTORY_NAME
   #add x to user
   chmod u+x <filename>
   # disable x for all
   chmod a-x <filename>
```

# grep
- *case-sensitive search* for text in files
```zsh
    grep "hello" fileName.fileExtension
    grep "CRITICAL" 2024-01-10.log
    # multiple files
    grep "CRITICAL" 2024-01-10.log 2024-01-11.log
    # Search in current directory and subdirectories:
    grep -r "hello" .
```

# find
- finding files and directories by name
- wildcard (*) matches everything
```zsh
    find . -name "hello.txt"
    
    # search for all the files with .txt
    find . -name "*.txt" 
    # find all the filenames that contain "bro"
   find . -name "*bro*"
```

# head + n
Prints  first n lines of a file, where n is a number you specify (default 10)
```zsh
    head -n 10 file.txt
    head -6  2023.csv
```

# tail + n
The tail command prints the last n lines of a file, where n is a number you specify.
```zsh
    tail -n 10 file1.txt
    tail -5 2023.csv 
```

# less / more
- lets you view the contents of a file one page at a time
```zsh
    less 2023.csv
    
    # with line numbers
   less -N 2023.csv    
```

- *hit q* to escape less programm
- *hit enter* if you want to *go one line down*,
- *hit space* if you want to go *one page down*
- *hit b* to go back up


# cd 
```shell
   cd /path/to/directory
   #next level
   cd ..
   #go back 
   cd -
   #home 
   cd ~
   #root 
   cd /
```

# ls
  - list directory content : `ls`
  - with hidden files : `ls -a`
  - list files from a nested directory: `ls directory_name`
    *We can see permission setting by listing with -l flag*
# ls -l
# -l long listing
# -d show the directory entry itself, not its contents
```zsh
    ls -l
    # -rw-r--r--@ 1 konradantonik  staff  1845 Sep 29 23:48 cli_basic_commands.md
```

# &&
  - combine commands:
    - `command1 && command2`
    - `cd .. && ls-` 

# lsd
- better ls
```zsh
    lsd --tree --classsic
```

# mv 
 - rename a file or directory
```shell
    mv old_name new_name
    mv some_file.txt ../some_file.txt
    # If you don't want to rename the file, and you're just moving it to a different directory, you can omit the filename:
   mv some_file.txt some_directory/
```

# mkdir
  - create a directory: 
    - `mkdir dir_name`
    - `mkdir newdir/subdir`

# touch
The touch command updates the access and modification timestamps of a file.
By default, *if the specified file does not exist*, touch will create an empty file with the given filename. You can 
create more than one file at the time.
```zsh
    touch some_file.txt some_other_file.txt
```

# echo 
  - Create a file and write some content: `echo "some text " > fileName.fileExtension`
  - Print text: `echo hello`
  - Print shell variable: `echo $SHELL` // /bin/zsh

# cp
- Copy from source to destination
```zsh
    cp source_file.txt destination/
    cp -R dir_with_subdirs new_dir
    cp -R 2020.csv backups/
```

# pwd 
  - print current dir

# rm
- remove file or EMPTY dir
- You can optionally add a -r flag to tell the rm command to delete a directory and all of its contents recursively. "Recursively" is just a fancy way of saying "do it again on all of the subdirectories and their contents".
```shell
    rm file_name
    rm -r some_directory
    rm -rf not_empty_dir` / `rm -r not_empty_dir
```

# sudo
- run a command like a superuser
```zsh
    sudo whoami
```

# whoami
  - print current user: `whoami`

# node --eval
Executing node code straight from cli
- `node --eval "code to be executed"`

Example of creating prettierignore file 
- `node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"`

# clear 
- clear terminal: `clear` / `cmnd + l` /-

# neovim
neovim is a new better version of vim witch is the newer version of vi witch is basically a command line text editor
NAVIGATION
*i* - insert mode
*esc* - back to normal mode
*:w* - save
*q* - quit
