from fastapi import APIRouter, Depends, Response 
from typing import Optional 

from queries.users import (
    Error,
    UserIn,
    UserRepository,
    UserOut
)

router = APIRouter()

@router.get("/users", response_model=(list[UserOut] | Error))
def get_all_accounts(
    repo: UserRepository = Depends(),
):
    return repo.get_all_accounts()

@router.get("/users/{user_id}", response_model=Optional[UserOut])
def get_user_detail(
    user_id: int,
    response: Response,
    repo: UserRepository = Depends(),
) -> UserOut: 
    user = repo.get_user_detail(user_id)
    if user is None: 
        response.status_code= 404
    return user

@router.post("/users", response_model=UserOut)
def create_account(
    user: UserIn,
    repo: UserRepository = Depends(),
):
    return repo.create_account(user)

@router.put("/users/{user_id}", response_model=(UserOut | Error))
def update_account(
    user_id : int,
    user: UserIn,
    repo: UserRepository = Depends(),
) -> (UserOut | Error):
    return repo.update_account(user_id, user)

@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id = int,
    repo: UserRepository = Depends(),
) -> bool: 
    return repo.delete_user(user_id)