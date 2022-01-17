import axios from "axios"

const BASE_URL="/";
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGYxZDZlNzY3NjdlY2JjNGU5ODFiYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjAxMjQ5MCwiZXhwIjoxNjQyMjcxNjkwfQ.3z0zHwiRP5KzzXr0wX30HFZkoEiWb_Pa5nhGqffmYUE";
const id="61e1ab08e4f195e4e8a105de";

export const publicReq=axios.create({
    base_URL:BASE_URL,
})


export const userReq=axios.create({
    base_URL:BASE_URL,
    header:{token:`Bearer ${token}`}
})