import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import palavras from "./Palavras";
import alfabeto from "./Alfabeto";

export default function App() {
  const [palavraSorteada, setPalavraSorteada] = useState([]);
  const [letrasUtilizadas, setLetrasUtilizadas] = useState([]);
  const [venceuJogo, setVenceuJogo] = useState(false);
  const [perdeuJogo, setPerdeuJogo] = useState(false);
  const [erros, setErros] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [chute, setChute] = useState("");

  function sorteiaPalavra() {
    const indexPalavraSorteada = Math.floor(Math.random() * palavras.length);
    setPalavraSorteada([...palavras[indexPalavraSorteada]]);
    setLetrasUtilizadas([]);
    setVenceuJogo(false);
    setPerdeuJogo(false);
    setErros(0);
    setAcertos(0);
    setChute("");
  }

  function retiraSinais(letra) {
    let letraSemSinais = letra;
    switch (letraSemSinais) {
      case "á":
      case "à":
      case "â":
      case "ã":
        letraSemSinais = "a";
        break;
      case "é":
      case "è":
      case "ê":
      case "ẽ":
        letraSemSinais = "e";
        break;
      case "í":
      case "ì":
      case "î":
      case "ĩ":
        letraSemSinais = "i";
        break;
      case "ó":
      case "ò":
      case "ô":
      case "õ":
        letraSemSinais = "o";
        break;
      case "ú":
      case "ù":
      case "û":
      case "ũ":
        letraSemSinais = "u";
        break;
      case "ç":
        letraSemSinais = "c";
        break;
      default:
    }
    return letraSemSinais;
  }

  function comparaLetras(palavra, letra) {
    const letraSemSinais = retiraSinais(letra);
    const palavraSemSinais = palavra;
    palavraSemSinais.map(
      (letraPalavra) => (letraPalavra = retiraSinais(letraPalavra))
    );
    return palavraSemSinais.includes(letraSemSinais);
  }

  function comparaChute() {
    const palavraSorteadaSemSinais = [];
    palavraSorteada.map((letraPalavra) =>
      palavraSorteadaSemSinais.push(retiraSinais(letraPalavra))
    );
    console.log(palavraSorteadaSemSinais);
    const palavraChute = [...chute.toLowerCase()];
    palavraChute.map(
      (letraPalavra, index) =>
        (palavraChute[index] = retiraSinais(letraPalavra))
    );
    console.log(palavraChute);
    let ganhou = true;
    palavraSorteadaSemSinais.map((letraPalavra, index) => {
      if (letraPalavra !== palavraChute[index]) {
        ganhou = false;
      }
    });
    if (ganhou) {
      setVenceuJogo(true);
    } else {
      setPerdeuJogo(true);
      setErros(6);
    }
  }

  function botaoChute() {
    if (
      palavraSorteada.length === 0 ||
      venceuJogo === true ||
      perdeuJogo === true
    ) {
      return (<>
      <div>Já sei a palavra!</div>
      <input data-identifier="type-guess"
        disabled
        type="text"
        onChange={(e) => setChute(e.target.value)}
        value={chute}
      ></input>
      <button disabled data-identifier="guess-button">Chutar</button>
      </>);
    } else {
      return (<>
      <div>Já sei a palavra!</div>
        <input data-identifier="type-guess"
          type="text"
          onChange={(e) => setChute(e.target.value)}
          value={chute}
        ></input>
      <button onClick={comparaChute} data-identifier="guess-button">Chutar</button>
      </>);
    }
  }

  return (
    <Conteudo>
      <GlobalStyle />

      <Jogo>
        <img data-identifier="game-image"
          src={"/assets/forca" + erros + ".png"}
          alt="Não foi possível carregar a imagem"
        ></img>
        <LadoDireito>
          <Botao onClick={sorteiaPalavra} data-identifier="choose-word">Escolher Palavra</Botao>

          <Palavra data-identifier="word"
            cor={() => {
              if (venceuJogo) {
                return "#58af61";
              } else if (perdeuJogo) {
                return "#EF482A";
              } else {
                return "black";
              }
            }}
          >
            {palavraSorteada.map((letra, index) => (
              <div key={index}>
                {comparaLetras(letrasUtilizadas, letra) ||
                venceuJogo ||
                perdeuJogo
                  ? letra
                  : "_"}
              </div>
            ))}
          </Palavra>
        </LadoDireito>
      </Jogo>

      <Letras>
        {alfabeto.map((letra, index) => {
          if (
            comparaLetras(letrasUtilizadas, letra) ||
            palavraSorteada.length === 0 ||
            venceuJogo === true ||
            perdeuJogo === true
          ) {
            return <Letra disabled data-identifier="letter">{letra.toUpperCase()}</Letra>;
          } else {
            return (
              <Letra data-identifier="letter"
                key={index}
                onClick={() => {
                  setLetrasUtilizadas([...letrasUtilizadas, letra]);
                  if (comparaLetras(palavraSorteada, letra)) {
                    let letrasContidas = 0;
                    palavraSorteada.map((letraPalavra) => {
                      if (retiraSinais(letraPalavra) === letra)
                        letrasContidas++;
                    });
                    setAcertos(acertos + letrasContidas);
                    if (acertos + letrasContidas === palavraSorteada.length) {
                      setVenceuJogo(true);
                    }
                  } else {
                    setErros(erros + 1);
                    if (erros + 1 === 6) {
                      setPerdeuJogo(true);
                    }
                  }
                }}
              >
                {letra.toUpperCase()}
              </Letra>
            );
          }
        })}
      </Letras>

      <Chute>
        {botaoChute()}
      </Chute>
    </Conteudo>
  );
}

const Conteudo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Jogo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin-top: 30px;
  img {
    height: 500px;
  }
`;

const LadoDireito = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin: 30px 0px;
`;

const Botao = styled.button`
  height: 50px;
  width: 150px;
  background-color: #58af61;
  color: white;
  font-weight: 900;
  font-size: 15px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
`;

const Palavra = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: ${(props) => props.cor};
  div {
    font-size: 40px;
    font-weight: 900;
    margin-left: 10px;
  }
`;

const Letras = styled.div`
  width: 650px;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Letra = styled.button`
  width: 40px;
  height: 40px;
  margin: 5px;
  color: #44739d;
  font-weight: 900;
  font-size: 15px;
  background-color: #e1ecf4;
  border: 1px solid #44739d;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    color: #7a818a;
    background-color: #9faab5;
    border: 1px solid #9faab5;
    cursor: default;
  }
`;
const Chute = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    font-size: 20px;
  }
  input {
    height: 35px;
    width: 300px;
    margin: 0px 10px;
    border-radius: 5px;
    font-size: 20px;
  }
  button {
    width: 60px;
    height: 40px;
    margin: 5px;
    color: #44739d;
    font-weight: 900;
    font-size: 15px;
    background-color: #e1ecf4;
    border: 1px solid #44739d;
    border-radius: 5px;
    cursor: pointer;
    &:disabled {
      color: #7a818a;
      background-color: #9faab5;
      border: 1px solid #9faab5;
      cursor: default;
    }
  }
`;
