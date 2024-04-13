import React from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUser } from './userSlice';
import { addSkill } from './userSlice';

const Ashraf_Test_Component = () => {
	const dispatchAddUser = useDispatch();
	dispatchAddUser(addUser('ashrafkhaneetli@gmail.com'));
  const dispatchAddSkill = useDispatch();
  dispatchAddSkill(addSkill('Electrical Power Calculations'));
  const skills = useSelector(state => state.users.skills);
  const info = useSelector(state => state.users.username);
  return(
    <div>
			<p>info:{info}</p>
      <p>skill index 0:{skills[0]}</p>
      
    </div>
  );
};

export default Ashraf_Test_Component;
