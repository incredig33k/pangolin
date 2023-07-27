<p align=center><img src='./favicon.ico' width=128px></p>
Pangolin is an super simple open source web interface for OpanAI's Whisper automatic speech recognition (ASR) system. <a href="https://openai.com/research/whisper">OpenAI Whisper</a>. This web interface is designed to be simple and easy to use.  Info is also available on the <a href="https://www.incredigeek.com/home/pangolin">Website</a>
<br>
<br>

<p align=center><img src='./demo.png' width=512px></p>




# Install Guide
## Add User

We’ll setup a new unprivileged user called pangolin.

```
sudo useradd -m pangolin
sudo passwd pangolin
su pangolin
cd
pip3 install whisper-ctranslate2
  or 
pip3.9 install whisper-ctranslate2

npm install https formidable@2.1.1 fs path url

wget https://github.com/incredig33k/pangolin/releases/download/release/pangolin_web.zip

unzip ./pangolin_web.zip
cd pangolin_web
mkdir uploads
```

## Setup SSL Certificate

This assumes you already have Let’s Encrypt setup. We’ll create a certificate directory for Pangolin to use and then copy the certs there.

```
mkdir /home/pangolin/ssl
sudo cp /etc/letsencrypt/live/DOMAINNAME.COM/fullchain.pem /home/pangolin/ssl/
sudo cp /etc/letsencrypt/live/DOMAINNAME.COM/privkey.pem /home/pangolin/ssl/
sudo chown pangolin:pangolin /home/pangolin/ssl/fullchain.pem
sudo chown pangolin:pangolin /home/pangolin/ssl/privkey.pem
```

Now back in our web directory we can update the vars.js file like the following.
*Note that we do need the full file path. Can’t use ~/*

```
module.exports = {
key: '/home/pangolin/ssl/privkey.pem',
cert: '/home/pangolin/ssl/fullchain.pem'
}
```
## Firewall rules

*We can change the port Pangolin runs on by editing the listen port at the bottom of the pangolin_server.js file.*

```
sudo firewall-cmd --add-port=443/tcp
```

## Setting up systemd Service

Now we need to copy our service file and enable the Pangolin service.
```
sudo cp /home/pangolin/pangolin_web/pangolin.service /usr/lib/systemd/system/pangolin.service

sudo systemctl enable pangolin.service
```
Start the service
```
sudo systemctl start pangolin
```
