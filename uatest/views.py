from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import requests
import json
 
from pymongo import MongoClient
from bson import json_util, Int64
from bson.objectid import ObjectId
from bson.json_util import loads, dumps
import pprint
 
import re
from django.views.decorators.csrf import csrf_exempt
 
       
tokens = {
    'nomin': "7900b7fe2e28fa86cda82cd11b204e13ae9097e2",
    'Monos UB': "74b799b979e77e54fbdd6bc3c2b4761e1a487be2",
    'Unitel': "747a67c09f665701e723e1652253394c2f32a11e",
    'MetroExpress': "024164dc1a027029d3d59cfc988ef6f15231d94c",
    'Univision': "8b8a09a36f9e3e80ffadd81f8daed268800a470d",
    'UA': "06be024370fca7aaf0a4c2aa9caa91f47da02e5c",
}

# url = 'http://66.181.175.8:8000'
url = 'https://staging-zone.upoint.mn'

 
def getMongoClient():
    # client = MongoClient("mongodb://mandakh:soeKZH4fEt3LxxFNu1o0@10.10.10.29:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=prod&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true")
    # client = MongoClient("mongodb://mandakh:soeKZH4fEt3LxxFNu1o0@10.10.10.29:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=prod&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true")
    # client = MongoClient(host="10.10.10.29", port=int(27017), username="mandakh", password="soeKZH4fEt3LxxFNu1o0", tls=True)
    client = MongoClient(host="66.181.175.8", port=int(27017), username="", password="")
    # client = MongoClient(host="localhost", port=int(27017), username="", password="")
    return client
 
 
def contest(request):
    return render(request, "main.html")
def maintest1(request):
    return render(request, "main1.html")
def cardtest(request):
    print('card gichii')
    return render(request, "card.html")

 
 
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
    # con = db.consumer.find_one({"_id": Int64(val) })
    # for post in posts.find():
    #   pprint.pprint(post)
    # db.movies.count_documents({}) //hooson esul haih utga teged toolno.
    # d = datetime.datetime(2009, 11, 12, 12)
    # for post in posts.find({"date": {"$lt": d}}).sort("author"):
    # .find({'card_number': num }).sort("created_at",-1})
    return HttpResponse("page num=="+ str(     db.movies.count_documents({})        )   )
 
 
@csrf_exempt
def getcons(request):
    msg = ''
    if 'mobile' in request.GET: #page der combobox-s mobile songood textbox der mobile bicheed ilgeesn bol end ajillan.
        val = request.GET['mobile']
        con = getCon({"mobile": val })
        conCnt = getConCnt({"mobile": val })
        # conCnt = db.consumer.count_documents({"mobile": val })
    elif 'regno' in request.GET:
        val = request.GET['regno']
        con = getCon({"profile.registration_number": re.compile(val, re.IGNORECASE) })
        conCnt = getConCnt({"profile.registration_number": re.compile(val, re.IGNORECASE) })
        # con = db.consumer.find_one({"profile.registration_number": re.compile(val, re.IGNORECASE) })
        # conCnt = db.consumer.count_documents({"profile.registration_number": re.compile(val, re.IGNORECASE) })
    elif 'id' in request.GET:
        val = request.GET['id']
        con = getCon({"_id": Int64(val) })       
        conCnt = getConCnt({"_id": Int64(val)  })
    if conCnt == 0:
        msg=' Хэрэглэгч олдсонгүй'
    elif conCnt>1:
        msg = str(conCnt)+' Хэрэглэгч олдлоо!!!'
    elif conCnt == 1:        
        concards = []
        con['collective']= getcollective(con['_id'])             
        for c in con['cards']:
            c1 = getcardById(c)   
            concards.append(c1)
        con['concards'] = concards
    return JsonResponse({'data': json.loads(json_util.dumps(con)), 'msg':msg}  )
 
 
def getConCnt(expr):
    client = getMongoClient()
    db = client.nut
    return db.consumer.count_documents(expr)
 
def getCon(expr):
    client = getMongoClient()
    db = client.nut
    return db.consumer.find_one(expr)
 
