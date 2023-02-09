from pydantic import BaseModel
from queries.pool import pool


class FavoriteStore(BaseModel):
    user_id: int
    store_id: str
    name: str 

class FavoriteStoreList(BaseModel):
    favoriteList: list(FavoriteStore)