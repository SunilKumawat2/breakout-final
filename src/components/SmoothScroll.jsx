'use client'
import { useState, useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
// import LoadingAnimation from './LoadingAnimation';

// Loader Component
const Loader = () => {
  return <div></div>;
};

function SmoothScrolling({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for content to load
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust timing based on your content

    return () => clearTimeout(timeout);
  }, []);

  // Handle smooth scrolling behavior
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = 'smooth';

    return () => {
      html.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Loader />
      {!isLoading && (
        <ReactLenis
          root
          options={{
            lerp: 0.08, // Adjusted smoothness for better Chrome compatibility
            duration: 1.5, // Adjusted duration for smoother transition
            smoothTouch: true, // Enables smooth scrolling on touch devices
            scrollDisabled: false, // Allows scrolling (set to true to disable)
            // syncTouch: true
          }}
        >
          {children}
        </ReactLenis>
      )}
    </>
  );
}


export default SmoothScrolling;
