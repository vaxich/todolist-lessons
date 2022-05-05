export const sum =(salary:number, n:number) => salary+n
export const sub =(salary:number, n:number) => salary-n
export const div =(salary:number, n:number) => salary/n
export const mult =(salary:number, n:number) => salary*n

export type ActionType = {
    salary: number
    type: "SUM" | "SUB" |"DIV" | "MULT"
    n:number
}

export const salaryReduser =(action: ActionType ) => {
    switch(action.type) {
        case "SUM":
            return action.salary + action.n
        case "SUB":
            return action.salary - action.n
        case "DIV":
            return action.salary / action.n
        case "MULT":
                return action.salary * action.n
        default:
            return action.salary    
    }
}


