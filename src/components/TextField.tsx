import React from 'react';

const TextField = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) => {
  return (
    <input
      className="w-full p-2 text-base bg-slate-50 border-blue-100 hover:border-blue-200 focus:border-blue-400 border rounded-md"
      {...props}
    />
  );
};

export default TextField;
