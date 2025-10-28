def get_text(path):
  with open(path) as f:
    return f.read()

def count_words(path):
        text = get_text(path)
        num_words = len(text.split())
        result = f'Found {num_words} total words'
        return num_words

def count_chars(path):
    text = get_text(path)
    chars = {}
    for letter in text.lower():

      # remove empty spaces
      if (letter == " "):
        continue

      if letter in chars:
        chars[letter] = {"num": chars[letter]["num"] + 1 }
      else:
        chars[letter] = {"num": 1 }

    return chars


def getSingleItemCount(tuple):
        return tuple[1]["num"]

def sort_dictionary(dict):
  # Transform dictionary into list of tuples to make it sortable
  l = list(dict.items()) # <class 'list'>
#   print(type(l))
#   print('💥 list of tuples: ', l)
  # this is the same:
  sorted =  l.sort(key=getSingleItemCount, reverse=True )
  # as this;
#   sorted =  l.sort(key=lambda x: x[1]["num"], reverse=True )
  # print('❌ .sort() is sorting in place and returns nothing we need to return original list:', sorted, )

  return l


def generateReport(path):
    num_of_words = count_words(path)
    dictionary = count_chars(path)
    sorted = sort_dictionary(dictionary)
    string = f'============ BOOKBOT ============ \nAnalyzing book found at {path}...\n-----------Word Count ----------\nFound {num_of_words} total words\n--------- Character Count -------'

    for tuple in sorted:
        string = f'{string} \n {tuple[0]}: {tuple[1]["num"]}'

    string = f'{string} \n============= END =============== '
    return string
