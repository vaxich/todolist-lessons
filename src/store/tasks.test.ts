import { ActionTypes } from "@mui/base"
import { ActionType, div, mult, salaryReduser, sub, sum } from "./tasks"


test("sum", ()=> {
    //1. тестовые данные
    const salary: number = 800
    const n: number = 200
    //2. выполнение тестируемого кода
    const result = sum(salary, n)
    // 3/ проыерка результата
    expect(result).toBe(1000)
})
test("sub", ()=> {
    //1. тестовые данные
    const salary: number = 1200
    const n: number = 200
    //2. выполнение тестируемого кода
    const result = sub(salary, n)
    // 3/ проыерка результата
    expect(result).toBe(1000)
})
test("div", ()=> {
    //1. тестовые данные
    const salary: number = 1200
    const n: number = 200
    //2. выполнение тестируемого кода
    const result = div(salary, n)
    // 3/ проыерка результата
    expect(result).toBe(6)
})
test("mult", ()=> {
    //1. тестовые данные
    const salary: number = 1200
    const n: number = 2
    //2. выполнение тестируемого кода
    const result = mult(salary, n)
    // 3/ проыерка результата
    expect(result).toBe(2400)
})

test("case reduser", ()=> {
    
    const actionSum:ActionType = {
        salary:800,
        type:"SUM",
        n:200
    }
    const actionSub:ActionType = {
        salary:700,
        type:"SUB",
        n:200
    }
    const actionDiv:ActionType = {
        salary:700,
        type:"DIV",
        n:2
    }
    const actionMult:ActionType = {
        salary:700,
        type:"MULT",
        n:2
    }
    
    const resultSum = salaryReduser(actionSum)
    expect(resultSum).toBe(1000)
    const resultSub = salaryReduser( actionSub)
    expect(resultSub).toBe(500)
    const resultDiv = salaryReduser( actionDiv)
    expect(resultDiv).toBe(350)
    const resultMult = salaryReduser( actionMult)
    expect(resultMult).toBe(1400)
    
} )