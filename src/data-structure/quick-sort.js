// function quickSort (nums) {

//   if (nums.length === 1 || nums.length === 0) return nums
//   const model = nums[0]
//   const left = []
//   const right = []

//   for (let i = 1; i < nums.length; i++) {
//     if (model > nums[i]) {
//       left.push(nums[i])
//     } else {
//       right.push(nums[i])
//     }
//   }

//   return [...quickSort(left), model, ...quickSort(right)]
// }

// console.log(quickSort([1, 3, 2, 4, 5, 6, 7]))


// 双边
// function quickSort (nums, start = 0, end = nums.length - 1) {

//   if (start >= end) return

//   const currentCompareObject = nums[end]

//   let left = start
//   let right = end

//   while (left !== right) {

//     while (nums[left] < currentCompareObject && left < right) {
//       left++
//     }

//     while (nums[right] >= currentCompareObject && left < right) {
//       right--
//     }

//     if (left < right) {
//       const temp = nums[left]
//       nums[left] = nums[right]
//       nums[right] = temp
//     }
//   }

//   if (left === right) {
//     const temp = nums[end]
//     nums[end] = nums[left]
//     nums[left] = temp
//   }

//   quickSort(nums, start, left - 1)
//   quickSort(nums, left + 1, end)

//   return nums
// }


// console.log(quickSort([5, 2, 1, 6, 3, 7, 4]))

// 单边
// function quickSort (arr, start = 0, end = arr.length - 1) {
//   if (start >= end) return
//   let mark = start
//   const compareTarget = arr[mark]
//   let pointer = start

//   while (pointer <= end) {
//     if (arr[pointer] < compareTarget) {
//       mark += 1
//       const tmp = arr[mark]
//       arr[mark] = arr[pointer]
//       arr[pointer] = tmp
//     }

//     pointer++
//   }


//   const tmp = arr[mark]
//   arr[mark] = arr[start]
//   arr[start] = tmp


//   quickSort(arr, start, mark - 1)
//   quickSort(arr, mark + 1, end)

//   return arr
// }

// console.log(quickSort([5, 2, 1, 6, 3, 7, 4]))

// function bubbleSort (arr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     for (let j = 0; j < arr.length - i; j++) {
//       if (arr[j] > arr[j + 1]) {
//         const tmp = arr[j]
//         arr[j] = arr[j + 1]
//         arr[j + 1] = tmp
//       }
//     }
//   }

//   return arr
// }

// console.log(bubbleSort([5, 2, 1, 6, 3, 7, 4]))


function queueQuickSort (array) {

  function partition (array, start, end) {
    const compareObj = array[start]
    let mark = start
    for (let i = start + 1; i <= end; i++) {
      if (array[i] < compareObj) {
        mark++
        const tmp = array[mark]
        array[mark] = array[i]
        array[i] = tmp
      }
    }

    const tmp = array[start]
    array[start] = array[mark]
    array[mark] = tmp

    return mark
  }


  const Queue = []
  const start = 0
  const end = array.length - 1
  const map = new Map()
  map.set('startIndex', start)
  map.set('endIndex', end)

  Queue.push(map)

  while (Queue.length) {
    const current = Queue.pop()
    const mark = partition(array, current.get('startIndex'), current.get('endIndex'))

    if (mark - 1 > current.get('startIndex')) {
      const map = new Map()
      map.set('startIndex', current.get('startIndex'))
      map.set('endIndex', mark - 1)
      Queue.push(map)
    }

    if (mark + 1 < current.get('endIndex')) {
      const map = new Map()
      map.set('startIndex', mark + 1)
      map.set('endIndex', current.get('endIndex'))
      Queue.push(map)
    }
  }
  return array
}

console.log(queueQuickSort([5, 2, 1, 6, 3, 7, 4]))