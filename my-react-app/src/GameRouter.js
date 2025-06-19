import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EasyAddition from './EasyAddition.js';
import MediumAddition from './MediumAddition.js';
import HardAddition from './HardAddition.js';
import EasyMultiplication from './EasyMultiplication.js';
import MediumMultiplication from './MediumMultiplication.js';
import HardMultiplication from './HardMultiplication';

export default function GameRouter() {
  const { mode, difficulty } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const validModes = ['addition', 'multiplication'];
    const validDifficulties = ['easy', 'medium', 'hard'];

    if (!validModes.includes(mode) || !validDifficulties.includes(difficulty)) {
      navigate('/', {
      state: {
        toastMessage: 'Invalid game mode or difficulty selected.',
        toastType: 'error'
      }
    });

    }
  }, [mode, difficulty, navigate]);

  if (mode === 'addition' && difficulty === 'easy') return <EasyAddition />;
  if (mode === 'addition' && difficulty === 'medium') return <MediumAddition />;
  if (mode === 'addition' && difficulty === 'hard') return <HardAddition />;
  if (mode === 'multiplication' && difficulty === 'easy') return <EasyMultiplication />;
  if (mode === 'multiplication' && difficulty === 'medium') return <MediumMultiplication />;
  if (mode === 'multiplication' && difficulty === 'hard') return <HardMultiplication />;

  // While waiting for redirect, render null or a loader
  return (
    <>
      <ToastContainer />
      {/* You can optionally add a loader here */}
    </>
  );
}
