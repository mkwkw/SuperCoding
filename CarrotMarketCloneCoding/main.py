from fastapi import FastAPI, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

#con = sqlite3.connect("db.db", check_same_thread=False)
#cur = con.cursor()

app = FastAPI()

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

@app.post("/signup")
def signup(id:Annotated[str,Form()], password:Annotated[str, Form()]):
    print(id, password)
    return '200'

app.mount("/", StaticFiles(directory="SuperCoding/CarrotMarketCloneCoding/frontend", html=True), name="frontend")