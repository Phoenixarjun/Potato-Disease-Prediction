from fastapi import FastAPI, File, UploadFile
from uvicorn import run
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = "./saved_models/1.keras"
MODEL = tf.keras.models.load_model(model_path)



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

     prediction = MODEL.predict(img_batch)
     predicted_result = CLASS_NAMES[np.argmax(prediction[0])] 
     confidence = (100 * np.max(prediction[0])).astype(int)
     confidence = str(confidence) + "%"

     return predicted_result, confidence


if __name__ == '__main__':
     run(app, host='localhost', port=8000)