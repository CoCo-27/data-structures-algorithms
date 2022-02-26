const greetSomeone = (greeting) => {
  return (person) => {
    return (endMark) => {
      console.log(greeting + " " + person + endMark);
    };
  };
};

greetSomeone("Hello")("TK")("!"); // Hello TK!
