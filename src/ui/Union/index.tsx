import { useEffect, useRef, useState } from 'react';

import type { FC } from 'react';

import type { IUnionRef, IUnionState } from './types';

import { getUnionSize } from './utils';

const Union: FC<any> = function () {
  const unionRef          = useRef<IUnionRef>(null);
  const [state, setState] = useState<IUnionState>({
    el:     null,
    height: 163,
    path:   `
            M63.5773 1.77903
            C29.4982 9.28565 4 39.6651 4 76
            V79
            C4 120.974 38.0264 155 80 155
            H83
            C100.471 155 116.565 149.105 129.402 139.195
            C154.037 120.177 179.547 95 210.669 95 
            H1283.5
            C 1312.73 95 1334 73.7335 1334 47.5
            C1334 21.2665 1312.73 0 1283.5 0
            H76.5
            C72.0205 0 67.6859 0.620058 63.5773 1.77903
            Z
          `,
    width:  1338,
  });

  function calculateUnion() {
    const {el, ...size} = state;

    if (el) {
      const {height, path, width} = getUnionSize(el, size);

      if (size.height !== height || size.width !== width) {
        setState(({el}) => ({el, height, path, width}));
      }
    }
  }

  useEffect(() => {
    const {el, ...size} = state;

    if (!el && unionRef.current) {
      setState({
        el: unionRef.current,
        ...getUnionSize(unionRef.current, size),
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', calculateUnion);
      window.addEventListener('orientationchange', calculateUnion);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', calculateUnion);
        window.removeEventListener('orientationchange', calculateUnion);
      }
    };
  }, [calculateUnion, unionRef]);

  return (
    <svg
      className={'union'}
      fill={'none'}
      height={state.height}
      ref={unionRef}
      viewBox={`0 0 ${state.width} ${state.height}`}
      width={state.width}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <g filter={'url(#filter)'}>
        <path
          d={state.path}
          fill={'white'}
        />
      </g>
      <defs>
        <filter
          id={'filter'}
          x={0}
          y={0}
          width={state.width}
          height={state.height}
          filterUnits={'userSpaceOnUse'}
          colorInterpolationFilters={'sRGB'}
        >
          <feFlood floodOpacity={0} result={'BackgroundImageFix'} />
          <feColorMatrix
            in={'SourceAlpha'}
            type={'matrix'}
            values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'}
            result={'hardAlpha'}
          />
          <feOffset dy={'4'} />
          <feGaussianBlur stdDeviation={'2'} />
          <feComposite in2={'hardAlpha'} operator={'out'} />
          <feColorMatrix
            type={'matrix'}
            values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'}
          />
          <feBlend
            mode={'normal'}
            in2={'BackgroundImageFix'}
            result={'dropShadow'}
          />
          <feBlend
            mode={'normal'}
            in={'SourceGraphic'}
            in2={'dropShadow'}
            result={'shape'}
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Union;