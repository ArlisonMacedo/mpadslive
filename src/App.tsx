

import './styles/global.css'
import { useState } from 'react'
import Selected from 'react-select'
import { api } from './services/api';
import { customStyles } from './styles/selectStyles';

import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import { ReactPlayer } from './components/ReactPlayer';


interface AudioPlayer {
  src: string;
  none?: null
}

function App() {

  const [songPadFirst, setSongPadFirst] = useState<AudioPlayer>()
  const [songPadSecond, setSongPadSecond] = useState<AudioPlayer>()
  const [isPlaying, setIsPlaying] = useState(0)
  let notesBass = [
    { id: 4, note: "C", },
    { id: 5, note: "C#" },
    { id: 6, note: "D" },
    { id: 7, note: "D#" },
    { id: 8, note: "E" },
    { id: 9, note: "F" }
  ]

  let notesLouds = [
    { id: 10, note: "F#" },
    { id: 11, note: "G" },
    { id: 12, note: "G#" },
    { id: 1, note: "A" },
    { id: 2, note: "A#" },
    { id: 3, note: "B" }
  ]
  const [labelSelected, setLabelSelected] = useState('')
  const [secondLabelSelected, setSecondLabelSelected] = useState('')
  const [volume, setVolume] = useState(0.5)
  const [volumeSecond, setVolumeSecond] = useState(0.5)


  const options = [
    { value: 'ambient_pad', label: 'Ambient Pad' },
    { value: 'agudo_pad', label: 'Agudo Pad' },
    { value: 'guitar_pad', label: 'Guitar Pad' },
  ]

  async function handleValueSelect(value: string) {
    setLabelSelected(value)
  }

  async function handleSecondValueSelect(value: string) {
    setSecondLabelSelected(value)
  }

  // useEffect(() => {

  //   fetch('https://api.npms.io/v2/search?q=react')
  //     .then(response => console.log(response.json()))
  // }, [])



  async function handleOnlyPadAudio(id: number) {
    if (labelSelected) {
      const response = await api.get(`${labelSelected}/${id}`)
      console.log(response.data)
      let songApi = new Audio(response.data.pad_url)
      setSongPadFirst(songApi)
      setIsPlaying(id)
    }
    else if (!labelSelected && !secondLabelSelected) {
      alert('Opsss! Seleione uma biblioteca de timbre')
      return
    }

  }

  async function handleOnlyPadAudioSecond(id: number) {
    if (secondLabelSelected) {
      const response = await api.get(`${secondLabelSelected}/${id}`)
      let songApi = new Audio(response.data.pad_url)
      setSongPadSecond(songApi)
      setIsPlaying(id)
    }
  }

  function onStop() {
    setSongPadFirst({ src: '' })
    setSongPadSecond({ src: '' })
    setIsPlaying(0)
  }

  function onVolumeFirstChanged(value: number) {

    var change = value * 0.01
    if (change > 1) change = 1
    setVolume(change)
    return ''
  }

  function onVolumeSecondChanged(value: number) {
    var change = value * 0.01
    if (change > 1) change = 1
    setVolumeSecond(change)
    return ''
  }

  return (

    <div>
      <div className='w-full p-20 flex justify-around items-center'>

        <div className='flex flex-col'>
          <h1 className='font-inter font-semibold'>CANAL 1</h1>
          <Selected
            options={options} className='text-black font-inter font-semibold'
            onChange={(e) => handleValueSelect(String(e?.value))}
            styles={customStyles}
            placeholder='Selecione um timbre'
          />

        </div>

        <div className='flex flex-col'>
          <h1 className='font-inter font-semibold'>CANAL 2</h1>
          <Selected
            options={options} className='text-black font-inter font-semibold'
            onChange={(e) => handleSecondValueSelect(String(e?.value))}
            styles={customStyles}
            placeholder='Selecione um timbre'
          />

        </div>

      </div>
      <div className='flex flex-cols-2 justify-center items-center'>
        <div>

          <div className='w-[96%] h-20 flex flex-row justify-end items-center my-5'>
            <div className='bg-[#00b5b9] w-[520px] h-20 flex justify-center items-center rounded-lg'>

              {
                labelSelected || secondLabelSelected ?
                  <p className='font-inter text-lg font-bold'>
                    PAD SELECIONADO: <strong>{labelSelected.toUpperCase().split('_')}</strong>
                    {secondLabelSelected && (
                      <strong> {'   '} {secondLabelSelected.toUpperCase().split('_')}</strong>
                    )}
                  </p>
                  : <p className='text-zinc-600 font-inter font-bold text-lg'>NENHUM TIMBRE SELECIONADO</p>
              }
              {/* </p> */}
            </div>
            <div className=''>
              <button className='bg-red-600 w-20 h-20 rounded-lg 
                flex justify-center items-center font-inter font-bold ml-4
                hover:bg-red-500'
                onClick={onStop}
              >
                STOP
              </button>

            </div>

          </div>

          <div className='flex flex-row justify-center items-center px-5'>

            {
              notesBass.map((note, index) => (

                // !isPlaying ? (
                <button
                  key={index}
                  // id={String(index)}
                  onClick={() => {
                    handleOnlyPadAudio(note.id),
                      handleOnlyPadAudioSecond(note.id)
                  }}
                  className={`${(isPlaying === note.id) ? "text-white w-24 h-20 mr-2 rounded-md font-inter font-bold text-4xl bg-[#00b5b9]"
                    : "bg-zinc-400 text-white w-24 h-20 mr-2 rounded-md font-inter font-bold text-4xl"}`}
                >

                  {note.note}
                </button>

              ))
            }
          </div>
          <div className='flex flex-row justify-center items-center px-5 mt-5'>
            {
              notesLouds.map((note, index) => (

                // !isPlaying ? (
                <button key={index} onClick={() => {
                  handleOnlyPadAudio(note.id),
                    handleOnlyPadAudioSecond(note.id)
                }}
                  className={`${(isPlaying === note.id) ? "text-white w-24 h-20 mr-2 rounded-md font-inter font-bold text-4xl bg-[#00b5b9]"
                    : "bg-zinc-400 text-white w-24 h-20 mr-2 rounded-md font-inter font-bold text-4xl"}`}
                >
                  {note.note}
                </button>

              ))
            }

          </div>
        </div>

        <div className='grid grid-cols-2'>
          <div className='flex flex-col justify-center items-center w-52 '>
            <p className='text-base font-bold font-inter mb-2'>Canal 1</p>
            <Box sx={{ height: 300 }}>
              <Slider
                aria-label='Temperature'
                getAriaValueText={(value: number) => onVolumeFirstChanged(value)}
                defaultValue={50}
                orientation='vertical'
                valueLabelDisplay="auto"
                step={10}
                min={0}
                max={100}
              />
            </Box>
          </div>
          <div className='flex flex-col justify-center items-center w-52 -mx-20'>
            <p className='text-base font-bold font-inter mb-2'>Canal 2</p>
            <Box sx={{ height: 300 }}>
              <Slider
                aria-label='Temperature'
                getAriaValueText={(value: number) => onVolumeSecondChanged(value)}
                defaultValue={50}
                orientation='vertical'
                valueLabelDisplay="auto"
                step={10}
                min={0}
                max={100}
              />
            </Box>
          </div>
        </div>


      </div>

      <footer className='w-full flex justify-center items-start py-7'>
        <h1 className='font-poppins font-bold text-3xl'>MPADS LIVE</h1>
      </footer>


      <ReactPlayer
        src={`${songPadFirst?.src ? songPadFirst.src : undefined}`}
        volume={volume}
      />

      <ReactPlayer
        src={`${songPadSecond?.src ? songPadSecond.src : undefined}`}
        volume={volumeSecond}
      />

    </div>
  )
}

export default App
