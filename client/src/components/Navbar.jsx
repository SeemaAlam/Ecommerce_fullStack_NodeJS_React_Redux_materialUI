import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ paddingRight: "20px", paddingLeft:"5px" })}
`;

const Language = styled.span`
  font-size: 18px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  width: 100%;
  display: flex;
  align-items: space-between;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ width: "70px", marginLeft:"10px" , padding:"2px"})};
`;

const Input = styled.input`
  border: none;
  width: 90%;
  ${mobile({ width: "50px" })};
`;

const Left = styled.div`
  flex: 1;
  text-align: center;
`;


const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size:50px;
  color:rgb(244, 51, 151);
  ${mobile({ fontSize: "20px"})}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex:"2.2", justifyContent: "flex-start"})}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "10px", marginLeft: "10px" })}
`;



const Navbar = () => {
 const quant = useSelector(state => state.cart.quantity);

  return (
    <Container>
      <Wrapper>
       
        <Left>
          <Logo>Meesho</Logo>
        </Left>
        <Center>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize:"18px" }} />
          </SearchContainer>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quant} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;