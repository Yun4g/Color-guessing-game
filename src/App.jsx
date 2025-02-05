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
  const [ score, setScore] = useState(0);
  const [message, setMessage] = useState("");

   const handleClick = (selectedColor)=> {
         if(selectedColor === correctColor){
             alert('You Guessed Correctly  🎉')
             setMessage('You Guessed Correctly 🎉')
             startNewGame()
           
           updateScore()
         } 
          else{
            alert('Wrong Color Try Again 😢')
            setMessage('Wrong Color Try Again 😢')
          }
   }
 
   const updateScore = ()=>{
     const newscore = score + 1
     localStorage.setItem('score', JSON.stringify(newscore));
    setScore(newscore)
   }

   useEffect(()=>{
     const savedScore = localStorage.getItem('score')

    if (savedScore) {
       setScore(JSON.parse(savedScore))
    }
   },[])


   const resetGame = ()=>{
       const newColor = generateRandomColor()
       setCorrectColor(newColor)
       setColorOption(generateColorOptions(newColor))
      setMessage('')


   }

   const startNewGame =()=>{
    setScore( ()=> (
      localStorage.removeItem('score'),
      0
    ))

    setTimeout(() => {
      resetGame()
   }, 1000);
   }

  return (
    <section className=' flex justify-center items-center bg-slate-200   h-screen '>
        <div className=' overflow-x-hidden md:rounded-lg h-full md:h-[90vh]  md:shadow-lg shadow-cyan-700   lg:w-[700px] '>
          <div className=' bg-cyan-500 text-white p-4  w-full text-center '>
          <h1 className='  text-xl  md:text-3xl  font-semibold'>Welcome to the HNG Color Guessing Game</h1>
         
             
          </div>
         
          <div className=" h-fit lg:h-11/12 flex flex-col justify-center  rounded-b-lg  items-center p-3  bg-gray-700">

            <div data-testid="gameInstructions" className=' text-white px-9 md:px-0 mb-3 w-96 mt-8 text-center'>
               <h2>
                 How to play
               </h2>
              <p className=''>Select any color that matches with the target color you get (1 point) if you get it correctly 
                 Good Luck 🤗😎
 
              </p>
            </div>
            {
            correctColor && (
                <div style={{ backgroundColor: `rgb(${correctColor})` }} className="correct-color-container transition-colors duration-700 relative  flex justify-center items-center  h-72 w-96 rounded-lg bg-white">
               
                </div>
  
            )
           }
            <div className=' w-full grid grid-cols-2 md:grid-cols-3 gap-4 p-4 '>
            {colorOption.map((color, index) => (
              <button data-testid="colorOption"  key={index} className=' h-28 rounded-lg hover:opacity-75   transition-colors duration-700' style={{ backgroundColor: `rgb(${color})` }} onClick={() => handleClick(color)}>
                ??
              </button>
            ))}   
            </div>

            <h3 data-testid="gameStatus" className=' text-xl text-white'>{message}</h3>
             <button data-testid="score" className=' text-white text-2xl'>
            score: {score}
          </button>
          <button data-testid="newGameButton" className=' p-4 text-xl mb-4 bg-neutral-400 rounded-xl' onClick={startNewGame}> Start New Game</button>
          </div>
         
        </div>
      
    </section>
  )
}

export default App
