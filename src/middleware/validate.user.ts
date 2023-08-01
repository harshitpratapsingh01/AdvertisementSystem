import Joi from "joi";

export class Validate{
    static validateUser = Joi.object({
        username: Joi.string().min(6).max(30).required(),
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        dob: Joi.date().required(),
        mobile_no: Joi.number().min(5000000000).max(9999999999).required(),
        gender: Joi.string().required()
    });
}