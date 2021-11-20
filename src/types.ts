interface argResult{
    help: boolean,
    port: boolean,
    command: string,
}
interface optionResult{
    directory:string,
    project:string,
    template:string,
    help: boolean,
    port: number,
    command: string,
}

type question = {
    type: string,
    name: string,
    message: string,
    choices: string[],
    default: any,
}

export {
    argResult,
    optionResult,
    question,
}
