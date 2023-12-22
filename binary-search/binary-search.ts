export function find(haystack: number[], needle: number): number | never {

  //if empty array throw error
  if (haystack.length == 0) throw new Error('Value not in array')
  //if length is 1
  // either the value is it or its not
  if (haystack.length == 1) {
    if (haystack[0] == needle) return 0
    else throw new Error('Value not in array')
  }
  let middleIndex = Math.floor(haystack.length/2)
  // value found
  if (haystack[middleIndex] == needle) {
    return middleIndex;
  }
  //if value is bigger
  else if (needle > haystack[middleIndex]) { 
    let arrayRight = haystack.slice(middleIndex)
    return middleIndex + find(arrayRight, needle)
  }
  //if value is smaller
  else if (needle < haystack[middleIndex]) {
    let arrayLeft = haystack.slice(0, middleIndex)
    return find(arrayLeft, needle)
  }
  return -2
}