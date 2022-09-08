import { body, param, query } from "express-validator";

class PropertyValidator {
    checkCreateProperty() {
        return [
            body('propertyName')
                .notEmpty()
                .withMessage('Property Name should not be empty'),
            body('location')
                .notEmpty()
                .withMessage('Location should not be empty'),
            body('buildingType')
                .notEmpty()
                .withMessage('Building Type should not be empty'),
            body('totalUnits')
                .notEmpty()
                .withMessage('Total units should not be empty')
                .isNumeric()
                .withMessage("Total Units value should be number")
                .isInt({min: 1, max: 10000})
                .withMessage('The limit should be between 1 - 1000'),
            
        ];
    }

    checkGetProperty() {
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

export default new PropertyValidator();