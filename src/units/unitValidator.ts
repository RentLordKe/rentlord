import { body, param, query } from "express-validator";

class UnitValidator {
    checkCreateUnit() {
        return [
            body('unitNumber')
                .notEmpty()
                .withMessage('Unit Number should not be empty'),
            body('depositAmount')
                .notEmpty()
                .withMessage('Deposit Amount should not be empty')
                .isDecimal()
                .withMessage('Should be valid money type'),
            body('rentAmount')
                .notEmpty()
                .withMessage('Rent Amount should not be empty')
                .isDecimal()
                .withMessage('Should be valid money type'),
            body('otherFees')
                .isDecimal()
                .withMessage('Should be valid money type'),
            body('currency')
                .notEmpty()
                .withMessage('Currency should not be empty'),
            body('vacant')
                .notEmpty()
                .withMessage('is vacant should not be empty')
                .isBoolean()
                .withMessage("should be true or false")
            
        ];
    }

    checkGetUnit() {
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

export default new UnitValidator();