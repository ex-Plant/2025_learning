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

print(factorial(5))
