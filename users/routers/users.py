from fastapi import (
    APIRouter, 
    Depends, 
    Response,
    HTTPException,
    status,
    Request,
) 
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import Optional 
from pydantic import BaseModel
from queries.users import (
    UserIn,
    UserRepository,
    UserOut,
    DuplicateAccountError,
)

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    user: UserOut

class HttpError(BaseModel):
    detail: str



router = APIRouter()


@router.get("/users", response_model=list[UserOut])
def get_all_accounts(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: UserRepository = Depends(),
):
    if account_data: 
        return repo.get_all_accounts()

@router.get("/users/{user_id}", response_model=Optional[UserOut])
def get_user_detail(
    user_id: int,
    response: Response,
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserOut: 
    user = repo.get_user_detail(user_id)
    if account_data: 
        if user is None: 
            response.status_code= 404
        return user

@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }

@router.post("/users", response_model=AccountToken | HttpError)
async def create_account(
    info: UserIn,
    request: Request,
    response: Response, 
    users: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = users.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return AccountToken(user=user, **token.dict())

@router.put("/users/{user_id}", response_model=UserOut)
def update_account(
    user_id : int,
    info: UserIn,
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserOut:
    hashed_password = authenticator.hash_password(info.password)
    if account_data: 
        return repo.update_account(user_id, info, hashed_password)

@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id = int,
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool: 
    if account_data: 
        return repo.delete_user(user_id)