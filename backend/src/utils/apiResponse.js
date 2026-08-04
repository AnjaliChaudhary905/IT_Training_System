export const successResponse = (
    res, 
    data = null,
    message = "success",
    statusCode = 200
) =>{
    return res.status(statusCode).json({
        success:true,
        message,
        data,
    })
}

export const errorResponse = (
    res,
    message = "something went wrong",
    statusCode = 500
) =>{
    return res.status(statusCode).json({
        success: false,
        message,
    })
}