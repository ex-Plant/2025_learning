def get_character_record(name, server, level, rank):
    return {
        "name": name,
        "server": server,
        "level": level,
        "rank": rank,
        "id": f'{name}#{server}'
    }

test = get_character_record("name", "server", "level", "rank")
print(test)

def count_enemies(enemy_names):
    enemies_dict = {}
    for enemy_name in enemy_names:
        if enemy_name in enemies_dict:
            enemies_dict[enemy_name] += 1
        else:
             enemies_dict[enemy_name] = 1
    return enemies_dict


def get_most_common_enemy(enemies_dict):
  highest = float("-inf")
  highestName = None
  if not enemies_dict:
    return None
  for enemy in enemies_dict:
    if enemies_dict[enemy] > highest:
      highest = enemies_dict[enemy]
      highestName = enemy
  return highestName

en = {
    "jackal": 1,
    "kobold": 2,
    "soldier": 3,
    "gremlin": 5
}

test = get_most_common_enemy(en)
print(test)



def merge(dict1, dict2):
    empty = {}
    for key in dict1:
        empty[key] = dict1[key]
    for key in dict2:
        empty[key] = dict2[key]
    return empty
