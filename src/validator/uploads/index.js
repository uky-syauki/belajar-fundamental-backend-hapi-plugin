const InvariantError = require('../../exceptions/InvariantError');
const { ImageUploadSchema } = require('./schema');

const UploadsValidator = {
    validateImageHeaders: (headers) => {
        const validationResult = ImageUploadSchema.validate(headers);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = UploadsValidator;