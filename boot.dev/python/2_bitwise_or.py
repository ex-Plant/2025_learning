Complete the calculate_guild_perms function. It takes as input four binary numbers representing the separate permissions of each member of the guild: glorfindel, galadriel, elendil and elrond. It should return a single binary number that represents the combined permissions of all the members of the guild.

Use a series of bitwise "or" operations to calculate the superset of all the member's permissions.


can_invite = 0b1000
can_kick  = 0b0100
can_enter_dungeon = 0b0010
can_surrender = 0b0001


def calculate_guild_perms(glorfindel, galadriel, elendil, elrond):
    permission = glorfindel  | galadriel | elendil | elrond
    print(permission)
    return permission
