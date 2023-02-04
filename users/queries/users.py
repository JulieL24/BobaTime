from pydantic import BaseModel
from typing import Optional
from queries.pool import pool
from fastapi import HTTPException 


class UserIn(BaseModel):
    first_name: str
    last_name: str
    avatar: Optional[str]
    email: str
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    avatar: Optional[str]
    email: str
    username: str

class UserOutWithPassword(UserOut):
    hashed_password: str


class DuplicateAccountError(ValueError):
    pass


class UserRepository: 
    def get_all_accounts(self) -> list[UserOut]:
        #connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, first_name, last_name,
                    avatar, email, username
                    FROM users
                    ORDER BY last_name, first_name, id;
                    """
                )
                return [
                    UserOut(
                        id= record[0],
                        first_name=record[1],
                        last_name=record[2],
                        avatar=record[3],
                        email=record[4],
                        username=record[5],
                    ) 
                    for record in cur
                    ] 

    # checks email and generate token during signup/ login 
    def get(self, email: str) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM users
                    WHERE email = %s
                    """,
                    [email],
                )
                row = cur.fetchone()
                if row is not None:
                    record= {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return record
                raise HTTPException(status_code=404, detail="Invalid email or password")


    # get user account with id 
    def get_user_detail(self, user_id: int) -> Optional[UserOut]: 
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT  id
                        ,   first_name
                        ,   last_name
                        ,   avatar
                        ,   email
                        ,   username
                    FROM users
                    WHERE id = %s
                    """,
                    [user_id]
                )
                row = cur.fetchone()
                if row is None: 
                    return None
                else:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return record

    def create(self, info: UserIn, hashed_password: str) -> UserOutWithPassword:
        with pool.connection() as conn: 
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO users
                        (first_name,last_name, avatar,
                        email, username, password)
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id, first_name, last_name, avatar,   
                        email, username, password 
                    """,
                    [   
                        info.first_name, 
                        info.last_name, 
                        info.avatar,
                        info.email,
                        info.username,
                        hashed_password,
                    ]
                )

                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record


    def update_account(self, user_id:int, info: UserIn, hashed_password: str) -> UserOutWithPassword:
        with pool.connection() as conn: 
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE users
                    SET     first_name = %s
                        ,   last_name = %s
                        ,   avatar = %s
                        ,   email = %s
                        ,   username = %s
                        ,   password = %s
                    WHERE id = %s
                    RETURNING id, first_name, last_name, avatar,   
                        email, username, password 
                    """,
                    [
                        info.first_name,
                        info.last_name,
                        info.avatar,
                        info.email,
                        info.username,
                        hashed_password,
                        user_id
                    ],
                )
                row = cur.fetchone()
                if row is not None: 
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return record
                raise HTTPException(status_code=404, detail="User not found")

    def delete_user(self, user_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE from users 
                    WHERE id = %s
                    """,
                    [user_id]
                )
                return True
  


  
    