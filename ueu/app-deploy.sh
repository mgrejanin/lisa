#!/bin/bash
for ARGUMENT in "$@"
do

    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)   

    case "$KEY" in
            distPath)              DIST_PATH=${VALUE} ;;
            appName)              APP_NAME=${VALUE} ;;
            stage)              STAGE=${VALUE} ;;
            *)   
    esac    

done

echo distPath $DIST_PATH
echo appName $APP_NAME
echo stage $STAGE

aws s3 sync $DIST_PATH/$APP_NAME/ s3://picpay-frontend-$APP_NAME-$STAGE/ --delete
echo Querying distribution id
QUERY="DistributionList.Items[].{Id:Id,OriginId:Origins.Items[0].Id}[?contains(OriginId,'$APP_NAME')].Id"
QUERY_RESULT=$(aws cloudfront list-distributions --query $QUERY)
DISTRIBUTION_ID=$(echo $QUERY_RESULT | sed 's/[^a-zA-Z0-9]//g')
echo Cache invalidation started for $APP_NAME in $stage
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"