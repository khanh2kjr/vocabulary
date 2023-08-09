import { VolumeUp } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const TextToSpeech = ({ text }) => {
  const classes = useStyles()

  const [voice, setVoice] = useState(null)

  useEffect(() => {
    const synth = window.speechSynthesis
    synth.addEventListener('voiceschanged', () => {
      const voices = synth.getVoices()
      setVoice(voices[0])
    })
  }, [text])

  const handlePlay = () => {
    const utterance = new SpeechSynthesisUtterance(text)
    const synth = window.speechSynthesis
    const voices = synth.getVoices()
    utterance.voice = voice || voices[0]
    utterance.pitch = 1
    utterance.rate = 0.8
    utterance.volume = 2
    synth.speak(utterance)
  }

  return (
    <Box className={classes.RootTextToSpeech}>
      <Box>{text}</Box>
      <IconButton onClick={handlePlay}>
        <VolumeUp sx={{ cursor: 'pointer' }} className="svg-icon" />
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
  },
}))

export default TextToSpeech
