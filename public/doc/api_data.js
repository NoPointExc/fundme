define({ "api": [
  {
    "type": "get",
    "url": "/projects/detail",
    "title": "get projects",
    "group": "Project",
    "description": "<p>from newest to oldest in json format, any paramenters is alternative.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "num",
            "description": "<p>10 by default, from 1 -&gt; INF.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>contains keyword in project description</p>"
          },
          {
            "group": "Parameter",
            "type": "time",
            "optional": false,
            "field": "after",
            "description": "<p>the earlist time</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "category",
            "description": "<p>project category</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project",
    "name": "GetProjectsDetail"
  },
  {
    "type": "get",
    "url": "/projects/detail",
    "title": "get project detail",
    "description": "<p>project detail and likes and fellow data in json</p>",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pname",
            "description": "<p>project name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project",
    "name": "GetProjectsDetail"
  },
  {
    "type": "post",
    "url": "/projects/relation",
    "title": "like or fellow a project",
    "description": "<p>set = true to like(fellow) a project, or false to cancel. Must login to post</p>",
    "name": "Like_Fellow",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "set",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pname",
            "description": "<p>project name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "releation",
            "description": "<p>(like|fellow) between user and project</p>"
          }
        ]
      }
    },
    "group": "Project",
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "post",
    "url": "/projects/comments",
    "title": "post user comments",
    "name": "PostUserComment",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pname",
            "description": "<p>project name to comment.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "/projects/comments",
    "title": "get user comments",
    "name": "getComments",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pname",
            "description": "<p>project name to comment.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "get",
    "url": "newsfeed/activities/",
    "title": "get user newsfeed",
    "description": "<p>get users activities</p>",
    "group": "newsfeed",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uname",
            "description": "<p>username name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pname",
            "description": "<p>project name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/newsfeed.js",
    "groupTitle": "newsfeed",
    "name": "GetNewsfeedActivities"
  },
  {
    "type": "get",
    "url": "newsfeed/projects/",
    "title": "get project newsfeed",
    "group": "newsfeed",
    "description": "<p>when uname is given, return user fewllow or liked projects' news; when pname is given, return project releated news.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uname",
            "description": "<p>username name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pname",
            "description": "<p>project name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/newsfeed.js",
    "groupTitle": "newsfeed",
    "name": "GetNewsfeedProjects"
  },
  {
    "type": "get",
    "url": "users/",
    "title": "get user profile page",
    "group": "user",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "GetUsers"
  },
  {
    "type": "get",
    "url": "users/login",
    "title": "get login page",
    "group": "user",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "GetUsersLogin"
  },
  {
    "type": "get",
    "url": "users/signup",
    "title": "get signup page",
    "group": "user",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "GetUsersSignup"
  },
  {
    "type": "post",
    "url": "users/",
    "title": "post user profile",
    "description": "<p>post user information. Must login before post</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uname",
            "description": "<p>user name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>user address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "credict_card",
            "description": "<p>users' credict card</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "PostUsers"
  },
  {
    "type": "post",
    "url": "users/login",
    "title": "login request",
    "description": "<p>post login request</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uname",
            "description": "<p>user name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "PostUsersLogin"
  },
  {
    "type": "post",
    "url": "users/signup",
    "title": "signup request",
    "description": "<p>post signup request</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uname",
            "description": "<p>user name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "PostUsersSignup"
  }
] });