// import { foo } from './module-one'

// console.log(foo)

// setTimeout(() => { console.log(foo) }, 500)

import { foo } from './module-one'

export function bar () {
  if (Math.random() > 0.5) return
  foo()
  console.log('bar done')
}