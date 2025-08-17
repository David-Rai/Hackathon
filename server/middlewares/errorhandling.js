
export function errorhandling(err, req, res, next) {
    const scode = err.status || 500

    return res.status(500).json({
        message: err.message,
        status: scode,
        success: false
    })
}
