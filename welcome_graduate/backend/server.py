from flask import Flask, request, jsonify,make_response
import json, random, string
import pymysql
import sys 
import time
from flask_cors import CORS

user = 'root'
password = ''
database = 'welcome'
charset = 'utf8'

app = Flask(__name__)
CORS(app)
@app.route('/')
def hell():

	return 'hello world' 

@app.route('/login',methods=['POST'])
def login():
	stuid = str(json.loads(request.values.get("stuid")))
	name = str(json.loads(request.values.get("name")))
	conn = pymysql.connect(host='127.0.0.1', user=user, password=password, database=database, charset=charset)
	cur = conn.cursor()
	sql = "select stuid,name from user where stuid=%s and name=%s"
	a = cur.execute(sql, (stuid,name))
	conn.commit()
	if(a==1):
		res = '用户登录成功'
	else:
		sql2 = "insert into user(stuid,name,score_1,score_2,times) values(%s,%s,0,0,0)"
		cur.execute(sql2, (stuid,name))
		res = '成功创建用户'
		conn.commit()
	cur.close()
	conn.close()
	return res

@app.route('/score_1',methods=['POST'])
def score_1():
	stuid = request.values.get("stuid")
	name = request.values.get("name")
	score = request.values.get("score")
	conn = pymysql.connect(host='127.0.0.1', user=user, password=password, database=database, charset=charset)
	cur = conn.cursor()
	sql1 = "select score_2 from user where stuid=%s and name=%s"
	cur.execute(sql1, (stuid, name))
	temp = cur.fetchall()[0]
	conn.commit()
	if int(score) > temp[0]:
		sql = "update user set score_1 = %s where stuid=%s and name=%s"
		cur.execute(sql, (score,stuid,name))
		conn.commit()
	sql2 = "update user set times = times + 1 where stuid=%s and name=%s"
	cur.execute(sql2, (stuid,name))
	conn.commit()
	cur.close()
	conn.close()
	return '成绩更新成功'

@app.route('/score_2',methods=['POST'])
def score_2():
	stuid = request.values.get("stuid")
	name = request.values.get("name")
	score = request.values.get("score")
	conn = pymysql.connect(host='127.0.0.1', user=user, password=password, database=database, charset=charset)
	cur = conn.cursor()
	sql1 = "select score_2 from user where stuid=%s and name=%s"
	cur.execute(sql1, (stuid, name))
	temp = cur.fetchall()[0]
	conn.commit()
	if int(score) > temp[0]:
		sql = "update user set score_2 = %s where stuid=%s and name=%s"
		cur.execute(sql, (score,stuid,name))
		conn.commit()
	cur.close()
	conn.close()
	return '成绩更新成功'

@app.route('/select',methods=['POST'])
def select():
	stuid = request.values.get("stuid")
	name = request.values.get("name")
	conn = pymysql.connect(host='127.0.0.1', user=user, password=password, database=database, charset=charset)
	cur = conn.cursor()
	sql1 = "select stuid,name,score_1 from user order by score_1 desc limit 10"
	cur.execute(sql1)
	res1 = list2dict(list(cur.fetchall()))
	conn.commit()

	sql2 = "select stuid,name,score_2 from user order by score_2 desc limit 10"
	cur.execute(sql2)
	res2 = list2dict(list(cur.fetchall()))
	conn.commit()

	sql3_1 = "select id,stuid,name,score_1,rank from (select id,stuid,name,score_1, @curRank := IF(@prevRank = score_1, @curRank, @incRank) AS rank,"
	sql3_2 = "@incRank := @incRank + 1, @prevRank := score_1 FROM user p, (SELECT @curRank :=0, @prevRank := NULL, @incRank := 1) r order by score_1 desc) s where stuid=%s and name=%s"
	sql3 = sql3_1 + sql3_2
	cur.execute(sql3, (stuid, name))
	rank_1 = cur.fetchall()[0][4]
	conn.commit()

	conn = pymysql.connect(host='127.0.0.1', user=user, password=password, database=database, charset=charset)
	cur = conn.cursor()
	sql4_1 = "select id,stuid,name,score_2,rank from (select id,stuid,name,score_2, @curRank := IF(@prevRank = score_2, @curRank, @incRank) AS rank,"
	sql4_2 = "@incRank := @incRank + 1, @prevRank := score_2 FROM user p, (SELECT @curRank :=0, @prevRank := NULL, @incRank := 1) r order by score_2 desc) s where stuid=%s and name=%s"
	sql4 = sql4_1 + sql4_2
	cur.execute(sql4, (stuid, name))
	rank_2 = cur.fetchall()[0][4]
	conn.commit()

	cur.close()
	conn.close()
	temp = {'rank1': res1, 'rank2': res2, 'ranking1': rank_1, 'ranking2': rank_2}
	print(temp)
	return temp

def list2dict(retlist):
	ret = []
	for item in retlist:
		temp = {}
		temp['stuid'] = item[0][:-4]+"****"
		temp['name'] = item[1]
		temp['score'] = item[2]
		ret.append(temp)
	return ret

@app.route('/get_score',methods=['POST'])
def get_score():
	stuid = request.values.get("stuid")
	name = request.values.get("name")
	conn = pymysql.connect(host='127.0.0.1', user=user, password=password, database=database, charset=charset)
	cur = conn.cursor()
	sql = "select score_1,score_2 from user where stuid=%s and name=%s"
	cur.execute(sql, (stuid,name))
	temp = cur.fetchall()[0]
	conn.commit()
	score_1 = temp[0]
	score_2 = temp[1]
	cur.close()
	conn.close()
	return {'score_1':score_1,'score_2':score_2}


if __name__ == '__main__':
    app.run(host='127.0.0.1',port=5000, debug = True)
