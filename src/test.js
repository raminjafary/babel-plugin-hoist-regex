function ramin(numberLiteral) {
  const regex = /[0-9]+/
  const {input} = regex.exec(numberLiteral)
  const a = () => {
    const rgx = /[0-9]+/
    const {input} = regex.exec(numberLiteral)
  }
  return input
}
ramin(123456789)
