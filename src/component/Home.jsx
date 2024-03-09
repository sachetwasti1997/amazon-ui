import Nav from "./Nav";

const Home = (props) => {
    return (
      <>
        <div className="w-full h-screen bg-cyan-100">
          {JSON.stringify(props.user)}
        </div>
      </>
    );
}

export default Home;
