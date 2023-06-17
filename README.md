# suspicious_instrument
ハックツハッカソン　チーム「怪しいガッキ」のリポジトリ

# Environment

## Backend

```
cd backend
sudo docker build . -t backend
```

## Frontend

```
cd frontend
sudo docker build . -t frontend
```

## Run

```
sudo docker network create mosacup

# Terminal 1
sudo docker run -d --name backend --rm --network mosacup -p 8000:8000 backend

# Terminal 2
sudo docker run -d --name frontend --rm --network mosacup -p 3000:3000 frontend
```