def getcollective(id):
    client = getMongoClient()
    db = client.nut
    confamcnt = db.consumer_family.count_documents({'consumer': Int64(id) })    #busad ruu add member hiiged ooroo admin bolson eseh. yer ni collective uusle gesn ug.
    congrreqcnt = db.group_request.count_documents({'consumer': Int64(id) , 'status': 0  })    #oor der ni add member irsen eseh.
    # concollcnt = db.consumer_collective.count_documents({'receiver': Int64(id) })    #oor deer ni add member irsen eseh
    if confamcnt < 1 and congrreqcnt < 1 :
        return None
    else :
        famgr = {}
        confam = {}
        if confamcnt == 0 and (congrreqcnt > 0): #coll-nd orooguich huselt irsen eseh.    
            
            h = db.group_request.find_one({'consumer': Int64(id), 'status': 0 })
            print('asdf', confamcnt, congrreqcnt, h)
            confam['group'] = h['group']
        elif confamcnt == 1 :
            confam = db.consumer_family.find_one({'consumer': Int64(id) }) 
        famgr = db.family_group.find_one({'_id': ObjectId(confam['group']) })
        # print('famgr', famgr)
        congroups = []
        for g in db.consumer_family.find({'group': ObjectId(confam['group']) }):        
            congroups.append(g)
        famgr['congroups'] = congroups
        gr_req=[] 
        for h in  db.group_request.find({'group': ObjectId(confam['group']) }):
            gr_req.append(h)    
        famgr['gr_req'] = gr_req
        con_coll=[]
        for t in  db.consumer_collective.find({'sender': Int64(id) }):
            con_coll.append(t)  
        famgr['con_coll'] = con_coll
        return famgr
        
 
def getreceiptCnt(expr):
    client = getMongoClient()
    db = client.nut
    return db.receipt.count_documents(expr)
 
def getreceipts(expr):
    client = getMongoClient()
    db = client.nut
    return db.receipt.find(expr).sort("created_at",-1).limit(5)
 

 
def getreceiptreturn(expr):
    client = getMongoClient()
    db = client.nut
    return db.receipt_return.find(expr)
 
def getcardById(id):
    client = getMongoClient()
    db = client.nut
    return db.card.find_one({'_id': ObjectId(id) })
@csrf_exempt
def getcard(request):  
    print('getcad', request.POST['id'], request.method)
    if 'id' in request.POST:
        card = getcardById(request.POST['id'])
    return JsonResponse( {'data': json.loads(json_util.dumps(card))}  )
   
 
@csrf_exempt
def check_mobile(request):
    mobile = request.GET['mobile']
    client = getMongoClient()
    db = client.nut
    cons = []
    for c in db.consumer.find( {'mobile': mobile}):
        cons.append(c)      
    cards = []
    for c in db.card.find( {'mobile': mobile}):
        cards.append(c)
    return JsonResponse({'cons': json.loads(json_util.dumps(cons)), 'cards': json.loads(json_util.dumps(cards))     })
@csrf_exempt
def check_regno(request):
    regno = request.GET['regno']
    client = getMongoClient()
    db = client.nut
    cons = []
    for c in db.consumer.find( {'profile.registration_number': regno}):
        cons.append(c)  
    return JsonResponse({'cons': json.loads(json_util.dumps(cons))})
@csrf_exempt
def check_num(request):
    num = request.GET['num']
    client = getMongoClient()
    db = client.nut
    cards = []
    for c in db.card.find( {'number': num}):
        cons = []
        for c1 in db.consumer.find( {'cards': ObjectId(c['_id'])}):
            cons.append(c1)
        c['cons'] = cons
        cards.append(c)              
    return JsonResponse({'cards': json.loads(json_util.dumps(cards))})
@csrf_exempt
def check_token(request):
    token = request.GET['token']
    print('token', token)
    client = getMongoClient()
    db = client.nut
    con_tokens = []
    for c in db.consumer.find( {'token': token}):
        con_tokens.append(c) 
        cons = []
    mer_tokens = []
    for c in db.merchant.find( {'token': token}):
        mer_tokens.append(c)             
    return JsonResponse({'con_tokens': json.loads(json_util.dumps(con_tokens)), 'mer_tokens': json.loads(json_util.dumps(mer_tokens)), })
@csrf_exempt
def check_fam(request):
    famid = request.GET['fam']
    # print('famid', famid)
    client = getMongoClient()
    db = client.nut
    fcnt = db.family_group.count_documents( {'family_id': int(famid)} )
    f = db.family_group.find_one( {'family_id': int(famid)}  ) 
    if (f ):
        cfcnt = db.consumer_family.count_documents( {'group': ObjectId(f['_id'])} )
        f['cfcnt'] = cfcnt
    # print('famid', "'"+famid+"'",fcnt , f )
    return JsonResponse({'fam': json.loads(json_util.dumps(f)) })


