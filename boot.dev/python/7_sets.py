''' Complete the find_missing_ids function. It accepts two lists as input, and returns a new set of all the IDs that
are in the first list but are not in the second. '''

def find_missing_ids(first_ids, second_ids):
    firstSet = set()
    secSet = set()

    for id in first_ids:
        firstSet.add(id)
    for id in second_ids:
        secSet.add(id)

    targetSet = firstSet - secSet
    return targetSet

def find_missing_ids2(first_ids, second_ids):
    s1 = set(first_ids)
    s2 = set(second_ids)
    return s1 - s2


def remove_duplicates(spells):
    newSet = set()
    newList = []

    for spell in spells:
        newSet.add(spell)

    for item in newSet:
        newList.append(item)
    return newList

def count_vowels(text):
    uniqueVovels = set()
    vovels = []
    allVovels = ['a','e', 'i', 'o', 'u']
    for letter in text:
        if (letter.lower() in allVovels):
            vovels.append(letter)
            uniqueVovels.add(letter)
    return len(vovels), uniqueVovels
