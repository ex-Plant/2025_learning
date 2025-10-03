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
my_height = 100
my_name = "Lane"
print(my_height)

*Indentation matters!!*
    player_health = 1000 ❌
player_health = 1000 // ✅

# Assigning new value to a var
player_health = 1000
player_health = 900

# arithmetic operators
summation = a + b  # Addition
difference = a - b # Subtraction
product = a * b    # Multiplication
quotient = a / b   # Division


```py
    player_health = 1000
    armor_multiplier = 2
    armored_health = player_health * armor_multiplier
```

# comments 
```py
# speed describes how fast the player
# moves in meters per second
speed = 2
```
# Multi line comments
- use tripple quotes
  """
  the code found below
  will print 'Hello, World!' to the console
  """
  print("Hello, World!")

# snake_case
# camel_case
# Pascal_case
*in python use snake_case*

# VARIABLE TYPES
- string - *double quotes are preferred*
- integer
- float
- boolean - capital letters *T*

# type of
```
player_health = "100"
player_has_magic = True
print("player_health is a/an ", type(player_health).__name__) // str
print("player_has_magic is a/an ", type(player_has_magic).__name__) // bool
```


# f-strings - formatted string literals
Add an f to the start of quotes to create an f-string: f"this is easy!"
Use curly brackets {} around a variable to interpolate (put) its value into the string.
Remember, it's just a string! Don't overthink it!
```python
bananas = f"You have {num_bananas} bananas"
print(bananas)
# You have 10 bananas
```

```
name = "Yarl"
age = 37
race = "dwarf"

print(f"{name} is a {race} who is {age} years old.")
```

# NoneType 
- null
```
my_mental_acuity = None
```

# Dynamic typing
Python is dynamically typed - types can change
```
speed = 5
speed = "five"
```

# Concatenation
joining two strings 

first_name = "Lane "
last_name = "Wagner"
full_name = first_name + last_name
print(full_name)
# prints "Lane Wagner"

# Multi-variable Declaration
```
sword_name, sword_damage, sword_length = "Excalibur", 10, 200
```
