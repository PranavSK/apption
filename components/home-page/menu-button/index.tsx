'use client';

import { type FC, useState } from 'react';
import { animated, config as springConfig, useSpring } from 'react-spring';

import { Button, type ButtonProps } from '@/components/ui/button';

interface MenuButtonProps extends Omit<ButtonProps, 'size' | 'variant'> {}

const hideDelay = 100;
const rotateConfig = springConfig.stiff;

export const MenuButton: FC<MenuButtonProps> = ({ onClick, ...props }) => {
  const [state, setState] = useState<'open' | 'closed'>('closed');
  const topRectStyle = useSpring({
    to: async (next) => {
      await next({ translateX: 0, translateY: 4, rotate: 0, config: { duration: hideDelay } });
      await next({
        translateX: state === 'open' ? 2 : 0,
        translateY: state === 'open' ? 4 : 0,
        rotate: state === 'open' ? -45 : 0,
        width: state === 'open' ? 15.8 : 13,
        config: rotateConfig,
      });
    },
  });
  const middleRectStyle = useSpring({
    to: async (next) => {
      await next({
        opacity: state === 'open' ? 0 : 1,
        // delay when state changed to closed
        delay: state === 'closed' ? hideDelay : 0,
        config: { duration: hideDelay },
      });
    },
  });
  const bottomRectStyle = useSpring({
    to: async (next) => {
      await next({ translateX: 0, translateY: -4, rotate: 0, config: { duration: hideDelay } });
      await next({
        translateX: state === 'open' ? 2 : 0,
        translateY: state === 'open' ? -4 : 0,
        rotate: state === 'open' ? 45 : 0,
        width: state === 'open' ? 15.8 : 13,
        config: rotateConfig,
      });
    },
  });
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={(e) => {
        setState(state === 'open' ? 'closed' : 'open');
        onClick?.(e);
      }}
      {...props}
    >
      <svg
        className="h-6 w-6 overflow-visible"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.rect
          className="origin-center [transform-box:'fill-box']"
          style={topRectStyle}
          x="1"
          y="3"
          width="13"
          height="1"
          rx="0.5"
          fill="currentColor"
        />
        <animated.rect
          className="origin-center [transform-box:'fill-box']"
          style={middleRectStyle}
          x="1"
          y="7"
          width="13"
          height="1"
          rx="0.5"
          fill="currentColor"
        />
        <animated.rect
          className="origin-center [transform-box:'fill-box']"
          style={bottomRectStyle}
          x="1"
          y="11"
          width="13"
          height="1"
          rx="0.5"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
};
