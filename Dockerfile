ARG FRONT_BASE_IMAGE
FROM ${FRONT_BASE_IMAGE}
COPY ./dist /opt/copy
COPY /docker_script/sed.sh /opt/
RUN chmod -R 777 /opt/sed.sh && \
echo 'server {\n\
    listen        8080;\n\
    listen        [::]:8080;\n\
    server_name   localhost;\n\
    access_log    /dev/stdout;\n\
    error_log     /dev/stderr;\n\
    location / {\n\
        add_header Access-Control-Allow-Origin "*";\n\
        root /usr/share/nginx/html; \n\
        try_files $uri $uri/ /index.html; \n\
        index index.html index.htm; \n\
    }\n\
    location /actuator/health {\n\
        add_header Access-Control-Allow-Origin "*";\n\
        default_type application/json;\n\
        return 200 "{ \"status\": \"UP\" }";\n\
    }\n\
    error_page 500 502 503 504 /50x.html;\n\
    location /50x.html {\n\
        root /usr/share/nginx/html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf
ENTRYPOINT /docker-entrypoint.sh && cp -R /opt/copy/* /usr/share/nginx/html/ && /opt/sed.sh && nginx -g 'daemon off;'
