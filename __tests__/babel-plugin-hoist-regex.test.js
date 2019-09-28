const babel = require('@babel/core')
const babelPluginHoistRegex = require('../lib')

const example = `
function ramin(numberLiteral) {
  const regex = /[0-9]+/
  const {input} = regex.exec(numberLiteral)
  const a = () => {
    const rgx = /[0-9]+/
    const {input} = regex.exec(numberLiteral)
  }
  return input
}
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
    const f = new Function(`
    ${code};
    return regex = _regex;
  `)
    const regex = f()
    expect(regex).toBe(regex)
  })
})
