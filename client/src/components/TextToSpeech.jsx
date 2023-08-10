import { VolumeMute, VolumeUp } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const TextToSpeech = ({ text }) => {
  const classes = useStyles()

  const [voice, setVoice] = useState(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    setPlaying(true)
    const utterance = new SpeechSynthesisUtterance(text)
    const synth = window.speechSynthesis
    const voices = synth.getVoices()
    utterance.voice = voice || voices.find(voice => voice.lang === 'en-GB') || voices[0]
    utterance.pitch = 1
    utterance.rate = 0.8
    utterance.volume = 2
    utterance.onend = () => {
      setPlaying(false)
    }
    synth.speak(utterance)
  }

  useEffect(() => {
    const synth = window.speechSynthesis
    synth.addEventListener('voiceschanged', () => {
      const voices = synth.getVoices()
      setVoice(voices.find(voice => voice.lang === 'en-GB') || voices[0])
    })
  }, [text])

  return (
    <Box className={classes.RootTextToSpeech}>
      <Box>{text}</Box>
      <IconButton onClick={handlePlay} disabled={playing}>
        {playing ? (
          <VolumeUp className="svg-icon" sx={{ cursor: 'pointer', color: '#dcdcdc' }} />
        ) : (
          <VolumeMute sx={{ color: playing ? '#dcdcdc' : '' }} className="svg-icon" />
        )}
      </IconButton>
    </Box>
  )
}

TextToSpeech.propTypes = {
  text: PropTypes.string.isRequired,
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
