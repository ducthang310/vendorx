// import { S3EventRecord } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { parseEmailFile } from '../utils/mail';
// import * as stream from 'stream';
// import { ParsedMail } from 'mailparser';
// import moment from 'moment';
// import Transaction from '../models/Transaction';
// import { successResponse } from '../utils';

/**
 * Listens to events from SES's s3 box, parses emails, and puts them into the system.
 *
 * @param event
 * @param _context
 * @param callback
 */
export const handle: AWSLambda.Handler = (
  event: AWSLambda.S3Event,
  _context,
  callback,
) => {
  const records = event.Records;

  records.forEach(record => {
    console.log(`${record.s3.bucket.name} - ${record.s3.object.key}`);

    const {
      s3: {
        bucket: { name: bucketName },
        object: { key: objectKey },
      },
    } = record

    const s3 = new S3();

    const getEmailFile = new Promise((resolve, reject) => {
      try {
        const emailFile = s3
          .getObject({
            Bucket: bucketName,
            Key: objectKey,
          })
          .createReadStream()

        resolve(emailFile)
      } catch (error) {
        console.log('error getting email file')
        reject(error)
      }
    });

    console.log('getting email file')
    getEmailFile
      .then(parseEmailFile)
      .then(e => {
        console.log('email file parsed')
        console.log(e);

      })
      .catch(error => {
        console.error(error);
        callback(error)
      })
  })

};
