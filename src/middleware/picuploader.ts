import multer from 'multer';

// const uploading = multer({
//     storage: multer.diskStorage({
//         destination: function(req, file, cb){
//             cb(null, 'uploads');
//         },
//         filename: function(req, file, cb){
//             cb(null,file.originalname);
//         }
//     })
// });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.cwd()}/src/uploads`);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
      //console.log(file.originalname)
    },
  });
  
  // Create a multer instance with the storage options
const upload = multer({ storage });
export { upload };