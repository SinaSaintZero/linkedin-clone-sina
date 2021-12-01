import React from "react";
import styled from "styled-components";

const MyNetwork = (props)=>{
    return(
        <Section>
                <h5>
                    <a>Hiring in a hurry? </a>
                </h5>
                <p>Find talented pros in record tim with upwork and keep business going!</p>
        </Section>
        

        
    )
};

const Container= styled.div``;

const Section = styled.section`
    min-height: 50px;
    padding: 16px 0;
    box-sizing: content-box;
    text-align: center;
    text-decoration: underline;
    display: flex;
    justify-content: center;  
    margin-top:100px;
    h5 {
        color: #0a66c2;
        font-size: 14px;
        a {
          font-weight: 700;
        }
      }
      p {
        font-size: 14px;
        color: #434649;
        font-weight: 600;
      }
      @media (max-width: 768px) {
        flex-direction: column;
        padding: 0 5px;
      }
    `;

export default MyNetwork;