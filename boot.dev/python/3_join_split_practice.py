# first try
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

def better_filter_messages(messages, wordToFilter):
  filteredMessages = []
  filteredCounter = 0
  for message in messages:
      filteredWords = []
      messageWordsArr = singleMessage.split()
      for word in messageWordsArr
        if word == wordToFilter:
          filteredCounter += 1
        else:
          filteredWords.append(single_word)
    filteredMessages.append(" ".join(filteredWords))
  return filteredMessages, filteredCounter





ms =  ["well dang it", "dang the whole dang thing", "kill that knight, dang it", "get him!", "donkey kong",
"oh come on", "get them", "run away from the dang baddies"]
test = filter_messages(ms, "dang")
test2 = better_filter_messages(ms, "dang")

# print(test, "test")
print(test2, "test2")
