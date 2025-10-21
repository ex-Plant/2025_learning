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

# LOOPS
Loops allow us to do the same operation multiple times without having to write it explicitly each time.

If i is not less than 10 (range(0, 10)), exit the loop.
```python
    for i in range(0, 10):
        print(i)
```

The body of a for-loop must be indented; otherwise, you'll get a syntax error.


# RANGE + STEP
The range() function we've been using in our for loops actually has an optional 3rd parameter: the "step".

```python
    for i in range(0, 10, 2):
        print(i)
    # prints:
    # 0
    # 2
    # 4
    # 6
    # 8
```

# LOOP BACKWARD
```python
    for i in range(3, 0, -1):
        print(i)
    # prints:
    # 3
    # 2
    # 1
```

```python
    def count_down(start, end):
        for i in range(start, end, -1):
            print(i)
    
    def test(start, end):
        print(f"Using inputs start: {start} and end: {end}")
        print(f"Printing numbers from {start} to {end + 1}:")
        count_down(start, end)
        print("=====================================")

    def main():
        test(10, 0)
        test(20, 10)
        test(15, 11)
        
    main()
```

```python
    def sum_of_numbers(start, end):
        total = 0
        for i in range(start, end):
            total += i
        return total
```

```python
    def sum_of_odd_numbers(end):
        total = 0
        for i in range(0, end):
            if (i % 2 != 0):
                total += i
        return total
```

# WHILE
It's a loop that continues while a condition remains True.
Example of infinite loop - since the condition is always true it goes forever
```python
    while 1:
        print("1 evaluates to True")

# prints:
# 1 evaluates to True
# 1 evaluates to True
# (...continuing)
```
```python
    num = 0
    while num < 3:
        num += 1
        print(num)
 ```
```python
    def regenerate(current_health, max_health, enemy_distance):

        while current_health < max_health and enemy_distance > 3:
            current_health += 1
            enemy_distance -= 2
            print(current_health, enemy_distance)
        return current_health
```

# CONTINUE 
Used to skip some items in a loop
```python
    counter = 0
    for number in range(1, 51):
        counter = counter + 1

        if counter == 7:
            counter = 0 # Reset the counter
            continue # Skip this number

        print(number)
```

Award the player every third quest
```python  
    def award_enchantments(start, end, step):
        counter = 0
        for quest_number in range(start, end, step):
            counter += 1
            if (counter < 3):
                continue
        
            enchantment_strength = quest_number * 5
            counter = 0
            print(
                f"Enchantment of strength {enchantment_strength} awarded for completing {quest_number} quests!"
            )
```

# BREAK
Used to exit the loop entirely
```python
    for n in range(42):
        print(f"{n} * {n} = {n * n}")
        if n * n > 150:
            break
```
 
```python   
    #def check_defense(attack_strength, min_enchantment, max_enchantment):
    for enchantment_strength in range(min_enchantment, max_enchantment + 1):
        print(
            f"Comparing attack strength {attack_strength} to enchantment strength {enchantment_strength}."
        )

        if enchantment_strength >= attack_strength:
            print("Attack blocked!")
            break
```

```python
    def calculate_experience_points(level):
        xp = 0
        for i in range(0, level):
            xp += i * 5
            print(xp)
        return xp
```

```python
    def meditate(mana, max_mana, num_potions):
    while mana < max_mana and num_potions > 0:
        mana +=1
        num_potions -= 1
    return mana, num_potions
```

### LISTS
A natural way to organize and store data. Equivalent of array in js.

```python
    inventory = ["Iron Breastplate", "Healing Potion", "Leather Scraps"]
    
    flower_types = [
        "daffodil",
        "rose",
        "chrysanthemum"
    ]
    print(flower_types[0])
    # daffodil
    
    inventory = ["Leather", "Iron Ore", "Healing Potion"]
    inventory[0] = "Leather Armor"
    # inventory: ['Leather Armor', 'Iron Ore', 'Healing Potion']
    
```

# LEN
Get length of a list
```python
    fruits = ["apple", "banana", "pear"]
    length = len(fruits)
    # 3
```

# APPEND
Add values to the end of the list
```python
    cards = []
    cards.append("nvidia")
    cards.append("amd")
```

```python
    def generate_user_list(num_of_users):
        player_ids = []

        for i in range(0, num_of_users):
            player_ids.append(i)

        return player_ids
```

# POP   
Remove the last element of the list AND RETURNS it.

```python
    vegetables = ["broccoli", "cabbage", "kale", "tomato"]
    last_vegetable = vegetables.pop()
    # vegetables = ['broccoli', 'cabbage', 'kale']
    # last_vegetable = 'tomato'
```

# POP an element with a specific index
```python
    vegetables = ["broccoli", "cabbage", "kale", "tomato"]
    second_vegetable = vegetables.pop(1)
    # vegetables = ['broccoli', 'kale', 'tomato']
    # second_vegetable = 'cabbage'
```

```python
    for i in range(0, len(sports)):
        print(sports[i])
```

