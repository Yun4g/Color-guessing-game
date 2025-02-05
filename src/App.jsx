import { useEffect, useState } from 'react'
import './App.css'

function App() {
   

   const generateRandomColor = ()=>{
       const red = Math.floor(Math.random()* 256)
       const green = Math.floor(Math.random()* 256)
       const blue = Math.floor(Math.random()* 256)

       return `${red},${green},${blue}`
   }


   function generateColorOptions(correctColor) {
    const options = [correctColor];
    for (let i = 1; i < 6; i++) {
      options.push(generateRandomColor());
    }
    return options.sort(() => Math.random() - 0.5); // Shuffle options
  }

   

  const [correctColor, setCorrectColor] = useState(generateRandomColor())
  const [colorOption, setColorOption] =  useState(generateColorOptions(correctColor))
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('colorGameScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  
  const [message, setMessage] = useState("");

   const handleClick = (selectedColor)=> {
         if(selectedColor === correctColor){
             alert('You Guessed Correctly  🎉')
             setMessage('You Guessed Correctly 🎉')
            setScore(score + 1)      
            resetGame()
         } 
          else{
            alert('Wrong Color Try Again 😢')
            setMessage('Wrong Color Try Again 😢')
          }
   }



 
  useEffect(() => {
    localStorage.setItem('colorGameScore', score.toString());
  }, [score]);
 


   const resetGame = ()=>{
       const newColor = generateRandomColor()
       setCorrectColor(newColor)
       setColorOption(generateColorOptions(newColor))
      setMessage('')


   }

  

   const startNewGame =()=>{

    setScore(0)
    setTimeout(() => {
      resetGame()
     
   }, 400);
   }

 

  return (
    <section className=' lg:flex justify-center  items-center bg-slate-200  h-full  '>
        <div className=' lg:flex items-center flex-col justify-center   lg:rounded-lg h-full  lg:h-4/6   w-full  lg:w-[700px] '>
          <div className=' bg-cyan-500 text-white p-4   w-full text-center '>
            
          <h1 className='  text-xl  md:text-3xl  font-semibold'>Welcome to the HNG Color Guessing Game</h1>
         
             
          </div>
         
          <div className="  flex flex-col justify-center  lg:rounded-b-lg    items-center p-3   w-full bg-gray-700">

            <div data-testid="gameInstructions" className=' text-white px-9 md:px-0 mb-3 w-96 mt-8 text-center'>
               <h2>
                 How to play
               </h2>
              <p className=''>Select any color that matches with the target color you get (1 point) if you get it correctly 
                 Good Luck 🤗😎
 
              </p>
            </div>
            <div className='flex flex-col lg:flex-row justify-center items-center gap-3 w-full'>
            {
            correctColor && (
                <div style={{ backgroundColor: `rgb(${correctColor})` }} className="correct-color-container transition-colors duration-700 relative  flex justify-center items-center  h-48   w-9/12 md:w-1/2 rounded-lg bg-white">
                 
                </div>
  
            )
           }
            <div className=' w-80 md:w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 p-4 md:p-0  '>
            {colorOption.map((color, index) => (
              <button data-testid="colorOption"  key={index} className=' h-28 rounded-lg hover:opacity-75   transition-colors duration-700' style={{ backgroundColor: `rgb(${color})` }} onClick={() => handleClick(color)}>
                ??
              </button>
            ))}   
            </div>
            </div>

            <h3 data-testid="gameStatus" className=' text-xl mt-4 text-white'>{message}</h3>
             <button data-testid="score" className=' text-white text-2xl'>
            score: {score}
          </button>
          <button data-testid="newGameButton" className=' p-3 text-xl mb-4 bg-neutral-400 rounded-xl' onClick={startNewGame}> Start New Game</button>
          </div>
         
        </div>
      
    </section>
  )
}

export default App
