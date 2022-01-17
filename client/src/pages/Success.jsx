import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Container=styled.div`
 height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
`


const Success = () => {
    const location=useLocation();

    console.log(location)
    return (
        <Container>
            successful
        </Container>
    )
}

export default Success
