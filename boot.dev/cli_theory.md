
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
