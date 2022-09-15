import React from 'react';
import { useState, useEffect } from 'react';
import { BsFillPersonDashFill, BsFillPersonPlusFill } from 'react-icons/bs';
import { db } from '../pages/api/firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { Flex, Input, Text, Button } from '@chakra-ui/react';

function Friends() {
  const [newName, setNewName] = useState('');
  const [users, setUsers] = useState([]);
  const usersCollctionRef = collection(db, 'users');

  const createUser = async () => {
    await addDoc(usersCollctionRef, { name: newName });
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollctionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <Flex
      direction={'column'}
      bg={'whiteAlpha.900'}
      width={'37vw'}
      height="50vh"
      position={'absolute'}
      right={0}
      bottom={0}
      zIndex={1}
      overflow="hidden"
      px={2}
    >
      <Input
        placeholder="Search Friend"
        onChange={(event) => {
          setNewName(event.target.value);
        }}
        type={'text'}
        variant={'filled'}
        fontSize={18}
        bg={'white'}
        color={'gray.700'}
        _hover={{ bg: 'whiteAlpha.800' }}
        _focus={{ bg: 'whiteAlpha.800' }}
        _placeholder={{ color: 'gray.700' }}
        py={3}
        my={3}
      />

      <Button
        mx={2}
        transition="all 0.2s"
        borderRadius={'md'}
        onClick={createUser}
        px={3}
      >
        Add Friend
        <BsFillPersonPlusFill />
      </Button>

      {users.map((user) => {
        return (
          <Flex ml={10} mt={4} key={user.id}>
            <Text fontSize="2xl">{user.name}</Text>
            <Button
              alignItems={'center'}
              justifyContent={'center'}
              px={4}
              py={2}
              bg={'white'}
              rounded={'full'}
              ml={4}
              shadow="lg"
              cursor={'pointer'}
              _hover={{ bg: 'gray.100' }}
              transition={'ease-in-out'}
              transitionDuration={'0.3s'}
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete friend
              <BsFillPersonDashFill ml={4} />
            </Button>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default Friends;
