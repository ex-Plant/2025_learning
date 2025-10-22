test = {"Goku": 8000,
            "Vegeta": 7500,
            "Piccolo": 3500,
            "Gohan": 2800,
        }



for name in test:
  print(name)

def merge(dict1, dict2):
    empty = {}
    for key in dict1:
        empty[key] = dict1[key]
    print(empty)

merge(test, test)
