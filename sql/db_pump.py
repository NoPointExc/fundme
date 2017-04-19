#!/usr/bin/python


def create_users(row):
    return 'INSERT INTO  Users VALUES ' + '(' + str(row)[1:-1] + ');'  

def create_project(row):
    return 'INSERT INTO  Project VALUES ' + '(' + str(row)[1:-1] + ');'  

def create_tag(row):
    return 'INSERT INTO  Tag VALUES ' + '(' + str(row)[1:-1] + ');'  

def create_pledge(row):
    return 'INSERT INTO  Pledge VALUES ' + '(' + str(row)[1:-1] + ');'  

def create_rate(row):
    return 'INSERT INTO  Rate VALUES ' + '(' + str(row)[1:-1] + ');'  

def create_fellow_user(row):
    return 'INSERT INTO  Fellow_user VALUES ' + '(' + str(row)[1:-1] + ');'  

def create_comment_project(row):
    return 'INSERT INTO  Comment_project VALUES ' + '(' + str(row)[1:-1] + ');'  

def parse(pth):
    rst = []
    with open(pth, 'r') as f:
        for line in f:
            line = line.strip()
            if line.startswith('#'): continue
            if len(line) > 0 : 
                atts = line.split(';')
                atts = [s.strip() for s in atts]
                rst.append(atts)
    return rst

def print_all(pth, fun):
    rows = parse(pth)
    for r in rows:
        print fun(r)


print_all('./sql/data/user', create_users)
print_all('./sql/data/project', create_project)
print_all('./sql/data/tag',create_tag)
print_all('./sql/data/pledge',create_pledge)
print_all('./sql/data/rate',create_rate)
print_all('./sql/data/fellow_user', create_fellow_user)
print_all('./sql/data/comment_project', create_comment_project)

