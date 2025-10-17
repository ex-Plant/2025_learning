Python is interpreted.
Well known to be used in the fields covering:
Backend web servers
DevOps and cloud engineering
Machine learning
Scripting and automation
etc...

In pyton you can use numbers inside print function
```py
    print((250 + 241 + 244 + 255) / 4)
```

# Variables 
Variables are called "variables" because they can hold any value and that value can change (it varies).
```python
my_height = 100
my_name = "Lane"
print(my_height)
```

# Storing Results
```py
summation = a + b  # Addition
difference = a - b # Subtraction
product = a * b    # Multiplication
quotient = a / b   # Division
```

# Single LineComments
```python
# speed describes how fast the player
# moves in meters per second
speed = 2
```

# Multi-line comments
```python
"""
    the code found below
    will print 'Hello, World!' to the console
"""
print("Hello, World!")
```

# Variable names - snake_case ❗

# Variable types 

# Integer
x = 5 # positive integer
y = -5 # negative integer

# Float
z = 3.14 # positive float
w = -3.14 # negative float

# String
a = "Hello" # string
b = 'World' # string

# Boolean
c = True # boolean
d = False # boolean

# F-STRINGS
```python
name = "Yarl"
age = 37
race = "dwarf"

print(f"{name} is a {race} who is {age} years old.")

```

# None
my_mental_acuity = None

# Dynamic typing
Python is dynamically typed, which means a variable can store any type, and that type can change.


# Concatenation
```python
first_name = "Lane "
last_name = "Wagner"
full_name = first_name + last_name
print(full_name)
# prints "Lane Wagner"
```

# Multi-Variable Declaration
```python
sword_name, sword_damage, sword_length = "Excalibur", 10, 200
```






# LOOP STEP 
Complete the sum_of_odd_numbers function. It should calculate the sum of all the odd numbers starting at 1 up to (but not including) the given end number and return the result.

```py
    def sum_of_odd_numbers(end):
    total = 0
    for i in range(1, end, 2):
        total += i
    return total
```

```python
    def countdown_to_start():
    for i in range(10, 0, -1):
        if i == 1:
            print(f"{i}...Fight!")
        else:
            print(f"{i}...")
```
