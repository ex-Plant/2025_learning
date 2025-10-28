# no constructor
class Soldier:
        armor = 2
        num_weapons = 2

        def get_speed(self):
            speed = 10
            speed -= self.armor
            speed -= self.num_weapons
            return speed

soldier_one = Soldier()
print(soldier_one.get_speed())
# prints "6"

class Wall:
    armor = 10
    height = 5

    def get_cost(self):
        return self.armor * self.height

    def fortify(self):
        self.armor *= 2

wall_one = Wall()
print(wall_one.get_cost())
# 50


# ✅ With constructor

class Proper_soldier:
  def __init__(self, name, armor = 1, weapon = 1):
    self.name = name
    self.armor = armor
    self.weapon = weapon


soldier_one = Proper_soldier("Aragorn", 20, 50)
print(soldier_one.name)
print(soldier_one)
