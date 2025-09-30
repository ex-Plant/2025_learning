
# CLI
What's a CLI?
You'll often hear the terms `terminal`, `shell`, `command line`, `CLI`, and `command prompt` used interchangeably 
(despite some technical differences) to refer to the same thing: `a program that allows you to interact with your 
computer in a text-based way.`

# TERMINAL
But to get pedantic, the "terminal" is just one specific part of that program. Historically, the word "terminal" meant a physical device that you could type commands into, essentially a keyboard and a screen.
These days, when we say "terminal", we really mean "terminal emulator". A terminal emulator is a program that emulates a physical terminal. It's a program that lets you type commands into a window on your computer.

Which commands you're able to use isn't determined by the terminal emulator, but by the shell, which we'll talk about later.

*Your terminal emulator is just responsible for drawing text on the screen and processing your keystrokes.*

# SHELL
What Is a *Shell*?
So if your terminal is just a program that lets you issue text-based commands and renders the output of those commands...

...What is the program that runs those commands???

That's a shell.

*Shells do a lot of things, but their main job is to interpret the commands you type and execute them.*

# REPL
Shells are often referred to as "REPL"s. REPL stands for

*Read* - Read the commands you type
*Eval* - Evaluate those commands, usually by running other programs on your computer
*Print* - Print the output of those commands
*Loop* - Give you a new prompt to type another command and repeat


Both Bash and Zsh are shells, and they also happen to be powerful programming languages. They have variables, 
functions, loops, and more. That said, only crazy people write large programs in shell languages... `shells are 
optimized for running other programs and writing small scripts, not for writing large applications`.

ℹ️ Starting a line $ symbol is a convention to show it's a shell prompt, and it should not be typed. The actual command is echo $name.

# Assigning a variable
```zsh
  name=Lane
  echo Hello $name
```

```zsh
     % echo $bankname was founded in $founded by $ceo
```

# history
    - print history of commands
```zsh
    2930  history
    2931  department='engineering'
    2932  team='ops'
    2933  echo $department
    2934  echo $team
    2935  I work in $department on $team
    2936  echo I work in $department on $team
```


*ℹ️ Ghostty - modern terminal emulator to try*


# FILE SYSTEM
 - tree like structure that the files and directories are stored and organized on a computer
 - *directories* are just containers
 - *files* are just a dump of *raw binary data*: 1's and 0's. The bytes in the file can actually represent anything: 
   images, text, audio, video, etc. 
- The file system tree starts at the root directory `/`

# FILE PATHS
The output of *pwd* is a filepath.

# task
Download an open blablabla...
```zsh
     curl -L https://github.com/bootdotdev/worldbanc/archive/refs/heads/main.zip -o worldbanc.zip
      unzip worldbanc.zip
      rm worldbanc.zip
      mv worldbanc-main worldbanc
      sudo chown -R $(whoami) worldbanc
      sudo chmod -R 755 worldbanc
```

# Relative filepaths
Paths that take your current directory into account
Relative paths *do not start with* `/` or `~`


# Absolute Paths
Paths that start from the root directory - more explicit
*Starts with `/` or `~`*

# FILES
Files in essence are simply BLOBS of data.

# cat - read some file

# head + n
limit the number of lines
The head command prints the first n lines of a file, where n is a number you specify.
If you don't specify a number, it will default to 10.
```zsh
     head -n 10 file.txt
```

# tail + n
The tail command prints the last n lines of a file, where n is a number you specify.
```zsh
   tail -n 10 file1.txt
```

```zsh
    head -6  2023.csv
```

```zsh
tail -5 2023.csv 
```

# less / more
- lets you view the contents of a file one page at a time
```zsh
   less 2023.csv
```

- with line numbers
```zsh
   less -N 2023.csv
```

- *hit q* to escape less programm
- *hit enter* if you want to *go one line down*,
- *hit space* if you want to go *one page down*
- *hit b* to go back up
x
# touch
The touch command updates the access and modification timestamps of a file.
By default, *if the specified file does not exist*, touch will create an empty file with the given filename. Because 
of this 
side-effect, you’ll often see this command used to quickly create new empty files.

You can create multiple files at once
```zsh
   touch some_file.txt some_other_file.txt
```


# mkdir
- create a dir

# mv
 - *moves* a file from one dir to another, your working directory can't be the directory you are moving, also used for 
   *renaming*

move to the parent dir
```zsh
   mv some_file.txt ../some_file.txt
```
If you don't want to rename the file, and you're just moving it to a different directory, you can omit the filename:
```zsh
   mv some_file.txt some_directory/
```


# rm
 - remove file or EMPTY dir
- You can optionally add a -r flag to tell the rm command to delete a directory and all of its contents recursively. "Recursively" is just a fancy way of saying "do it again on all of the subdirectories and their contents".

```ZSH

   rm -r some_directory
```

# cp
- Copy from source to destination
```zsh
   cp source_file.txt destination/
```
- copy recursively with -r flag to include subdirectories
```zsh
  cp -R my_dir new_dir
```
copy to backups
```zsh
   cp -R 2020.csv backups/
```

