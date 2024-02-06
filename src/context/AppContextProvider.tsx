import type { PropsWithChildren } from 'react'

import { NextUIProvider } from '@nextui-org/react'
import type { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { Provider } from 'react-redux'

import type { StoreType } from '../store/reducers'

interface AppContextProviderProps extends PropsWithChildren {
    store: ToolkitStore<StoreType>
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
    store
}) => (
    <NextUIProvider>
        <Provider store={store}>{children}</Provider>
    </NextUIProvider>
)

export default AppContextProvider
