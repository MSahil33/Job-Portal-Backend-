// Utility class to define a structure for all API Responses

import colors from 'colors';
class ApiResponse {
    constructor(statusCode, data, message) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;

        console.log(`${statusCode} ${message}`.bgGreen.white.bold);
    }
}

export { ApiResponse };