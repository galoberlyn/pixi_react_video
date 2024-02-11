import { Container } from "@pixi/react"
import { TextSprite } from "../components/TextSprite"
import { Application, Container as PIXICont, DisplayObject } from "pixi.js"


type ActionContainerType = {
  textXposition: number,
  app: Application,
  videoContainerRef: React.RefObject<PIXICont<DisplayObject>>
  onPlay: (app: Application) => void,
  onPause: (app: Application) => void,
  onMute: (ref: React.MutableRefObject<any>) => void
  mutedTextRef: React.MutableRefObject<any>
  onScreenshot: (app: Application, videoContainerRef: React.MutableRefObject<any>) => void
}

export const ActionContainers = ({
  textXposition,
  app,
  videoContainerRef,
  onPlay,
  onPause,
  onMute,
  mutedTextRef,
  onScreenshot
}: ActionContainerType) => {
  
  return (
    <Container>
      <TextSprite
        position={{ x: textXposition, y: app.screen.y + 200 }}
        text="Play"
        onClick={() => onPlay(app)}
      />
      <TextSprite
        position={{ x: textXposition, y: app.screen.y + 250 }}
        text="Pause"
        onClick={() => onPause(app)}
      />
      <TextSprite
        position={{ x: textXposition, y: app.screen.y + 300 }}
        text={'Mute'}
        onClick={() => onMute(mutedTextRef)}
        ref={mutedTextRef}
      />
      <TextSprite
        position={{ x: textXposition, y: app.screen.y + 350 }}
        text="Screenshot"
        onClick={() => onScreenshot(app, videoContainerRef)} 
      />
    </Container>
  )
}