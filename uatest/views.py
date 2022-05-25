from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import requests
import json

from pymongo import MongoClient
from bson import json_util
from bson.json_util import loads, dumps
import pprint
from bson.objectid import ObjectId


import re

from django.views.decorators.csrf import csrf_exempt

tokens = {
	'nomin': "7900b7fe2e28fa86cda82cd11b204e13ae9097e2"
}

def getMongoClient():
	# client = MongoClient("mongodb://mandakh:soeKZH4fEt3LxxFNu1o0@10.10.10.29:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=prod&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true")
	# client = MongoClient("mongodb://mandakh:soeKZH4fEt3LxxFNu1o0@10.10.10.29:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=prod&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true")
	# client = MongoClient(host="10.10.10.29", port=int(27017), username="mandakh", password="soeKZH4fEt3LxxFNu1o0", tls=True)
	# client = MongoClient(host="66.181.175.8", port=int(27017), username="", password="")
	client = MongoClient(host="localhost", port=int(27017), username="", password="")
	return client


def maintest(request):




	return render(request, "main.html")
	# return HttpResponse("createpc==" + msg + "<br>" + str(r))


def createpc(request):
	msg = ""
	reg_no='УП95061231'	#УП95061231 bga			#УП95061234 bhq
	card_no = '10'
	token = tokens['nomin']

	client = MongoClient(host="66.181.175.8", port=int(27017), username="", password="")
	db = client.nut
	# print(db.list_collection_names())
	con = db.consumer.find_one({'profile.registration_number': re.compile(reg_no, re.IGNORECASE) })
	print('cons', con)
	if con :
		msg = msg + " <br>хэрэглэгч олдлооо" + " bs:" + str(con["balance_status"])  + " balance:" + str(con["balance"]) + " mob:" + con["mobile"] + " cardslen:" + str(len(con["cards"])) 
		if "is_family" in con:
			msg = msg + " isfam:" + str(con["is_family"]) 
		else :
			msg = msg + " isfam: bhq" 
		
		con_cards = con['cards']
		print('con_cards', len(con_cards) ,con_cards, con_cards[0], con_cards[1])
		cards= []
		for card_id in con_cards:
			print("_id", card_id)
			card = db.card.find_one({'_id': ObjectId(card_id)  })
			cards.append(card)
			msg = msg + " <br>" + "num:"+ str(card['number']) + " ct:"+ str(card['card_type']) + " ass:" + str(card['assigned_date']) + " bal:"+ str(card['balance']) + " st:"+ str(card['status']) + " mob:" + str(card['mobile'])
		# print('aa', cards)
		# for card in db.card.find({'profile.registration_number': )
	else:
		msg = msg + " <br>хэрэглэгч олдсонгүй"
	card = db.card.find_one({'number': card_no})
	if card :
		msg = msg + " <br>карт олдлооо" + " ct:" + str(card["card_type"]) + " mob:" + card["mobile"] + " bal:" + str(card["balance"])
	else:
		msg = msg + " <br>карт олдсонгүй"
	print(card)
	response = requests.post('http://66.181.175.8:8000/transaction/consumer/create_partnercard/', data=json.dumps({"card_no": card_no,   "reg_no": reg_no, "card_serial":"", "nfc_no":""}), headers={"Content-Type":"application/json", "Authorization":"Token " + token})
	# print(response.content)
	r = json.loads(response.content)
	if 'message' in r :
		msg = msg + " <br>алдаа гарлаа " + " message:" + r["message"] + " result:" + str(r["result"]) 
	else:
		msg = msg + " <br> амжилттай"
	print(r)
	# return HttpResponse(response.content)
	return HttpResponse("createpc==" + msg + "<br>" + str(r))


def test(request):   
	response = requests.post('http://66.181.175.8:8000/transaction/thirdparty/check_info/', data=json.dumps({"card_number": "8",   "pin_code": "0000"}), headers={"Content-Type":"application/json", "Authorization":"Token 7900b7fe2e28fa86cda82cd11b204e13ae9097e2"})
	r = json.loads(response.content)
	print(r['ua_id'])

	client = MongoClient(host="localhost", port=int(27017), username="", password="")
	# client = pymongo.MongoClient('connection_string')
	# connection_string = mongodb+srv://<username>:<password>@<atlas cluster>/<myFirstDatabase>?retryWrites=true&w=majority
	db = client.test
	collection = db.movies
	# aa = db.list_collection_names()
	pprint.pprint(db.movies.find_one()['_id'])
	# posts.find_one({"author": "Mike"}))
	# client.db.collection.find_one({'_id': ObjectId(post_id)})
	# for post in posts.find():
	# 	pprint.pprint(post)
	# db.movies.count_documents({}) //hooson esul haih utga teged toolno.
	# d = datetime.datetime(2009, 11, 12, 12)
	# for post in posts.find({"date": {"$lt": d}}).sort("author"):
	return HttpResponse("page num=="+ str(     db.movies.count_documents({})        )	)


@csrf_exempt
def getcons(request, mobile):	
	print(mobile)
	msg = ''

	client = getMongoClient()
	db = client.nut
	con = db.consumer.find_one({'mobile': mobile })
	conCnt = db.consumer.count_documents({'mobile': mobile }) 
	print(conCnt)
	if conCnt>1:
		msg+= str(conCnt)+' hereglegch oldloo!!!'
	# con = db.consumer.find_one({'profile.registration_number': re.compile(reg_no, re.IGNORECASE) })
	# con = db.consumer.find_one({'profile.registration_number': re.compile(reg_no, re.IGNORECASE) })
	print('cons', con['cards'], len(con['cards']))
	concards = []
	receipts = []
	for c in con['cards']:
		c1 = getcard(c)
		# print(c ,c1)
		concards.append(c1)
		for r in getreceipts(c1['number']):
			receipts.append(r)

	# print('concards', concards)
	# print('receipt', receipts)
	return JsonResponse( {'data': json.loads(json_util.dumps(con)), "concards":json.loads(json_util.dumps(concards)), "receipts":json.loads(json_util.dumps(receipts)), 'msg':msg}  )

def getreceipts(num):
	client = getMongoClient()
	db = client.nut
	return db.receipt.find({'card_number': num }).sort("author").limit(5)

def getcard(id):
	client = getMongoClient()
	db = client.nut
	return db.card.find_one({'_id': ObjectId(id) })

@csrf_exempt
def getcards(request, id):	
	print(id)
	msg = ''
	card = getcard(id)
	print('card', card)
	return JsonResponse( {'data': json.loads(json_util.dumps(card)), 'msg':msg}  )



































