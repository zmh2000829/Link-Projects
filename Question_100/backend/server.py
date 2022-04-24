from flask import Flask, request, jsonify,make_response
import json, random, string
import pymysql
import sys 
import time
from flask_cors import CORS

user = 'root'
password = ''
database = 'aq'
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
	try:
		cur.execute(sql, (stuid,name))
		res = '用户登录成功'
	except:
		sql = "insert into user(stuid,name) values(%s,%s)"
		cur.execute(sql,(stuid,name))
		res = '成功创建用户'
	conn.commit()
	cur.close()
	conn.close()
	return res

@app.route('/score',methods=['POST'])
def score():
	stuid = request.values.get("stuid")
	name = request.values.get("name")
	score = request.values.get("score")
	part = request.values.get("part")
	conn = pymysql.connect(host='127.0.0.1', user=user, password=password, database=database, charset=charset)
	cur = conn.cursor()
	if part == 'Part_1':
		sql = "update user set Part_1 = %s where stuid=%s and name=%s"
	elif part == 'Part_2':
		sql = "update user set Part_2 = %s where stuid=%s and name=%s"
	elif part == 'Part_3':
		sql = "update user set Part_3 = %s where stuid=%s and name=%s"
	elif part == 'Part_4':
		sql = "update user set Part_4 = %s where stuid=%s and name=%s"
	cur.execute(sql, (score,stuid,name))
	conn.commit()
	sql2 = "update user set times = times + 1 where stuid=%s and name=%s"
	cur.execute(sql2, (stuid,name))
	conn.commit()
	cur.close()
	conn.close()
	return part+'成绩更新成功'

@app.route('/total_score',methods=['POST'])
def total_score():
	stuid = request.values.get("stuid")
	name = request.values.get("name")
	conn = pymysql.connect(host='127.0.0.1', user=user, password=password, database=database, charset=charset)
	cur = conn.cursor()
	sql = "select Part_1,Part_2,Part_3,Part_4,frag_1,frag_2,frag_3,frag_4 from user where stuid=%s and name=%s"
	cur.execute(sql, (stuid,name))
	temp = cur.fetchall()[0]
	print(temp)
	conn.commit()
	total_score = round((int(temp[0])+int(temp[1])+int(temp[2])+int(temp[3]))*0.25,2)
	frag_num = int(temp[4])+int(temp[5])+int(temp[6])+int(temp[7])
	sql2 = "update user set score_total=%s,frag_num=%s where stuid=%s and name=%s"
	cur.execute(sql2, (total_score,frag_num,stuid,name))
	conn.commit()
	cur.close()
	conn.close()
	return {'total_score':total_score,'frag_num':frag_num}

@app.route('/frag',methods=['POST'])
def frag():
	stuid = request.values.get("stuid")
	name = request.values.get("name")
	part = request.values.get("part")
	conn = pymysql.connect(host='127.0.0.1', user=user, password=password, database=database, charset=charset)
	cur = conn.cursor()
	if part == 'Part_1':
		sql = "update user set frag_1 = 1 where stuid=%s and name=%s"
	elif part == 'Part_2':
		sql = "update user set frag_2 = 1 where stuid=%s and name=%s"
	elif part == 'Part_3':
		sql = "update user set frag_3 = 1 where stuid=%s and name=%s"
	elif part == 'Part_4':
		sql = "update user set frag_4 = 1 where stuid=%s and name=%s"
	cur.execute(sql, (stuid,name))
	conn.commit()
	cur.close()
	conn.close()
	return part+'碎片更新成功'

@app.route('/rank',methods=['POST'])
def rank():
	stuid = request.values.get("stuid")
	name = request.values.get("name")
	conn = pymysql.connect(host='127.0.0.1', user=user, password=password, database=database, charset=charset)
	cur = conn.cursor(cursor=pymysql.cursors.DictCursor)
	sql1 = "select id,name,stuid,score_total,Part_1,Part_2,Part_3,Part_4,rank from (select id,name,stuid,score_total,Part_1,Part_2,Part_3,Part_4, @curRank := IF(@prevRank = score_total, @curRank, @incRank) AS rank,"
	sql2 = "@incRank := @incRank + 1, @prevRank := score_total FROM user p, (SELECT @curRank :=0, @prevRank := NULL, @incRank := 1) r order by score_total desc) s where stuid=%s and name=%s"
	sql = sql1+sql2
	cur.execute(sql,(stuid,name))
	temp = cur.fetchall()[0]
	conn.commit()
	sql3 = "select count(*) from user "
	cur.execute(sql3)
	count = cur.fetchall()[0]
	conn.commit()
	temp['count'] = count["count(*)"]
	print(temp)
	cur.close()
	conn.close()
	return temp

if __name__ == '__main__':
    app.run(host='127.0.0.1',port=5000, debug = True)
