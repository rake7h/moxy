import crypto from 'node:crypto';
const generateUUID = () => crypto.randomUUID();

export { generateUUID };
