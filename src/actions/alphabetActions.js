import { LOAD_ALPHABET } from '../constants/alphabetConstants'

export const loadLetters = (size) => (dispatch, getState) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'

  const getLetters = ([...array], size) => {
    let m = array.length
    let n = size
    let t, i

    // While there remain elements to shuffle…
    while (n) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--)

      // And swap it with the current element.
      t = array[m]
      array[m] = array[i]
      array[i] = t
      n--
    }

    return array.slice(array.length - size)
  }

  const randomLetters = getLetters(alphabet, size)

  dispatch({ type: LOAD_ALPHABET, payload: randomLetters })
  localStorage.setItem('alphabet', JSON.stringify(getState().alphabet))
}
