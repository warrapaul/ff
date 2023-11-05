import { HttpException, HttpStatus } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from 'uuid';
import { PROFILE_PICTURE_SIZE_IN_BYTES } from "../constants/file-uploads.constants";



export const UploadImgToFolderHelper = {
    limits:{
         fileSize: PROFILE_PICTURE_SIZE_IN_BYTES,
    },

    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        } else {
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },

    storage:diskStorage({
        // destination:'files',    
        destination:(req, file, cb)=>{
            cb(null, 'files')
        },
        filename:(req, file, cb)=>{
            const surfx= Date.now()+'_'+Math.round(Math.random() *1e9);
            const ext = extname(file.originalname);
            // const filename = `${file.originalname}-${surfx}${ext}`;
            const filename = uuid() +ext;
            cb(null, filename);
        }
    }),
    
}


export const UploadImgToServerHelper = {
    limits: {
         fileSize: PROFILE_PICTURE_SIZE_IN_BYTES,
      },
    
      //validate the buffer
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`,HttpStatus.BAD_REQUEST));
        }
      }
}