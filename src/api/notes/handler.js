const ClientError = require("../../exceptions/ClientError");

class NotesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    }

    postNoteHandler = async (request, h) => {
        // try {
        this._validator.validateNotePayload(request.payload);
        const { title = 'untitled', body, tags } = request.payload;

        const noteId = await this._service.addNote({ title, body, tags });

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId,
            },
        });
        response.code(201);
        return response;
        // } catch (error) {
        //     if (error instanceof ClientError) {
        //         const response = h.response({
        //             status: 'fail',
        //             message: error.message,
        //         });
        //         response.code(error.statusCode);
        //         return response;
        //     }

        //     const response = h.response({
        //         status: 'error',
        //         message: 'Maaf, terjadi kegagalan pada server kami.',
        //     });
        //     response.code(500);
        //     console.log(error);
        //     return response;
        //     // const response = h.response({
        //     //     status: 'fail',
        //     //     message: error.message,
        //     // });
        //     // response.code(400);
        //     // return response;
        // }
    }

    getAllNotesHandler = async () => {
        const notes = await this._service.getNotes();
        return {
            status: 'success',
            data: {
                notes,
            },
        };
    }

    getNoteByIdHandler = async (request, h) => {
        // try {
        const { id } = request.params;
        const note = await this._service.getNoteById(id);
        return {
            status: 'success',
            data: {
                note,
            },
        };
        // } catch (error) {
        //     if (error instanceof ClientError) {
        //         const response = h.response({
        //             status: 'fail',
        //             message: error.message,
        //         });
        //         response.code(error.statusCode);
        //         return response;
        //     }

        //     const response = h.response({
        //         status: 'error',
        //         message: 'Maaf, terjadi kegagalan pada server kami.'
        //     })
        //     response.code(500);
        //     console.log(error);
        //     return response;
        //     // const response = h.response({
        //     //     status: 'fail',
        //     //     message: error.message,
        //     // });
        //     // response.code(404);
        //     // return response;
        // }
    }

    async putNoteByIdHandler(request, h) {
        // try {
        this._validator.validateNotePayload(request.payload);
        const { id } = request.params;

        this._service.editNoteById(id, request.payload);

        return {
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        };
        // } catch (error) {
        //     if (error instanceof ClientError) {
        //         const response = h.response({
        //             status: 'fail',
        //             message: error.message,
        //         });

        //         response.code(error.statusCode);
        //         return response;
        //     }

        //     const response = h.response({
        //         status: 'error',
        //         message: 'Maaf, terjadi kesalahan pada server kami.',
        //     });
        //     response.code(500);
        //     console.error(error);
        //     return response;
        //     // const response = h.response({
        //     //     status: 'fail',
        //     //     message: error.message,
        //     // });
        //     // response.code(404);
        //     // return response;
        // }
    }

    deleteNoteByIdHandler = async (request, h) => {
        // try {
        const { id } = request.params;
        await this._service.deleteNoteById(id);
        return {
            status: 'success',
            message: 'Catatan berhasil dihapus'
        };
        // } catch (error) {
        //     if (error instanceof ClientError) {
        //         const response = h.response({
        //             status: 'fail',
        //             message: error.message,
        //         });
        //         response.code(error.code);
        //         return response;
        //     }

        //     const response = h.response({
        //         status: 'error',
        //         message: 'Maaf, terjadi kesalahan pada server kami.',
        //     });
        //     response.code(500);
        //     console.error(error);
        //     return response;

        //     // const response = h.response({
        //     //     status: 'fail',
        //     //     message: error.message,
        //     // });
        //     // response.code(404);
        //     // return response;
        // }
    }
}

module.exports = NotesHandler;