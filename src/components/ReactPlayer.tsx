import { useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";


interface ReactPlayerProps {
  src: string;
  volume?: number
}


export function ReactPlayer(props: ReactPlayerProps) {

  // useEffect(() => {
  //   console.log(props.volume)
  // }, [props.volume])


  return (
    <ReactAudioPlayer
      id="audioPlay"
      src={props.src}
      autoPlay
      loop
      preload='auto'
      className="bg-transparent hidden"
      controlsList="nodownload"
      controls
      volume={props.volume}
      style={{
        display: "none"
      }}
    />

  )
}