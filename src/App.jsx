import { useState } from 'react';
import { useWordLists } from './hooks/useWordLists';
import { useRouletteGame, GAME_STATES } from './hooks/useRouletteGame';
import { WordListInput } from './components/WordListInput';
import { Roulette } from './components/Roulette';
import { PhraseDisplay } from './components/PhraseDisplay';
import './App.css';

function App() {
  const [showInputs, setShowInputs] = useState(false);
  
  const {
    subjects,
    actions,
    objects,
    updateSubjects,
    updateActions,
    updateObjects,
    getRandomWord,
    defaultSubjects,
    defaultActions,
    defaultObjects
  } = useWordLists();

  // Estados locales para los textareas editables
  const [subjectsText, setSubjectsText] = useState(defaultSubjects);
  const [actionsText, setActionsText] = useState(defaultActions);
  const [objectsText, setObjectsText] = useState(defaultObjects);

  // Funciones que actualizan tanto el estado local como las listas
  const handleSubjectsChange = (text) => {
    setSubjectsText(text);
    updateSubjects(text);
  };

  const handleActionsChange = (text) => {
    setActionsText(text);
    updateActions(text);
  };

  const handleObjectsChange = (text) => {
    setObjectsText(text);
    updateObjects(text);
  };

  const {
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
  } = useRouletteGame(getRandomWord, subjects, actions, objects);

  const renderControls = () => {
    switch (gameState) {
      case GAME_STATES.IDLE:
        return (
          <button className="btn-primary" onClick={startGame}>
            🎲 Girar las Ruletas
          </button>
        );
      
      case GAME_STATES.SUBJECT_REVEALED:
        return (
          <div className="controls">
            <button className="btn-continue" onClick={continueToAction}>
              ➡️ Continuar
            </button>
            <button className="btn-reroll" onClick={rerollSubject}>
              🔄 Cambiar Sujeto
            </button>
          </div>
        );
      
      case GAME_STATES.ACTION_REVEALED:
        return (
          <div className="controls">
            <button className="btn-continue" onClick={continueToObject}>
              ➡️ Continuar
            </button>
            <button className="btn-reroll" onClick={rerollAction}>
              🔄 Cambiar Acción
            </button>
          </div>
        );
      
      case GAME_STATES.COMPLETE:
        return (
          <div className="controls">
            <button className="btn-primary" onClick={reset}>
              🎲 Nueva Frase
            </button>
            <button className="btn-reroll" onClick={rerollObject}>
              🔄 Cambiar Objeto
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 What to Draw?</h1>
      </header>

      <main className="app-main">
        <PhraseDisplay phrase={currentPhrase} gameState={gameState} />

        {(gameState === GAME_STATES.SPINNING_SUBJECT || gameState === GAME_STATES.SUBJECT_REVEALED) && (
          <div className="roulettes">
            <Roulette
              words={subjects}
              isSpinning={gameState === GAME_STATES.SPINNING_SUBJECT}
              onComplete={revealSubject}
              label="Sujeto"
              selectedWord={selectedWords.subject}
            />
          </div>
        )}

        {(gameState === GAME_STATES.SPINNING_ACTION || gameState === GAME_STATES.ACTION_REVEALED) && (
          <div className="roulettes">
            <Roulette
              words={subjects}
              isSpinning={false}
              onComplete={() => {}}
              label="Sujeto"
              selectedWord={selectedWords.subject}
            />
            <Roulette
              words={actions}
              isSpinning={gameState === GAME_STATES.SPINNING_ACTION}
              onComplete={revealAction}
              label="Acción"
              selectedWord={selectedWords.action}
            />
          </div>
        )}

        {(gameState === GAME_STATES.SPINNING_OBJECT || gameState === GAME_STATES.COMPLETE) && (
          <div className="roulettes">
            <Roulette
              words={subjects}
              isSpinning={false}
              onComplete={() => {}}
              label="Sujeto"
              selectedWord={selectedWords.subject}
            />
            <Roulette
              words={actions}
              isSpinning={false}
              onComplete={() => {}}
              label="Acción"
              selectedWord={selectedWords.action}
            />
            <Roulette
              words={objects}
              isSpinning={gameState === GAME_STATES.SPINNING_OBJECT}
              onComplete={revealObject}
              label="Objeto"
              selectedWord={selectedWords.object}
            />
          </div>
        )}

        <div className="controls-container">
          {renderControls()}
        </div>

        <button 
          className="btn-toggle-inputs"
          onClick={() => setShowInputs(!showInputs)}
        >
          {showInputs ? '▲ Ocultar Opciones' : '▼ Personalizar Opciones'}
        </button>

        {showInputs && (
          <div className="inputs-section">
            <div className="inputs-grid">
              <WordListInput
                label="Sujetos"
                value={subjectsText}
                onChange={handleSubjectsChange}
                placeholder="Escribe cada sujeto en una línea nueva..."
              />
              <WordListInput
                label="Acciones"
                value={actionsText}
                onChange={handleActionsChange}
                placeholder="Escribe cada acción en una línea nueva..."
              />
              <WordListInput
                label="Objetos"
                value={objectsText}
                onChange={handleObjectsChange}
                placeholder="Escribe cada objeto en una línea nueva..."
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
