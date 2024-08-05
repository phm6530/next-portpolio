import { promisify } from "util";
import multer from "multer";
import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const surveyId = req.query.surveyId as string;
    const page = "survey";
    const uploadDir = path.join(process.cwd(), `/_upload/${page}/${surveyId}`);

    if (!fs.existsSync(uploadDir)) {
      //폴더생성
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: () => {},
});

const upload = multer({ storage: storage });
export default upload;
