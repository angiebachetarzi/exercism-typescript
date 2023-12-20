export class GradeSchool {
  private roster_list: {[grade: number]: string[]};

  constructor() {
    this.roster_list= {}
    //console.log(this.roster_list)
  }
  
  roster() {
    return this.roster_list;
  }

  add(name: string, grade: number) {
   if (!!!this.roster_list[grade]) {
     this.roster_list[grade] = []
   } else {
     if (!!!this.roster_list[grade].find(student => student == name) && 
        !this.isInOtherGrade(name)) {
       this.roster_list[grade].push(name);
       this.roster_list[grade] = this.roster_list[grade].sort()
     }
   }
  }

  private isInOtherGrade(name: string): boolean {
     for (const key_grade in this.roster_list) {
        if (this.roster_list[key_grade].includes(name)) {
            return true
        }
    }
    return false
  }

  grade(gradeToReturn: number): string[] {
    if (!!!this.roster_list[gradeToReturn]) {
      this.roster_list[gradeToReturn] = []
    } 
    return this.roster_list[gradeToReturn];
  }
}
