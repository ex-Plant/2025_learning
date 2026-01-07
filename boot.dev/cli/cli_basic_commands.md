# Mise

Mise is tool version manager.  
Something to replace nvm etc.  
It can be used to run tools, execute tasks, manage env variables.

# mise exec <command>

This is a "one-off" command. It tells Mise: "Temporarily download/load Node 24 just for this one command, then go back to whatever I was doing.

```shell
mise exec node@24 -- node -v
```

# mise use + automatic node versioning

# which

Will tell you where the program is installed. For example the following command will tell us where shell program is installed.

```zsh
    which sh
```

mise exec is for scripts or CI/CD pipelines. For daily development work, you use mise activate + mise use.

```sh
mise use --global node@24 # install node 24 and set it as the global default
```

Something to use instead of nvm use every time when starting a project

1. Add this to the bottom of .zshrc

```sh
eval "$(mise activate zsh)"
```

2. Set global defaul

```sh
mise use --global node@24
```

3. Pin project version
   Inside project directory execute and voila!

```sh
mise use node@24.11.1
```

The "Magic": Mise creates a .mise.toml file in that folder. Now, the moment you cd into that folder, your node version switches to 24.11.1. When you cd .. out, it switches back to your global default.

# du

`directory usage`

-s (summarize): Shows only the total size for the specified directory, not individual subdirectories
-h (human-readable): Displays sizes in easily readable units (K, M, G instead of bytes)
-m (megabytes): Forces output in megabytes specifically

- (wildcard): Applies the command to all files and directories in the current location

```zsh
du -shm *

```

# ifconfig.me

```shell
curl ifconfig.me

# ipv4
curl -4 ifconfig.me

# ipv6
curl -6 ifconfig.me
```

# ipconfig getiffaddr en0

`local ip addr`

- address of the device (router) in your local network

# history

- print history of commands: `history`

# cat <filename>

- print file content: `cat fileName.fileExtension`

# man

`manual`

```zsh
man man
man ls
man grep
```

/ - search  
n - next result

# help

Usually less detailed than man output.

```zsh
--help
-h
help
```

# curl

Programm that allows making network requests from the terminal

# nano

- command to edit files within the terminal

```zsh
    nano .zshrc
```

# chown

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

`case-sensitive search_ for text in files`

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
- wildcard (\*) matches everything

```zsh
find . -name "hello.txt"
# search for all the files with .txt
find . -name "*.txt"
# find all the filenames that contain "bro"
find . -name "*bro*"
# find only directories
find . -type d
# Redirect stderr to /dev/null to hide permission error
find . -type d -name "node_modules" 2>/dev/null
# Or use -perm to exclude directories you can't access
find . -type d -name "node_modules" -perm -g+r

```

# head + n

Prints first n lines of a file, where n is a number you specify (default 10)

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

view the contents of a file one page at a time

```zsh
less 2023.csv
# with line numbers
less -N 2023.csv
```

- _q_ - escape programme
- _enter_ - one line down,
- _space_ - one page down
- _b_ - go back up

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

list directory content

```zsh

# with hidden files
ls -a
# from a nested dir
ls <dir name>
# with permissions
ls -l
# show dir no it's content
ls -d
```

# lsd

`Enhanced ls`

```zsh
lsd --tree --classsic
```

# &&

`combine commands`

```zsh
cd && ls
```

# mv

`rename a file or directory`

```zsh
mv old_name new_name
mv some_file.txt ../some_file.txt

# If you don't want to rename the file, and you're just moving it to a different directory, you can omit the filename:
mv some_file.txt some_directory/
```

# mkdir

`create a directory`

```zsh
mkdir <dir_name/subdir>
```

# touch

`The touch command updates the access and modification timestamps of a file.` If the specified file does not exist, `touch will create an empty file with the given filename`. You can create more than one file at the time.

```zsh
    touch some_file.txt some_other_file.txt
```

# echo

`Create a file and write some content`:

```zsh
 echo "some text " > fileName.fileExtension

# print hello
echo hello

# print variable
echo $SHELL

```

# cp

`Copy from source to destination`

```zsh
    cp source_file.txt destination/
    cp -R dir_with_subdirs new_dir
    cp -R 2020.csv backups/
```

# pwd

`print current dir`

# rm

`remove file or EMPTY dir`

- You can optionally add a -r flag to tell the rm command to delete a directory and all of its contents recursively. "Recursively" is just a fancy way of saying "do it again on all of the subdirectories and their contents".

```shell
rm file_name
rm -r some_directory
rm -rf not_empty_dir` / `rm -r not_empty_dir
```

# sudo + whoami

- run a command like a superuser

```zsh
# print current user
sudo whoami
```

# node --eval

Executing node code straight from cli

```zsh
node --eval <code to be executed>

# creating prettierignore file
- `node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"`
```

# clear

clear terminal

# neovim

neovim is a new better version of vim witch is the newer version of vi witch is basically a command line text editor
NAVIGATION
_i_ - insert mode
_esc_ - back to normal mode
_:w_ - save
_q_ - quit

# env

See all global variables
