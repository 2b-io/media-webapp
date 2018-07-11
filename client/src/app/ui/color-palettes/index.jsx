import color from 'color'

// refer http://oivo.pw/ color palettes
const light0 = color('#ffffff')
const light1 = color('#1f88ff')
const light2 = color('#aaaa67')
const light3 = color('#78736f')
const light4 = color('#394049')

export const LIGHT0 = light0.string()
export const LIGHT1 = light1.string()
export const LIGHT2 = light2.string()
export const LIGHT3 = light3.string()
export const LIGHT4 = light4.string()
export const LIGHT4_FADE0 = light4.fade(0.2).string()
export const LIGHT4_FADE1 = light4.fade(0.8).string()
