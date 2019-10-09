export const arrToTree = (arr) => {
  let roots = arr.filter(item => !item.parent).map(({ name, value }) => ({ label: name, value }))
  const childrens = arr.filter(item => item.parent).map(({ parent, name, value }) => ({ label: name, parent, value }))
  const toTree = (pArr, cArr) => {
    pArr.forEach(parent => {
      for (let i = 0; i < cArr.length; i++) {
        const cur = cArr[i]
        if (cur.parent === parent.value) {
          const temp = cArr.splice(i, 1)
          i--
          toTree([cur], cArr)
          parent.children = parent.children ? parent.children.concat(temp) : temp
        }
      }
    })
  }
  const format = arr => {
    return arr.map(({ parent, ...rest }) => {
      if (rest.children) {
        rest.children = format(rest.children)
      }
      return rest
    })
  }
  toTree(roots, childrens)
  roots = format(roots)
  return roots
}
