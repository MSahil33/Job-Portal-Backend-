// Utility class to define a structure for all API Responses

class ApiResponse{
    constructor(statusCode,data,message="Success"){
        this.statusCode=statusCode;
        this.data=data;
        this.message=message;
        this.success=statusCode < 400; 
    }
}

export {ApiResponse};