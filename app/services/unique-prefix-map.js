import uniqueRandom from 'unique-random'

let rand = uniqueRandom(0, Number.MAX_SAFE_INTEGER)

export default function(map) {
  let salt = rand()

  let result = {}

  Object.keys(map).forEach(key => result[key] = `${salt}:${map[key]}`)

  return result
}
