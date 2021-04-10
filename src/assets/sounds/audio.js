import { Howl } from 'howler'

import timesUp from './timesUp.flac'
import end from './end.wav'
import back from './back.wav'
import exit from './exit.wav'
import start from './start.flac'

const timesUpSound = new Howl({
  src: [timesUp],
  volume: 0.1,
})

const endSound = new Howl({
  src: [end],
  volume: 5,
})

const backSound = new Howl({
  src: [back],
  volume: 0.5,
})

const exitSound = new Howl({
  src: [exit],
  volume: 0.2,
})

const startSound = new Howl({
  src: [start],
  rate: 0.9,
  volume: 0.6,
})

export { backSound, endSound, timesUpSound, exitSound, startSound }
