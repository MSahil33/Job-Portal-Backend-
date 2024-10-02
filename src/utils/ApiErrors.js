// Creating a function to use Errors for the API
import colors from 'colors';
class ApiErrors{
    
    constructor(statusCode,message="Something Went Wrong",errors=[],stack=""){
        // super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if(stack){
            this.stack=stack;
        }else{
            Error.captureStackTrace(this,this.constructor);
        }

        console.log(`${statusCode} ${message} ${errors}`.bgRed.white.bold);
    }
}

export {ApiErrors};