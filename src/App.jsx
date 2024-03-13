import { useState } from 'react'
import './App.css'

var cardStack = [
  ["I", "Tôi", ["Tôi", "Toi"]],
  ["You", "Bạn", ["Bạn", "Ban"]],
  ["We", "Chúng ta, Chúng tôi", ["Chúng ta", "Chúng tôi", "Chung ta", "Chung toi"]],
  ["They", "Họ, Bọn họ", ["Họ", "Bọn họ", "Ho", "Bon ho"]],
  ["He", "Anh ấy, Anh ta", ["Anh ấy", "Anh ta", "Anh ay", "Anh ta"]],
  ["She", "Cô ấy, Cô ta", ["Cô ấy", "Cô ta", "Co ay", "Co ta"]],
  ["It", "Nó", ["Nó", "No"]],
  ["Brother", "Anh (older), Em trai (younger)", ["Anh", "Em trai"]],
  ["Sister", "Chị (older), Em gái (younger)", ["Chị", "Em gái", "Chi", "Em gai"]],
  ["Father", "Ba, Bố, Cha", ["Ba", "Cha", "Bố", "Ba"]],
  ["Mother", "Mẹ, Má", ["Mẹ", "Má", "Me", "Ma"]],
  ["Grandfather", "Ông nội (paternal), Ông ngoại (maternal)", ["Ông", "Ong", "Ông nội", "Ông ngoại", "Ong noi", "Ong ngoai"]],
  ["Grandmother", "Bà nội (paternal), Bà ngoại (maternal)", ["Bà nội", "Bà ngoại", "Bà", "Ba noi", "Ba ngoai", "Ba"]],
  ["Uncle", "Chú, Cậu, Dượng, Bác trai", ["Chú", "Cậu", "Dượng", "Bác trai", "Chu", "Cau", "Duong", "Bac trai"]],
  ["Aunt", "Cô, Dì, Mợ, Bác gái", ["Cô", "Dì", "Mợ", "Bác gái", "Co", "Di", "Mo", "Bac gai"]],
  ["Monday", "Thứ hai", ["Thứ hai", "Thu hai"]],
  ["Tuesday", "Thứ ba", ["Thứ ba", "Thu ba"]],
  ["Wednesday", "Thứ tư", ["Thứ tư", "Thu tu"]],
  ["Thursday", "Thứ năm", ["Thứ năm", "Thu nam"]],
  ["Friday", "Thứ sáu", ["Thứ sáu", "Thu sau"]],
  ["Saturday", "Thứ bảy", ["Thứ bảy", "Thu bay"]],
  ["Sunday", "Chủ nhật", ["Chủ nhật","Chu nhat"]],
  ["January", "Tháng một", ["Tháng một", "Thang mot"]],
  ["February", "Tháng hai", ["Tháng hai", "Thang hai"]],
  ["March", "Tháng ba", ["Tháng ba", "Thang ba"]],
  ["April", "Tháng tư", ["Tháng tư", "Thang tu"]],
  ["May", "Tháng năm", ["Tháng năm", "Thang nam"]],
  ["June", "Tháng sáu", ["Tháng sáu", "Thang sau"]],
  ["July", "Tháng bảy", ["Tháng bảy", "Thang bay"]],
  ["August", "Tháng tám", ["Tháng tám", "Thang tam"]],
  ["September", "Tháng chín", ["Tháng chín", "Thang chin"]],
  ["October", "Tháng mười", ["Tháng mười", "Thang muoi"]],
  ["November", "Tháng mười một", ["Tháng mười một", "Thang muoi mot"]],
  ["December", "Tháng mười hai", ["Tháng mười hai", "Thang muoi hai"]],
  ["Pen", "Bút bi", ["Bút bi", "But bi"]],
  ["Pencil", "Bút chì", ["Bút chì", "But chi"]],
  ["Eraser", "Gôm, Tẩy", ["Gôm", "Tẩy", "Gom", "Tay"]],
  ["Pencil Case", "Hộp bút", ["Hộp bút", "Hop but"]],
  ["Pencil Sharpener", "Đồ chuốt", ["Đồ chuốt", "Do chuot"]],
  ["Ruler", "Thước", ["Thước", "Thuoc"]]
]
var currentIndex = 0;

function App() {
  const [card, setCard] = useState(0)
  const [face, setFace] = useState(0)
  const [flipped, setFlipped] = useState(0);
  const [borderColor, setBorderColor] = useState("gray")
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  const resetInput = () => {
    document.getElementById("textEnter").value = "";
  }

  const nextCard = () => {
    if(currentIndex < cardStack.length - 1) {
      currentIndex++
      setCard(currentIndex);
      setFace(0);
      setFlipped(0);
      setBorderColor("gray");
      resetInput();
    }
    
  };

  const prevCard = () => {
    if(currentIndex !== 0) {
      currentIndex--;
      setCard(currentIndex);
      setFace(0);
      setFlipped(0);
      setBorderColor("gray");
      resetInput();
    }
  }

  const flip = () => {
    setFace((face + 1) % 2);
    setFlipped(1);
  };
  
  const shuffle = () => {
    for (let i = cardStack.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [cardStack[i], cardStack[j]] = [cardStack[j], cardStack[i]]; 
    }
    currentIndex = 0;
    setCard(currentIndex);
    setFace(0); 
  }
  
  const answerMatched = (answer) => {
    for(let i = 0; i < cardStack[card][2].length; i++) {
      if(answer.toLowerCase() === cardStack[card][2][i].toLowerCase()) {return true;}
    }
    return false;
  }

  const resetStreak = () => {
    if(currentStreak > longestStreak) {setLongestStreak(currentStreak);}
    setCurrentStreak(0);
  }

  const handleInput = (e) => {
    e.preventDefault();
    if(face === 0) {
      if(answerMatched(e.target[0].value)) {
        if(borderColor !== "green") {
          setBorderColor("green");
          setCurrentStreak(currentStreak + 1);
        }
      } 
      else {
        setBorderColor("red");
        resetStreak();
      }
    }
  }

 
  return (
    <>
      <h1>THE VIETNAMESE CARD SET</h1>
      <h2>Learn Vietnamese through flashcards!<br>
      </br>Topics include: Pronoun, Calendar, and School<br>
      </br><span>Answers with or without tone marks are both correct!</span></h2>
      <div className='info'>
        <h3>Number of cards: {cardStack.length}</h3>
        <h3>Current streak: {currentStreak}</h3>
        <h3>Longest streak: {longestStreak}</h3>
      </div>
      <div className={"display " + borderColor}  onClick={flip}>{cardStack[card][face]}</div>
      <div className='nextContainer'>
          <form onSubmit={handleInput}>
              <label htmlFor='guess'>Enter your guess here:</label>
              <input  
                readOnly={flipped || face || borderColor !== "gray"}
                type="text" 
                name="guess" 
                id="textEnter"
                className={borderColor} 
                placeholder="Your answer..."
              />
              <button type="submit">Submit</button>
          </form>
        <button onClick={shuffle}>Shuffle</button>
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>
    </>
  )
}

export default App
