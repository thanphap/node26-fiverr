const multer = require('multer');

const uploadFunc = (dest) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./static/${dest}/`);
        },
        filename: (req, file, cb) => {
            const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${prefix}-${file.originalname}`);
        },
    });
    const upload = multer({ storage: storage }).single('file');
    return upload;
};

module.exports = {
    uploadFunc,
};