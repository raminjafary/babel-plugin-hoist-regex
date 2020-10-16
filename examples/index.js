function literalRegxp(value) {
  const regex = /[0-9]+/
  const result = regex.exec(value)
  return (constructorRegxp = () => {
    const rgx = new RegExp('\\d+')
    const input = rgx.test(result.input)
    return input
  })()
}
literalRegxp(123456789)
