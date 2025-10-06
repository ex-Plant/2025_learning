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
    player_health = 1000 ❌
player_health = 1000 // ✅


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
- string - *double quotes are preferred*
- integer
- float
- boolean - capital letters *T*

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

#❗ Concatenation
joining two strings

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

In JavaScript (hoisting exists, but varies by declaration type)
Function declarations are hoisted with their bodies. You can call them before they appear.
Function expressions/arrow functions are not callable before initialization. The variable is hoisted differently depending on var/let/const.

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
