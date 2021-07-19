const multer = require('multer');
const MIME_TYPE_MAP = {
  'document/doc' : '.doc',
  'document/docx' : '.docx',
  'document/docs' : '.docs',
  'document/pdf' : '.pdf'
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/documents');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    // cb(null, name + '-' + Date.now() + '.' + ext);
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'document/doc' || file.mimetype === 'document/docx' || file.mimetype === 'document/docs' || file.mimetype === 'document/pdf'){
    cb(null, true);
  }else {
    cb(null, false);
  }
}

module.exports = multer({storage: fileStorage}).single('document');
