const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const cipher = 'zyxwvutsrqponmlkjihgfedcba'.split('');

export function encode(plainText: string): string {
 const trimmedPlainText = plainText.toLowerCase().replace(' ', '');
 //before regrouping in 5s
 const stringRes = trimmedPlainText.split('').map(letter => cipher[alphabet.indexOf(letter)]).join('');
 
}

export function decode(cipherText: unknown): unknown {
  throw new Error('Remove this statement and implement this function')
}
