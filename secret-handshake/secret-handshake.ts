export function commands(num: number) : String[] {
  const binaryNum = decimal2binary(num)
  const initArray = binaryNum.split('').reverse()
  let binaryTab = Array(5).fill('0');
  initArray.map((elt, index) => binaryTab[4 - index ] = initArray[index])
  let actions = []
  if (binaryTab[4] == 1) actions.push('wink')
  if (binaryTab[3] == 1) actions.push('double blink')
  if (binaryTab[2] == 1) actions.push('close your eyes')
  if (binaryTab[1] == 1) actions.push('jump')
  if (binaryTab[0] == 1) actions = actions.reverse()
  return actions;
}

function decimal2binary (decimal: number) : String {
  if (decimal === 0) {
    return '0';
  }

  let binaryResult = '';
  while (decimal > 0) {
    binaryResult = (decimal % 2) + binaryResult;
    decimal = Math.floor(decimal / 2);
  }
  
  return binaryResult;
}