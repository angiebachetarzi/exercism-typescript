export class LinkedList<TElement> {

  private current: TElement | null; 
  private next: LinkedList<TElement> | null;

  constructor() {
    this.current = null;
    this.next = null;
  }
  
  public push(element: TElement): void {
    //list is empty
    if (!this.current) {
      this.current = element;
      this.next = null;
    } else {
      let newNode: LinkedList<TElement> = new LinkedList<TElement>();
      newNode.current = element;
      newNode.next = null;
      //find last elt
      let last: LinkedList<TElement> = this
      while (last.next != null) {
        last = last.next;
      }
      last.next = newNode;
    }
  }

  public pop(): TElement {
    let last: LinkedList<TElement> = this
    let beforeLast = null;
    while (last.next != null) {
      beforeLast = last
      last = last.next;
    }
    const returnValue = last.current;
    if (!!beforeLast) beforeLast.next = null;
    else this.current = null //list had one elt
    return returnValue as TElement
  }

  public shift(): TElement | null {
    // Save first element
    const firstElt = this.current;

    // Update current and next properties to point to the second element
    if (this.next) {
        this.current = this.next.current;
        this.next = this.next.next;
    } else {
        // If there is no next element, set current to null
        this.current = null;
    }
    return firstElt;
  }

  public unshift(element: TElement): void {
    //case list empty
    if (!this.current) {
      this.current = element;
      this.next = null
    } else {
      //list contains at least one elt
      //create elt to save old list in
      let oldElt = new LinkedList<TElement>();
      oldElt.current = this.current;
      oldElt.next = this.next;
      //update this with new elt
      //link new elt to old list
      this.next = oldElt
      this.current = element;
    }
  }

  public delete(element: TElement): void {
    //get length of list
    const length = this.count();
    //find index of elt to delete
    const index = this.findElt(element);
    if (index >= 0) {
      if (index == 0) {
        //case 1: elt is the first of the list -> shift
        this.shift();
      } else if (index == length -1) {
        //case 2: elt is last of the list -> pop
        this.pop();
      } else {
        //case 3: elt is in the middle
        //get elt before elt to delete
        let curr: LinkedList<TElement> = this
        let beforeCurr = null;
        while (curr.next != null && curr.current != element) {
          beforeCurr = curr
          curr = curr.next;
        }
        //get elt after elt to delete
        const afterCurr = curr.next;
        //link before to after
        if (beforeCurr) beforeCurr.next = afterCurr;
      }
    } else {
      //case 4: elt not found
      console.log('not found')
    }
  }

  private findElt(element: TElement): number {
    if (this.current == element) return 0;
    let curr: LinkedList<TElement> = this
    let count = 0
    while (curr.next != null) {
        if (curr.current == element) return count;
        curr = curr.next;
        count++;
      }
    return -1;
  }

  public count(): number {
    let last: LinkedList<TElement> = this
    let count = 0
    if (this.current) { //at least one elt
      count++; //counting first elt
      while (last.next != null) {
        last = last.next;
        count++;
      }
    }
    return count
  }
}
