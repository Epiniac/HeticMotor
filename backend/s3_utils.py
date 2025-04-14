import boto3

import os

from werkzeug.utils import secure_filename

import uuid

from botocore.exceptions import NoCredentialsError


AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")

AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

S3_REGION = os.getenv("S3_REGION", "eu-west-3")


s3_client = boto3.client(

    "s3",

    region_name=S3_REGION,

    aws_access_key_id=AWS_ACCESS_KEY,

    aws_secret_access_key=AWS_SECRET_KEY

)


def upload_file_to_s3(file):

    try:

        filename = secure_filename(file.filename)

        unique_filename = f"{uuid.uuid4()}_{filename}"


        s3_client.upload_fileobj(

            file,

            S3_BUCKET_NAME,

            unique_filename,

            ExtraArgs={"ACL": "public-read", "ContentType": file.content_type}

        )


        url = f"https://{S3_BUCKET_NAME}.s3.{S3_REGION}.amazonaws.com/{unique_filename}"

        return url

    except NoCredentialsError:

        raise Exception("Problème de credentials AWS")

    except Exception as e:

        raise Exception(f"Erreur S3 : {str(e)}")

