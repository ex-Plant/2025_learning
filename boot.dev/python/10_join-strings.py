string_list = ["Annie", "Reiner", "Bertholdt"]
joined_string = join_strings(string_list)
print(joined_string)
# "Annie,Reiner,Bertholdt"

string_list = ["Eren", "Mikasa", "Armin"]
joined_string = join_strings(string_list)
print(joined_string)
# "Eren,Mikasa,Armin"

def join_strings(strings):
    str = ""
    for string in strings:
        str = f'{str}{string},'
    str = str[:len(str) - 1]
    return str

def join_strings(strings):
    joined = ""
    for s in strings:
        joined += s + ","
    return joined[:-1]
