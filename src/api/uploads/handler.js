class UploadsHadnler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    postUploadImageHandler = async (request, h) => {
        const { data } = request.payload;

        this._validator.validateImageHeaders(data.hapi.headers);

        const fileLocation = await this._service.writeFile(data, data.hapi);
        
        const response = h.response({
            status: 'success',
            data: {
                fileLocation,
            },
        });
        response.code(201);
        return response;
    }
}

module.exports = UploadsHadnler;