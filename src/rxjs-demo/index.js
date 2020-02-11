const { Observable } = require('rxjs/Observable')

const onSubscribe = observer => {
  observer.next(1)
  observer.next(2)
  observer.next(3)
}

const source = new Observable(onSubscribe)
console.log('subscribe start')
source.subscribe({
  next (item) {
    console.log(item)
  }
})

console.log('subscribe end')
