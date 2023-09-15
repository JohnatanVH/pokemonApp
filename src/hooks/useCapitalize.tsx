

export const useCapitalize = (palabra: string): string => {
  return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}
