from flask import Blueprint, jsonify, request, json
from werkzeug.utils import secure_filename
import boto3
# from botocore.exceptions import ClientError
# import logging
import os
import io


upload_routes = Blueprint("upload_routes",
                          __name__)

s3 = boto3.client("s3",
                  aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
                  aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
                  )

bucket_name = os.environ.get("AWS_BUCKET_NAME")
# ------------------------------------------------------------------------------
#                         Upload Operation Functions
# ------------------------------------------------------------------------------


def upload():
    print("REQ: ", request.form)
    image = request.form

    if image:
        filename = secure_filename(image.filename)
        image.save(filename)
        s3.upload_file(
            Bucket='slashline-profile-pictures',
            Filename=filename,
            Key=filename
        )

    return jsonify({"message": "Upload Successful"})


# ------------------------------------------------------------------------------
#                    RESTful Routes -- Uploads
# ------------------------------------------------------------------------------

@upload_routes.route("/", methods=['POST'])
def upload_files():
    return upload()
