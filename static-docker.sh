docker build -t static_server . && \
docker run -d \
    -e "VIRTUAL_HOST=static.suilabs.com" \
    -e "LETSENCRYPT_HOST=static.suilabs.com" \
    -e "LETSENCRYPT_EMAIL=borja.arias.upc@gmail.com" \
    -v ${PWD}/public:/usr/src/app/public \
    static_server
