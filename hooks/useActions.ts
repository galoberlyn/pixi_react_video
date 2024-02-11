import { Application } from "pixi.js"

type ActionProps = {
  seconds: number
  alpha: number
  text: Array<{ val: string, sec: number}>
  index: number
  setAlpha: (visibility: number) => void
}

type ResetAnimationProps = {
  setText: (value: React.SetStateAction<string>) => void
  setIndex: (value: React.SetStateAction<number>) => void
  setAlpha: (visibility: number) => void
  text: Array<{ val: string, sec: number}>
  index: number
  alpha: number
}

export const useActions = (videoControls: HTMLVideoElement) => {

  const onPlay = (app: Application) => {
    app.start();
    videoControls.play();
  }

  const onPause = (app: Application) => {
    app.stop();
    videoControls.pause()
  }

  const onMute = (mutedTextRef: React.MutableRefObject<any>) => {
    (mutedTextRef.current as any).text = videoControls.muted ? 'Mute' : 'Unmute';
    videoControls.muted = !videoControls.muted;
  }

  const onScreenshot = async (app: Application, videoContainerRef: any) => {
    app.stop()
    const url = await app.renderer.extract.base64(videoContainerRef.current as any);
    const a: any = document.createElement('a');
    document.body.append(a);
    a.download = 'screenshot';
    a.href = url;
    a.click();
    a.remove();
    app.start();
  }

  const fadeIn = (props: ActionProps) => {
    const { alpha, text, index, setAlpha, seconds } = props;
    if (alpha <= 1 && !videoControls.paused) {
      if (seconds === text[index]?.sec) {
        setAlpha(alpha + 0.04);
      } 
    }
  }

  const fadeOut = (props: ActionProps) => {
    const { seconds, text, index, setAlpha, alpha } = props;
    if (seconds === text[index]?.sec + 2 && !videoControls.paused) {
      setAlpha(alpha - 0.04);
    }
  }

  const resetAnimation = (props: ResetAnimationProps) => {
    const { alpha, setAlpha, index, text, setText, setIndex } = props
    if (Math.floor(alpha) === -1) {
      setAlpha(0);
      setIndex(index + 1);
      setText(text[index + 1]?.val);
    }
  }
  

  return {
    onPlay,
    onPause,
    onMute,
    onScreenshot,
    fadeIn,
    fadeOut,
    resetAnimation
  }


}