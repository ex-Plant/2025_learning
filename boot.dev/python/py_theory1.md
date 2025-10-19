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

# Functions
```python
def area_of_circle(r):
    pi = 3.14
    result = pi * r * r
    return result
```
# No hoisting
if you define a function, you can't call that function until after it has been defined.
Most Python developers solve this problem by defining all the functions in their program first, then they call an "entry point" function last. That way all of the functions have been read by the Python interpreter before the first one is called.
Conventionally this "entry point" function is usually called main to keep things simple and consistent.

```python
def main():
    health = 10
    armor = 5
    add_armor(health, armor)

def add_armor(h, a):
    new_health = h + a
    print_health(new_health)

def print_health(new_health):
    print(f"The player now has {new_health} health")

# call entrypoint last
main()
```

# None Return
When no return value is specified in a function, it will automatically return None.

# Multiple return values
```python
def cast_iceblast(wizard_level, start_mana):
    damage = wizard_level * 2
    new_mana = start_mana - 10
    return damage, new_mana # return two values
```

# Parameter vs Argument
Parameters are the names used for inputs when defining a function. Arguments are the values of the inputs supplied when a function is called.
```python
# a and b are parameters
def add(a, b):
    return a + b

# 5 and 6 are arguments
sum = add(5, 6)
```

# Default Values
A default value is created by using the assignment (=) operator in the function signature.
```python
def get_greeting(email, name="there"):
    print("Hello", name, "welcome! You've registered your email:", email) 
```

# Scope
Scope refers to where a variable or function name is available to be used.
```PYTHON
def subtract(x, y):
    return x - y
result = subtract(5, 3)
print(x)
# ERROR! "name 'x' is not defined"
```

# Global scope
a variable or a function, that name is accessible in every other place in our program, even within other functions.

# Unit Test 
An automated program that tests the small "unit" of code


### COMPUTING

# Floor Division
Floor division is a division operation that rounds down to the nearest whole number.
```python
7 // 3
# 2 (an integer, rounded down from 2.333)
-7 // 3
# -3 (an integer, rounded down from -2.333)
```

# Exponents
```python
# reads as "three squared" or
# "three raised to the second power"
3 ** 2
# 9
```

# ❗
Sometimes exponents are also shown in text using the caret symbol (^):
5^3 = 125

# Changing in Place
+=
-=
*=
/=

# SCIENTIFIC NOTATION
Way of expressing numbers that are too large or too small to conveniently write normally.
In a nutshell, the number following the e specifies how many places to move the decimal to the right for a positive number, or to the left for a negative number.
1,024,000,000,000,000,000 (1.024e18)

```PY
print(16e3)
# Prints 16000.0
print(7.1e-2)
# Prints 0.071
```



# Underscores for readability
```
num = 16_000
print(num)
# Prints 16000

num = 16_000_000
print(num)
# Prints 16000000
```



```python
def update_player_score(current_score, increment):
    current_score += increment
    return current_score
    pass
```

# LOGICAL OPERATORS
- and
- or
- not

```python
print(True and True)
# prints True

print(True or False)
# prints True

print(not True)
# Prints: False
```

# BINARY NUMBERS - BASE 2 NUMBERS
Each 1 in a binary number represents an ever-greater multiple of 2. In a 4-digit number, that means you have the eights place, the fours place, the twos place, and the ones place. Similar to how in decimal you would have the thousands place, the hundreds place, the tens place, and the ones place.

```PYTHON
print(0b0001)
# Prints 1

print(0b0101)
# Prints 5
```
Leading 0s are often added for visual consistency but do not change the value of a binary number.



0 = 0
1 = 1
2 = 10
3 = 11
4 = 100 2^2
5 = 101
6 = 110
7 = 111
8 = 1000 2^3
9 = 1001
10 = 1010
11 = 1011
12 = 1100

16 = 10000 /2^4
31 = 11111
32 = 100000 /2^5
33 = 100001
34 = 100010

# BITWISE OPERATOR &
Bitwise operators are similar to logical operators, but instead of operating on boolean values, they apply the same logic to all the bits in a value by column.

```PYTHON
0101
&
0111
=
0101
```

A 1 in binary is the same as True, while 0 is False. So really a bitwise operation is just a bunch of logical operations that are completed in tandem by column.

0 & 0 = 0

1 & 1 = 1

1 & 0 = 0

# Ampersand & is the bitwise AND operator in Python.

0b0101 & 0b0111
# equals 5

binary_five = 0b0101
binary_seven = 0b0111
binary_five & binary_seven
# equals 5

# BITWISE OPERATOR |
0101
|
0111
=
0111


# int()
The built-in int() function can convert a binary string to an integer.

```PYTHON
# this is a binary string
binary_string = "100"

# convert binary string to integer
num = int(binary_string, 2)
print(num)
# 4
```

# Comparison operators
When a comparison happens, the result of the comparison is just a boolean value, it's either True or False.
The operators:

< "less than"
> "greater than"
<= "less than or equal to"
>= "greater than or equal to"
== "equal to"
!= "not equal to"

# IF STATEMENTS
```python
def show_status(boss_health):
    if boss_health > 0:
        print("Ganondorf is alive!")
        return
    print("Ganondorf is unalive!")
```

```python
is_equal = 5 == 5
print(is_equal)
# True
```
```python
    def check_swords_for_army(number_of_swords, number_of_soldiers):
    if (number_of_swords == number_of_soldiers):
        return 'correct amount'
    return "incorrect amount"
```

# IF ELSE
An if statement can be followed by zero or more elif (which stands for "else if") statements, which can be followed by zero or one else statements.
```python
    if score > high_score:
        print("High score beat!")
    elif score > second_highest_score:
        print("You got second place!")
    elif score > third_highest_score:
        print("You got third place!")
    else:
        print("Better luck next time")
```

```python
    def player_status(health):
    if (health <= 0):
        return "dead"
    elif (health <= 5 ):
        return "injured"
    else:
        return "healthy"
```

```pyton
    def should_serve_customer(customer_age, on_break, time):
    return customer_age >= 21 and not on_break and (time >= 5 and time <= 10)
```

```python
    def check_mount_rental(time_used, time_purchased):
    if (time_used >= time_purchased):
        return "overtime charged"
    else:
        return "no charges yet"
```

```python
    def combat_evaluation(player_power, enemy_defense):
    advantage, disadvantage, evenly_matched = False, False, False

    if (player_power > enemy_defense):
        advantage = True
        evenly_matched = False
        disadvantage = False
    elif (player_power == enemy_defense):
        evenly_matched = True
        advantage = False
        disadvantage = False
    else: 
        evenly_matched = False
        advantage = False
        disadvantage = True

    # your code here

    return advantage, disadvantage, evenly_matched
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
