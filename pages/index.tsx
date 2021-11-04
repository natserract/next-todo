import Activity from './activity'

type HomeProps = {} 

const Home: React.FC<HomeProps> = (props) => {
  return (
    <div role="container">
      <Activity />
    </div>
  );
}

export default Home;