import { useState, useCallback } from 'react';

const DEFAULT_SUBJECTS = [
  'Sonic',
  'Mario',
  'Un gato',
  'Un perro',
  'Pikachu',
  'Spider-Man',
  'Un dragón',
  'Un unicornio',
  'Donald Trump',
  'Pato Donald',
  'Un tomate',
  'El rubius',
  'Barack Obama',
  'Un teletubbie',
  'Chase de paw patrol',
  'AMLO',
  'Claudia Sheinbaum',
  'Creeper de minecraft'
];

const DEFAULT_ACTIONS = [
  'comprando',
  'comiendo',
  'contemplando',
  'peleándose con',
  'besándose con',
  'bailando con',
  'corriendo hacia',
  'dibujando',
  'besando a',
  'turisteando con',
  'nalgeando a',
  'tomando con',
];

const DEFAULT_OBJECTS = [
  'leche',
  'el atardecer',
  'una pizza',
  'un árbol',
  'una estrella',
  'un libro',
  'flores',
  'la luna',
  'Donald Trump',
  'Chase de paw patrol',
  'AMLO',
  'Claudia Sheinbaum',
  'El rubius',
  'Barack Obama',
  'un teletubbie',
  'Pato Donald',
  'Creeper de minecraft'
];

export const useWordLists = () => {
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [actions, setActions] = useState(DEFAULT_ACTIONS);
  const [objects, setObjects] = useState(DEFAULT_OBJECTS);

  const updateList = useCallback((setter) => (text) => {
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    setter(lines.length > 0 ? lines : []);
  }, []);

  const updateSubjects = updateList(setSubjects);
  const updateActions = updateList(setActions);
  const updateObjects = updateList(setObjects);

  const getRandomWord = useCallback((list) => {
    if (!list || list.length === 0) return '';
    return list[Math.floor(Math.random() * list.length)];
  }, []);

  return {
    subjects,
    actions,
    objects,
    updateSubjects,
    updateActions,
    updateObjects,
    getRandomWord,
    defaultSubjects: DEFAULT_SUBJECTS.join('\n'),
    defaultActions: DEFAULT_ACTIONS.join('\n'),
    defaultObjects: DEFAULT_OBJECTS.join('\n')
  };
};