🤔❗ In a Unix-like operating system, a user's home directory is the directory where their personal files are stored. 
It is also the directory that a user starts in when logging into the system.

❌ Your home directory is where you want to spend most of your time. Many of the other directories on your machine 
are critical to the operating system or other programs. Be careful when working in other directories like /bin, /etc, /var, etc.
You can mess up your system if you're not careful.

# GREP
 - searching for files using terminal can be much faster than using GUI
- *grep* command allows you to *search for text in files*.

Search for test in a file
```zsh
   grep "hello" fileName.fileExtension
```
This will print out every line in file that contains the word "hello". It's a *case-sensitive* search.

# Task
Use the grep command to find any lines with the text "CRITICAL" (all caps) in the worldbanc/private/logs/2024-01-10.log file.

```zsh
 grep "CRITICAL" 2024-01-10.log
```
# GREP MULTIPLE FILES
```zsh
 grep "CRITICAL" 2024-01-10.log 2024-01-11.log
```
```zsh
grep "hello" hello.txt hello2.txt
```

Search in current directory and subdirectories:
```zsh
grep -r "hello" .
```

# TASK
Use the grep command to find all the lines with the text "CRITICAL" (all caps) in the worldbanc/private/logs directory.
```zsh
   grep -r "CRITICAL" . 
```

# FIND
Powerful tool  for finding files and directories by name, not by their contents.

# FIND BY NAME
   ```zsh
   find . -name "hello.txt"
  ```
# PATTERN SEARCH
Find command lets you search for files that match a certain pattern.
For example if we want to search for all the files with .txt extension we can use the following command:
```zsh
   find . -name "*.txt"
```
* is a wildcard that matches everything

Find all the filenames that contain "bro"

```zsh
find . -name "*bro*"
```

# TASK
Use the find command to search the worldbanc/public/products directory for all files that contain the word "joint" in their name.
```zsh
   find . -name "*joint*"
```


# sudo - run a command like a superuser

```zsh
   sudo whoami
```


### PERMISSIONS 
In a unix-like operating system permissions control who can do what to which files and dirs. 
This is visually represented by a 10 char string;
`drwxrwxrwx`
* folder starts with a d
  `drwxrwxrwx`
* file starts with -
  `-rwxrwxrwx`

In general there are three groups of users
   - owner / user 
   - group 
   - others

Every char except the first one is telling us what kind of permission each group has on a give file or dir. 
- r - read
- w - write
- e - execute

For example:
-rwxrwxrwx - file where everything is allowed
drwx------: A directory where only the owner can read, write and execute

*We can see permission setting by listing with -l flag*
# ls -l
# -l long listing
# -d show the directory entry itself, not its contents
```zsh
 ls -l
```
// -rw-r--r--@ 1 konradantonik  staff  1845 Sep 29 23:48 cli_basic_commands.md

# CHANGING PERMISSIONS
*chmod*

```zsh
   chmod -R u=rwx, g=0, o= DIRECTORY_NAME
```
In the command above, u means "user" (aka "owner"), g means "group", and o means "others". The = means "set the permissions to the following", and the rwx means "read, write and execute". The g= and o= mean "set group and other permissions to nothing". The -R means "recursively", which means "do this to all of the contents of the directory as well".

# block executables
```zsh
-x genids.sh
```
konradantonik@MacBook-Pro bin % ./ genids.sh
zsh: permission denied: ./

# ADD x permission to the owner
```zsh
   chmod u+x <filename>
```
u = user (owner)
g = group
o = others
a = all (u+g+o)
So:

chmod o+x file adds execute for others.
chmod g+x file adds execute for the group.
chmod a+x file adds execute for everyone.
chmod g-r removes the read bit from the group on that file.

chmod -R g-w . (recursive remove group write)

# EXECUTABLES - running a programm from the shell
 -  files with .sh extensions are shell files - text files containing shell commands
 - we can run them by typing the file name in the shell
```zsh
   directory/program.sh
```
 - if file is in the current directory we need to prefix it with ./
 - We need the prefix when running executables so that the shell knows we're t  rying to run a file from a file path, 
   not an installed command like ls, mkdir, chmod, etc.
```zsh
./program.sh
```


# ROOT USER 
Root user is a superuser. It has access to everything and can do everything within the system.
Using sudo is like running a command as a root user.
*If you run a command with sudo that you don't understand, you could do serious damage to your system.*
`For example, rm with the r and f flags run on the root directory (/), will delete all the files on your system.` ❗❗❗
Don't do that. The r flag is for "recursive" (delete everything inside) and the f flag is for "force".



# CHOWN  change owner
- requires root privileges 
```zsh
    sudo chown newUserName fileName
```

change contacts directory owner to roots 
```zsh
     sudo chown -R root contacts 
```

sudo whoami - root
whoami - konradantonik


# Compiled vs Interpreted
A *program* is just a *set of instructions that a computer can execute*
An *Executable* is a *file that contains this program*. 
These terms are often used interchangably

