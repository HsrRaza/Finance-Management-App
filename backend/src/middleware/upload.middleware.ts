import { Request } from "express";
import { FileFilterCallback } from "multer";
import multer from "multer";
import { devNull } from "os";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }

})

// file filter
const fileFilter = (req: Request, file: Express.Multer.File, cb:FileFilterCallback)=> {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpeg, .jpg and .png formats are allowed"));
    }
}

export const upload = multer({
    storage,
    fileFilter

})