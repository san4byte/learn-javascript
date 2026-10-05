// Export default: hanya boleh ada 1 export default per file
export default function log(message) {
  console.log(`[LOGGER]: ${new Date().toLocaleTimeString()} - ${message}`);
}

export const APP_VERSION = '2.0.0';
