import rateLimit from "express-rate-limit";

const expressRateLimit =  rateLimit({
    windowMs: 60 * 1000,
    max: 15,
    message: 'You have exceeded the maximum number of requests per minute!',
    standardHeaders: true,
    legacyHeaders: false
});

export default expressRateLimit;
