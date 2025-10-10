def main():
    calculate_dps(8,000,000, 45)
    calculate_dps(10,000,000, 49)


# Don't edit below this line


def calculate_dps(damage, time):
    dps = damage / time
    print(f"Damage per second: {dps}")
    print("=====================================")


main()
