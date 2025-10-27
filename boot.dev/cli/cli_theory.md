# CLI
What's a CLI?
You'll often hear the terms `terminal`, `shell`, `command line`, `CLI`, and `command prompt` used interchangeably 
(despite some technical differences) to refer to the same thing: `a program that allows you to interact with your 
computer in a text-based way.`

# TERMINAL
But to get pedantic, the "terminal" is just one specific part of that program. Historically, the word "terminal" meant a physical device that you could type commands into, essentially a keyboard and a screen.
These days, when we say "terminal", we really mean "terminal emulator". A terminal emulator is a program that emulates a physical terminal. It's a program that lets you type commands into a window on your computer.
*Your terminal emulator is just responsible for drawing text on the screen and processing your keystrokes.*

# SHELL
What Is a *Shell*? a programm that runs those commands from the terminal.
Shells do a lot of things, but their main job is to *interpret the commands you type and execute them.*

# REPL
Shells are often referred to as "REPL"s. REPL stands for:
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
    bankname=my_bank
    founded=1999
    echo Hello $name
    echo $bankname was founded in $founded by $ceo
```

# FILE SYSTEM
 - tree like structure that the files and directories are stored and organized on a computer
 - *directories* are just containers
 - *files* are just a dump of *raw binary data*: 1's and 0's. The bytes in the file can actually represent anything: 
   images, text, audio, video, etc. 
- file system tree starts at the *root directory* `/`

# FILE PATHS
The output of *pwd* is a filepath.

# FILES
Files in essence are simply BLOBS of data.

# 💥Task💥
Download an open 
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


🤔❗ In a Unix-like operating system, a user's home directory is the directory where their personal files are stored. 
It is also the directory that a user starts in when logging into the system.

❗❌❗ Your home directory is where you want to spend most of your time. Many of the other directories on your machine 
are critical to the operating system or other programs. Be careful when working in other directories like /bin, /etc, /var, etc.
You can mess up your system if you're not careful.


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

```shell
    # file where everything is allowed
    rwxrwxrwx 
    # dir where only the owner can read, write and execute
    drwexxxxxx
```


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
- files with .sh extensions are shell files - text files containing shell commands
- we can run them by typing the file name in the shell
```zsh
    directory/program.sh
```

 - if file is in the current directory we need to prefix it with ./
 - We need the prefix when running executables so that the shell knows we're trying to run a file from a file path, 
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
Will tell you where the sh (shell) program is installed.
```zsh
    which sh
```

# shebang 
For files that are compiled executables we can simply type the file name in the shell and it should start.
But some scripts need interpreter to run. We need to tell the computer what interpreter we want to use to try and 
start the program. 
*shebang* is a special line at the top of the script that tells your shell which program to use as the interpreter.
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


# 💥Task💥
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


# 💥Task💥
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

# FLAGS
Some commands accepts flags. For example:
# ls
*-l* long
*a* - hidden files
*-al* - combination of both

# Flags conventions
- single character flags are prefixed with a single dash *-a*
- multi character flags are prefixed with a double dash *--help*


# ARGUMENTS IN SHEL PROGRAMS
- some_addr is a function arg !
```zsh
    cd some_addr 
    mv file.txt dest/file.txt
    mv key.txt ../private/key.txt
```

# help
Usually less detailed than man output.
*--help*
*-h*
*help*

# curl
Programm that allows making network requests from the terminal

# EXIT CODES / status codes / return codes
- the way of communicating back by the programms
    *0 is the code for success. Any other code usually means an error.*
  9 times out of 10, if a non-zero exit code is returned (meaning an error) it will be 1, which is the "catch-all" error code.

To see exit code of last programm from the terminal we can use 
```zsh
  ls ~
  echo $?nano 
#0

ls /does/not/exist
echo $?
# non-zero (depends on your OS)
```

# unset
to unset variable 
```zsh
unset ENV_VAR_NAME
```

# stdout - STANDARD OUTPUT 
default place were programs print their output
echo / print / console.log

# stderr - STANDARD ERROR
same as standard output except it is for errors

# redirects of output
*>* - for stdout
*2>* for stderr

# Create new file
```zsh
    echo "Hello World" > hello.txt
    cat hello.txt
    # Hello World
```

# Redirect to a file
```zsh
    cat doesnotexist.txt 2> error.txt
    cat error.txt
    # cat: doesnotexist.txt: No such file of directory
```
In this example, cat is used to intentionally generate an error message (since the file doesn't exist), which is then redirected to error.txt.

# 💥Task💥
Run the script using the path to the 2020.csv file in the worldbanc/private/transactions directory as an argument. 
Be sure to redirect stderr to a temporary file called /tmp/worldbanc.log.

```ZSH
    /process_transactions.sh ../transactions/2020.csv 2>/tmp/worldbanc.
```
🤔❗ RUNNING A SCRIPT FROM CURR CAT ALWAYS WITH ./ `./script.sh`

# stdin - STANDARD INPUT
Standard in = default place where programms read their input. It's just a stream of data that they can read from for 
example in python it is called simply _input_
```python
    name = input("show me your name)
    print("Hello, ", name)
```

# read - stdin in the shell context
```zsh
    echo "Welcome to the worldbanc CLI tool!"

    echo "Please enter your name:"
    read NAME
    
    echo "Please enter your email:"
    read EMAIL
    
    echo "============================================"
    echo "Your name is $NAME and your email is $EMAIL"
    echo "Your response has not been recorded because this is just a local script."
    echo "Goodbye!"
```

# pipe
The *pipe operator `|`* 
The shell can *take an output of one program and use it as an input of another program*. This is possible thx to 
piping. This allows to do a lot of things, especially in terms of automation.

# wc -w
- word count
```zsh
    echo "Have you heard the tragedy of Darth Plagueis the Wise?" | wc -w
    # 10
```
This only works because the wc command, like most shell commands, can optionally read from stdin instead of a filepath.
find all occurrences of the word Bob inside transactions directory, excluding file backups and than count the lines 
of all these files

```sh
    grep -r  "Bob" . --exclude-dir="backups" |  wc -l 
```

# SIGINT
 - stop the program immediately
```zsh
    cntrl + c
```

# KILL
Sometimes a program in such a bad state that simple sigint is not enough. In such case the best option is to simply 
use new terminal session and kill the old one. 

```zsh
    kill <processId>
```

# ps - PROCESS STATUS
Every process running on the machine has a unique identifier we can get it by using a *ps aux*
- aux means show all processes
Since there is a lot of processes going on there usually we can use *grep* command to find the one we are looking for 
  with combination of *ps aux* thanks to *piping*

```zsh
    ps aux | grep "malicious".sh
    kill <resultId>
```

Unix Philosophy
The Unix Philosophy is a simple set of principles that have guided the development of Unix-like operating systems for decades. It can be summarized as:

Write programs that do one thing and do it well.
Write programs to work together.
Write programs to handle text streams, because that is a universal interface. // text stream is just a fancy way of 
saying text ;)
 
# top
- tool that lets you see which programs are using the most resources. It's like an activity monitor but for the cli
- cpu is the default
- type o mem <enter> to sort by memory

# package manager - a software tool that lets you install other software
- the most common one are *APT* or *Homebrew* on macOS

# webi
 - lets you install packages directly, avoiding brew you just go to webi website find the terminal command and 
   follow the instructions
