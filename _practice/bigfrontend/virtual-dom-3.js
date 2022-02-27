//*---------------- Modify createElement() and render() to support functional components ----------------*//

function createElement(type, props, ...children) {
  if (typeof type === "function") {
    const component = type({ children, props });
    children = component.props.children;
  }

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

function render(node) {
  let elem;
  if (typeof node === "string") {
    elem = document.createTextNode(node);
  } else if (typeof node.type === "function") {
    const component = node.type(node.props);

    if (typeof component.type === "function") {
      elem = render(component);
    } else {
      elem = document.createElement(component.type);
    }
  } else {
    elem = document.createElement(node.type);
  }

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

const Title = ({ children, ...res }) => createElement("h1", res, ...children);
const Link = ({ children, ...res }) => createElement("a", res, ...children);
const Name = ({ children, ...res }) => createElement("b", res, ...children);
const Button = ({ children, ...res }) =>
  createElement("button", res, ...children);
const Paragraph = ({ children, ...res }) =>
  createElement("p", res, ...children);
const Container = ({ children, ...res }) =>
  createElement("div", res, ...children);

const json = createElement(
  Container,
  {},
  createElement(Title, {}, " this is "),
  createElement(
    Paragraph,
    { className: "paragraph" },
    " a ",
    createElement(Button),
    " from ",
    createElement(
      Link,
      { href: "https://bfe.dev" },
      createElement(Name, {}, "BFE"),
      ".dev"
    )
  )
);

const html = render(json);

console.log("json with Function refs:", json);
console.log("html:", html);
console.log("shadow dom:", virtualize(html));

/*
{
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: {
          children: ' this is '
        }
      },
      {
        type: 'p',
        props: {
          className: 'paragraph',
          children: [
            ' a ',
            {
              type: 'button',
            },
            ' from ',
            {
              type: 'a',
              props: {
                href: 'https://bfe.dev',
                children: [
                  {
                    type: 'b',
                    props: {
                      children: 'BFE'
                    }
                  },
                  '.dev'
                ]
              }
            }
          ]
        }
      }
    ]
  }
}
*/

//*---------------------------- [copied] Dependencies (from virtual-dom-1.js) ----------------------------*//

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

function modifyAttribute(attr, convert = true) {
  const atrs = convert ? { class: "className" } : { className: "class" };
  return atrs[attr] || attr;
}
