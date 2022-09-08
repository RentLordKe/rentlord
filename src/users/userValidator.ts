import { body, param, query } from "express-validator";

class UserValidator {
    checkCreateUser() {
        return [
            body('firstName')
                .notEmpty()
                .withMessage('First Name should not be empty'),
            body('lastName')
                .notEmpty()
                .withMessage('Last Name should not be empty'),
            body('phoneNumber')
                .notEmpty()
                .withMessage('phoneNumber should not be empty'),
            body('idNumber')
                .notEmpty()
                .withMessage('idNumber should not be empty'),
            body('email')
                .isEmail()
                .withMessage('Provide a valid email address'),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Minimum Password length is 5'),
            body('role')
                .notEmpty()
                .withMessage('role should not be empty'),
        ];
    }

    checkGetUsers() {
        return [
            query('limit')
                .optional()
                .isInt({min: 1, max: 100})
                .withMessage('The limit should be between 1 - 100'),
            query('page')
                .optional()
                .isNumeric()
                .withMessage("The value should be number"),
            query('type')
                .optional()
                .isString()
                .withMessage("Type can be admin, owner, tenant, manager"),
        ];
    }

    checkIdParam(){
        return [
            param('id')
                .notEmpty()
                .withMessage('Id param should not be empty')
                .isNumeric()
                .withMessage("Id param value should be number"),
        ]
    }
}

export default new UserValidator();