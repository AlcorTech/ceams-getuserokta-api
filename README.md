The endpoint /login
expected Request body :
{
    "username":"jayachandra",
    "password":"************"
}

expected Response:

{
    "expiresAt": "2020-12-30T13:31:31.000Z",
    "status": "SUCCESS",
    "sessionToken": "20111OLSjnHvPXrpYQUwLzOeajxaOAN_yP-DihZVSbDfVHjwGLva_cl",
    "_embedded": {
        "user": {
            "id": "**********",
            "passwordChanged": "2020-12-29T22:05:58.000Z",
            "profile": {
                "login": "jayachandra",
                "firstName": "jayachandra",
                "lastName": "madopothula",
                "locale": "en",
                "timeZone": "America/Los_Angeles"
            }
        }
    },
    "_links": {
        "cancel": {
            "href": "https://dev-598279.oktapreview.com/api/v1/authn/cancel",
            "hints": {
                "allow": [
                    "POST"
                ]
            }
        }
    }
}


