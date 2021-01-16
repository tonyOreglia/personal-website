# Personal Website
[![Codeship Status for tonyOreglia/chess-board-react](https://app.codeship.com/projects/21a97f80-4498-0137-e7e1-4a88ae496eec/status?branch=master)](https://app.codeship.com/projects/336970)

## Publishing website changes
1. build: 
```
$ npm run build
```
2. move to /root/tonycodes.com
```
sudo rm -rf /root/tonycodes.com/* 
sudo mv build/* /root/tonycodes.com/
```

## General Notes
* tonycodes.com currently resolves to digitalocean which direct it to ... wherverver I say ... currently the public IP of my old apartment. I've updated this to now point at my current public IP which is 95.94.31.40
* To renew letsencrypt certificates run: 
```
sudo certbot --nginx certonly -d www.tonycodes.com,tonycodes.com
```
Note that, port 80 must be opened via the router configuration settings for certbot to make the necessary server connection. This is how it validates that you do in fact have control over the machine you are generating a certificate for. 
* Port 443 needs to be open on the router for the https to work. 
* See `/etc/nginx/sites-available/tonycodes.com` for nginx configuration (copied here to local config)

# To Do
- [X] ~~*remove scroll bar to enable snake game to work without disruption OR link out of the app for snake OR make snake game work with mouse pointer*~~ [2021-01-06] made it mouse controlled
- [X] ~~*add a blog tab*~~ [2021-01-10]
- [ ] do a dark mode tab
- [ ] do an images tab to share my life
- [ ] Add credit to https://html5up.net/future-imperfect
- [ ] integrate with codeship
- [ ] make tiddlywiki deep linkable
- [ ] implement some auto formatting