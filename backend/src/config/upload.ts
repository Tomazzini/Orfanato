import multer from 'multer';
import path from 'path';

export default {
    storage: multer.diskStorage({
        // salva na pasta uploads as imagens
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            cb(null, fileName);
        },
    })

};