'use client';

import { cn } from '@/lib/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { FC, forwardRef, Fragment, RefObject, useEffect, useState } from 'react';

interface Props {
  min: number;
  max: number;
  step: number;
  className?: string;
  value?: number[] | readonly number[];
  formatLabel?: (value: number) => string;
  onValueChange?: (values: number[]) => void;
}

const RangeSlider: FC<Props> = forwardRef(({ className, min, max, step, formatLabel, value, onValueChange, ...props }, ref) => {
  const initialValue = Array.isArray(value) ? value : [min, max];
  const [localValues, setLocalValues] = useState(initialValue);

  const handleValueChange = (newValues: number[]) => {
    setLocalValues(newValues);
    if (onValueChange) {
      onValueChange(newValues);
    }
  };

  useEffect(() => {
    setLocalValues(Array.isArray(value) ? value : [min, max]);
  }, [min, max, value]);

  return (
    <SliderPrimitive.Root
      ref={ref as RefObject<HTMLDivElement>}
      min={min}
      max={max}
      step={step}
      value={localValues}
      onValueChange={handleValueChange}
      className={cn('relative flex w-full touch-none select-none mb-6 items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className='relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20'>
        <SliderPrimitive.Range className='absolute h-full bg-primary' />
      </SliderPrimitive.Track>

      {localValues.map((value, index) => (
        <Fragment key={index}>
          <div
            className='absolute text-center'
            style={{
              left: `calc(${((value - min) / (max - min)) * 100}% + 0px)`,
              top: `10px`,
            }}
          >
            <span className='text-sm'>{formatLabel ? formatLabel(value) : value}</span>
          </div>

          <SliderPrimitive.Thumb className='block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50' />
        </Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});

RangeSlider.displayName = SliderPrimitive.Root.displayName;

export { RangeSlider };
