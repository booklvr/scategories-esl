import { CHANGE_LETTER, LOAD_ALPHABET } from '../constants/alphabetConstants'

export const loadLetters = (size) => (dispatch, getState) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  // const commonLetters = 'toiswcbphfmderlnagukvyjqxz'
  const easyO = 'toiswcbphfmder'
  const mediumO = 'lnagukvy'
  const hardO = 'jqxz'

  let easyN, mediumN, hardN

  hardN = size > 25 ? 4 : size > 23 ? 3 : size > 20 ? 2 : size > 11 ? 1 : 0
  mediumN = Math.floor(size * 0.33)
  easyN = size - (hardN + mediumN)

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

  const easyLetters = getLetters(easyO, easyN)
  const mediumLetters = getLetters(mediumO, mediumN)
  const hardLetters = getLetters(hardO, hardN)

  const randomLetters = [...easyLetters, ...mediumLetters, ...hardLetters]

  dispatch({ type: LOAD_ALPHABET, payload: randomLetters })
  localStorage.setItem('alphabet', JSON.stringify(getState().alphabet))
  localStorage.setItem('teams', JSON.stringify(getState().teams))
}

export const changeLetter = (letter, index) => (dispatch, getState) => {
  dispatch({ type: CHANGE_LETTER, payload: { letter, index } })
  localStorage.setItem('alphabet', JSON.stringify(getState().alphabet))
}


