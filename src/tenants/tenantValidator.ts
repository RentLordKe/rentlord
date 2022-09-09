import { body, param, query } from "express-validator";

class TenantValidator {
    checkCreateTenant() {
        return [
            body('nextOfKinName')
                .notEmpty()
                .withMessage('Unit Number should not be empty'),
            body('nextOfKinMobile')
                .notEmpty()
                .withMessage('Currency should not be empty'),
            body('nextofKinRelation')
                .notEmpty()
                .withMessage('Currency should not be empty'),
            body('entryDate')
                .notEmpty()
                .withMessage('Currency should not be empty')
                .isISO8601()
                .withMessage('Should be a valid date'),
            body('totalPaid')
                .notEmpty()
                .withMessage('Deposit Amount should not be empty')
                .isDecimal()
                .withMessage('Should be valid money type'),
            body('UnitId')
                .notEmpty()
                .withMessage('Unit Id should not be empty')
                .isNumeric()
                .withMessage('Should be valid UnitId'),
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

    checkGetTenant() {
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

export default new TenantValidator();