from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

#요청 형식(request body)
class Item(BaseModel):
    id:int
    content:str

items = ['아이폰', '애플워치', '맥북', '에어팟']

@app.get("/hello")
def sayHello():
    return {"message" : "안녕하세요 슈퍼코딩!"}

@app.get("/")
def sayWelcome():
    return {"message" : "환영합니다!"}

#queryString
#http://127.0.0.1:8000/items?skip=2&limit=5
@app.get("/items")
def read_items(skip:int=0, limit:int=10):
    return items[skip:skip+limit]

#path Parameter
@app.get("/items/{id}")
def read_item(id):
    return items[int(id)]

#request body
@app.post("/items")
def post_item(item:Item):
    items.append(item.content)
    return "성공했습니다!"

