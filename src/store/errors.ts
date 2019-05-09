export class HttpError extends Error {

    public code: string;

    constructor(message: string, code: string) {
        super(message);
        this.name = "LoginError";
        this.code = code;
    }
}