import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import navigationStyle from '../../components/navigationStyle';
import { BlueHeaderDefaultSub } from '../../BlueComponents';
import loc from '../../loc';
import { BlueStorageContext } from '../../blue_modules/storage-context';
import ListItem from '../../components/ListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const Settings = ({ navigation }) => {
  const { navigate, goBack } = useNavigation();
  const [login, setLogin] = useState(false);
  // By simply having it here, it'll re-render the UI if language is changed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { language } = useContext(BlueStorageContext);

  useEffect(() => {
    async function handleToken() {
      const token = await AsyncStorage.getItem('authToken')
      setLogin(!!token);
      console.log('token: ', token)
    }
    handleToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    setLogin(false);    
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  }

  return (
    <SafeAreaView style={styles.root}>
    <ScrollView style={styles.root} contentInsetAdjustmentBehavior="automatic" automaticallyAdjustContentInsets>
      <View style={{ height:45 }} />
      {Platform.OS === 'android' ? <BlueHeaderDefaultSub leftText={loc.settings.header} /> : <></>}
      <ListItem title={loc.settings.general} onPress={() => navigate('GeneralSettings')} testID="GeneralSettings" chevron />
      <ListItem title={loc.settings.currency} onPress={() => navigate('Currency')} testID="Currency" chevron />
      <ListItem title={loc.settings.language} onPress={() => navigate('Language')} testID="Language" chevron />
      <ListItem title={loc.settings.encrypt_title} onPress={() => navigate('EncryptStorage')} testID="SecurityButton" chevron />
      <ListItem title={loc.settings.network} onPress={() => navigate('NetworkSettings')} testID="NetworkSettings" chevron />
      <ListItem title={loc.settings.tools} onPress={() => navigate('Tools')} testID="Tools" chevron />
      <ListItem title={loc.settings.about} onPress={() => navigate('About')} testID="AboutButton" chevron />
      {login && <ListItem title={"Logout"} onPress={handleLogout} testID="LogoutButton" chevron /> }
    </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
Settings.navigationOptions = navigationStyle({
  headerTransparent: true,
  headerTitle: Platform.select({ ios: loc.settings.header, default: '' }),
  headerLargeTitle: true,
});
