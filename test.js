// function convert (array) {
//   let sample = array[0]
//   let tmp
//   let index

//   for (let i = 1; i < array.length; i++) {
//     if (tmp !== undefined) {
//       if (sample < array[i] && array[i] < tmp) {
//         console.log('sample', sample)
//         console.log('array', array[i])
//         console.log('tmp', tmp)
//         tmp = array[i]
//         index = i
//       }
//     } else {
//       if (sample < array[i]) {
//         tmp = array[i]
//         index = i
//       }
//     }
//   }
//   return index
// }

// convert([6, 9, 8, 7, 6, 5, 4])

const a = [1]
const b = a.reduce((pre, next) => {
  debugger
  console.log(pre)
  return pre + 1
}, 2)
console.log(b)