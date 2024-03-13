import Nav from "./Nav";

const Home = (props) => {
    return (
      <>
        <div className="h-screen w-screen bg-cyan-100 p-2">
          <p className="w-[100%]">{props.user?.email}</p>
        </div>
      </>
    );
}

export default Home;
