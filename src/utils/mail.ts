import { MailParser } from 'mailparser';
import { createReadStream, existsSync } from 'fs';
import { readable as isReadableStream } from 'is-stream';
import * as stream from 'stream';

// email - https://github.com/andris9/mailParser#parsed-mail-object
// @ts-ignore
const parseEmailFile = (file) => {
  const mailParser = new MailParser({
    debug: true,
    streamAttachments: true,
    showAttachmentLinks: false,
  } as any);

  return new Promise((resolve, reject) => {
    // file is either a stream of a string
    // if its a string, check if it exists, and create a read stream of it
    // otherwise just path in

    try {
      console.log('---parseEmailFile: start');
      if (isReadableStream(file) === false) {
        if (existsSync(file as string) === false) {
          reject('Invalid File Path');
        }

        console.log('---parseEmailFile: filePath');
        file = createReadStream(file as string);
      }

      mailParser.on('end', mail => {
        resolve(mail);
      });

      // pipe the file into mail parser
      (file as stream.Readable).pipe(mailParser);
    } catch (e) {
      console.log('---parseEmailFile: error');
      reject(e)
    }

  });
};

export {
  parseEmailFile,
};
