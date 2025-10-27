def factorial(num):
    result = 1
    for i in range(1, num + 1):
        result *= i


def factorial(num):
    if num == 0:
        return 1
    nums = []
    for i in range(0, num):
        nums.append(i + 1)

    print(nums)
    result = 1
    for num in nums:
        result *= num

    return result

'''
A factorial is the product (multiplication result) of all positive integers less than or equal to a given number. For example:
1! = 1 = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
'''
