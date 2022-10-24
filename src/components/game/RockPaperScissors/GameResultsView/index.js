import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
  GameViewContainer,
  GameButton,
  GameImage,
  ResultImageContainer,
  ResultName,
  ResultText,
} from './styledComponents'

import './index.css'




const GameResultsView = props => {
  const {choicesList, isShow, checkResult, newArray, text, restartGame,score} = props
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('user'))
  console.log(userInfo)
  console.log(score)

  const updatePoint = async () => {
    const result = await axios.request({
      url: 'https://webgame395group.herokuapp.com/api/setpoint',
      method: 'POST',
      headers: {  "Content-Type": "application/json"  },
      data: JSON.stringify({
        email: `${userInfo.email}`,
        code: `${userInfo.code}`,
        point: `${score}`
      }),
    });

    return result;
  };

  const handleExit = () => {
    updatePoint()
        .then((res) => {
          if (res.data.type === 'success') {
            navigate('/dashboard');
          } else {
            setTimeout(() => navigate('/login'), 2000);
          }
        })
        .catch((err) => console.log(err.message));
  };
  const showGame = () => (
    <GameViewContainer>
      {isShow && (
        <>
          <GameButton
            type="button"
            data-testid="rockButton"
            onClick={() => checkResult(choicesList[0].id)}
          >
            <GameImage
              src={choicesList[0].imageUrl}
              alt={choicesList[0].id}
              key={choicesList[0].id}
            />
          </GameButton>
          <GameButton
            type="button"
            data-testid="scissorsButton"
            onClick={() => checkResult(choicesList[1].id)}
          >
            <GameImage
              src={choicesList[1].imageUrl}
              alt={choicesList[1].id}
              key={choicesList[1].id}
            />
          </GameButton>
          <GameButton
            type="button"
            data-testid="paperButton"
            onClick={() => checkResult(choicesList[2].id)}
          >
            <GameImage
              src={choicesList[2].imageUrl}
              alt={choicesList[2].id}
              key={choicesList[2].id}
            />
          </GameButton>
        </>
      )}
      {!isShow && (
        <>
          <ResultImageContainer>
            <ResultName>YOU</ResultName>
            <GameImage src={newArray[0].imageUrl} alt="your choice" />
          </ResultImageContainer>
          <ResultImageContainer>
            <ResultName>OPPONENT</ResultName>
            <GameImage src={newArray[1].imageUrl} alt="opponent choice" />
          </ResultImageContainer>
          <ResultImageContainer>
            <ResultText>{text}</ResultText>
            <button
              className="result-button"
              type="button"
              onClick={restartGame}
            >
              Chơi Tiếp
            </button>
            <button
                className="result-button-two"
                type="button"
                onClick={handleExit}
            >
              Thoát
            </button>
          </ResultImageContainer>
        </>
      )}
    </GameViewContainer>
  )
  return showGame()
}

export default GameResultsView
