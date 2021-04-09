import { Howl } from 'howler'
// import {useSelector} from 'react-redux'
// const startSound = new Audio('../../audio/start')
// import correct from '../../audio/correct.wav'
import next from './next.wav'
import timesUp from './timesUp.flac'
import end from './end.wav'

// const correctSound = new Howl({
//   src: [correct],
//   volume: 0.5,
// })

const nextSound = new Howl({
  src: [next],
  volume: 0.7,
})

const timesUpSound = new Howl({
  src: [timesUp],
  volume: 0.1,
})

const endSound = new Howl({
  src: [end],
  volume: 5,
})

// const skipSound = new Howl({
//   src: ['../../audio/skip.mp3'],
//   volume: 0.7,
//   rate: 1.5,
// })

// const backSound = new Howl({
//   src: ['../../audio/back.wav'],
//   volume: 0.5,
// })

// const exitSound = new Howl({
//   src: ['../../audio/exit.wav'],
//   volume: 0.2,
// })

// const startSound = new Howl({
//   src: ['../../audio/start.wav'],
//   rate: 0.9,
//   volume: 0.6,
// })

// const startBellSound = new Howl({
//   src: ['../../audio/startBell.flac'],
//   volume: 1,
// })

// const correctSound = new Audio('../../audio/correct.wav')

export {
  // correctSound,
  // skipSound,
  // backSound,
  endSound,
  nextSound,
  timesUpSound,
  // exitSound,
  // startSound,
  // startBellSound,
}
