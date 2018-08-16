import chokidar from 'chokidar';
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import { clearCache } from './utils/hmr';

if (!global.fetch) {
    global.fetch = fetch;
}
dotenv.config();

const PORT = process.env.DEV_PORT;
const isDevelopment = process.env.NODE_ENV === 'development';
const isServerOnly = process.env.NODE_ENV === 'server';
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

console.log(isDevelopment, process.env.NODE_ENV);

app.use((req, res, next) => require('./routes').default(req, res, next));

app.use((req, res, next) =>
    require('./middleware/apolloServer').default(req, res, next)
);

if (isDevelopment) {
    app.use(require('./middleware/webpack').default);
} else if (!isServerOnly) {
    app.use((req, res, next) =>
        require('./middleware/reactSSR').default(req, res, next)
    );
}
if (!isProduction) {
    const watcher = chokidar.watch('.', {
        ignored: /(client\/).*/,
    });
    clearCache(watcher, /[\/\\]server[\/\\]/);
}

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
