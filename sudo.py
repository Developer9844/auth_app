def find_peaks(array):
    if not array:
        return []

    peak = array[0]
    index = 0
    output = []

    for x in range(1, len(array)):
        if array[x] * array[x-1] > 0:
            if peak < 0 and array[x] < peak:   # both negative
                peak = array[x]
                index = x
            elif peak >= 0 and array[x] > peak:  # both positive
                peak = array[x]
                index = x
        else:
            output.append((index, peak))
            peak = array[x]
            index = x

    output.append((index, peak))
    return output

array = [1, 4, 2, -2, -9, 10, 2, 12, 2, -4, -4, -4, -4, 2, 6, 7]
peaks = find_peaks(array)


print(peaks)

