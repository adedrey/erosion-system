
export interface Post {
    _id? : string
    title : string,
    address : string,
    body : string,
    status : string,
    progress? : number,
    contractId? : object[],
    problem? : string,
    assign? : boolean,
    userId? : string,
    __v? : number
}