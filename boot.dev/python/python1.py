print("Hello world")


sword_damage = 10
start_health = 100
end_health = start_health - sword_damage

# Don't touch below this line
print(f"Sam's health is: {start_health}")
print(f"Sam takes {sword_damage} damage...")
print(f"Sam's health is: {end_health}")

"""
Python is INTERPRETED.
Well known to be used in the fields covering:
- Backend web servers
- DevOps and cloud engineering
- Machine learning
- Scripting and automation
"""

# In pyton you can use numbers inside print function
print((250 + 241 + 244 + 255) / 4)

# ❗Assigning variables
my_height = 100
my_name = "Lane"
print(my_height)


#❗Indentation matters!!
#     player_health = 1000 ❌
# player_health = 1000  ✅


# arithmetic operators
summation = a + b  # Addition
difference = a - b # Subtraction
product = a * b    # Multiplication
quotient = a / b   # Division


player_health = 1000
armor_multiplier = 2
armored_health = player_health * armor_multiplier

#❗comments
'''❗Multi line comments'''

# camel_case
# Pascal_case
#❗in python use snake_case

# VARIABLE TYPES
'''
- string - *double quotes are preferred*
- integer
- float
- boolean - capital letters *T*
'''

#❗type of
player_health = "100"
player_has_magic = True
print("player_health is a/an ", type(player_health).__name__) // str
print("player_has_magic is a/an ", type(player_has_magic).__name__) // bool


#❗f-strings - formatted string literals
bananas = f"You have {num_bananas} bananas"
print(bananas)


name = "Yarl"
age = 37
race = "dwarf"
print(f"{name} is a {race} who is {age} years old.")

#❗ NoneType
- null
my_mental_acuity = None
''' Also if a function is not returning anything it defaults to none (like undefined in js)'''

#❗ Dynamic typing Python is dynamically typed - types can change
speed = 5
speed = "five"

#❗ Concatenation - joining two strings

first_name = "Lane "
last_name = "Wagner"
full_name = first_name + last_name
print(full_name)

#❗ Multi-variable Declaration
sword_name, sword_damage, sword_length = "Excalibur", 10, 200

# code execution
'''Code executes in order from top to bottom, so a variable needs to be created before it can be used. That means that
if you define a function, you can't call that function until after it has been defined.
NO HOISTING
Code runs top-to-bottom. A function name exists only after its def statement executes.
Calling it before the def raises a NameError.

Most Python developers solve this problem by defining all the functions in their program first, then they call an "entry point" function last.
That way all of the functions have been read by the Python interpreter before the first one is called.
Conventionally this "entry point" function is usually called main to keep things simple and consistent. '''

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

'''
In JavaScript (hoisting exists, but varies by declaration type)
Function declarations are hoisted with their bodies. You can call them before they appear.
Function expressions/arrow functions are not callable before initialization. The variable is hoisted differently depending on var/let/const.
'''
'''
PARAMETERS VS ARGUMENTS
Parameters are the names used for inputs when defining a function. Arguments are the values of the inputs supplied when a function is called.
'''

# DEFAULT VALUES
def get_greeting(email, name="there"):
    print("Hello", name, "welcome! You've registered your email:", email)

def get_punched(health, armor=0):
    damage = 50 - armor
    new_health = health - damage
    return new_health


# DESTRUCTURING
def curse(weapon_damage):
    lesser_cursed = weapon_damage / 2
    greater_cursed = weapon_damage / 4
    return lesser_cursed, greater_cursed

    # ?

lesser_cursed, greater_cursed = curse(2500)
print(lesser_cursed)


# GLOBAL SCOPE
global_var = 6

# FUNCTION SCOPE
def foo():
  a = 1
  return a + 2

print(a)
# // ❌ error

# UNIT TESTS
''' Unit test is just a small program that executes a small fraction of the code and tests the output. Test are
expecting a certain output to pass. If the output is beyond expectations the test will fail. '''


# pass
''' Pass is telling python to do nothing '''

#  def total_xp(level, xp_to_add):
#    pass

def take_magic_damage(health, resist, amp, spell_power):
    damage = spell_power * amp
    damage -= resist
    health -= damage
    return health


# len - length
def calculate_damage(sword, arrow, spear, dagger, fireball):
    weapons = [sword, arrow, spear, dagger, fireball]
    total_damage = sword + arrow + spear + dagger + fireball
    average_damage = total_damage / len(weapons)
    return total_damage, average_damage

# floor division
floorRes = 7 // 3
# result - 2 an integer rounded down from 2.333

# EXPONENTS
''' reads as "three squared" or "three raised to the second power" '''
3 ** 2
# 9

# Sometimes exponents are also shown in text using the caret symbol (^):
5^3
# 125

# IN PLACE OPERATIONS / INCREMENTING
star_rating = 4
star_rating += 1
# star_rating is now 5

start_rating -= 1

# SCIENTIFIC NOTATION
print(16e3)
# Prints 16000.0


'''Underscores for Readability
Python also allows you to represent large numbers in the decimal format using underscores as the delimiter instead of commas to make it easier to read.'''
num = 16_000
print(num)
# Prints 16000

num = 16_000_000
print(num)
# Prints 16000000


# LOGICAL OPERATORS
# or
True or True == True

# and
True and True == True

print((True or False) and False)

# not
print(not True)
# Prints: False


# BINARY NUMBERS
'''
Binary numbers - base 2 numbers
Decimal -  base 10


We start from one and multiply by two
If there is one digit 0


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





We than add all 1 equivalents

We have three 1's and three 0's
To get an actual number we add 1 + 2 + 4 + 0 + 0 + 0  = 7 (reading from the right)
0    0   0   1   1   1
32  16   8   4   2   1


Here the calc would ne 1 + 2 + 4 + 0 + 0 + 32 = 39
1    0   0   1   1   1
32  16   8   4   2   1


0 + 0 + 4 + 8 = 12
1 1 0 0
8 4 2  1
'''

# Binary in Python
'''You can write an integer in Python using binary syntax using the 0b prefix: '''

print(0b0001)
# Prints 1






l



# FOR LOOP
for i in range(1, 100):
  print(i)
