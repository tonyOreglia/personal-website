import { data } from "./index";
export const postInfo = data.find((post) => post.id === 2);
export const blogPostDynamicIp = `
# Implementing Dynamic IP with Domain Hosted on DigitalOcean

In this article, I'll provide a way to setup a dynamic IP address for your home server with DigitalOcean DNS. The article includes a script that checks the current public IP address of the host server and updates a DigitalOcean A record to the current IP address. I'll show you how to setup the script to run every hour via crontab (or any time interval preferred). The script cache's the previous IP address so as to only call the DigitalOcean API if something has changed. For this use case the cache can be a simple text file; performance is not important. 

## Benefits of doing things this way
There is zero cost for using DigitalOcean DNS services. Hosting your own server is arguably cheaper in the long run and a lot more fun than hosting with cloud providers. In my experience, the website loads much faster self hosted as compared to bottom tier plans with cloud service providers. 

## What does it mean to be "hosted" by DigitalOcean? 
DigitalOcean is acting as the Domain Name Server (DNS) for the given domain. 

To use DigitalOcean DNS, you’ll need to update the nameservers used by your domain registrar to DigitalOcean’s nameservers instead.
To do this you must set your nameservers to be: 
\`\`\`
ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com
\`\`\`

Depending on the domain name registrar used (usually where the domain name was purchased); the process of setting the new nameserver is different. Here are some guides for commonly used registrar's: https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars

### What's an A Record? 
An A record maps a domain name to the Version 4 IP address of some computer hosting the domain. In this case, Digital Ocean has an A record mapping my domain (tonycodes.com) to the public IP address of my server.

### The Script
As it turns out, and not surprisingly, this task has been done before. As a lazy developer, I'm happy to steal. I found the script [here](https://www.digitalocean.com/community/tools/digitalocean-dynamic-dns-update-script-in-bash-noip-dyndns-alternative). 

As it's only 20 lines, here's the full script inline: 
\`\`\`bash
#!/bin/bash

#################### CHANGE THE FOLLOWING VARIABLES ####################
TOKEN="digitalOceanAPIToken"
DOMAIN="yourdomain.info"
RECORD_ID="digitalOceanRecordID"
LOG_FILE="/home/youruser/ips.txt"
########################################################################

CURRENT_IPV4="$(dig +short myip.opendns.com @resolver1.opendns.com)"
LAST_IPV4="$(tail -1 $LOG_FILE | awk -F, '{print $2}')"

if [ "$CURRENT_IPV4" = "$LAST_IPV4" ]; then
    echo "IP has not changed ($CURRENT_IPV4)"
else
    echo "IP has changed: $CURRENT_IPV4"
    echo "$(date),$CURRENT_IPV4" >> "$LOG_FILE"
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d '{"data":"'"$CURRENT_IPV4"'"}' "https://api.digitalocean.com/v2/domains/$DOMAIN/records/$RECORD_ID"
fi
\`\`\`

There are some variables in the script that need to be substituted to match the specific use case. For that, the Digital Ocean API will be used.

### DigitalOcean API v2 Reference
See the DigitalOcean API v2 for Domain Records [here](https://developers.digitalocean.com/documentation/v2/#domain-records).

#### Generating Token 
To generate a DO API token; simply login. Then select 'API' in the settings to find the option to Generate an API token. At the time of this writing, this option is found [here](https://cloud.digitalocean.com/account/api/tokens?i=035fc1&preserveScrollPosition=true). This script requires write access; so select that option when creating the token. Copy the token right after generating; it's only shown once. 


#### Getting the DNS Record ID (of the Record that is to be updated by the script)
The Record ID can be retrieved via the DigitalOcean API V2 via a call to list all domain records for a given domain.
Using the curl, the command is
\`\`\`bash
curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer <digitalOceanAPIToken>" "https://api.digitalocean.com/v2/domains/<tonycodes.com>/records"
\`\`\`

Replace <digitalOceanAPIToken> with token generated, and <tonycodes.com> with the target domain. 

A successful result should look similar to: 

\`\`\`json
{
  "domain_records": [
    {
      "id": 111111111,
      "type": "SOA",
      "name": "@",
      "data": "1800"
      /// shortened
    },
    {
      "id": 22222222,
      "type": "NS",
      "name": "@",
      "data": "ns1.digitalocean.com",
      // shortened
    },
    {
      "id": 33333333,
      "type": "A",
      "name": "@",
      "data": "95.95.95.95", // example IP v4
      "priority": null,
      "port": null,
      "ttl": 3600,
      "weight": null,
      "flags": null,
      "tag": null
    },
    // shortened
  ],
  "links": {},
  "meta": { "total": 6 }
}
\`\`\`

In this case, the important record is the one of "type": "A". Take the "id" from this record and add it into the script.

Remember to create the log file for script output and point the script's variable LOG_FILE to that file.

### Setup a Cron Job 
If the server is running Linux, \`cron\` is a great tool for setting up scripts to run a regular intervals.

By running \`crontab -e\`, a new cron job can be created.

I won't cover the specifics of crontab here, but my entry looks like this: 

\`\`\`
@hourly /home/tony/dev/personal-website/utils/digOceanDynamicIp.sh
\`\`\`

A great resource for configuring the interval is [crontab guru](https://crontab.guru/).

And that's it. I hope this was helpful and feel free to reach out on [LinkedIn](https://www.linkedin.com/in/tony-oreglia/) if you have any questions.
`;
