export function makeItDev(string) {
  return `[${string}]`;
}

function isDev(string) {
  return process.env.NODE_ENV !== 'production'
    ? makeItDev(string)
    : string;
}

export default isDev;