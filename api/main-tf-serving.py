from fastapi import FastAPI, File, UploadFile
from uvicorn import run
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import requests
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


endpoint = "http://localhost:8501/v1/models/potatoes_model:predict"


CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]



def read_file_as_image(data) -> np.ndarray:
     image = np.array(Image.open(BytesIO(data)))
     return image

@app.post("/predict")
async def predict(
     file: UploadFile = File(...)
):
     image = read_file_as_image(await file.read())
     img_batch = np.expand_dims(image, axis=0)

     json_data = {
          "signature_name": "serving_default",
          "instances": img_batch.tolist()
     }

     response = requests.post(endpoint, json=json_data)
     prediction = response.json()['predictions'][0]
     predicted_result = CLASS_NAMES[np.argmax(prediction)]
     confidence = (100 * np.max(prediction)).astype(int)
     return {
          "class" : predicted_result,
          "confidence" : str(confidence) + "%"
     }


if __name__ == '__main__':
     run(app, host='localhost', port=8000)