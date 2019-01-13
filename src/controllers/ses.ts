// import { S3EventRecord } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { parseEmailFile } from '../utils/mail';
import moment from 'moment';
import Transaction from '../models/Transaction';
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

  try {
    records.forEach(async record => {
      console.log(`${record.s3.bucket.name} - ${record.s3.object.key}`);
      const s3 = new S3();
      const emailFile = s3
        .getObject({
          Bucket: record.s3.bucket.name,
          Key: record.s3.object.key,
        })
        .createReadStream();
      const parsedEmail: any = await parseEmailFile(emailFile);
      const sender: string = parsedEmail.from && parsedEmail.from[0] && parsedEmail.from[0].address ? parsedEmail.from[0].address.toLowerCase() : '';
      const subject: string = parsedEmail.subject;
      const source: string = `Sender: ${sender} \n`
        + `Subject: ${subject}`
      ;
      const data = {
        customer_id: null,
        created_by: 'SES',
        type: 'email',
        source,
        created_at: moment().format('YYYY MM DD HH:mm:ss'),
        updated_at: moment().format('YYYY MM DD HH:mm:ss'),
      };
      new Transaction(data).save(undefined, { method: 'insert' });
      console.log('----finish, source: ');
      console.log(source);

    });
  } catch (e) {
    console.log(e);
    callback(e);
  }
};
