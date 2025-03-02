// The basis of merge sort is from https://mike.ma/ICS4U/unit_1_data_structures_and_algorithms/3._algorithms/3.4._merge_sort

type CompareCallback = (a: number, b: number) => number;

/**
 * Merges two halves of array `arr` based on the comparison logic provided by `compare`.
 *
 * @param arr - The array being sorted.
 * @param low - The starting index of the first half.
 * @param mid - The ending index of the first half.
 * @param high - The ending index of the second half.
 * @param compare - A callback that compares two elements, returning:
 *   - a negative number if the first element is less than the second,
 *   - zero if they are equal, or
 *   - a positive number if the first element is greater than the second.
 *
 * @timecomplexity O(n) - Merging two sorted subarrays requires a linear scan through both halves, where `n` is the total number of elements in the two halves combined.
 */
function merge(
  arr: Uint32Array,
  low: number,
  mid: number,
  high: number,
  compare: CompareCallback
): void {
  const leftLength: number = mid - low + 1;
  const rightLength: number = high - mid;
  const length: number = leftLength + rightLength;

  const temp: number[] = new Array(length);

  for (let i: number = 0; i < leftLength; i++) temp[i] = arr[low + i];
  for (let i: number = 0; i < rightLength; i++) {
    temp[leftLength + i] = arr[mid + 1 + i];
  }

  let leftPoint: number = 0;
  let rightPoint: number = 0;
  let pointer: number = 0;

  while (leftPoint < leftLength && rightPoint < rightLength) {
    const left: number = temp[leftPoint];
    const right: number = temp[leftLength + rightPoint];

    if (compare(left, right) < 0) {
      arr[low + pointer++] = left;
      leftPoint++;
    } else {
      arr[low + pointer++] = right;
      rightPoint++;
    }
  }

  while (leftPoint < leftLength) {
    arr[low + pointer++] = temp[leftPoint++];
  }

  while (rightPoint < rightLength) {
    arr[low + pointer++] = temp[leftLength + rightPoint++];
  }
}

/**
 * Recursively sorts a `Uint32Array` using merge sort and the provided comparison callback.
 *
 * @param sorted - The array of sorted indices.
 * @param left - The starting index for the sort.
 * @param right - The ending index for the sort.
 * @param compare - A callback that compares two elements.
 *
 * @timecomplexity O(n log n) - Merge sort recursively divides the array into halves (O(log n)) and merges them back together (O(n)).
 */
function sort(
  sorted: Uint32Array,
  left: number,
  right: number,
  compare: CompareCallback
): void {
  if (left >= right) {
    sorted[right] = right;

    return;
  }

  const middle: number = (left + right) >>> 1;

  sort(sorted, left, middle, compare);
  sort(sorted, middle + 1, right, compare);
  merge(sorted, left, middle, right, compare);
}

/**
 * Sorts an array of numbers, strings, or typed arrays using merge sort and the provided comparison callback.
 *
 * @param arr - The array of data to sort.
 * @param compare - A callback that compares two elements.
 * @param sorted - An optional array to store the sorted indices.
 * @returns A new `Uint32Array` containing the sorted indices of `arr`.
 *
 * @timecomplexity O(n log n) - The function calls `sort`, which uses merge sort (O(n log n)).
 */
function sortArray(
  arr: (number | string)[] | Uint32Array | Float32Array,
  compare: CompareCallback,
  sorted?: Uint32Array
): Uint32Array {
  const t0: number = performance.now();
  const length: number = arr.length;

  if (sorted === undefined) sorted = new Uint32Array(length);
  sort(sorted, 0, length - 1, compare);

  const t1: number = performance.now();
  logTask('Sorted Array', t1 - t0, `Sorted an array of ${typeof arr[0]}s`);

  return sorted;
}

/**
 * Sorts an array of numbers using merge sort.
 *
 * @param data - The array of numbers to sort.
 * @param outSorted - An optional array to store the sorted indices.
 * @returns A `Uint32Array` containing the sorted indices of `data`.
 *
 * @timecomplexity O(n log n) - The function uses `sortArray`, which internally calls merge sort (O(n log n)).
 */
function sortNumbers(
  data: number[] | Uint32Array | Float32Array,
  outSorted?: Uint32Array
): Uint32Array {
  return sortArray(
    data,
    (a: number, b: number) => {
      return data[a] - data[b];
    },
    outSorted
  );
}

/**
 * Sorts an array of strings using merge sort.
 *
 * @param data - The array of strings to sort.
 * @param outSorted - An optional array to store the sorted indices.
 * @returns A `Uint32Array` containing the sorted indices of `data`.
 *
 * @timecomplexity O(n log n) - The function uses `sortArray`, which internally calls merge sort (O(n log n)).
 */
function sortStrings(data: string[], outSorted?: Uint32Array): Uint32Array {
  return sortArray(
    data,
    (a: number, b: number) => {
      const aVal: string = data[a].toLowerCase();
      const bVal: string = data[b].toLowerCase();

      if (aVal < bVal) return -1;
      else if (aVal > bVal) return 1;
      else return 0;
    },
    outSorted
  );
}
