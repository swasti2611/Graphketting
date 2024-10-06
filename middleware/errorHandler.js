class customError extends Error {
    constructor(message, statusCode) {
        super(message || 'Something went wrong'); // Provide a default message if none is provided
        this.statusCode = statusCode || 500; // Default to 500 if no statusCode is given
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error'; // Assign status based on statusCode
    }
}


function errorHandler(err, req, res, next) {
    // Set the status code or default to 500 if not provided
    let statusCode = err.statusCode || 500;
    // Determine if the status is a fail (client error) or error (server error)
    let status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';

    // Send a JSON response with the error message and status
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error', // Provide a default error message
        status: status,
    });

    // No need to call next() after sending a response
    next()
}



module.exports = { errorHandler, customError };
