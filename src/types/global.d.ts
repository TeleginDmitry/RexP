import type { Telegram } from './Telegram'

declare global {
    interface Window {
        /**
         * Telegram Object
         */
        Telegram: Telegram
    }
}
