'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
import parse, { domToReact } from 'html-react-parser';

export function TextAnimation({ text, className = 'text-xl sm:text-4xl md:text-6xl font-bold tracking-tighter', duration = 0.5, delayFactor = 0.1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-x-1">
      {parse(text, {
        replace: (node, i) => {
          if (node.type === 'text' && node.data.trim() !== '') {
            return node.data.split('').map((char, index) => (
              <motion.span
                key={`${i}-${index}`}
                initial={{ opacity: 0, x: -18 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration, delay: (i + index) * delayFactor }}
                className={className}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ));
          }
          if (node.name === 'br') {
            return <br key={i} />;
          }
          if (node.name === 'span') {
            return (
              <span key={i} className={node.attribs.class}>
                {domToReact(node.children, {
                  replace: (childNode) =>
                    childNode.type === 'text' ? (
                      childNode.data.split('').map((char, index) => (
                        <motion.span
                          key={`${i}-${index}`}
                          initial={{ opacity: 0, x: -18 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration, delay: (i + index) * delayFactor }}
                          className={className}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))
                    ) : (
                      domToReact(childNode)
                    ),
                })}
              </span>
            );
          }
        },
      })}
    </div>
  );
}
