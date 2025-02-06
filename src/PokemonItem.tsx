interface Pokemon {
    id: number;
    label: string;
    url: string;
  }
  function PokemonItemList(props: Pokemon) {
    return (
      <div className="item">
        {`#${props.id} ${props.label}`}
        <img alt="?" className="icon" src={props.url} />
      </div>
    );
  }
  export default PokemonItemList;
  