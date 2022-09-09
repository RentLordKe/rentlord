import { body, param, query } from "express-validator";

class ManagerValidator {
    checkCreateManager() {
        return [
            body('accessLevel')
                .notEmpty()
                .withMessage('Property Id should not be empty')
                .isInt({min: 1, max: 4})
                .withMessage('Access level is 1 - 4'),
            body('PropertyId')
                .notEmpty()
                .withMessage('Property Id should not be empty')
                .isNumeric()
                .withMessage('Should be valid PropertyId'),
            body('UserId')
                .notEmpty()
                .withMessage('User Id should not be empty')
                .isNumeric()
                .withMessage('Should be valid UserId'),
        ];
    }

    checkGetManager() {
        return [
            query('limit')
                .optional()
                .isInt({min: 1, max: 100})
                .withMessage('The limit should be between 1 - 100'),
            query('page')
                .optional()
                .isNumeric()
                .withMessage("The value should be number"),
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

export default new ManagerValidator();