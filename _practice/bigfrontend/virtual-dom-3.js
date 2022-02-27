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

const Title = ({ children, ...props }) =>
  createElement("h1", props, ...children);
const Link = ({ children, ...props }) => createElement("a", props, ...children);
const Name = ({ children, ...props }) => createElement("b", props, ...children);
const Button = ({ children, ...props }) =>
  createElement("button", props, ...children);
const Paragraph = ({ children, ...props }) =>
  createElement("p", props, ...children);
const Container = ({ children, ...props }) =>
  createElement("div", props, ...children);

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
