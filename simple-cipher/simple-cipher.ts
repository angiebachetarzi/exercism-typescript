export class SimpleCipher {
  public key: string;
  alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

  constructor (manualKey?: string) {
    //choosing 200 because I dont want the key to be too long
    const randomLength = Math.floor(Math.random() * (200 - 100 + 1) + 100);
    if (manualKey) {
      this.key = manualKey;
    } else {
      //generate key
      //fill array of random length (between 100 and 200)
      //get random letter by getting random number between boundaries of ascii code for a and z
      this.key = [...Array(randomLength)].map(() => String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1) + 97))).join('');
    }
  }

  encode(simpleText: string): string {
    const encodedArray =  simpleText.split('').map((letter, index) => {
      //get current letter of key
      //duplicate letters of key to match length of text
      const letterKey = this.key.split('')[index%this.key.length];
      //get difference between current letter and current letter from key
      const diff = this.alphabet.indexOf(letterKey)
      //add the difference to the letter from text to encode
      //risque de dépasser en étant > 122
      const res = letter.charCodeAt(0) + diff > 122 ? ((letter.charCodeAt(0) + diff) % 122) + 96 : letter.charCodeAt(0) + diff;
      return String.fromCharCode(res)
   })
   return encodedArray.join('')
  }

  decode(cipheredText: string): string {
    const decodedArray = cipheredText.split('').map((letter, index) => {
      //get current letter of key
      const letterKey = this.key.split('')[index%this.key.length];
      const diff = this.alphabet.indexOf(letterKey)
      //difference between key and letter
      //risque de dépasser en étant < 97
      const res = letter.charCodeAt(0) - diff < 97 ? (letter.charCodeAt(0) - diff + 122) % 97 + 98 : letter.charCodeAt(0) - diff;
      return String.fromCharCode(res)
   })
   return decodedArray.join('')
  }
}
