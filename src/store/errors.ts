export class HttpError extends Error {

    public code: string;
    public status: number;
    public statusText: string;

    constructor(message: string, code: string, status: number, statusText: string) {
        super(message);
        this.name = "HttpError";
        this.code = code;
        this.status = status;
        this.statusText = statusText;
    }
}
