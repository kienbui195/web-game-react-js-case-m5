import {Component} from 'react'

import 'reactjs-popup/dist/index.css'

import ScoreView from '../ScoreView'

import GameResultsView from '../GameResultsView'


import {
  MainContainer,
} from './styledComponents'


const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

function getResult(item1, item2) {
  if (item1.id === 'ROCK') {
    switch (item2.id) {
      case 'PAPER':
        return 'YOU LOSE'
      case 'SCISSORS':
        return 'YOU WON'
      default:
        return 'IT IS DRAW'
    }
  } else if (item1.id === 'PAPER') {
    switch (item2.id) {
      case 'ROCK':
        return 'YOU WON'
      case 'SCISSORS':
        return 'YOU LOSE'
      default:
        return 'IT IS DRAW'
    }
  } else {
    switch (item2.id) {
      case 'ROCK':
        return 'YOU LOSE'
      case 'PAPER':
        return 'YOU WON'
      default:
        return 'IT IS DRAW'
    }
  }
}

class RpsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      newArray: [choicesList[0], choicesList[1]],
      text: 'YOU WON',
      score: 0,
    };
    this.getResult = getResult.bind(this);
  }


  restartGame = () => this.setState({isShow: true})

  checkResult = id => {
    const {score} = this.state
    const choice2 = choicesList[Math.floor(Math.random() * choicesList.length)]
    const choice1 = choicesList.filter(eachValue => eachValue.id === id)
    const result = this.getResult(choice1[0], choice2)
    let newScore = score
    if (result === 'YOU WON') {
      newScore = score + 1
    } else {
      newScore = score
    }
    this.setState({
      isShow: false,
      newArray: [choice1[0], choice2],
      text: result,
      score: newScore,
    })
  }

  render() {
    const {isShow, newArray, text, score} = this.state
    return (
      <MainContainer>
        <ScoreView score={score} />
        <GameResultsView
          choicesList={choicesList}
          text={text}
          isShow={isShow}
          newArray={newArray}
          checkResult={this.checkResult}
          restartGame={this.restartGame}
          handleExit = {this.handleExit}
        />
      </MainContainer>
    )
  }
}

export default RpsPage
