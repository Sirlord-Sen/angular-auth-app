// This function takes no arguments
export default(() => {
    return {
        query:`mutation UploadPhoto($file: Upload!) {
            uploadPhoto(file: $file){
                message,
                photo
            }
        }`
    }
})

// -----------------------------------
// THIS CODE IS TO BE TAKEN OUT OF HERE
// -----------------------------------


// This request must use a formdata not json
// put these variables in your signup event handler


