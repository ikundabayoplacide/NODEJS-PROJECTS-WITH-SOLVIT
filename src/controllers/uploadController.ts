import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import streamifier from 'streamifier';
import { ResponseService } from '../utils/response';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const uploadImage = async (req: MulterRequest, res: Response) => {
  try {
    if (!req.file) {
      return ResponseService({
        status: 400,
        res,
        message: 'No file uploaded',
      });
    }

    const streamUpload = () =>
      new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'profile_picture' },
          (error: any, result: any) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file!.buffer).pipe(stream);
      });

    const result = await streamUpload();

    return ResponseService({
      res,
      data: result,
      status: 200,
      message: 'Image Uploaded successfully',
    });
  } catch (error) {
    const { message, stack } = error as Error;
    return ResponseService({
      res,
      status: 500,
      message,
      data: stack,
    });
  }
};

export default uploadImage;
