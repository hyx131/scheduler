import { useState } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  return {
    mode: mode,
    transition: (second, replace) => {
      if (replace) {
        setHistory([...history]);
      } else {
        setHistory([mode, ...history]);
      }
      setMode(second);
    },
    back: () => {
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
