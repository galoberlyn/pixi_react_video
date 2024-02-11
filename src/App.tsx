import { Container, Stage, Sprite, AppConsumer, Text, PixiRef, useTick } from "@pixi/react"
import * as PIXI from 'pixi.js';
import video from './assets/videoplayback.mp4';
import { useRef, useState } from "react";
import { useActions } from "../hooks/useActions";
import { TextSprite } from "./components/TextSprite";
import { ActionContainers } from "./containers/ActionContainers";

function App() {

  const videoResource = new PIXI.VideoResource(video, { autoPlay: false });
  const videoTexture = PIXI.Texture.from(videoResource as any);
  const videoControls: HTMLVideoElement = (videoTexture.baseTexture.resource as any).source;
  const videoContainerRef = useRef<PixiRef<typeof Container>>(null);
  const mutedTextRef = useRef<PixiRef<typeof TextSprite>>();
  const { 
    onPlay, 
    onPause, 
    onMute, 
    onScreenshot, 
    fadeIn, 
    fadeOut, 
    resetAnimation 
  } = useActions(videoControls); 

  
  const FadeInOutText = ({ y, x }: any) => {

    const [alpha, setAlpha] = useState(0);
  
    const text = [
      { val: 'It’s a mindset', sec: 2 },
      { val: 'A focus', sec: 5},
      { val: 'A deep seated spirit.', sec: 8 },
      { val: 'It’s confidence', sec: 11 },
      { val: 'It’s belief', sec: 14 },
      { val: 'It’s a way of life', sec: 17},
      { val: 'It’s Nike ✓™', sec: 20},
    ];
    
    const [displayedText, setText] = useState(text[0].val);
    const [index, setIndex] = useState(0);
  
    useTick((_delta, ticker) => {

      if (index <= text.length ) {
        if (videoControls.paused) {
          ticker.started = false;
        }

        const seconds = Math.floor(ticker.lastTime / 1000);

        
        fadeIn({
          alpha,
          seconds,
          setAlpha,
          text,
          index
        })

        fadeOut({
          seconds,
          text,
          index,
          setAlpha,
          alpha
        })

        resetAnimation({
          setAlpha,
          setIndex,
          setText,
          alpha,
          text,
          index
        })

        if (Math.floor(alpha) === -1) {
          setAlpha(0);
          setIndex(index + 1);
          setText(text[index + 1]?.val);
        }

      }


    })
  
    return (
      <Text
        x={x}
        y={y}
        anchor={{ x: 0.5, y: 0.5}}
        text={displayedText}
        alpha={alpha}
        style={
          new PIXI.TextStyle({
            fill: 'white',
            fontSize: 30,
            stroke: 'black',
            strokeThickness: 5
          })
        }
      />
    )
  }
  

  return (
    <Stage options={{ backgroundColor: 0xeef1f5 }}>
      <AppConsumer>
        {(app) => {
          (window as any).pixiApp = app;
          app.resizeTo = window
          const centerSettings = {
            centerX: app.screen.width / 2,
            centerY: app.screen.height / 2,
          }
          const { centerX, centerY } = centerSettings;
          const textXposition = app.screen.x + 200;

          return (
            <>
              <Container ref={videoContainerRef}>
                <Sprite
                  x={centerX}
                  y={centerY}
                  anchor={{ x: 0.5, y: 0.5}}
                  texture={videoTexture}
                  eventMode="static"
                />
                <FadeInOutText 
                  x={centerX}
                  y={centerY}
                />
              </Container>
              <ActionContainers
                textXposition={textXposition}
                app={app}
                videoContainerRef={videoContainerRef}
                onPlay={onPlay}
                onPause={onPause}
                onMute={onMute}
                mutedTextRef={mutedTextRef}
                onScreenshot={onScreenshot}
              />
            </>
          )
        }}
      </AppConsumer>
    </Stage>
  )
}

export default App
