export const isErr = (obj: Object): Boolean => {
   const bool = obj instanceof Error;
   return bool;
};
