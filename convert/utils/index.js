const acorn = require('acorn')
const commentDelete = require('./comment-delete')
const cssStringify = require('./css-what-stringify')

function getFuncAttrAst (name, funcBodyStr = '', param = '') {
  funcBodyStr = /^function/.test(funcBodyStr) ? funcBodyStr : `function(${param}){${funcBodyStr}}`
  const temp = `var a={'${name}':${funcBodyStr}}`
  return acorn.parse(temp, {sourceType: 'script'}).body[0].declarations[0].init.properties[0]
}

function getAttrAst (key, value) {
  const temp = `var a={${key}:${value}}`
  return acorn.parse(temp, {sourceType: 'script'}).body[0].declarations[0].init.properties[0]
}

function getVModelAst (vModels, e, keyToPolyfill) {
  // 将v-model监听的数据，添加到change的回调函数处理
  const jsStr = vModels.reduce((total, dataName) => {
    return total + `this.${dataName}=${e}.target.${keyToPolyfill};`
  }, '')
  return acorn.parse(jsStr, {sourceType: 'script'}).body
}

function getStatementAst (temp) {
  return acorn.parse(temp, {sourceType: 'script'}).body
}

function getImportAst (temp) {
  return acorn.parse(temp, {sourceType: 'module'}).body
}
function getExportDefaultAst () {
  return acorn.parse('export default {}', {sourceType: 'module'}).body[0]
}

function getFuncBodyAst (bodyStr) {
  const func = `function a(){${bodyStr}}`
  return acorn.parse(func, {sourceType: 'script'}).body[0].body
}

module.exports = {
  getFuncAttrAst,
  getAttrAst,
  getVModelAst,
  getStatementAst,
  commentDelete,
  cssStringify,
  getImportAst,
  getFuncBodyAst,
  getExportDefaultAst
}
