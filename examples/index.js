function literalRegExp(value) {
  const regex = /[0-9]+/
  const result = regex.exec(value)
  return (newRegExp = () => {
    const rgx = new RegExp('\\d+')
    const input = rgx.test(result.input)
    return input
  })()
}
literalRegExp(123456789)
