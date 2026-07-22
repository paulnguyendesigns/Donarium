from fastapi import FastAPI

app = FastAPI(title="Donarium API")


@app.get("/")
def health_check():
    return {"status": "ok"}