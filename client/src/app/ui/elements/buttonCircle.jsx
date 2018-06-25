import React from 'react'
import styled, { css }from 'styled-components'

const buttonCircle = ({ children, size }) => (
  <Button size={ size }>
    {children}
  </Button>
)
export default buttonCircle

const Button = styled.div`
 &{
   border-radius:32px;
   background-color:#333333;
   cursor: pointer;
   overflow:hidden;
   -webkit-transition:all 0.2s ease-in;
   -moz-transition:all 0.2s ease-in;
   -ms-transition:all 0.2s ease-in;
   -o-transition:all 0.2s ease-in;
   transition:all 0.2s ease-in;
   ${
     ({ size }) => {
       switch (size) {
         case 'extraLarge':
           return css`
             width:48px;
             height:48px;
           `
         case 'large':
           return css`
             width: 32px;
             height: 32px;
           `
         case 'medium':
           return css`
             width: 24px;
             height: 24px;
           `
         default: return css`
            width: 16px;
            height: 16px;
          `
       }
     }
   }
 }

&:hover{
  background-color:#fa7584;
} `