There are two main types of programs: 
# Compiled
Programs that has been *converted from human-readable source code into binary machine code*.
*Machine code can be executed by the computer directly - each computer has a CPU that is designed for that.*
Programming languages like GO, Rust, C++ are compiled languages. 

# Interpreted
*Interpreted program is a program that needs another program to run - this program is usually called an interpreter.* 
The interpreter read source code from the interpreted program and executes it.
For example JS, Python, Ruby are interpreted languages usually executed as they run, which means the computer needs 
to have an installed interpreter to run them.

*Shell scripts with .sh are also interpreted by the shell program.*


# which
This commands prints the location of an installed command line program.
```zsh
    which sh
```
Will tell you where the sh (shell) program is installed.

# shebang 
For files that are compiled executables we can simply type the file name in the shell and it should start.
But some scripts need interpreter to run. We need to tell the computer what interpreter we want to use to try and 
start the program. 
*shebang* is a special line at the top of the script that tells your shell which program to use
The format for a shebang is the following:

```shell
    #! interpreter [optional-arg]
```
For example, lets say we have a python script and we want to use Python3 to run it
```shell
    #!/user/bin/python3
```
This tells the system to use the Python 3 interpreter located at /usr/bin/python3 to run the script.

Another example 
```shell
    #!/usr/bin/env bash
```

3 MOST COMMON TYPES OF SHELLS
- sh - the Bourne Shell. Original Unix shell - very basic
- bash - the Bourne Again Shell. Most popular shell on Linux. It is like sh with many extra features
- zsh - the Z Shell. Default for Mac. Similar to bash.

Bash and Zsh both have configuration files that run every time we start a shell session. 
They can be used to set up aliases, functions, environments etc.
These config files are located in the ~ directory and are hidden by default, so we can use -a flag to see them.
*.zshrc*


# NANO
- command to edit files within the terminal
```zsh
nano .zshrc
```


# ENVS
- creating local variables
```zsh
    name=Konrad
    echo $name
```

# ENVIRONMENTAL VARIABLES
 - global
 - accessible to all programs that run in the shell

To see the full list simply use env
```zsh
    env
```

To create an environmental variable use export key word
```zsh
    export NAME=Konrad
    echo $NAME
```
Now it will be available globally

# Creating a super simple script printing #NAME
```zsh
 #! /bin/sh 
 echo "Hi I AM $NAME"
```
Such global variables will last until shell session is running.

konradantonik@MacBook-Pro worldbank % cat introduce.sh
#!/bin/sh
echo "Hello world from $NAME"
konradantonik@MacBook-Pro worldbank % ./introduce.sh
Hello world from KONRAD


# task
export the required environment variables:

WARN_MESSAGE: "The auditor is here"
WARN_FROM_NAME: "Your worst nightmare"
Run the script and paste its full output into the input field and submit your answer.

Tip
You can also temporarily set a variable for a single command, instead of exporting it (*exporting means the variable 
will persist until you close the shell*).


# PATH
There are environment variables that are sort of "built-in" to your shell. By "built-in" I just mean that different programs and parts of your system know about them and use them. The PATH variable is one of those.

*The PATH variable is a list of directories that your shell will look into when you try to run a command.* If you 
type ls, your shell will look in each directory listed in your PATH variable for an executable called ls. If it finds one, it will just run it. If it doesn't, it will give you an error like: "command not found".

```zsh
 echo $PATH
```
You should see a giant list of directories separated by colons (:). Each of those directories is a place where your shell will look for executables. For example, with a PATH like this:
`/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`

Your shell will look for executables in the following directories:
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/sbin


# TASK
As something of a security engineer yourself, you want to temporarily disable the PATH variable so that you can only run executables by using their full path. You know, just so you don't accidentally run something you don't mean to.

Reset your PATH variable to an empty string:
This will only affect your current shell session. If you open a new shell, it will have the default PATH variable again.
```ZSH
    export PATH=""
```

`konradantonik@MacBook-Pro bin % export PATH=""
konradantonik@MacBook-Pro bin % ls
zsh: command not found: ls
konradantonik@MacBook-Pro bin %`

The commands are not working now. Fortunately after resetting the shell session it will work again.

# CHANGE YOUR PATH
A pretty common problem is that after installing a program on the machine it is not found when you try to open it 
using terminal.
`$ my-new-program
-bash: my-new-program: command not found`
Nine times out of ten, it's because the program is installed in a directory that's not in your PATH variable.
Oftentimes when you install a program using the CLI, it will print a message during the installation process that 
tells you where the command was installed.
You need to add absolute path.
You can use pwd command to get absolute path.
To add a directory to your PATH *without overwriting* all, of the existing directories, use the export command and 
reference the existing PATH variable:
`export PATH="$PATH:/path/to/new"`

After adding it we can now execute shell scripts from any directory.

To make it last between the sessions this is however not enough
We need to add it permanently no .zshrc
In order to do that just add it at the end of the file as a variable

```zsh
export PATH="/Users/konradantonik/.nvm/versions/node/v23.6.0/bin:$PATH"

export PATH="$PATH:/Users/konradantonik/WebstormProjects/2025/2025_learning/boot.dev/cli/worldbank/private/bin"
```
