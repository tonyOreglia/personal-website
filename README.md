# Personal Website

[![Codeship Status for tonyOreglia/chess-board-react](https://app.codeship.com/projects/21a97f80-4498-0137-e7e1-4a88ae496eec/status?branch=master)](https://app.codeship.com/projects/336970)

## General Notes

- tonycodes.com currently resolves to digitalocean which direct it to public IP of my server.
- To renew letsencrypt certificates run: (put this in a bash script)

```
sudo certbot --nginx certonly -d www.tonycodes.com,tonycodes.com
```

Note that, port 80 must be opened via the router configuration settings for certbot to make the necessary server connection. This is how it validates that you do in fact have control over the machine you are generating a certificate for.

- Port 443 needs to be open on the router for the https to work.
- See `/etc/nginx/sites-available/tonycodes.com` for nginx configuration (copied here to local config)

# To Do

- [x] ~~_remove scroll bar to enable snake game to work without disruption OR link out of the app for snake OR make snake game work with mouse pointer_~~ [2021-01-06] made it mouse controlled
- [x] ~~_add a blog tab_~~ [2021-01-10]
- [ ] do a dark mode tab
- [x] ~~_integrate with codeship_~~ [2021-01-18]
- [ ] make tiddlywiki deep linkable
- [x] ~~_implement some auto formatting_~~ [2021-01-20]
- [X] ~~*mention codeship in the website description*~~ [2021-01-21]
- [ ] create a mobile version of tetris / snake
- [X] ~~*fix blog post width to make it static == factor out the blog post template*~~ [2021-01-25]
- [ ] add ability to see how much traffic I'm getting
- [ ] add option to like blog posts
- [ ] add option to sign up for newletter / blog updates
- [ ] update codeship to only deploy on merge events
