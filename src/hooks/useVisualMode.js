import { useState } from "react";

const useVisualMode = initialMode => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([]); //data structure = stack = first-in last-out structure, still uses an array to implement this data structure
  // tracking history of the changes of the modes

  return {
    mode: mode,
    transition: (newMode, replace) => {
      // need to use state cuz mode is changing everytime transition is called
      if (replace) {
        // const [, ...restOfHistory] = history; // pop top item off of current history
        setHistory([...history]);
      } else {
        setHistory([mode, ...history]); // would set to newMode if passed in 'initialMode' into the useState array when setHistory initialized
      } // append mode in this case cuz easier to take things off from start of array vs end of array
      setMode(newMode);
    },
    back: () => {
      // const [prevMode, ...restOfHistory] = history --> destructuring: taking the head off of the history and set the rest of history as the new history here
      const [newMode, ...newHistory] = history;
      if (history.length === 0) {
        return;
      }
      setMode(newMode);
      setHistory(newHistory);
    }
  };
};

export default useVisualMode;
