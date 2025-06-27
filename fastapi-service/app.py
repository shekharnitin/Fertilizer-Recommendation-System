from fastapi import FastAPI
import pandas as pd 
from pydantic import BaseModel
import pickle
import numpy as np
import uvicorn

app = FastAPI()

pickle_in = open("pipe.pkl",'rb')
model = pickle.load(pickle_in)

class BM(BaseModel):
    N:float
    P:float
    K:float
    pH:float
    Rain:float
    Temp:float
    Humid:float
    Crop:str

@app.post("/predict/")
def predict(data:BM):
    data = data.dict()
    N = data['N']
    P = data['P']
    K = data['K']
    pH = data['pH']
    Rain = data['Rain']
    Temp = data['Temp']
    Humid = data['Humid']
    Crop = data['Crop']

    return model.predict_proba([[N,P,K,pH,Rain,Temp,Humid,Crop]]).tolist()

