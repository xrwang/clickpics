import boto3


# conn = boto3.client('s3')  # again assumes boto.cfg setup, assume AWS S3
# for key in conn.list_objects(Bucket='bot-moderation')['Contents']:
#     print('https://s3-us-west-2.amazonaws.com/bot-moderation/%s' % key['Key'])

for x in range(1, 369):
    print (x)
