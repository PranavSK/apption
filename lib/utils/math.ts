export function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function toDegrees(radians: number) {
  return radians * (180 / Math.PI);
}

export function getRotatedRectSize(width: number, height: number, rotation: number) {
  const rotationInRadians = toRadians(rotation);
  const absCos = Math.abs(Math.cos(rotationInRadians));
  const absSin = Math.abs(Math.sin(rotationInRadians));
  return {
    width: height * absSin + width * absCos,
    height: height * absCos + width * absSin,
  };
}
