export type ToDoRecordType = {
    _id: string,
    name: string,
    completed: boolean,
    __v: number
}

export type TodoPayload = {
    name: string,
    completed: boolean,
}

export type EditToDoPayload = {
    name?: string,
    completed?: boolean,
}