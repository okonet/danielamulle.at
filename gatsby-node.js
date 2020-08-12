const visit = require("unist-util-visit")
const toString = require("mdast-util-to-string")

const mdxResolver = (fieldName) => async (source, args, context, info) => {
  const type = info.schema.getType("Mdx")
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  })
  return result
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Post: {
      ingredients: {
        type: "[String]",
        async resolve(source, args, context, info) {
          // We use `ingredients` for the search functionality so ingredients need to be extracted as strings
          const ast = await mdxResolver("mdxAST")(source, args, context, info)
          let res = []
          visit(ast, "jsx", (node, index, parent) => {
            if (node.value.startsWith("<Ingredients")) {
              const nextSibling = parent.children[index + 1]
              visit(nextSibling, "listItem", (li) => {
                res.push(toString(li))
              })
            }
          })
          return res
        },
      },
    },
  })
}
