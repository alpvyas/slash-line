from flask import Blueprint, jsonify, request, json, session
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


def upload(file_name="ILOVEBELLINGER", bucket=bucket_name, object_name=None):

    data = json.loads(request.data.decode("utf-8"))
    # file_name = io.BytesIO('')
    if object_name is None:
        object_name = file_name

    files = data["fileList"]

    for file in files:
        s3.upload_file(file, bucket, object_name)
        # with open(file, "rb") as f:

    print("FILE: ", files)

    return jsonify("TRUE")

    # print("FILES: ", files)
    # for file in files:
    # print("THIS FILE: ", file)
    # if file:
    #     filename = secure_filename(file["path"])
    #     s3.upload_file(
    #         Bucket=bucket_name,
    #         Filename=filename,
    #         Key=filename
    #     )

    return jsonify({"message": "Upload Successful"})


# ------------------------------------------------------------------------------
#                    RESTful Routes -- Uploads
# ------------------------------------------------------------------------------

@upload_routes.route("/", methods=['POST'])
def upload_files():
    return upload()
