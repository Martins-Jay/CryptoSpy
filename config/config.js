const isVercel = window.location.hostname.includes('vercel.app');

export const SVG_PATH = isVercel ? '/icons.svg' : './public/icons.svg';
