import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'


const XAWS = AWSXRay.captureAWS(AWS)


export class BucketAccess {

    constructor(
        private readonly s3Client = createS3Bucket(),
        private readonly imagesBucket = process.env.IMAGES_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION) {

    }

    getPreSignedUrl(imageId: string): any {

        return this.s3Client.getSignedUrl('putObject', {
            Bucket: this.imagesBucket,
            Key: imageId,
            Expires: parseInt(this.urlExpiration, 10)
        })
    }
    getImageUrl(imageId: string): string {
        return `https://${this.imagesBucket}.s3.amazonaws.com/${imageId}`;
    }

}

function createS3Bucket() {
    return new XAWS.S3({
        signatureVersion: 'v4'
    });
}
