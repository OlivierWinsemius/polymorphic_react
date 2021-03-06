export const isDevelopment = process.env.NODE_ENV === 'development';
export const isServerOnly = process.env.NODE_ENV === 'server';
export const isProduction = process.env.NODE_ENV === 'production';
export const isMacintosh = () => navigator.platform.includes('Mac');
export const isWindows = () => navigator.platform.includes('Win');
