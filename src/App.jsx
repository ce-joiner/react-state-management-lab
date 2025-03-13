import './App.css';
import { useState, useEffect } from 'react';

const App = () => {
// State variables 
  const [team, setTeam] = useState([]);

  const [money, setMoney] = useState(100);

  const [errorMessage, setErrorMessage] = useState("");

  const [zombieFighters, setZombieFighters] = useState([
    {
      id: 1,
      name: 'Survivor',
      price: 12,
      strength: 6,
      agility: 4,
      img: 'https://cdn.pixabay.com/photo/2024/02/24/23/36/man-8594933_640.png',
    },
    {
      id: 2,
      name: 'Scavenger',
      price: 10,
      strength: 5,
      agility: 5,
      img: 'https://cdn.pixabay.com/photo/2024/05/12/20/48/ai-generated-8757659_640.jpg',
    },
    {
      id: 3,
      name: 'Shadow',
      price: 18,
      strength: 7,
      agility: 8,
      img: 'https://cdn.pixabay.com/photo/2024/06/23/16/45/post-apocalyptic-8848502_640.jpg',
    },
    {
      id: 4,
      name: 'Tracker',
      price: 14,
      strength: 7,
      agility: 6,
      img: 'https://cdn.pixabay.com/photo/2024/05/18/09/50/lone-8769969_640.jpg',
    },
    {
      id: 5,
      name: 'Sharpshooter',
      price: 20,
      strength: 6,
      agility: 8,
      img: 'https://cdn.pixabay.com/photo/2024/07/14/16/51/ai-generated-8894880_640.jpg',
    },
    {
      id: 6,
      name: 'Medic',
      price: 15,
      strength: 5,
      agility: 7,
      img: 'https://cdn.pixabay.com/photo/2024/06/19/21/49/ai-generated-8840820_640.png',
    },
    {
      id: 7,
      name: 'Engineer',
      price: 16,
      strength: 6,
      agility: 5,
      img: 'https://cdn.pixabay.com/photo/2024/06/22/16/22/ai-generated-8846616_640.png',
    },
    {
      id: 8,
      name: 'Brawler',
      price: 11,
      strength: 8,
      agility: 3,
      img: 'https://cdn.pixabay.com/photo/2024/05/18/09/50/lone-8769972_640.jpg',
    },
    {
      id: 9,
      name: 'Infiltrator',
      price: 17,
      strength: 5,
      agility: 9,
      img: 'https://cdn.pixabay.com/photo/2023/05/24/20/16/ai-generated-8015775_640.jpg',
    },
    {
      id: 10,
      name: 'Leader',
      price: 22,
      strength: 7,
      agility: 6,
      img: 'https://cdn.pixabay.com/photo/2024/07/14/16/51/ai-generated-8894878_640.jpg',
    },
  ])


  // Multi-Line Ternary Syntax 
  // If the true action needs multiple steps, wrap it inside an IIFE (() => {})():


  const handleAddFighter = (selectedFighter) => {
    // Check if the user has enough money to afford the fighter
    const canAfford = money >= selectedFighter.price;
    // Check if the fighter is already in the team
    const alreadyInTeam = team.some((member) => member.id === selectedFighter.id);

    canAfford
      ? alreadyInTeam
        // If the fighter is already in the team
        ? console.log(`${selectedFighter.name} is already in the team.`)
        // If the fighter is NOT in the team and the user can afford it
        : (() => {
          // Add the fighter to the team
          setTeam((prevTeam) => [...prevTeam, selectedFighter]);
          // Deduct the fighter's price from the available money
          setMoney((prevMoney) => prevMoney - selectedFighter.price);
          // Remove the fighter from the zombieFighters list so they can't be added again
          setZombieFighters((prevFighters) => prevFighters.filter((fighter) => fighter.id !== selectedFighter.id));
          // Clear error if successful
          setErrorMessage(""); 
        })()
      // If the user does not have enough money, show error message
      : setErrorMessage(`Not enough money to recruit ${selectedFighter.name}!`);
  };

  // Auto-clear the error message after 3 seconds
useEffect(() => {
  errorMessage && setTimeout(() => setErrorMessage(""), 3000);
}, [errorMessage]);

// Use .reduce to calculate total strength and agility of team 
  const totalStrength = team.reduce((sum, fighter) => sum + fighter.strength, 0);

  const totalAgility = team.reduce((sum, fighter) => sum + fighter.agility, 0);


  const handleRemoveFighter = (selectedFighter) => {
    // Remove fighter from team 
    setTeam((prevTeam) => prevTeam.filter((member) => member.id !== selectedFighter.id)); 
    // Refund the cost by increasing money 
    setMoney((prevMoney) => prevMoney + selectedFighter.price); 
    // Add the fighter back to available fighters 
    setZombieFighters((prevFighters) => [...prevFighters, selectedFighter]); 
};



  return (
    <div>
      <h1>Zombie Apocalypse Fighters</h1>
      <h2>Money: ${money}</h2>

      {/* Display error message if there's not enough money */}
      {errorMessage && <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>}

      <h3>Available Fighters</h3>
      <ul>
        {zombieFighters.map((fighter) => (
          <li key={fighter.id}>
            <img src={fighter.img} alt={fighter.name} className="character-img"/>
            <h4>{fighter.name}</h4>
            <p>Price: {fighter.price}</p>
            <p>Strength: {fighter.strength}</p>
            <p>Agility: {fighter.agility}</p>
            <button onClick={() => handleAddFighter(fighter)}>Add</button>

          </li>
        ))}
      </ul>
      <h3>Your Team</h3>
      {team.length === 0 ? ( //If the team is empty, show a message
        <p>Pick some team members!</p>
      ) : (
        <ul>
          {team.map((fighter) => (
            <li key={fighter.id}>
              <img src={fighter.img} alt={fighter.name} className="character-img"/>
              <h4>{fighter.name}</h4>
              <p>Price: {fighter.price}</p>
            <p>Strength: {fighter.strength}</p>
            <p>Agility: {fighter.agility}</p>
            <button onClick={() => handleRemoveFighter(fighter)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total Strength: {totalStrength}</h3>
      <h3>Total Agility: {totalAgility}</h3>
    </div>
  );
};

export default App
