import { motion } from 'framer-motion';
import './PhraseDisplay.css';

export const PhraseDisplay = ({ phrase, gameState }) => {
  const isIdle = gameState === 'idle';
  
  if (isIdle) {
    return null;
  }

  return (
    <motion.div
      className="phrase-display"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Tu frase es:</h2>
      <div className="phrase-container">
        {phrase.subject && (
          <motion.span
            className="phrase-word subject"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {phrase.subject}
          </motion.span>
        )}
        {phrase.action && (
          <motion.span
            className="phrase-word action"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {phrase.action}
          </motion.span>
        )}
        {phrase.object && (
          <motion.span
            className="phrase-word object"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {phrase.object}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};
