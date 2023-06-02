import React from 'react';

type Props = React.ComponentPropsWithoutRef<'button'>;

function Button({ children, className = '', ...props }: React.PropsWithChildren<Props>): JSX.Element {
  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  );
}

export default Button;
