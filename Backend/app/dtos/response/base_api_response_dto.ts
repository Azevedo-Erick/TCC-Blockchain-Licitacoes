export default class BaseApiResponseDTO<T> {
    public data?: T
    public message?: string
    public error?: string
    public success: boolean = false
    public statusCode: number = 400

    static success<T>(data: T, message?: string): BaseApiResponseDTO<T> {
        const response = new BaseApiResponseDTO<T>()
        response.data = data
        response.message = message
        response.success = true
        response.statusCode = 200
        return response
    }

    static error<T>(error: string, message?: string): BaseApiResponseDTO<T> {
        const response = new BaseApiResponseDTO<T>()
        response.error = error
        response.message = message
        response.success = false
        response.statusCode = 400
        return response
    }

    static withStatusCode<T>(statusCode: number, data: T, message?: string): BaseApiResponseDTO<T> {
        const response = new BaseApiResponseDTO<T>()
        response.data = data
        response.message = message
        response.success = statusCode >= 200 && statusCode < 300
        response.statusCode = statusCode
        return response
    }
}