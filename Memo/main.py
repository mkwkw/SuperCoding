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

#req_memo id인 메모의 내용 수정
@app.put('/memos/{memo_id}')
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id==req_memo.id:
            memo.content = req_memo.content
            return '성공했습니다.'
    return '그런 메모는 없습니다.'

#memo_id인 메모 삭제
@app.delete('/memos/{memo_id}')
def delete_memo(memo_id):
    for index, memo in enumerate(memos): #enumerate: 배열의 인덱스와 값을 같이 뽑아주는 함수
        if memo.id==memo_id:
            memos.pop(index)
            return '성공했습니다.'
    return '그런 메모는 없습니다.'

app.mount("/", StaticFiles(directory="SuperCoding/Memo/static", html=True), name="static")

