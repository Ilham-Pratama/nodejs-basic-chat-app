import React from 'react';

interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  compact?: boolean;
}

function Button(props: IButton) {
  const isCompact = props.compact ? 'py-1 px-2 text-base font-medium' : '';
  return (
    <button
      {...props}
      className={`bg-blue-500 hover:bg-blue-400 focus:bg-blue-300 rounded-md px-4 py-2 text-lg font-semibold text-white ${isCompact}`}
    />
  );
}

export default Button;
