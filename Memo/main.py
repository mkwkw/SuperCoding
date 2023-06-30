from fastapi import FastAPI
from pydantic import BaseModel #request body 만들 때, 사용
from fastapi.staticfiles import StaticFiles #정적 파일 불러오기

app = FastAPI()

class Memo(BaseModel):
    id:str
    content:str    

memos=[]

@app.post('/memos')
def create_memo(memo:Memo):
    memos.append(memo)
    return '메모 추가에 성공했습니다.'

@app.get('/memos')
def read_memo():
    return memos
 
#Wordale 폴더 안에 있는 파일을 mount
app.mount("/", StaticFiles(directory="SuperCoding/Memo/static", html=True), name="static")

