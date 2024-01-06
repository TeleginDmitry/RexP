/* eslint-disable react/jsx-no-constructed-context-values */
import type { PropsWithChildren } from "react";

import type { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { Provider } from "react-redux";

import MediaQueryContext from "./instances/mediaQueryContext";

import type { StoreType } from "../store/reducers";

interface AppContextProviderProps extends PropsWithChildren {
  store: ToolkitStore<StoreType>;
  device: string;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children, device, store }) => (
  <MediaQueryContext.Provider value={{ device }}>
    <Provider store={store}>{children}</Provider>
  </MediaQueryContext.Provider>
);

export default AppContextProvider;
