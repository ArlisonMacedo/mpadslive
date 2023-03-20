

import './styles/global.css'
import React, { useState } from 'react'
import Selected from 'react-select'
import { api } from './services/api';
import { customStyles } from './styles/selectStyles';

import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import { ReactPlayer } from './components/ReactPlayer';

import D from './media/D.mp3'
import { Adsense } from '@ctrl/react-adsense';


interface AudioPlayer {
  src: string;
  // none?: null
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  function handleValueSelect(value: string) {
    setLabelSelected(value)

  }

  function handleSecondValueSelect(value: string) {
    setSecondLabelSelected(value)
  }


  async function handleOnlyPadAudio(id: number) {

    if (labelSelected) {
      const response = await api.get(`${labelSelected}/${id}`)
      var url = response.data.pad_url
      setSongPadFirst(new Audio(url))

      setIsPlaying(id)
    }
    if (!labelSelected && !secondLabelSelected) {
      alert('Opsss! Seleione uma biblioteca de timbre')
      return
    }


  }

  async function handleOnlyPadAudioSecond(id: number) {
    // console.log(secondLabelSelected)
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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined;


  return (

    <div>
      <div className='flex justify-center items-cente '>
        <div className='w-full mt-6 h-1 p-20 flex justify-around items-center bg-[#00000A]'>

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
      </div>

      <div className='flex flex-cols-2 justify-center items-center mt-8'>
        <div>

          <div className='w-[96%] h-20 flex flex-row justify-end items-center my-5'>
            <div className='bg-[#0074b8] w-[520px] h-20 flex justify-center items-center rounded-lg'>

              {
                labelSelected || secondLabelSelected ?
                  <p className='font-inter text-[16px] font-bold'>
                    PAD SELECIONADO: <strong>{labelSelected.toUpperCase().split('_')}</strong>
                    {secondLabelSelected && (
                      <strong> {'   '} {secondLabelSelected.toUpperCase().split('_')}</strong>
                    )}
                  </p>
                  : <p className='text-zinc-600 font-inter font-bold text-lg'>NENHUM TIMBRE SELECIONADO</p>
              }
              {/* </p> */}
            </div>
            <div className='flex flex-row'>

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
                  aria-describedby={id}
                  type="button"
                  key={index}
                  // id={String(index)}
                  onClick={() => {
                    handleOnlyPadAudio(note.id),
                      handleOnlyPadAudioSecond(note.id),
                      handleClick
                  }}
                  className={`${(isPlaying === note.id) ? "text-white w-24 h-20 mr-2 rounded-md font-inter font-bold text-4xl bg-[#0074b8]"
                    : "bg-[#333333] text-white w-24 h-20 mr-2 rounded-md font-inter font-bold text-4xl"}`}
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
                  className={`${(isPlaying === note.id) ? "text-white w-24 h-20 mr-2 rounded-md font-inter font-bold text-4xl bg-[#0074b8]"
                    : "bg-[#333333] text-white w-24 h-20 mr-2 rounded-md font-inter font-bold text-4xl"}`}
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
          <Adsense
            client='ca-pub-4161062064793325'
            slot=''
            style={{ display: 'block' }}
            layout='in-article'
            format='fluid'
          />
        </div>


      </div>

      <footer className='w-3/5 flex justify-start items-end pl-32 ml-10'>
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
