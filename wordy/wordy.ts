export const answer = (request: string) => {
  let simpleReq = request.replace('What is', ''); //remove 'What is'
  simpleReq = simpleReq.trim(); //trim to get rid of spaces at start of request
  simpleReq = simpleReq.replaceAll(' by', ''); //remove all 'by'
  simpleReq = simpleReq.slice(0,-1); //remove '?'
  if (simpleReq.length == 0) throw Error('Syntax error'); //exp: What is?
  //separate the rest of the request to parts
  const operationsTab = simpleReq.split(' ');
  if (operationsTab.length == 1 && !Number.isNaN(operationsTab[0])) return parseInt(operationsTab[0]); //exp: What is 5?
  const res = operationsTab.reduce((acc, curr, index) => {
    //if its not a number, its an operator
    //has to convert curr to number first
    //because in typescript isNaN does not accept type string
    if (isNaN(Number(curr))) {
      if (!['plus', 'minus', 'divided', 'multiplied'].includes(curr)) throw Error('Unknown operation') //exp: What is 52 cubed?
      //on the left and on the right of the op should be numbers
      if (isNaN(Number(operationsTab[index + 1])) || isNaN(Number(operationsTab[index - 1])))
        throw Error('Syntax error'); //exp: What is 1 plus plus?
      //get the numbers surrounding the operator
      const right = parseInt(operationsTab[index + 1])
      switch (curr) {
        case 'plus':
          return acc + right;
          break;
        case 'minus':
          return acc - right;
          break;
        case 'multiplied':
          return acc * right;
          break;
        case 'divided':
          return Math.floor(acc / right);
          break;
      }
    }
    //case of two numbers next to each other
    if (!isNaN(Number(operationsTab[index + 1]))) throw Error('Syntax error'); //exp: What is 1 2 plus 2?
    return acc;
  }, parseInt(operationsTab[0]));
  return res;
}
