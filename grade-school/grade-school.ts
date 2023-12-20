export class GradeSchool {
  private roster_list: {[grade: number]: string[]};
  
  constructor() {
    this.roster_list= {}
  }

  private cloneArray = (inputArray: string[]): string[] => inputArray.slice();
  private cloneRoster = (inputObj: {[grade: number]: string[]}) : {[grade: number]: string[]} => {
    const clonedObject: {[grade: number]: string[]} = {};

    for (const grade in inputObj) {
      if (inputObj.hasOwnProperty(grade)) {
        clonedObject[grade] = inputObj[grade].slice();
      }
    }
  
    return clonedObject;
  }
  
 roster(): {[grade: number]: readonly string[]}{
   return this.cloneRoster(this.roster_list);
  }

  add(name: string, grade: number) {
    //if student is already in other grade, 
     //delete them from previous grade and add them to new one
    let studentGrade = this.isInOtherGrade(name)
    if(studentGrade !== null) {
       let students = this.grade(studentGrade)
       students = students.filter(studentName => studentName !== name)
       this.roster_list[studentGrade] = students
      if (!!!this.roster_list[grade]) {
        this.roster_list[grade] = [name]
      }  else {
        this.roster_list[grade].push(name);
        this.roster_list[grade] = this.roster_list[grade].sort()
      }
    }
    //if grade does not exist
    if (!!!this.roster_list[grade]) {
      this.roster_list[grade] = [name]
    } 
    //if student is not in other grade and is not already in current grade
    if (studentGrade === null && !!!this.roster_list[grade].find(student => student == name)) {
         this.roster_list[grade].push(name);
         this.roster_list[grade] = this.roster_list[grade].sort()
       }
  }

  private isInOtherGrade(name: string): number|null {
     for (const key_grade in this.roster_list) {
        if (this.roster_list[key_grade].includes(name)) {
            return +key_grade
        }
    }
    return null
  }

  grade(gradeToReturn: number): string[] { 
    let res = this.roster_list[gradeToReturn] === undefined ? []:
      this.cloneArray(this.roster_list[gradeToReturn])
    return res
  }
}