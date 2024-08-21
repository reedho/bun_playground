import { Effect } from 'effect'

const x = Effect.succeed(1)
const y = Effect.fail(new Error('unable to process'))

// console.log("Hello via Bun!");
// console.log(x)
// console.log(y)

Effect.runPromise(x).then(console.log)
// Effect.runPromise(y).then(console.log)

