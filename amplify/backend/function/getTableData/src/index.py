import json, boto3, os, requests
from boto3.dynamodb.conditions import Key
import time

def current_milli_time():
    return round(time.time() * 1000)

def handler(event, context):
    print("Received Event:")
    print(event)

    dynamodb = boto3.resource('dynamodb')
    dataTableName = os.environ['STORAGE_BRAWLHALLADATA_NAME']
    apikey = os.environ["API_KEY"]
    dataTable = dynamodb.Table(dataTableName)

    try:
        returnInfo = dataTable.scan()
        timeofExe = current_milli_time()
        if (len(returnInfo['Items']) < 1 or (timeofExe - returnInfo['Items'][-1]['time'] > 600000)):
            newFetch = fetchNewData(apikey)
            post_data = json.dumps(newFetch['data'])
            dataTable.put_item(
                Item={
                    'time': timeofExe,
                    'data': post_data
                }
            )
            newReturn = dataTable.query(KeyConditionExpression=Key('time').eq(timeofExe))
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({'time': str(newReturn['Items'][-1]['time']), 'data': newReturn['Items'][-1]['data']})
            }
        else:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({'time': str(returnInfo['Items'][-1]['time']), 'data': returnInfo['Items'][-1]['data']})
            }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(repr(e))
        }

def fetchNewData(k):
    dataObject = {
        "data": {
            "all": {
                "1v1": {},
                "2v2": {}
            },
            "aus": {
                "1v1": {},
                "2v2": {}
            },
            "brz": {
                "1v1": {},
                "2v2": {}
            },
            "eu": {
                "1v1": {},
                "2v2": {}
            },
            "jpn": {
                "1v1": {},
                "2v2": {}
            },
            "sea": {
                "1v1": {},
                "2v2": {}
            },
            "us-e": {
                "1v1": {},
                "2v2": {}
            },
            "us-w": {
                "1v1": {},
                "2v2": {}
            }
        }
    }
    region_list = ["all", "aus", "brz", "eu", "jpn", "sea", "us-e", "us-w"]
    bracket_list = ["1v1", "2v2"]

    for r in region_list:
        for b in bracket_list:
            for x in range(1, 3):
                url = f'https://api.brawlhalla.com/rankings/{b}/{r}/{x}?api_key={k}'
                dataObject['data'][r][b][f'page{x}'] = requests.get(url).json()
    legend_url = f'https://api.brawlhalla.com/legend/all?api_key={k}'
    dataObject['data']['legends'] = requests.get(legend_url).json()
    return {
        "data": dataObject
    }