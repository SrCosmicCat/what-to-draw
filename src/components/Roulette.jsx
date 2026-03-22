import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Roulette.css';

export const Roulette = ({ words, isSpinning, onComplete, label, selectedWord }) => {
  const [displayWord, setDisplayWord] = useState('');

  useEffect(() => {
    // Si no está girando pero hay una palabra seleccionada, mostrarla
    if (!isSpinning && selectedWord) {
      setDisplayWord(selectedWord);
      return;
    }

    if (!isSpinning || words.length === 0) {
      return;
    }

    let index = 0;
    let count = 0;
    const maxSpins = 20; // Número de cambios antes de parar
    
    const interval = setInterval(() => {
      count++;
      
      // Si estamos en el último spin y tenemos una palabra seleccionada, mostrarla
      if (count >= maxSpins && selectedWord) {
        setDisplayWord(selectedWord);
        clearInterval(interval);
        setTimeout(() => {
          onComplete(selectedWord);
        }, 300);
      } else {
        // Sino, continuar rotando
        index = (index + 1) % words.length;
        setDisplayWord(words[index]);
        
        // Si llegamos al máximo y no hay palabra seleccionada, usar la última
        if (count >= maxSpins) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete(words[index]);
          }, 300);
        }
      }
    }, 100); // Velocidad de rotación

    return () => clearInterval(interval);
  }, [isSpinning, words, onComplete, selectedWord]);

  return (
    <div className="roulette-container">
      <div className="roulette-label">{label}</div>
      <motion.div
        className="roulette"
        animate={isSpinning ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: isSpinning ? Infinity : 0, duration: 0.3 }}
      >
        <motion.div
          key={displayWord}
          className="roulette-word"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          {displayWord || '?'}
        </motion.div>
      </motion.div>
    </div>
  );
};
