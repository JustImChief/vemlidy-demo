import type { ComponentProps, FC } from 'react';

import './scss/style.scss';

const Button: FC<ComponentProps<'button'>> = function (props) {
  return (
    <button
      type={'button'}
      {...props}
    />
  );
};

export default Button;