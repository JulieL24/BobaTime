from pydantic import BaseModel
from typing import Optional
from queries.pool import pool
from fastapi import HTTPException 


class Error(BaseModel):
    message: str

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


class UserRepository: 
    def get_all_accounts(self) -> (Error | list[UserOut]):
        try:
            #connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as cur:
                    # Run our SELECT statement
                    result = cur.execute(
                        """
                        SELECT id, first_name, last_name,
                        avatar, email, username
                        FROM users
                        ORDER BY last_name, first_name;
                        """
                    )

                    return [
                        # UserOut(
                        #     id= record[0],
                        #     first_name=record[1],
                        #     last_name=record[2],
                        #     avatar=record[3],
                        #     email=record[4],
                        #     username=record[5],
                        # ) 
                        # for record in cur
                        self.record_to_user_out(record)
                        for record in cur
                        ] 
        except Exception as e:
            print(e) 
            return {"message": "Can't return list of accounts."}

    def get_user_detail(self, user_id: int) -> Optional[UserOut]: 
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
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
                    record = result.fetchone()
                    if record is None: 
                        return None
                    return self.record_to_user_out(record)
        except Exception as e: 
            return {"message": "Can't get user info"}

    def create_account(self, user: UserIn) -> UserOut:
        # connect the database
        with pool.connection() as conn: 
            # get a cursor (something to run SQL with)
            with conn.cursor() as cur:
                # Run our INSERT statement
                result = cur.execute(
                    """
                    INSERT INTO users
                        (first_name,last_name, avatar,
                        email, username, password)
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [   
                        user.first_name, 
                        user.last_name, 
                        user.avatar,
                        user.email,
                        user.username,
                        user.password
                    ]
                )
                id = result.fetchone()[0]
                # Return new data
                old_data = user.dict()
                return UserOut(id=id, ** old_data)


    def update_account(self, user_id:int, user: UserIn) -> (UserOut | Error):
        try: 
            # connect the database
            with pool.connection() as conn: 
                # get a cursor (something to run SQL with)
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE users
                        SET     first_name = %s
                            ,   last_name = %s
                            ,   avatar = %s
                            ,   email = %s
                            ,   username = %s
                            ,   password = %s
                        WHERE id = %s
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.avatar,
                            user.email,
                            user.username,
                            user.password,
                            user_id
                        ]
                    )
                    old_data = user.dict()
                    return UserOut(id=user_id, ** old_data)

        except Exception as e:
            print(e) 
            return {"message": "Can't update account."}

    def delete_user(self, user_id: int) -> bool:
        try: 
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
        except Exception as e:
            return False 

    def user_in_to_out(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, ** old_data)

    def record_to_user_out(self, record):
        return UserOut(
            id= record[0],
            first_name=record[1],
            last_name=record[2],
            avatar=record[3],
            email=record[4],
            username=record[5],
        ) 
  
    