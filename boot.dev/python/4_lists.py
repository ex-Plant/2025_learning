def check_ingredient_match(recipe, ingredients):
    missingIngredients = []
    for item in recipe:
        if item not in ingredients:
            missingIngredients.append(item)
    percentage = 100 - (len(missingIngredients) / len(recipe)) * 100
    return f'Missing ingredients: {missingIngredients}. {percentage}% of required ingredients collected '


recipe = [ "Mandrake Root","Griffin Feather","Elf Dust","Goblin Ear"]
ingredients = ["Elf Dust","Goblin Ear"]

recipe2 = ['Dragon Scale', 'Unicorn Hair', 'Phoenix Feather', 'Troll Tusk', 'Mandrake Root', 'Griffin Feather',
'Elf Dust', 'Goblin Ear']

ingredients2 = ['Dragon Scale', 'Phoenix Feather', 'Mandrake Root', 'Griffin Feather', 'Elf Dust', 'Goblin Ear']

test = check_ingredient_match(recipe, ingredients)
test2 = check_ingredient_match(recipe2, ingredients2)
# print(test)
print(test2)


def divide_list(nums, divisor):
    newList = []
    for num in nums:
        newList.append(num / divisor)
    return newList
