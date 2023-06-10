#!/bin/bash
sudo docker images --format="{{.Repository}} {{.ID}}" | grep "vladsmirn289/kio-school" | cut -d' ' -f2 | xargs docker image rm --force
sudo docker build -t vladsmirn289/kio-school .
sudo docker push vladsmirn289/kio-school
ssh -i ~/.ssh/vladislav_smirnov_ed25519 kafam@158.160.8.30 << EOF

sudo su -

cd kio_school_project
systemctl stop nginx.service

docker stop kio_school
docker rm kio_school
docker images --format="{{.Repository}} {{.ID}}" | grep "vladsmirn289/kio-school" | cut -d' ' -f2 | xargs docker image rm --force
docker compose up -d

systemctl start nginx.service

exit
exit

EOF