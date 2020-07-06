export function textOutline(color, offset = 1) {
  return {
    textShadow: `0 ${offset}px 0 ${color},
      0 -${offset}px 0 ${color},
      ${offset}px 0 0 ${color},
      -${offset}px 0 0 ${color}
      `,
  }
}
