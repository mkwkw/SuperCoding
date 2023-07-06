from fastapi import FastAPI, UploadFile, Form, Response, Depends
from fastapi.staticfiles import StaticFiles
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException #유효하지 않는 계정정보 에러처리
from typing import Annotated
import sqlite3

con = sqlite3.connect("supercoding.db", check_same_thread=False)
cur = con.cursor()

app = FastAPI()

SECRET = "super-coding" #시크릿 키로 암/복호화 - 실제 코딩에서는 노출시키면 안 됨!
manager = LoginManager(SECRET, '/login') #access 토큰 만들어주는 역할 (시크릿 키, jwt토큰 발급할 위치) 
###
#@app.post('/items')
#async def create_item(image:UploadFile,
#                title:Annotated[str,Form()],
#                price:Annotated[int,Form()],
#                description:Annotated[str,Form()],
#                place:Annotated[str,Form()]):
#    image_bytes = await image.read() #image 읽는 시간 필요
#    cur.execute(f"""
#                INSERT INTO items(title, image, price, description, place) 
#                VALUES ('{title}','{image_bytes.hex()}', {price}, '{description}', '{place}') 
#                """) #'{문자열}' {숫자}, hex()->16진수로 변환(데이터 길이 줄이기)
#    con.commit()
#    return '200'
###

@app.get('/items')
async def get_items(user=Depends(manager)): #access token이 있을 때만(인증된 상태에서만) 접근 가능
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    rows = cur.execute(f""" 
                       SELECT * from items;
                       """).fetchall()
    return JSONResponse(jsonable_encoder(dict(row) for fow in rows))

#회원가입
@app.post("/signup")
def signup(id:Annotated[str,Form()], 
           password:Annotated[str, Form()],
           name:Annotated[str, Form()],
            email:Annotated[str, Form()]):
    cur.execute(f"""
                INSERT INTO users(id, name, email, password) 
                VALUES('{id}', '{name}', '{email}', '{password}')
                """)
    con.commit()
    
    return '200'

#로그인
@manager.user_loader()
def query_user(data):
    WHERE_STATEMENTS = f'''id="{id}"'''
    if type(data) == dict:
        WHERE_STATEMENTS = f'''id="{data[id]}"'''
    #컬럼명도 같이 가져옴
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    user = cur.execute(f"""
                        SELECT * FROM users WHERE id='{id}'
                       """).fetchone()
    return user

@app.post('/login')
def login(id:Annotated[str,Form()], 
           password:Annotated[str, Form()]):
    user = query_user(id)
    if not user:
        raise InvalidCredentialsException # 401 Unauthorized
    elif password != user['password']:
        raise InvalidCredentialsException

    access_token = manager.create_access_token(data={
        'sub' : {
            'id' : user['id'],
            'name': user['name'],
            'email' : user['email']
        }
    }) #Access Token에 넣을 정보
    return {'access_token':access_token}


app.mount("/", StaticFiles(directory="SuperCoding/CarrotMarketCloneCoding/frontend", html=True), name="frontend")