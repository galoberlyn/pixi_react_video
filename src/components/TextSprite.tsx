import { forwardRef } from 'react';
import { Text } from '@pixi/react';

type TextSprite = {
  position: { x: number, y: number }
  text: string
  onClick: () => void
  ref?: any
}

export const TextSprite = forwardRef((props: TextSprite, ref: any) => {

  const { text, position, onClick } = props;

    return (
      <Text
        text={text}
        x={position.x}
        y={position.y}
        anchor={0.5}
        pointerdown={onClick}
        eventMode="static"
        ref={ref}
        data-test="action:text"
      />
    )
})
