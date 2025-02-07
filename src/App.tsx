import { Pokemon } from 'pokenode-ts';
import { useEffect, useRef, useState } from 'react';
import { getPokemonById } from './pokemonApi';
interface MessageProps {
  success: boolean;
  failure: boolean;
}
function randomPokemonId(): number {
  return Math.round(random(0, 150));
}

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}
function Message(props: MessageProps) {
  if (props.failure) {
    return <div>Dommage</div>;
  } else if (props.success) {
    return <div>Bravo</div>;
  }
  return <div></div>;
}
function App() {
  const [score, setScore] = useState(0);
  const [next, setNext] = useState(0);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>();
  const [history, setHistory] = useState<number[]>([]);
  useEffect(() => {
    const id = randomPokemonId();
    if (!history.includes(id)) {
      getPokemonById(id).then((res) => {
        setPokemon(res);
        console.log(res.name);
      });
      setHistory([...history, id]);
    }
  }, [next]);
  useEffect(() => {
    if (success) {
      setFailure(false);
    }
  }, [success, failure]);
  useEffect(() => {
    if (failure) {
      setSuccess(false);
    }
  }, [failure]);
  return (
    <>
      <header>Poke Guesser</header>
      <main>
        <div>Score : {score}</div>
        <div>
          <img
            style={{ filter: 'brightness(0)' }}
            src={
              pokemon?.sprites?.other?.dream_world.front_default ?? undefined
            }
            alt=""
          />
        </div>
        <div>
          <input aria-label="Search" ref={inputRef} type="text" name="search" />
        </div>
        <Message success={success} failure={failure} />
        <div>
          <button
            onClick={() => {
              if (!success) {
                if (inputRef?.current?.value !== '') {
                  if (pokemon?.name === inputRef?.current?.value) {
                    setScore((previous) => previous + 1);
                    setSuccess(true);
                  } else {
                    setFailure(true);
                    setScore(0);
                  }
                }
              }
            }}
          >
            Valider
          </button>
          <button
            onClick={() => {
              if (success) {
                setNext((previous) => previous + 1);
                setSuccess(false);
                setFailure(false);
              }
            }}
          >
            Suivant
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
