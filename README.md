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

### Nginx (running on server)

Get Status of nginx
```
$ sudo systemctl status nginx
```

Stop/start nginx
```
$ sudo systemctl stop nginx
$ sudo systemctl start nginx
```

Restart Nginx
```
sudo systemctl reload nginx
```


# To Do

- [x] ~~_remove scroll bar to enable snake game to work without disruption OR link out of the app for snake OR make snake game work with mouse pointer_~~ [2021-01-06] made it mouse controlled
- [x] ~~_add a blog tab_~~ [2021-01-10]
- [X] ~~*do a dark mode tab*~~ [2021-01-31]
- [x] ~~_integrate with codeship_~~ [2021-01-18]
- [x] ~~_implement some auto formatting_~~ [2021-01-20]
- [X] ~~*mention codeship in the website description*~~ [2021-01-21]
- [X] ~~*fix blog post width to make it static == factor out the blog post template*~~ [2021-01-25]
- [X] ~~*add ability to see how much traffic I'm getting*~~ [2021-02-02]
- [X] ~~*filter out my IP from analytics*~~ [2021-02-06]
- [ ] add project and blogpost for breadcrumbs
- [ ] create a mobile version of tetris / snake
- [ ] add option to like blog posts
- [ ] add option to sign up for newsletter / blog updates
- [ ] publish tiddlywiki scripts to tiddlywiki util repo and share out with blog post 
- [ ] implement sub paths -- https://reactrouter.com/core/api/withRouter
- [ ] make tiddlywiki deep linkable
- [ ] fix scrolling issues
  - [ ] tiddlywiki scrolling issue
- [ ] refactor the ugly blog post shenanigans


## add project and blogpost for breadcrumbs Tasks
- [X] ~~*implement API calls from react to breadcrumbs backend*~~ [2021-02-27]
  - [ ] add config for local / production URL 
- [ ] spin up breadcrumbs on server
  - [ ] install postgresql / docker on server 
- [ ] put breadcrumbs behind nginx
- [ ] expose port for breadcrumbs
- [ ] ssl certificates for breadcrumbs
- [ ] get all breadcrumbs endpoint
- [ ] implement breadcrumb creation UI
- [ ] 