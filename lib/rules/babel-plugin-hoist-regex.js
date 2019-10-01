function babelPluginHoistRegex(babel) {
  const {types: t} = babel

  return {
    name: 'babel-plugin-hoist-regex',
    visitor: {
      'RegExpLiteral|NewExpression'(path) {
        const newIdent = path.scope.generateUidIdentifier(path.parent.id.name)
        const variableDec = t.VariableDeclaration('const', [
          t.VariableDeclarator(newIdent, path.node)
        ])
        path.scope.rename(path.parent.id.name, newIdent.name)
        const program = path.findParent(t.isProgram)
        program.node.body.unshift(variableDec)
        path.parentPath.remove()
      }
    }
  }
}
module.exports = babelPluginHoistRegex
