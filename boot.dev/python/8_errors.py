def get_player_record(player_id):
    if player_id == 1:
        return {"name": "Slayer", "level": 128}
    if player_id == 2:
        return {"name": "Dorgoth", "level": 300}
    if player_id == 3:
        return {"name": "Saruman", "level": 4000}
    else:
        raise Exception('player id not found')

# More specific exception first
def process_player_record(player_id):
    try:
        return get_player_record(player_id)
    except IndexError:
        return 'index is too high'
    except Exception as e:
        return e

def purchase_item(price, gold_available):
    if gold_available < price:
        raise Exception('not enough gold')
    return gold_available - price
