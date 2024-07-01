declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
            TELEGRAM_SECRET_TOKEN: string;
        }
    }
}

export {};
