function validateOneWay(value) {
  const regex = /[0-9]+/
  const result = regex.exec(value)
  return (validateTheOtherWay = () => {
    const rgx = new RegExp('\\d+')
    const input = rgx.test(result.input)
    return input
  })()
}
validateOneWay(123456789)
