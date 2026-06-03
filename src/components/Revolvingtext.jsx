"use client";
import { TypeAnimation } from 'react-type-animation';

export default function Revolvingtext({ text }) {
  const words = [
    'Fun',
    'Adventure',
    'Mystery',
    'Excitement',
    'Thrill'
  ];
  
  const sequence = words.reduce((acc, curr) => [...acc, curr, 2000], []);

  return (
    <h1 className="flex justify-center items-center h-screen text-4xl font-bold sec-head text-transform-uppercase rev-text">
      <span className="whitespace-nowrap">{text}</span>

      <span className="relative inline-block w-[160px] ml-2 rev-span-wrapper">
        <TypeAnimation
          sequence={sequence}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="left-0 top-0 w-full text-center yellow-text rev-span"
        />
      </span>
    </h1>
  );
}
