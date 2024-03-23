import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background-color: ${({ theme }) => theme.colors.main};
        font-size: 16px; 
        line-height: 1.5;
        font-family: open sans;
    }

    label, p {
        color: ${({ theme }) => theme.colors.primaryText};
    }

    a {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.primaryText};
        &:hover {
            color: ${({ theme }) => theme.colors.hoverLink};
        }
        transition: 0.15s ease-in-out;
    }

    form {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
`;

export default GlobalStyle;
