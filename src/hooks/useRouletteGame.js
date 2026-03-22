import { useState, useCallback } from 'react';

export const GAME_STATES = {
  IDLE: 'idle',
  SPINNING_SUBJECT: 'spinning_subject',
  SUBJECT_REVEALED: 'subject_revealed',
  SPINNING_ACTION: 'spinning_action',
  ACTION_REVEALED: 'action_revealed',
  SPINNING_OBJECT: 'spinning_object',
  COMPLETE: 'complete'
};

export const useRouletteGame = (getRandomWord, subjects, actions, objects) => {
  const [gameState, setGameState] = useState(GAME_STATES.IDLE);
  const [currentPhrase, setCurrentPhrase] = useState({
    subject: '',
    action: '',
    object: ''
  });
  const [selectedWords, setSelectedWords] = useState({
    subject: '',
    action: '',
    object: ''
  });

  const startGame = useCallback(() => {
    const newSubject = getRandomWord(subjects);
    setSelectedWords({ subject: newSubject, action: '', object: '' });
    setGameState(GAME_STATES.SPINNING_SUBJECT);
    setCurrentPhrase({ subject: '', action: '', object: '' });
  }, [getRandomWord, subjects]);

  const revealSubject = useCallback((word) => {
    setCurrentPhrase(prev => ({ ...prev, subject: word }));
    setGameState(GAME_STATES.SUBJECT_REVEALED);
  }, []);

  const revealAction = useCallback((word) => {
    setCurrentPhrase(prev => ({ ...prev, action: word }));
    setGameState(GAME_STATES.ACTION_REVEALED);
  }, []);

  const revealObject = useCallback((word) => {
    setCurrentPhrase(prev => ({ ...prev, object: word }));
    setGameState(GAME_STATES.COMPLETE);
  }, []);

  const continueToAction = useCallback(() => {
    const newAction = getRandomWord(actions);
    setSelectedWords(prev => ({ ...prev, action: newAction }));
    setGameState(GAME_STATES.SPINNING_ACTION);
  }, [getRandomWord, actions]);

  const continueToObject = useCallback(() => {
    const newObject = getRandomWord(objects);
    setSelectedWords(prev => ({ ...prev, object: newObject }));
    setGameState(GAME_STATES.SPINNING_OBJECT);
  }, [getRandomWord, objects]);

  const rerollSubject = useCallback(() => {
    const newSubject = getRandomWord(subjects);
    setSelectedWords(prev => ({ ...prev, subject: newSubject }));
    setGameState(GAME_STATES.SPINNING_SUBJECT);
  }, [getRandomWord, subjects]);

  const rerollAction = useCallback(() => {
    const newAction = getRandomWord(actions);
    setSelectedWords(prev => ({ ...prev, action: newAction }));
    setGameState(GAME_STATES.SPINNING_ACTION);
  }, [getRandomWord, actions]);

  const rerollObject = useCallback(() => {
    const newObject = getRandomWord(objects);
    setSelectedWords(prev => ({ ...prev, object: newObject }));
    setGameState(GAME_STATES.SPINNING_OBJECT);
  }, [getRandomWord, objects]);

  const reset = useCallback(() => {
    setGameState(GAME_STATES.IDLE);
    setCurrentPhrase({ subject: '', action: '', object: '' });
  }, []);

  return {
    gameState,
    currentPhrase,
    selectedWords,
    startGame,
    revealSubject,
    revealAction,
    revealObject,
    continueToAction,
    continueToObject,
    rerollSubject,
    rerollAction,
    rerollObject,
    reset
  };
};
