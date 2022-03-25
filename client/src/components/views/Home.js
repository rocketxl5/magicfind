import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Home = () => {
  const { user } = useContext(UserContext);

  console.log(user);
  return (
    <div>
      <h2 className="page-title">Home</h2>
      <div></div>
    </div>
  );
};

export default Home;
