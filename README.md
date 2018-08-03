How the Project Works:
Hive Buzz will run a server on the developers computer that will create a http server serving the service worker, sending the push notifications, and accessing the set permission page.
Hive Buzz will set a subdomain pointing to that user's server so that the service worker won't be registered to their ip and will have a static domain.

the regular domain could look like this:
hivebuzz.net

The subdomain could look like this:
username.hivebuzz-servers.net
