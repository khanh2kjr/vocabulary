import { VolumeMute, VolumeUp } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

const TextToSpeech = ({ text, onPlay, playCounter }) => {
  const classes = useStyles()

  const [voice, setVoice] = useState(null)

  const synthRef = useRef(null)

  const handlePlay = event => {
    event.nativeEvent.stopImmediatePropagation()
    event.stopPropagation()
    stopSpeech()
    const utterance = new SpeechSynthesisUtterance(text)
    const synth = window.speechSynthesis
    synthRef.current = synth
    const voices = synth.getVoices()
    utterance.voice = voice || voices.find(voice => voice.lang === 'en-GB') || voices[0]
    utterance.pitch = 1
    utterance.rate = 0.8
    utterance.volume = 2
    synth.speak(utterance)
    !!onPlay && onPlay()
  }

  const stopSpeech = () => {
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.cancel()
    }
  }

  useEffect(() => {
    const synth = window.speechSynthesis
    synth.addEventListener('voiceschanged', () => {
      const voices = synth.getVoices()
      setVoice(voices.find(voice => voice.lang === 'en-GB') || voices[0])
    })
    return () => {
      stopSpeech()
    }
  }, [text])

  useEffect(() => {
    if (playCounter) {
      stopSpeech()
    }
  }, [playCounter])

  return (
    <Box className={classes.RootTextToSpeech}>
      <Box>{text}</Box>
      <IconButton onClick={e => handlePlay(e)}>
        <VolumeUp className="svg-icon" sx={{ cursor: 'pointer' }} />
      </IconButton>
    </Box>
  )
}

TextToSpeech.propTypes = {
  text: PropTypes.string.isRequired,
  onPlay: PropTypes.func,
  playCounter: PropTypes.number,
}

const useStyles = makeStyles(theme => ({
  RootTextToSpeech: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    fontWeight: 700,
  },
}))

export default TextToSpeech
