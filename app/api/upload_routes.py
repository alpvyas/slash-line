from flask import Blueprint, jsonify, request, json, session
from werkzeug.utils import secure_filename
import boto3
import os


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

    files = request.files

    print("FILES: ", files)
    for file in files:
        print("THIS FILE: ", file)
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
