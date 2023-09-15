import tinycolor from 'tinycolor2';

export const useDarkLight = (color: string) => {
  // Convierte el color en un objeto Tinycolor para trabajar con él
  const tinyColor = tinycolor(color);

  // Obtén la luminosidad del color en el espacio de color HSL
  const luminance = tinyColor.getLuminance();

  // Define un umbral para determinar si es oscuro o claro (generalmente 0.5)
  const threshold = 0.5;

  // Compara la luminosidad con el umbral y devuelve true si es oscuro, false si es claro
  return luminance < threshold;
}