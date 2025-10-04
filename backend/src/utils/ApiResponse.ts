class ApiResponse {

    statusCode: number;
    data: any;
    success: boolean | number;
    message:string;

    constructor(
        statusCode: number,
        data: any,
        message:string = "success"
    ) {
        this.statusCode = statusCode 
        this.data = data
        this.message = message
        this.success =statusCode < 400 
    }
}
