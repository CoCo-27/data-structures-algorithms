//*---------------------------- createElement() ----------------------------*//

function createElement(type, props, ...children) {
  const elem = {
    type,
    props: {
      children: [...children],
    },
  };

  for (let prop in props) {
    elem.props[prop] = props[prop];
  }

  return elem;
}

const json = createElement(
  "div",
  {},
  createElement("h1", {}, " this is "),
  createElement(
    "p",
    { className: "paragraph" },
    " a ",
    createElement("button", {}, " button "),
    " from ",
    createElement(
      "a",
      { href: "https://bfe.dev" },
      createElement("b", {}, "BFE"),
      ".dev"
    )
  )
);

console.log("json:", json);

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
          className: "paragraph",
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
                href: "https://bfe.dev",
                children: [
                  {
                    type: "b",
                    props: {
                      children: "BFE",
                    },
                  },
                  ".dev",
                ],
              },
            },
          ],
        },
      },
    ],
  },
};
*/

//*---------------------------- [copied] Dependencies (from virtual-dom-1.js) ----------------------------*//

function render(node) {
  const elem =
    typeof node === "string"
      ? document.createTextNode(node)
      : document.createElement(node.type);

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
