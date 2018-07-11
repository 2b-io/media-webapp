import Color from 'color'

const c = hex => {
  const color = new Color(hex)

  return {
    _: color,
    toString: () => color.string(),
    // base color
    base: color.string(),
    // negative color
    negate: color.negate().string(),
    // variations - lightness
    lighter: color.lighten(.2).string(),
    darker: color.darken(.2).string(),
    // variations - alpha
    fade: color.fade(.3).string(),
    // variations - color
    grayscale: color.grayscale().string()
  }
}

export const white = c('#FFFFFF')
export const woodsmoke = c('#0B0B0C')