# FOR IN
```python
    trees = ['oak', 'pine', 'maple']
    for tree in trees:
        print(tree)
    # Prints:
    # oak
    # pine
    # maple
```
```python
    def find_max(nums):
        max_so_far = float("-inf")
        for number in nums:
            if (number > max_so_far):
                max_so_far = number
        return max_so_far
```

# MODULO
The modulo operator can be used to find the remainder after a division operation.

```python
    def get_odd_numbers(num):
        odd_numbers = []

        for i in range(0, num):
            if (i % 2 != 0):
                odd_numbers.append(i)
        return odd_numbers
```

# SLICING LISTS
Slicing operator - :
Start index, end index (not inclusive), step

```python
    my_list[ start : stop : step ]
```
give me a slice of the scores list from index 1, up to but not including 5, skipping every 2nd value:
```python
    scores = [50, 70, 30, 20, 90, 10, 50]
    # Display list
    print(scores[1:5:2])
    # Prints [70, 20]
```    

Omitting values 
- all up to index 3(not including)
[:3]

- all from index 3(including)
[3:]

- all from index 1 to index 5(not including)
[1:5]

- all from index 1 to index 5(not including) skipping every 2nd value
[1:5:2]

# Using only step 
```python
    numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    numbers[::2] 
    # Gives [0, 2, 4, 6, 8]
```

```python
    def get_champion_slices(champions):
    first = []
    second = []
    third = []
    for i in range(3):
        if i == 0:
            first = champions[2:]
        elif i == 1:
            second = champions[:len(champions) - 1]
        else:
            third = champions[::2]
            
    return first, second, third


def get_champion_slices(champions):
    return champions[2:], champions[:-1], champions[::2]

```

# NEGATIVE INDICES
Count from the end of the list

# LIST CONCATENATION
```python
    total = [1, 2, 3] + [4, 5, 6]
    print(total)
    # Prints: [1, 2, 3, 4, 5, 6]
```

# LIST INCLUDES
```python
    fruits = ["apple", "orange", "banana"]
    print("banana" in fruits)
    # Prints: True
    
    fruits = ["apple", "orange", "banana"]
    print("banana" not in fruits)
    # Prints: False
```
### LIST DELETION
Python has a built-in keyword del that deletes items from objects. In the case of a list, you can delete specific indexes or entire slices.

# DELETE NTH ITEM
```python
    del nums[3]
```

# DELETE ITEMS FROM INDEX 1 TO 3(EXCLUDING)
```python
    del nums[1:3]
```

# DELETE ALL ELEMENTS
```python
    del nums[:]
```

# Delete last two items
```py
    def trim_strongholds(strongholds):
        del strongholds[len(strongholds) - 2:]
```

### TUPLES
Collections of data that are ORDERED and UNCHANGEABLE.
We can think about it as a list with fixed size
```py
    my_tuple = ("this is a tuple", 45, True)
    print(my_tuple[0])
    # this is a tuple
    print(my_tuple[1])
    # 45
    print(my_tuple[2])
    # True
```

Tuples are often used to store very small groups (like 2 or 3 items) of data. For example, you might use a tuple to store a dog's name and age.
```python
    dog = ("Fido", 4)
```


# tuple with only one item (coma at the end)
```py
    my_tuple = ("this is a tuple",)
```

# multiple tuples in a list
```python
    my_tuples = [
    ("this is the first tuple in the list", 45, True),
    ("this is the second tuple in the list", 21, False)
    ]
    print(my_tuples[0][0]) # this is the first tuple in the list
    print(my_tuples[0][1]) # 45
```

# tuple unpacking
Similar to array destructuring in js
You can easily assign the values of a tuple to variables using unpacking.
```py
    dog = ("Fido", 4)
    dog_name, dog_age = dog
    print(dog_name)
    # Fido
    print(dog_age)
    # 4
```
❗ When you return multiple values from a function, you're actually returning a tuple.



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

# return reversed list
```python
    def reverse_list(items):
        reversed = []
        for i in range(len(items) - 1, 0, -1):
        reversed.append(items[i])
        print(reversed)
    return items
```

# .split()
method called on a string -  returns a list by splitting the string based on a given delimiter.

```python
    message = "hello there sam"
    words = message.split()
    print(words)
    # Prints: ["hello", "there", "sam"]
```

# .join()
The .join() method is called on a delimiter (what goes between all the words in the list), and takes a list of strings as input.

```python
    list_of_words = ["hello", "there", "sam"]
    sentence = " ".join(list_of_words)
    print(sentence)
    # Prints: "hello there sam"
```

# Assignment 
Filter out words and count the number of filtered words

```python
def filter_messages(messages, wordToFilter):
  filteredMessages = []
  filteredCounter = 0
  for i in range(0, len(messages)):
    singleMessage = messages[i]
    if wordToFilter not in singleMessage:
      filteredMessages.append(singleMessage)
      continue

    filteredWords = []
    messageWordsArr = singleMessage.split()
    for i in range (0, len(messageWordsArr)):
      single_word = messageWordsArr[i]
      if single_word == wordToFilter:
        filteredCounter += 1
        continue
      filteredWords.append(single_word)
    singleMessageFiltered = " ".join(filteredWords)
    filteredMessages.append(singleMessageFiltered)
  return filteredMessages, filteredCounter
```
