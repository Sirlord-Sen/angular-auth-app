export default((refreshToken: string) => {
    return {
        query:`mutation{
            refreshToken(
                body: {
                    refreshToken : "${refreshToken}"
                }
            ){
                tokens{
                    tokenType,
                    expiredAt,
                    accessToken,
                    refreshToken
                }
            }
        }`
    }
})
