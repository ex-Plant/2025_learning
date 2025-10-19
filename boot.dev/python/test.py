def reverse_list(items):
  reversed = []
  for i in range(len(items) - 1, 0, -1):
     reversed.append(items[i])
  print(reversed)
  return items
