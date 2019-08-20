function bucketSort (array) {
  let max = array[0]
  let min = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) max = array[i]
    if (array[i] < min) min = array[i]
  }

  const differ = max - min

  const buckets = new Array(array.length)
  for (let i = 0; i < array.length; i++) {
    const index = Math.floor((array[i] - min) / differ * (buckets.length - 1))   // important
    buckets[index] ? buckets[index].add(new LinkNode(array[i])) : buckets[index] = new Link(new LinkNode(array[i]))
  }

  const result = []
  for (let i = 0; i < buckets.length; i++) {
    let current = buckets[i] && buckets[i].head
    while (current) {
      result.push(current.value)
      current = current.next
    }
  }

  console.log(result)
  return result
}

class Link {
  constructor (node) {
    this.head = node
  }

  add (node) {
    const tmp = node.value
    let current = this.head
    let parent = null
    while (current && tmp > current.value) {
      parent = current
      current = current.next
    }

    if (current === this.head) {
      this.head = node
      this.head.next = current
    } else {
      parent.next = node
      node.next = current
    }
  }
}

class LinkNode {
  constructor (value) {
    this.value = value
    this.next = null
  }
}


bucketSort([1, 7, 18, 8, 14, 9, 2])