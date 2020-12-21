server {
  listen 80;
  server_name tonycodes.com www.tonycodes.com;
  return 301 https://tonycodes.com$request_uri;
}


server {
  listen [::]:443 ssl;
  listen 443 ssl;

  server_name tonycodes.com;
  root /root/tonycodes.com;
  index index.html;

  ssl_certificate /etc/letsencrypt/live/tonycodes.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/tonycodes.com/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  access_log /var/log/nginx/tonycodes.com.access.log;
  error_log /var/log/nginx/tonycodes.com.error.log;

   location / {
    try_files $uri /index.html =404;
   }

  location /tw {
    proxy_pass http://127.0.0.1:444/;
    # proxy_set_header	Host	$host;
    # proxy_set_header	X-Real-IP	 $remote_addr;
    # proxy_set_header	X-Forwarded-For	 $proxy_add_x_forwarded_for;
  }
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  ''	close;
}

server {
  listen 8443;
  
  ssl on;
  ssl_certificate /etc/letsencrypt/live/tonycodes.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/tonycodes.com/privkey.pem;

  location /uci {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_read_timeout 86400;
  }
} 
