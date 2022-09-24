import styled from "styled-components"
import GlobalStyle from "./GlobalStyle"

export default function App() {
    return(
        <Conteudo>
            <GlobalStyle />
            <Jogo>
                <img src="/assets/forca0.png" alt="Não foi possível carregar a imagem"></img>
                <LadoDireito>
                    <Botao>Escolher Palavra</Botao>
                    <Palavra>
                        <div>a</div>
                        <div>_</div>
                        <div>_</div>
                        <div>_</div>
                        <div>_</div>
                        <div>_</div>
                    </Palavra>
                </LadoDireito>
            </Jogo>
            <Letras>
                <Letra>A</Letra>
                <Letra>A</Letra>
                <Letra>A</Letra>
                <Letra>A</Letra>
                <Letra>A</Letra>
                <Letra>A</Letra>
            </Letras>
            <Chute>
                <div>Já sei a palavra!</div>
                <input type="text"></input>
                <button>Chutar</button>
            </Chute>
        </Conteudo>
    )
}

const Conteudo = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Jogo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 40%;
    margin-top: 30px;
    img {
        height: 500px;
    }
`

const LadoDireito = styled.div`
    display: flex;
    width: 40%;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    margin: 30px 0px;
`

const Botao = styled.button`
    height: 50px;
    width: 150px;
    background-color: #58AF61;
    color: white;
    font-weight: 900;
    font-size: 15px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
`

const Palavra = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    div {
        font-size: 40px;
        font-weight: 900;
        margin-left: 10px;
    }
`

const Letras = styled.div`
    width: 40%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Letra = styled.button`
    width: 40px;
    height: 40px;
    margin: 5px;
    color: #44739D;
    font-weight: 900;
    font-size: 15px;
    background-color: #E1ECF4;
    border: 1px solid #44739D;
    border-radius: 5px;
    cursor: pointer;
`
const Chute = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        font-size: 20px;
    }
    input {
        height: 20px;
        width: 300px;
        margin: 0px 10px;
    }
    button {
        width: 60px;
    height: 40px;
    margin: 5px;
    color: #44739D;
    font-weight: 900;
    font-size: 15px;
    background-color: #E1ECF4;
    border: 1px solid #44739D;
    border-radius: 5px;
    cursor: pointer;
    }
`