const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const cipher = 'zyxwvutsrqponmlkjihgfedcba'.split('');

export function encode(plainText: string): string {
  const regex = /[^a-zA-Z0-9]/g
  const trimmedPlainText = plainText.toLowerCase().replaceAll(regex, '')
  //before regrouping in 5s
  const stringNoSpace = trimmedPlainText.split('').map(letter => cipher[alphabet.indexOf(letter)] ? cipher[alphabet.indexOf(letter)] : letter);
  //if length is equal or less than 5 no need to reduce
  if (stringNoSpace.length <= 5) {
    return stringNoSpace.join('');
  }
  //after regrouping by 5s
  //add a space every 5th place (index + 1 to start counting from 1)
  return stringNoSpace.reduce((result, letter, index) => result + (index > 0 && index % 5 === 0 ? ' ' : '') + letter, '');
}

export function decode(cipherText: string): string {
  const removeSpaces = cipherText.replaceAll(' ', '');
  return removeSpaces.split('').map(letter => alphabet[cipher.indexOf(letter)] ? alphabet[cipher.indexOf(letter)] : letter).join('');
}
