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

    *::-webkit-scrollbar {
        width: 0.6rem;
        background-color: transparent;
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.scrollbarColor};
        border-radius: 10px;
    }

    input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }

    label, p, i, svg, h1, h2, h3, h4, h5, h6, table {
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

    textarea {
        font-family: open sans;
        resize: none;
    }

    input[type="text"], input[type="password"], input[type="email"], input[type="search"], textarea {
        outline: 0;
        font-size: 1rem;
        margin-top: 0.4rem;
        color: ${({ theme }) => theme.colors.primaryText};
        height: 2rem;
        padding-left: 0.5rem;
        background-color: inherit;
        border: 1px solid ${({ theme }) => theme.colors.secondaryText};
        border-radius: 5px;
        transition: 0.2s ease-in-out;

        &:focus {
            box-shadow: 0px 0px 10px 1px ${({ theme }) =>
              theme.colors.inputShadow};
        }

        &:-webkit-autofill {
            -webkit-text-fill-color: ${({ theme }) =>
              theme.colors.primaryText} !important;
        }
    }

    button, input[type="button"] {
        display: block;
        flex-grow: 1;
        text-align: center;
        justify-content: center;
        align-content: center;
        height: 2rem;
        font-size: 1rem;
        transition: 0.2s ease-in-out;
        margin-top: 1rem;
        outline: 0;
        border-radius: 7px;
        color: ${({ theme }) => theme.colors.primaryText};
        border: 1px solid ${({ theme }) => theme.colors.primaryButton};
        background-color: ${({ theme }) => theme.colors.primaryButton};
        box-shadow: 0px 0px 8px 1px ${({ theme }) => theme.colors.shadowColor};

        &:hover {
          cursor: pointer;
          background-color: ${({ theme }) => theme.colors.primaryButtonHover};
          border: 1px solid ${({ theme }) => theme.colors.primaryButton};
        }

        &:focus {
            box-shadow: 0px 0px 7px 1px ${({ theme }) =>
              theme.colors.inputShadow};
        }

        &:disabled {
            box-shadow: none;
            background-color: ${({ theme }) => theme.colors.secondaryButton};
            border-color: ${({ theme }) => theme.colors.secondaryButton};
            color: ${({ theme }) => theme.colors.secondaryText};
            &:hover {
                cursor: default;
            }
        }
    }

    .highlight-text {
        background-color: ${({ theme }) => theme.colors.textHighlight};
        color: ${({ theme }) => theme.colors.primaryText};
    }

    .alert-div {
        background-color: ${({ theme }) => theme.colors.warning};
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        padding-left: 0.5rem;
        margin-bottom: 1.1rem;
        border-radius: 5px;
        border: 1px solid ${({ theme }) => theme.colors.warningBorder};
    }

    .flex-stretch {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .post-link {
        color: ${({ theme }) => theme.colors.primaryText};
        transition: 0.15s ease-in-out;

        &:hover {
            color: ${({ theme }) => theme.colors.hoverPostLink};
        }
    }
`;

export default GlobalStyle;
