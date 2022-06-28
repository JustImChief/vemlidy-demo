export function getUnionSize(el: SVGSVGElement, defaultValue: {height: number, path: string, width: number}) {
  const parent = el.parentElement;

  if (parent) {
    const {screen}                    = window;
    const {paddingLeft, paddingRight} = getComputedStyle(parent);

    const left        = parseInt(paddingLeft) || 0;
    const right       = parseInt(paddingRight) || 0;
    const height      = screen.width < 576 ? 100 : screen.width < 992 ? 120 : 163;
    const coefficient = 163 / height;
    const width       = parent.offsetWidth - left - right;
    const pH          = width - 54.5 / coefficient;
    const pC          = width - 25.27 / coefficient;
    const pV          = width - 4 / coefficient;

    return {
      height,
      path: `
            M${63.5773 / coefficient} ${1.77903 / coefficient}
            C${29.4982 / coefficient} ${9.28565 / coefficient} ${4 / coefficient} ${39.6651 / coefficient} ${4 / coefficient} ${76 / coefficient}
            V${79 / coefficient}
            C4 ${120.974 / coefficient} ${38.0264 / coefficient} ${155 / coefficient} ${80 / coefficient} ${155 / coefficient}
            H${83 / coefficient}
            C${100.471 / coefficient} ${155 / coefficient} ${116.565 / coefficient} ${149.105 / coefficient} ${129.402 / coefficient} ${139.195 / coefficient}
            C${154.037 / coefficient} ${120.177 / coefficient} ${179.547 / coefficient} ${95 / coefficient} ${210.669 / coefficient} ${95 / coefficient} 
            H${pH} 
            C ${pC} ${95 / coefficient} ${pV} ${73.7335 / coefficient} ${pV} ${47.5 / coefficient}
            C${pV} ${21.2665 / coefficient} ${pC} 0 ${pH} 0
            H${76.5 / coefficient}
            C${72.0205 / coefficient} 0 ${67.6859 / coefficient} ${0.620058 / coefficient} ${63.5773 / coefficient} ${1.77903 / coefficient}
            Z
          `,
      width,
    };
  }

  return defaultValue;
}