export default (httpClient) => ({
    signIn: (data) => {
        return httpClient.post('/signIn', data)
    },
    signUp: (data) => {
        return httpClient.post('/signUp', data)
    },
    logout: () => {
        return httpClient.post('/logout')
    }
})