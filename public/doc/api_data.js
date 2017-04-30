define({ "api": [
  {
    "type": "get",
    "url": "/projects/detail",
    "title": "get projects json from newst to oldest",
    "group": "Project",
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
    "url": "/projects/detail:pname",
    "title": "get project detail, likes and fellow data in json",
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
    "name": "GetProjectsDetailPname"
  },
  {
    "type": "post",
    "url": "/projects/comments:pname",
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
    "url": "/projects/comments:pname",
    "title": "post user comments",
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
    "url": "newsfeed/projects/",
    "title": "get projects releated news",
    "group": "newsfeed",
    "description": "<p>: when uname is given, return user fewllow or liked projects' news; when pname is given, return project releated news.</p>",
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
    "url": "newsfeed/projects/",
    "title": "get projects releated news",
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
    "name": "GetNewsfeedProjects"
  }
] });
