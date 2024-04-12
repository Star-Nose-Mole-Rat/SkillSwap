import React from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUser } from './userSlice';

const Ashraf_Test_Component = () => {
	const dispatchAddUser = useDispatch();
	dispatchAddUser(addUser('ashrafkhaneetli@gmail.com'));
  const info = useSelector(state => state.users.username);
  return(
    <div>
			<p>info:{info}</p>
    </div>
  );
};

export default Ashraf_Test_Component;
