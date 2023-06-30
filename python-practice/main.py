from fastapi import FastAPI
from pydantic import BaseModel #request body 만들 때, 사용
from fastapi.staticfiles import StaticFiles #정적 파일 불러오기

app = FastAPI()

answer = "TRAIN"

#answer를 APPLE에서 TRAIN으로 바꿈
@app.get('/answer')
def get_answer():
    return {'answer':answer}

#Wordale 폴더 안에 있는 파일을 mount
app.mount("/", StaticFiles(directory="SuperCoding/Wordale", html=True), name="static")



#@app.get("/hello")
#def sayHello():
#    return {"message" : "안녕하세요 슈퍼코딩!"}

#@app.get("/")
#def sayWelcome():
#    return {"message" : "환영합니다!"}

#items = ['아이폰', '애플워치', '맥북', '에어팟']

#queryString
#http://127.0.0.1:8000/items?skip=2&limit=5
#@app.get("/items")
#def read_items(skip:int=0, limit:int=10):
#    return items[skip:skip+limit]

#path Parameter
#@app.get("/items/{id}")
#def read_item(id):
#    return items[int(id)]

#요청 형식(request body)
#class Item(BaseModel):
#    id:int
#    content:str
    
#request body
#@app.post("/items")
#def post_item(item:Item):
#    items.append(item.content)
#    return "성공했습니다!"



