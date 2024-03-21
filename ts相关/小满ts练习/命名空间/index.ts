namespace space1{
    export const Time:number = 1000
    export const fn = <T>(arg:T):T=>{
        return arg
    }
    fn(Time)
}

namespace space2{
    export const Time:number = 2000
    export const fn = <T>(arg:T):T =>{
        return arg
    }
}
space1.Time
space2.Time