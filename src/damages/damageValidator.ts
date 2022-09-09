import { body, param, query } from "express-validator";

class DamageValidator {
    checkCreateDamage() {
        return [
            body('description')
                .notEmpty()
                .withMessage('Description Name should not be empty'),
            body('worth')
                .notEmpty()
                .withMessage('Worth should not be empty')
                .isDecimal()
                .withMessage('Worth should be money value'),
            body('cleared')
                .notEmpty()
                .withMessage('cleared should not be empty')
                .isBoolean()
                .withMessage('cleared should be true or false'),
            body('TenantId')
                .notEmpty()
                .withMessage('TenantId should not be empty')
                .isNumeric()
                .withMessage("TenantId value should be number"),
            body('PropertyId')
                .notEmpty()
                .withMessage('Property Id should not be empty')
                .isNumeric()
                .withMessage("Property Id value should be number")        
        ];
    }

    checkGetDamage() {
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

export default new DamageValidator();