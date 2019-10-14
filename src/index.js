function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let tube = [];
  let stack = [];
  let str = '';
  let opening = 0;
  let closing = 0;
  
  for (let i of expr) {
    if (i !== ' ') str += i;
    if (i === '(') opening++;
    if (i === ')') closing++;
  }

  if (opening !== closing) {
    throw new Error('ExpressionError: Brackets must be paired');
  }

  let numb = '';
  for (let i of str) {
    if (i === '(' || i === '+' || i === '-' || i === '*' || i === '/') {
      if (numb !== '') tube.push(+numb);
      numb = '';
      let currentPriority = getPriority(i);
      while (stack[0] !== undefined && i !== '(' && currentPriority <= getPriority(stack[stack.length - 1])) {
        tube.push(stack.pop());
      }
      stack.push(i);
    } else {
      if (i === ')') {
        if (numb !== '') tube.push(+numb);
        numb = '';
        let openBracket = stack.pop();
        while (openBracket !== '(') {
          tube.push(openBracket);
          openBracket = stack.pop();
        }
      } else {
        numb += i;
      }
    }
  }

  if (numb !== '') tube.push(+numb);

  while (stack[0] !== undefined) tube.push(stack.pop());   

  let calculation = [];

  for (let i of tube) {
    if (i === '+' || i === '-' || i === '*' || i === '/') {
      
      let second = calculation.pop();
      let first = calculation.pop();

      if (i === '*') calculation.push(first * second);
      if (i === '/') {
        if (second == '0') {
          throw new Error('TypeError: Division by zero.');
        }  
        calculation.push(first / second);  
      } 
      if (i === '+') calculation.push(first + second);
      if (i === '-') calculation.push(first - second); 
      
    } else {
      calculation.push(i);
    }
  }

  return calculation.pop();

  function getPriority(i) {
    if (i === '*' || i === '/') {
      return 2;
    } else if (i === '+' || i === '-') {
      return 1;
    } else if (i === '(') {
      return 0;
    }
  }
}

module.exports = {
  expressionCalculator
}