import React, {useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DiceOne from './assets/Dice1.jpg';
import DiceTwo from './assets/Dice2.jpg';
import DiceThree from './assets/Dice3.jpg';
import DiceFour from './assets/Dice4.jpg';
import DiceFive from './assets/Dice5.jpg';
import DiceSix from './assets/Dice6.jpg';
import HomeImg from './assets/main.png';

const App = () => {
  const [dice1, setDice1] = useState(DiceOne);
  const [dice2, setDice2] = useState(DiceOne);
  const [inital, setInital] = useState(true);
  const [user, setUser] = useState(true);
  const [user1Score, setUser1Score] = useState(0);
  const [user2Score, setUser2Score] = useState(0);
  const [winner, setWinner] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');

  // useEffect(() => {
  //   setTimeout(() => {
  //     if(user == false){
  //       rollDice();
  //     }
  //   }, 2000);
  // }, [user])

  

  const rollDice = async () => {
    const randomNo1 = Math.floor(Math.random() * 6) + 1;
    const randomNo2 = Math.floor(Math.random() * 6) + 1;
    console.log("hello");

    switch (randomNo2) {
      case 1:
        setDice2(DiceOne);
        break;
      case 2:
        setDice2(DiceTwo);
        break;
      case 3:
        setDice2(DiceThree);
        break;
      case 4:
        setDice2(DiceFour);
        break;
      case 5:
        setDice2(DiceFive);
        break;
      case 6:
        setDice2(DiceSix);
        break;
      default:
        setDice2(DiceOne);
        break;
    }
    switch (randomNo1) {
      case 1:
        setDice1(DiceOne);
        break;
      case 2:
        setDice1(DiceTwo);
        break;
      case 3:
        setDice1(DiceThree);
        break;
      case 4:
        setDice1(DiceFour);
        break;
      case 5:
        setDice1(DiceFive);
        break;
      case 6:
        setDice1(DiceSix);
        break;
      default:
        setDice1(DiceOne);
        break;
    }

    if (user) {
      if (randomNo1 > randomNo2) {
        const x = user1Score + randomNo1;
        setUser1Score(x);
        check(x);
      }
      setUser(false);
      
    } else {
      if (randomNo2 > randomNo1) {
        setUser2Score(user2Score + randomNo2);
        check(user2Score + randomNo2);
      }
      setUser(true);
    }
  };
  const check = value => {
    console.log(value);
    if (value >= 50) {
      {
        user ? setWinner(playerOne) : setWinner(playerTwo);
      }
      setGameOver(true);
    }
  };

  start = () => {
    setInital(false);
    setGameOver(false);
    setUser1Score(0);
    setUser2Score(0);
    setUser(true);
    setWinner('');
    if(playerOne === '' ) setPlayerOne('player 1'); 
    if(playerTwo === '' ) setPlayerTwo('player 2'); 
  };

  reset = () => {
    setInital(true);
    setGameOver(false);
    setUser1Score(0);
    setUser2Score(0);
    setUser(true);
    setPlayerOne('');
    setPlayerTwo('');
    setWinner('');
  };

  return (
    <>
        <StatusBar backgroundColor={'#0C111B'}/>
      {inital ? (
        <>
          <View style={styles.startPage}>
            <Text style={styles.HomeTitle}>
              Roll <Text style={{fontSize: 90, color: '#fff'}}>2</Text> Win
            </Text>
            <Image style={{width: 200, height: 200}} source={HomeImg} />
            <TextInput
              style={styles.playerInput}
              
              onChangeText={name => {
                setPlayerOne(name.toUpperCase());
              }}
              placeholder="Enter Player 1"
            />
             <TextInput
              style={styles.playerInput}
              onChangeText={name => {
                setPlayerTwo(name.toUpperCase());
              }}
              placeholder="Enter Player 2"
            />
            <TouchableOpacity onPress={start}>
              <Text style={styles.startbtn}>Start Game</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <StatusBar />
          <View style={styles.Container}>
            {gameOver ? (
              <View style={styles.gameOver}>
                <Text style={styles.winner}>WINNER IS {winner}</Text>
                <Text style={{color:'#fdf0d5', fontSize:24, marginTop:10, fontWeight:'400'}}>Final Score : {user1Score} - {user2Score}</Text>
                
                <TouchableOpacity onPress={reset}>
                  <Text style={styles.resetBtn}>Reset</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.userContainer}>
                  <View style={styles.Singleuser}>
                      <Text style={styles.playerName}>{playerOne.slice(0,10)}</Text>
                    <Image style={styles.DiceImage} source={dice1} />

                    <TouchableOpacity disabled={!user} onPress={rollDice}>
                      <Text
                        style={[
                          styles.rollBtn,
                          {backgroundColor: user ? '#fe7f2d' : 'gray'},
                        ]}>
                        Roll Dice
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.userScore}>{user1Score}</Text>
                  </View>

                  <View style={styles.Singleuser}>
                      <Text style={styles.playerName}>{playerTwo.slice(0,10)}</Text>
                    <Image style={styles.DiceImage} source={dice2} />

                    <TouchableOpacity disabled={user} onPress={rollDice}>
                      <Text
                        style={[
                          styles.rollBtn,
                          {backgroundColor: user ? 'gray' : '#fe7f2d'},
                        ]}>
                        Roll Dice
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.userScore}>{user2Score}</Text>
                  </View>
                </View>
                <TouchableOpacity style={{marginTop: 100}} onPress={reset}>
                  <Text style={styles.resetBtn}>Reset</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C111B',
  },
  DiceImage: {
    width: 150,
    height: 150,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 3,
  },
  rollBtn: {
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    textAlign: 'center',
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#a1c181',
    fontSize: 20,
    fontWeight: '800',
  },
  userContainer: {
    flexDirection: 'row',
  },
  Singleuser: {
    marginHorizontal: 20,
  },
  userScore: {
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 10,
    backgroundColor: '#a1c181',
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 5,
  },
  gameOver: {
    backgroundColor: '#619b8a',
    margin: 30,
    width: '80%',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    borderRadius: 10,
  },
  winner: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: '#f0ead2',
  },
  resetBtn: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: '#f0ead2',
    backgroundColor: '#233d4d',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginTop: 20,
  },
  startPage: {
    flex: 1,
    backgroundColor: '#0c111b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startbtn: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: '#f0ead2',
    backgroundColor: '#a1c181',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginTop: 20,
  },
  HomeTitle: {
    color: '#c1121f',
    fontSize: 50,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  playerInput:{
    backgroundColor:'#dde5b6',
    width:'50%',
    marginBottom:10,
    borderRadius:10,
    
    padding:10
  },
  playerName:{
    color:'#fff',
    textAlign:'center',
    fontSize:24,
    marginBottom:10,
    
    // backgroundColor:'#778da9',
    // paddingVertical: 2,
    // paddingHorizontal: 15,
    // margin: 0,
    // fontSize: 20,
    // borderRadius: 5,
  }
});

export default App;
