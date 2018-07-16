export default (a, b) => {
  var mismatch = 0

  for (var i = 0; i < a.length || i < b.length; ++i) {
    mismatch |= (a.charCodeAt(i) ^ b.charCodeAt(i))

    if (mismatch > 0) {
      return false
    }
  }

  return true
}
