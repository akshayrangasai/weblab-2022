# Getting the project up and running on your computer

Firstly, before we begin, we need to have node and npm installed on your system. We're using the latest version of node for this package, and typescript. So hopefully it all works out. 

The project is broadly split into `server` and `client`. Client is where the react code goes in, and the folders are broadly split into `src`, `dist` and `node_modules`

If you look at this repo, node_modules will be missing. That is because we ignore that in version control as we can each maintain our own copy of that, but what gets version controlled is our package.json file, from which node will install all the dependencies we need.

Whenever you pull from git, please run an npm install also, so if some new dependencies have been added, it will install and work fine, I might just create a script for it and mention it here.

The `server` and `client` are two separate node projects, so we need to run npm installs in both projects.

Whenever you are working on something please create a branch and push to it, and we can work across branches so stuff doesn't break. I will add a more detailed explanation later.
