from stats import count_words, count_chars, sort_dictionary, generateReport
import sys

def main():
  url = './books/frankenstein.txt'

#   chars_dictionary = count_chars(url)
#   print(chars_dictionary, 'raw 🚧')
#   sorted = sort_dictionary(chars_dictionary)
#   count_book_text(url)
#   print(sys.argv) # ['main.py']



  args = sys.argv
  if len(args) < 2:
    print('Usage: python3 main.py <path_to_book>')
    sys.exit(1)
  else:
    print(generateReport(args[1]))
main()
