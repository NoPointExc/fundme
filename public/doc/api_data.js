define({ "api": [
  {
    "type": "get",
    "url": "/projects/comments",
    "title": "get user comments",
    "name": "Comments",
    "description": "<p>get user's name, picture and comments for given project</p>",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pname",
            "description": "<p>project name, required param.</p>"
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
    "url": "/projects/",
    "title": "get projects",
    "group": "Project",
    "description": "<p>from newest to oldest in json format, any paramenters is alternative.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
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
    "name": "GetProjects"
  },
  {
    "type": "get",
    "url": "/projects/categories",
    "title": "get all categories",
    "group": "Project",
    "success": {
      "examples": [
        {
          "title": "http://localhost:3000/projects/categories/ ",
          "content": "[\n{\n  \"category\": \"joke\"\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project",
    "name": "GetProjectsCategories"
  },
  {
    "type": "get",
    "url": "/projects/detail",
    "title": "project detail",
    "description": "<p>project table, likes/follow and tags in json</p>",
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
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"detail\": {\n    \"pname\": \"New suite\",\n    \"uname\": \"Iron Man\",\n    \"description\": \"I broke, but I want a new suit\",\n    \"category\": \"joke\",\n    \"min_fund\": 2000,\n    \"max_fund\": 9999.99,\n    \"current_fund\": 100,\n    \"start_time\": \"2016-01-03T17:04:23.000Z\",\n    \"end_time\": \"2018-01-04T17:04:23.000Z\",\n    \"status\": \"funding\",\n    \"picture\": \"https://www.wired.com/wp-content/uploads/2015/09/google-logo-1200x630.jpg\"\n  },\n  \"followNum\": 0,\n  \"follow\": false,\n  \"likeNum\": 1,\n  \"like\": false,\n  \"tag\": [\n    {\n      \"tag\": \"impossible\"\n    },\n    {\n      \"tag\": \"jazz\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project",
    "name": "GetProjectsDetail"
  },
  {
    "type": "get",
    "url": "/projects/updates",
    "title": "project updates",
    "group": "Project",
    "description": "<p>from newest to oldest in json format, any paramenters is alternative.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pname",
            "description": "<p>name of project.</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "num",
            "description": "<p>10 by default, from 1 -&gt; INF.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search keyword in text updates</p>"
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
            "field": "type",
            "description": "<p>project updates type, can be <code>text</code>, <code>video</code> and <code>picture</code></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project",
    "name": "GetProjectsUpdates"
  },
  {
    "type": "post",
    "url": "/projects/relation",
    "title": "like or follow",
    "description": "<p>set = true to like(follow) a project, or false to cancel. Must login to post</p>",
    "name": "Like_Follow",
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
            "description": "<p>(like|follow) between user and project</p>"
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
    "url": "/projects/pledge",
    "title": "pledge",
    "name": "PostPledge",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pname",
            "description": "<p>project name to comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "double",
            "optional": false,
            "field": "amount",
            "description": "<p>of funding</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project"
  },
  {
    "type": "post",
    "url": "/projects",
    "title": "new project",
    "description": "<p>create a new project</p>",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pname",
            "description": "<p>project name, required parament.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "desp",
            "description": "<p>description of the project, default as 'no description given for this project' is not given.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "category",
            "description": "<p>category of project, default as 'joke' is not given</p>"
          },
          {
            "group": "Parameter",
            "type": "double",
            "optional": false,
            "field": "min_fund",
            "description": "<p>min-value of fund, default as $100 is not given</p>"
          },
          {
            "group": "Parameter",
            "type": "double",
            "optional": false,
            "field": "max_fund",
            "description": "<p>max-value of fund, default as $9000 is not given</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "start_time",
            "description": "<p>start date of the funding, default as now if now given</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "end_time",
            "description": "<p>end date of the funding, default is 7 days after start time.</p>"
          },
          {
            "group": "Parameter",
            "type": "url",
            "optional": false,
            "field": "picture",
            "description": "<p>cover background, default as xingxing's puppy is not given.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project",
    "name": "PostProjects"
  },
  {
    "type": "post",
    "url": "/projects/rate",
    "title": "rate",
    "group": "Project",
    "description": "<p>login required, rate incompleted project will fail.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pname",
            "description": "<p>name of project, required paramenter.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "rate",
            "description": "<p>rate for project.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project",
    "name": "PostProjectsRate"
  },
  {
    "type": "post",
    "url": "/projects/tag",
    "title": "tag",
    "group": "Project",
    "description": "<p>login not required.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pname",
            "description": "<p>name of project, required paramenter.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "tag",
            "description": "<p>tag to add</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project",
    "name": "PostProjectsTag"
  },
  {
    "type": "post",
    "url": "/projects/updates",
    "title": "project updates",
    "group": "Project",
    "description": "<p>login required.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pname",
            "description": "<p>name of project, required paramenter.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>project updates type, can be <code>text</code>, <code>video</code> and <code>picture</code></p>"
          },
          {
            "group": "Parameter",
            "type": "content",
            "optional": false,
            "field": "url",
            "description": "<p>of picture or video, actual conent of text type</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/projects.js",
    "groupTitle": "Project",
    "name": "PostProjectsUpdates"
  },
  {
    "type": "post",
    "url": "/projects/comments",
    "title": "user comments",
    "name": "PostUserComment",
    "group": "Project",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pname",
            "description": "<p>project name to comment.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>comment texts</p>"
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
    "description": "<p>get fellowed users' pledges, comments, fellow and likes</p>",
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
    "title": "get user profile",
    "description": "<p>get user profile, login required.</p>",
    "group": "user",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "GetUsers"
  },
  {
    "type": "get",
    "url": "users/",
    "title": "get user profile",
    "description": "<p>get user profile, login required.</p>",
    "group": "user",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "GetUsers"
  },
  {
    "type": "get",
    "url": "users/",
    "title": "get user profile",
    "description": "<p>get user profile, login required.</p>",
    "group": "user",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "GetUsers"
  },
  {
    "type": "get",
    "url": "users/follow",
    "title": "get followed or following users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "uname",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "relation",
            "description": "<p>[followedBy|following], if not given, default as followedBy.</p>"
          }
        ]
      }
    },
    "description": "<p>login required. return followd or following users name and picture.</p>",
    "group": "user",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "GetUsersFollow"
  },
  {
    "type": "get",
    "url": "users/pledge",
    "title": "get pledge records",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pname",
            "description": "<p>not required. default return all pledges if not given</p>"
          }
        ]
      }
    },
    "description": "<p>login in required. return pledges records</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "success-response: http://localhost:3000/users/pledge/?pname=A wall",
          "content": "[\n{\n  \"uname\": \"Jiayang\",\n  \"pname\": \"A Wall\",\n  \"time\": \"1970-01-01T05:00:02.000Z\",\n  \"amount\": 200\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "GetUsersPledge"
  },
  {
    "type": "get",
    "url": "users/rate",
    "title": "get rate records",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "pname",
            "description": "<p>not required. default return all rates if not given</p>"
          }
        ]
      }
    },
    "description": "<p>login in required. return rates records</p>",
    "group": "user",
    "success": {
      "examples": [
        {
          "title": "success-response: http://localhost:3000/users/rate/",
          "content": "[\n {\n   \"uname\": \"Jiayang\",\n   \"pname\": \"Buy me a game\",\n   \"time\": \"1970-01-01T05:00:02.000Z\",\n   \"rate\": 5\n },\n {\n   \"uname\": \"Jiayang\",\n   \"pname\": \"Database Project\",\n   \"time\": \"1970-01-01T05:00:02.000Z\",\n   \"rate\": 5\n },\n {\n   \"uname\": \"Jiayang\",\n   \"pname\": \"New Shield\",\n   \"time\": \"2016-01-03T17:04:24.000Z\",\n   \"rate\": 1\n }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "GetUsersRate"
  },
  {
    "type": "post",
    "url": "users/",
    "title": "post user profile",
    "description": "<p>update or save user profiles, login required.</p>",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": "<p>user address, default as empty if not provided</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "credict_card",
            "description": "<p>users' credict card, default as empty is not procided.</p>"
          },
          {
            "group": "Parameter",
            "type": "url",
            "optional": false,
            "field": "picture",
            "description": "<p>url of profile picture, default as 'https://www.drupal.org/files/profile_default.png' is not provided.</p>"
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
    "url": "users/follow",
    "title": "follow other user",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "uname",
            "description": "<p>username of user to follow.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "PostUsersFollow"
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
    "url": "users/logout",
    "title": "logout request",
    "description": "<p>post logout request, login user required</p>",
    "group": "user",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "user",
    "name": "PostUsersLogout"
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
