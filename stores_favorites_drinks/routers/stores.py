from fastapi import APIRouter, Depends
import requests
import os


router = APIRouter()

YELP_API_KEY = os.environ["YELP_API_KEY"]

BUSINESS_SEARCH = "https://api.yelp.com/v3/businesses/search"

HEADERS = {"Authorization": "bearer %s" % YELP_API_KEY}


class YelpApi: 
    # search for stores with location
    async def search_query(self,headers, params):
        return requests.get(
            BUSINESS_SEARCH, headers=headers, params=params
        )


@router.get("/yelp-api/bobastores")
async def get_stores_list(
    location, 
    rating,
    queries: YelpApi = Depends(),
):
    headers = HEADERS
    params = {
        "term" : "boba milk tea",
        "location": location,
        "rating": rating,
        "radius": 11000,
        "limit": 18,
        "sort_by": "rating",
    }

    response = await queries.search_query(headers, params)
    data = response.json()
    print(data)
    return data["businesses"]


