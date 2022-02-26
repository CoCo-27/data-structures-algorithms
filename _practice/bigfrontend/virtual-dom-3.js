//*---------------- Modify render() and createElement() to support functional components ----------------*//

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

const Title = ({ children, ...props }) =>
  createElement("h1", props, ...children);

console.log("functional component:", Title);

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
