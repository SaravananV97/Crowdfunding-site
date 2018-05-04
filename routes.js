const routes =  require("next-routes")();

routes.add("/projects/new","/projects/new")
      .add("/projects/:address","/projects/show")
      .add("/projects/:address/requests","/projects/requests/projectrequests")
      .add("/projects/:address/requests/newrequest","/projects/requests/newrequest");//already inside pages
module.exports = routes;
