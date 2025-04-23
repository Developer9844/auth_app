openssl req -x509 -nodes -days 365 \
>   -newkey rsa:2048 \
>   -keyout certs/self.key \
>   -out certs/self.crt \
>   -subj "/CN=localhost"


# for mysql to kafka
https://medium.com/cstech/streaming-data-from-mysql-with-kafka-connect-jdbc-source-connector-428f4db20b5b
https://www.digitalocean.com/community/tutorials/how-to-integrate-existing-systems-with-kafka-connect

https://hostman.com/tutorials/install-apache-kafka-on-ubuntu-22-04/
https://www.elastic.co/search-labs/blog/elasticsearch-apache-kafka-ingest-data