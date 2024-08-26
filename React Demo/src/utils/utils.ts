// export function debounce<T extends (...args: any[]) => void> (func: T, timeoutInMs: number) {
//   let timeout: (NodeJS.Timeout|null) = null;

//   return function(...args: Parameters<T>){
//     if (timeout !== null) clearTimeout(timeout);

//     timeout = setTimeout(() => {
//       func(...args);
//       if (timeout !== null) clearTimeout(timeout);
//     }, timeoutInMs);
//   };
// };

// let timeout: (NodeJS.Timeout|null) = null;
// export function debounce<T extends (...args: any[]) => void> (func: T, timeoutInMs: number) {
//   return function(...args: Parameters<T>){
//     if (timeout) clearTimeout(timeout);

//     timeout = setTimeout(() => {
//       func(...args);
//       if (timeout !== null) clearTimeout(timeout);
//     }, timeoutInMs);
//   };
// };

export function debounce<T extends (...args: any[]) => void>(func: T, timeoutInMs: number) {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, timeoutInMs);
  };
}



// export function debounce<T extends (...args: any[]) => void>(func: T, timeoutInMs: number) {
//   let timeout: NodeJS.Timeout;

//   return function(this: any, ...args: Parameters<T>) {
//     if (timeout) clearTimeout(timeout);

//     timeout = setTimeout(() => {
//       func.apply(this, args);
//     }, timeoutInMs);
//   };
// }