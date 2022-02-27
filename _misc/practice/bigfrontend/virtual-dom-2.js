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
