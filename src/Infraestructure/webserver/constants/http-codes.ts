interface status {
    OK: number,
    CREATED: number,
    BAD: number,
    UNAUTHORIZED: number,
    INTERNAL_ERROR: number
}

export const STATUS: status = {
    OK: 200,
    CREATED: 201,
    BAD: 400,
    UNAUTHORIZED: 401,
    INTERNAL_ERROR: 500,
}

export const  statusMSG = (msg: string): {msg: string}=>({msg})
