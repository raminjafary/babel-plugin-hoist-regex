const babel = require('@babel/core')
const babelPluginHoistRegex = require('../lib')

const example = `
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
`

describe('babelPluginHoistRegex Test', () => {
  test('Snapshot', () => {
    const {code} = babel.transform(example, {plugins: [babelPluginHoistRegex]})
    expect(code).toMatchSnapshot()
  })

  test('AST', () => {
    const {ast} = babel.transform(example, {
      plugins: [babelPluginHoistRegex],
      ast: true
    })
    const program = ast.program
    const declaration = program.body[0].declarations[0]
    expect(declaration.id.name).toEqual('_rgx')
    // or babelTraverse(program, {visitor: ...})
  })

  test('Exec', () => {
    const {code} = babel.transform(example, {plugins: [babelPluginHoistRegex]})
    // const f = new Function(`
    //   ${code};
    //   return result = _regex
    // `)
    // const regex = f()
    // expect(regex).toBe(regex)
  })
})
