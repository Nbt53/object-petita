import { useContext } from 'react';
import { MediaContext } from './MediaContext';

// Custom hook that shorthands the context!
export const useMediaQuery = () => useContext(MediaContext);