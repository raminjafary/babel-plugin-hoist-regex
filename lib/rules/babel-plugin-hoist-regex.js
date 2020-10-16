function transformRegExp(path, t) {
  const identifier = path.scope.generateUidIdentifier(path.parent.id.name)
  const variableDec = t.VariableDeclaration('const', [
    t.VariableDeclarator(identifier, path.node)
  ])
  path.scope.rename(path.parent.id.name, identifier.name)
  const program = path.findParent(t.isProgram)
  program.node.body.unshift(variableDec)
  path.parentPath.remove()
}

function isRegExpWithNew(node) {
  return (
    node.type === 'NewExpression'
    && node.callee.type === 'Identifier'
    && node.callee.name === 'RegExp'
    && (node.arguments[0].type === 'StringLiteral' ||
      node.arguments[0].type === 'TemplateLiteral')
  )
}

module.exports = function babelPluginHoistRegex(babel) {
  const { types: t } = babel

  return {
    name: 'babel-plugin-hoist-regex',
    visitor: {
      'RegExpLiteral|NewExpression'(path) {
        if (path.node.type === 'RegExpLiteral' || isRegExpWithNew(path.node)) {
          transformRegExp(path, t)
        }
      }
    }
  }
}
