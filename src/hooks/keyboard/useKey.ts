import { useEffect } from "react";

/**
 * Creates a custom hook that listens for specific key presses and triggers a callback function when those keys are pressed.
 *
 * @param {() => void} onClick - The callback function to be triggered when the specified keys are pressed.
 * @param {string[]} keys - An array of strings representing the keys to listen for.
 */
const useKey = (onClick: () => void, keys: string[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keys.includes(event.key)) {
        onClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keys, onClick]);
};

export default useKey;
