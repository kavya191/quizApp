import React, { useState } from 'react'
import quizData from '../api/quizData'
function Quiz() {
    //create state to display qustions
    const [displayQuestion, setDisplayQuestion] = useState(0)
    //create state to dispalay correct answer
    const [displayAnswer,setDisplayAnswer]=useState(false)
    //state for correct asnswer
    const [answerCorrect,setAnswerCorrect]=useState(false)
    //score
    const [amountCorrect,setAmountCorrect]=useState(0)
    //
    const [clickable,setClickable]=useState(true)
    //
    const [showResults, setShowResults] = useState(false);
    const [result, setResult] = useState(0);
    //function to handle prev and next button
    const handleNextBtn = () => {
        if (displayQuestion < quizData.questions.length -1) {
            setDisplayQuestion(displayQuestion + 1)
            setDisplayAnswer(false)//answer click cheythu next button click cheythu then prev button click cheyyumborefresh cheyyan
            setAnswerCorrect(false)
            setClickable(true)
            console.log(displayQuestion);
        }else{
            setShowResults(true)
            setResult((amountCorrect / quizData.questions.length) * 100)
        }

    }
    const handleBackBtn = () => {
        if (displayQuestion >= 1) {
            setDisplayQuestion(displayQuestion - 1)
            setAnswerCorrect(false)
            setDisplayAnswer(false)
            console.log(displayQuestion);
        }else{
            setShowResults(true)
           
        }
    }
    //handle answer
    const handleAnswer=(index)=>{
        if(quizData.questions[displayQuestion].correctAnswerIndex == index){
            console.log('%cCorrect', `background-color: green`);
            setDisplayAnswer(!displayAnswer)
            setAnswerCorrect(true)
            setAmountCorrect(amountCorrect+1)
            setClickable(false)
            console.log(amountCorrect);
        }else{
            console.log('%cWrong', `background-color: red`);
            setDisplayAnswer(!displayAnswer)
            
            setClickable(false)
        }
        console.log('clicked');
    }
    //reset
       const reset = () => {
        setDisplayQuestion(0);
        setDisplayAnswer(false);
        setAnswerCorrect(false);
        setAmountCorrect(0)
        setShowResults(false);
        setResult(0);
        setClickable(true);
    }
    return (
        <div className='quiz-container'>
            <h1>Javascript Quiz</h1>
            {
                !showResults ?
                <>
                <h2>Question
                    (<span style={{ color: '#4cceac' }}>{displayQuestion + 1}</span>
                    /{quizData.questions.length})</h2>
                    <div className='quiz-options'>
                    <h2 className='question' 
                    dangerouslySetInnerHTML={{
                         __html: quizData.questions[displayQuestion]
                         .question }}></h2>
                         {
                            quizData.questions[displayQuestion].answers.map((answer,index)=>{
                                return(
                                    <button key={index}
                                    className='quiz-option-container'
                                    disabled={!clickable}
                                    onClick={()=>handleAnswer(index)}>
                                        
                                        <h3
                                                style={displayAnswer &&
                                                     quizData.questions[displayQuestion]
                                                     .correctAnswerIndex == index
                                                    ? { color: '#4cceac' }
                                                    : displayAnswer && quizData.questions[displayQuestion].correctAnswerIndex !== index
                                                        ? { color: '#db4f4a' }
                                                        : null
                                                }
                                            >
                                                {answer}
                                            </h3>
                                    </button>
                                )
                            })
                         }
                    </div>
                    {/* ans click cheyyumbo correct or wromg ennu disply cheyyan */}
                    {displayAnswer && answerCorrect
                            ? <h1 style={{ color: '#4cceac' }}>Correct!</h1>
                            : displayAnswer && !answerCorrect &&
                            <h1 style={{ color: '#db4f4a' }}>Wrong</h1>

                        }
                         <div className='quiz-nav'>
                <button onClick={handleBackBtn}>Prev</button>
                <button onClick={handleNextBtn}>Next</button>
            </div>
            </> :
             <div className='results-container'>
             <h1>Results</h1>
             <div 
                 className='result-container' 
                 style={
                     result > 50 
                     ? {border: '3px solid #4cceac', boxShadow: '0 0 1rem #4cceac'}
                     : {border: '3px solid #db4f4a', boxShadow: '0 0 1rem #db4f4a'}
                 }
             >
                 <h1 style={result > 50 ? {color: '#4cceac'}: {color: '#db4f4a'}}>
                     {result}%
                 </h1>
             </div>
             <button onClick={reset}
             >
                 Try Again
             </button>
         </div>

 }
</div>
            
            
      
    )
}

export default Quiz