'use client';

import { type FC } from 'react';
import dynamic from 'next/dynamic';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { useControllableValue } from '@/hooks/use-controllable-value';
import { cn } from '@/lib/utils';

interface EmojiPickerProps {
  defaultValue: string;
  value?: string;
  onChange?: (emoji: string) => void;
  disabled?: boolean;
  className?: string;
}

export const EmojiPicker: FC<EmojiPickerProps> = ({
  defaultValue,
  value,
  onChange,
  disabled,
  className,
}) => {
  const [emoji, setEmoji] = useControllableValue({ defaultValue, value, onChange });
  const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

  return (
    <div className="flex items-center">
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger disabled={disabled} className={cn('cursor-pointer', className)}>
          {emoji}
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content sideOffset={10}>
            <Picker
              onEmojiClick={({ emoji }) => {
                setEmoji(emoji);
              }}
              width={300}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
};
