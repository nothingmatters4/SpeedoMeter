import "./Body.css";
import {useState,useEffect,useRef} from "react";

function Body(props)
{
    const questionbox = [
        "I have 2 apples and 3 oranges, which means I can make a delicious fruit salad.",
        "Today is 12th March, 2025, and the weather forecast says it will rain later.",
        "A rectangle has 4 sides and 4 angles, making it one of the simplest shapes.",
        "The bus arrived at 8:15 AM, just in time for the students to get to school.",
        "There are 24 hours in a day, but sometimes it feels like we need more time.",
        "Room temperature is 22 degree Celcius, which is considered comfortable for most people indoors."
      ];

    let [question,setQuestion] = useState("");
    let [answer,setAnswer] = useState("");
    let [wpm,setWpm] = useState(0);
    let [accuracy,setAccuracy] = useState(0);
    let [completed,setCompleted] = useState(false);

      let start=useRef(null);
      function handleChange(event){
        if(start.current===null){
            start.current=Date.now();
        }
        setAnswer(event.target.value);
        calculateResults(event.target.value);
      }
      function calculateResults(userInput) {
        if (!start.current) return;
    
        const timeTaken = (Date.now() - start.current) / 60000; 
        const totalChars = userInput.replace(/\s/g, "").length; 
        const totalWords = totalChars / 5; 
        const currentWpm = timeTaken > 0 ? Math.round(totalWords / timeTaken) : 0;
        setWpm(currentWpm);
    
        const totalTyped = userInput.length;
        const correctCharArray = [...userInput].filter((char, i) => char === question[i]);
        const countChar = correctCharArray.length;
    
        setAccuracy(totalTyped > 0 ? Math.round((countChar / totalTyped) * 100) : 0);
    
        if (userInput === question) {
            setCompleted(true);
            if(currentWpm>props.best)
            {
                props.setBest(currentWpm);
            }

        }
    }
     

      function reset(){
        setQuestion(questionbox[Math.floor(Math.random()*questionbox.length)]);
        setAnswer("");
        setWpm(0);
        setAccuracy(0);
        setCompleted(false);
        start.current=null;
      }
      useEffect(()=>{reset()},[]);

    return <div className="typing-container">
            <p  className="question"
                onCopy={(event)=>event.preventDefault()}
                onContextMenu={(event)=>event.preventDefault()}
            
            >
                {
                    [...question].map((char,i)=><span className={char===answer[i]?"correct":answer[i]? "wrong":""}>{char}</span>)
                }
            </p>
            <textarea 
            className="answer"
            placeholder="Start typing here..."
            onChange={handleChange}
            value={answer}  
            disabled={completed} 
            onPaste={(event)=>event.preventDefault()}        
           />
            <div className="stats">
                <p>WPM : {wpm}</p>
                <p>Accuracy : {accuracy}</p>
            </div>
            <button onClick={reset} className="restart-btn">Restart Button</button>
    </div>


}

export default Body;