FROM 289208114389.dkr.ecr.us-east-1.amazonaws.com/picpay/nginx:1.17.3-alpine

COPY ./apps/angular/feature-flag/docker/nginx-custom.conf /etc/nginx/conf.d/default.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY ./dist/apps/angular/feature-flag /usr/share/nginx/html

COPY ./apps/angular/feature-flag/docker/docker-entrypoint.sh /

RUN apk --update --no-cache add curl && chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]