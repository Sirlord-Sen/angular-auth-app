// parse the password and email as one object into this function

export default((data: any) => {
    const {email, password} = data
    return {
        query: `mutation{
            login(
                body:{
                    email: "${email}",
                    password: "${password}"
                }
                ){
                    user{
                        id,
                        email,
                        username,
                        name
                    },
                    profile{
                        phone,
                        picture,
                        bio
                    }
                    tokens{
                        expiredAt,
                        tokenType,
                        accessToken,
                        refreshToken,
                        lastSignIn
                    }
                }
            }
        `
    }
})

// Data FIELDS ARE AS FOLLOWS
// USER IS IN 'data.login.user' - CONTAINS {id, email, username, name}
// PROFILE IS IN 'data.login.profile' - CONTAINS {phone, picture, bio}
// TOKENS IS IN 'data.login.tokens' - CONTAINS {expiredAt, tokenType, accessToken, refreshToken, lastSignIn}