@csrf_exempt
def sendurl(request, func_name):
    p = request.POST
    h1={"Content-Type":"application/json", "Authorization":"Token " + p['token']}
    # print('token',"'"+p['token']+ "'","'"+p['famid']+ "'", func_name)
    if (func_name == "uaconsumer"):
        response = requests.post(url + '/consumer/account/uaconsumer/', data=json.dumps({"mobile": p['mobile'], "card_number": p['card_number'], "registration_number": p['registration_number'], "nomin_card": p['nomin_card'], "fee_type": p['fee_type'], "card_fee": p['card_fee'], "username": p['username']}), headers=h1)
    elif (func_name == "createpc"):
        print("orloo")
        response = requests.post(url + '/transaction/consumer/create_partnercard/', data=json.dumps({  "reg_no": p['reg_no'], "card_no": p['card_no'], "card_serial": p['card_serial'], "nfc_no": p['nfc_no'], }), headers=h1)
    elif (func_name == "updatepc"):
        response = requests.post(url + '/transaction/consumer/update_partnercard/', data=json.dumps({  "reg_no": p['reg_no'], "card_no": p['card_no'], }), headers=h1)
    elif (func_name == "changepc"):
        response = requests.post(url + '/transaction/consumer/update_partnercard/', data=json.dumps({  "reg_no": p['reg_no'], "card_no_1": p['card_no_1'], }), headers=h1)
    elif (func_name == "addmember"):
        response = requests.post(url + '/consumer/family/add_member/', data=json.dumps({  "mobile": p['mobile'], }), headers=h1)
    elif (func_name == "acceptreq"):
        response = requests.post(url + '/consumer/family/accept_request/', data=json.dumps({  "family_id": p['famid'], }), headers=h1)
    elif (func_name == "rejectreq"):
        response = requests.post(url + '/consumer/family/reject_request/', data=json.dumps({  "family_id": p['famid'], }), headers=h1)
    elif (func_name == "quitfam"):
        response = requests.post(url + '/consumer/family/quit_group/', headers=h1)
    elif (func_name == "delgr"):
        response = requests.post(url + '/consumer/family/delete_group/', headers=h1)
    elif (func_name == "remmem"):
        response = requests.post(url + '/consumer/family/remove_member/', data=json.dumps({  "mobile": p['mobile'], }), headers=h1)
    elif (func_name == "changeadmin"):
        response = requests.post(url + '/consumer/family/change_admin/', data=json.dumps({  "mobile": p['mobile'], }), headers=h1)
    print('content', response.content)
    r = json.loads(response.content)
    return JsonResponse({'data':r})

@csrf_exempt
def receipt(request):
    # print('getrec', request.POST, request.method)
    # print()
    if request.method == 'GET':       #receipt cnum-r haij avna. 
        if 'cnum' in request.GET: 
            val = request.GET['cnum']
            print('val', val)     
            receipts = []
            for r in getreceipts({'card_number':val}):
                rec_return = []
                for ret in getreceiptreturn({'receipt':r['_id']}):
                    rec_return.append(ret)
                r['rec_return']=rec_return
                receipts.append(r)
        return JsonResponse({'data': json.loads(json_util.dumps(receipts))}  )
    elif request.method == 'POST':  #receipt send hiine.
        p = json.loads(request.body) 
        print('post irlee', p)
        if 'cnum' in p: 
            val = p['cnum']
            print('val', val)  

            response = requests.post(url + '/transaction/thirdparty/process_transaction/'
            , data=json.dumps({  
                "card_number": p['cnum'],
                "inter_number": p['inum'], 
                "mobile": p['mobile'],                 
                "date": p['date'],
                "bnum": p['bill_number'],
                "spam": p['spend_amount'],
                "bam": p['bonus_amount'],
                "bp": p['bonus_point'],
                "ta": p['total_amount'],
                "ca": p['cash_amount'],
                "terid": p['terminal_id'],
                })
            , headers={"Content-Type":"application/json", "Authorization":"Token " + p['token']})
            print('content', response.content)
            r = json.loads(response.content)
            return JsonResponse({'data':r})



       

def receipt(request):

    return render(request, "receipt.html")

def cardlist(request):

    client = getMongoClient()
    db = client.nut
    fcnt = db.card.count_documents( {} )
    f = db.card.find_one( {} ) 
    return render(request, "cardlist.html", {'fcnt':fcnt, 'f':f})














