import { createContext } from "react";

interface MediaQueryContextType {
  device: string;
}

const defaultState: MediaQueryContextType = {
  device: "desktop",
};

const MediaQueryContext = createContext<MediaQueryContextType>(defaultState);

export default MediaQueryContext;
