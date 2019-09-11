// export let foo = 'initial'

// setTimeout(() => { foo = 'jack' }, 100)
import { bar } from './module-two'

export function foo () {
  bar()
  console.log('done')
}

foo()