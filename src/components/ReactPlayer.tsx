
import ReactAudioPlayer from "react-audio-player";
import ReactHowler from "react-howler";


interface ReactPlayerProps {
  src: string;
  volume?: number;
}


export function ReactPlayer(props: ReactPlayerProps) {

  return (
    <ReactHowler
      src={`${props.src}`}
      playing
      loop
      format={['mp3']}
      volume={props.volume}
    />

  )
}