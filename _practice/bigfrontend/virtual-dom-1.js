function modifyAttribute(attr, convert = true) {
  const atrs = convert
    ? {
        class: "className",
      }
    : {
        className: "class",
      };

  return atrs[attr] || attr;
}

//*---------------------------- Create Shadom DOM AST From DOM Nodes ----------------------------*//

function virtualize(elem) {
  // 3 = TEXT_NODE
  if (elem.nodeType === 3) {
    return elem.textContent;
  }

  const ast = {
    type: elem.tagName.toLowerCase(),
    props: {
      children: [],
    },
  };

  // Get attributes
  for (let attr of elem.attributes) {
    ast.props[modifyAttribute(attr.name)] = attr.value;
  }

  if (elem.childElementCount === 0) {
    ast.props.children = elem.textContent;
  } else {
    for (let node of elem.childNodes) {
      ast.props.children.push(virtualize(node));
    }
  }

  return ast;
}

const html = document.createElement("div");
html.innerHTML = `<h1> this is </h1><p class="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a></p>`;
console.log("virtualize:", virtualize(html));

/*
{
  type: "div",
  props: {
    children: [
      {
        type: "h1",
        props: {
          children: " this is ",
        },
      },
      {
        type: "p",
        props: {
          children: [
            " a ",
            {
              type: "button",
              props: {
                children: " button ",
              },
            },
            " from ",
            {
              type: "a",
              props: {
                children: [
                  {
                    type: "b",
                    props: {
                      children: "BFE",
                    },
                  },
                  ".dev",
                ],
                href: "https://bfe.dev",
              },
            },
          ],
          className: "paragraph",
        },
      },
    ],
  },
};
*/

//*---------------------------- Render AST to DOM ----------------------------*//

function render(node) {
  const elem =
    typeof node === "string"
      ? document.createTextNode(node)
      : document.createElement(node.type);

  // Apply attributes
  for (let attr in node.props) {
    if (attr !== "children") {
      elem.setAttribute(modifyAttribute(attr, false), node.props[attr]);
    }
  }

  if (node.props) {
    if (typeof node.props.children === "string") {
      elem.textContent = node.props.children;
    } else {
      node.props.children.forEach((child) => {
        elem.appendChild(render(child));
      });
    }
  }

  return elem;
}

const json = {
  type: "div",
  props: {
    children: [
      {
        type: "h1",
        props: {
          children: " this is ",
        },
      },
      {
        type: "p",
        props: {
          children: [
            " a ",
            {
              type: "button",
              props: {
                children: " button ",
              },
            },
            " from ",
            {
              type: "a",
              props: {
                children: [
                  {
                    type: "b",
                    props: {
                      children: "BFE",
                    },
                  },
                  ".dev",
                ],
                href: "https://bfe.dev",
              },
            },
          ],
          className: "paragraph",
        },
      },
    ],
  },
};

console.log("render:", render(json));

/*
<div>
   <h1> this is </h1>
   <p class="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a></p>
</div>
*/
