import * as fs from 'fs';
import * as path from 'path';
import * as FormData from 'form-data';
import axios from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MediaUtils {
  constructor(
    private readonly httpService:HttpService,

  ){}

 async uploadToFileServer(imagePath:string){  
        const url = 'https://cdn.sasakonnect.net/content/single'
        try {
          const data = new FormData();
          data.append('file', fs.createReadStream(imagePath));//path resolves relative to where server is running
    
          const requestConfig = {
            headers:{
                'x-api-key': process.env.FS_X_API_KEY,
                'x-api-secret': process.env.FS_X_API_SECRET,
                'bucket': process.env.FS_BUCKET,
                ...data.getHeaders()
            },
            maxBodyLength: Infinity,
          }    
         
    
          const responseData = await lastValueFrom(
            this.httpService.post(url, data, requestConfig).pipe(
              map(response => {
                return response.data
              }),
              catchError(error => {
                console.error('Error in Post API calls', error);
                throw new HttpException('Error uploading file to remote server', HttpStatus.INTERNAL_SERVER_ERROR)
              })
            )
          )  
    
          //delete image from file system after upload
          fs.unlink(imagePath, (error) => {
              console.log(error)
                if (error) {
                    console.error('Error deleting the file from temporary file dir:', error);
                    throw new HttpException('Error in file upload', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            })
    
          //img download https://cdn.sasakonnect.net/foodplus/+ responseData.fileName  or  https://cdn.sasakonnect.net/content?bucket=foodplus&file= + responseData.fileName
          return responseData.fileName    
          
        } catch (error) {
          console.log({error})
          throw new HttpException(`Error uploading file: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)    
        }    
    
      }



/*
  direct upload to remote server - file:Express.Multer.File controller interceptor - UploadImgToServerHelper
  firt upload to tmp dir then remote - imagePath:string   controller interceptor - UploadImgToFolderHelper, ensure to unlink after upload
*/
async uploadToFileServerDirect(file:Express.Multer.File){   //when uploading buffer
  const url = 'https://cdn.sasakonnect.net/content/single'
  const imagePath = file.path;
  try {
    const data = new FormData();
    data.append('file', fs.createReadStream(imagePath));//path resolves relative to where server is running

    const requestConfig = {
      headers:{
          'x-api-key': process.env.FS_X_API_KEY,
          'x-api-secret': process.env.FS_X_API_SECRET,
          'bucket': process.env.FS_BUCKET,
          ...data.getHeaders()
      },
      maxBodyLength: Infinity,
    }    
   

    const responseData = await lastValueFrom(
      this.httpService.post(url, data, requestConfig).pipe(
        map(response => {
          return response.data
        }),
        catchError(error => {
          console.error('Error in Post API calls', error);
          throw new HttpException('Error uploading file to remote server', HttpStatus.INTERNAL_SERVER_ERROR)
        })
      )
    )  

    // //delete image from file system after upload
    // fs.unlink(imagePath, (error) => {
    //     console.log(error)
    //       if (error) {
    //           console.error('Error deleting the file from temporary file dir:', error);
    //           throw new HttpException('Error in file upload', HttpStatus.INTERNAL_SERVER_ERROR);
    //       }
    //   })

    
    //img download https://cdn.sasakonnect.net/foodplus/+ responseData.fileName  or  https://cdn.sasakonnect.net/content?bucket=foodplus&file= + responseData.fileName
    return responseData.fileName    
    
  } catch (error) {
    console.log({error})
    throw new HttpException(`Error uploading file: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)    
  }    

}





    }