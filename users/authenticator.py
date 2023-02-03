import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UserRepository, UserOutWithPassword

class AccountAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        users: UserRepository,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return users.get(email)

    def get_account_getter(
        self,
        users: UserRepository = Depends(),
    ):
        # Return the accounts. That's it.
        return users

    def get_hashed_password(self, user: UserOutWithPassword):
        # Return the encrypted password value from your
        # account object
        return user["password"]


authenticator = AccountAuthenticator(os.environ["SIGNING_KEY"])