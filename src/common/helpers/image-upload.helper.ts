import { HttpException, HttpStatus } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from 'uuid';


// type ValidFileExtension= 'png' | 'jpg' | 'jpeg';
// type ValidMimeType= 'image/png' | 'image/jpg' | 'image/jpeg';

// const validFileExtensions:ValidFileExtension[] =[ 'png','jpg','jpeg']
// const validMimeTypes:ValidMimeType[] =[ 'image/png','image/jpg','image/jpeg']

export const ImageUploadHelper = {
    limits:{
        // fileSize: +process.env.MAX_FILE_SIZE,
    },

    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        } else {
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },

    storage:diskStorage({
    destination:'files',    
    filename:(req, file, cb)=>{
        const surfx= Date.now()+'_'+Math.round(Math.random() *1e9);
        const ext = extname(file.originalname);
        // const filename = `${file.originalname}-${surfx}${ext}`;
        const filename = uuid() +ext;
        cb(null, filename);
    }
    }),
    
}