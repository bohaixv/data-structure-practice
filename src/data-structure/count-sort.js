function countSort (array) {
  const countQueue = new Array(array.length)

  for (let i = 0; i < array.length; i++) {
    countQueue[array[i]] = 1
  }

  const result = []
  for (let j = 0; j < countQueue.length; j++) {
    countQueue[j] && result.push(j)
  }

  return result
}

console.log(countSort([1, 8, 3, 6, 9, 0, 7]))