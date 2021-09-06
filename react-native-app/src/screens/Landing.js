import { validatePathConfig } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Dialog, TextInput, Title, Button, Text, Divider } from 'react-native-paper';
import { flex } from 'styled-system';
import logo from '../../images/logo.png';

const Landing = () => {
  const message = 'Slash Line Baseball';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Dialog visible={true} dismissable={false}>
        <Dialog.Content>
          <Image
            style={{height: '15%', width: '15%', alignSelf: 'center'}}
            source={logo}
          />
          <Dialog.Title style={{textAlign: 'center', color: 'red', fontSize: 25}} >Slash Line Baseball</Dialog.Title>
          <Title style={{textAlign: 'center', marginBottom: '5%'}} >Log in</Title>
          <TextInput
            label='Username or Email'
            value={username}
            mode='outlined'
            onChangeText={username => setUsername(username)}
          />

          <TextInput
            label='Password'
            value={password}
            mode='outlined'
            textContentType='password'
            onChangeText={password => setPassword(password)}
            secureTextEntry
          />
        </Dialog.Content>
        <Dialog.Actions style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: '10%'}}>
          <Button mode='outlined'>Submit</Button>
          <Button mode='outlined'>Demo User</Button>
        </Dialog.Actions>
        <Divider />
        <Dialog.Content style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>Don't have an account?</Text>
          <Button mode='outlined'>Sign up here</Button>
        </Dialog.Content>

      </Dialog>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#005A9C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});
export default Landing;