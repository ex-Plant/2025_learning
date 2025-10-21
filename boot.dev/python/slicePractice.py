# divide players into teams

players =         [
                      "Harry",
                      "Hermione",
                      "Ron",
                      "Ginny",
                      "Fred",
                      "Neville",
                      "Draco",
                      "Luna",
                      "Cho",
                      "Gregory",
                      "Lee",
                      "Michael",
                      "Lavender",
                      "Frank",
                      "Anthony",
                      "Allan",
                  ]

def split_players_into_teams(players):
  teamEven = players[0::2]
  teamOdd = players[1::2]
  return teamEven, teamOdd

split_players_into_teams(players)
