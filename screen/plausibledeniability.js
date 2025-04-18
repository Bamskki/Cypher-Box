import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import navigationStyle from '../components/navigationStyle';
import { BlueLoading, BlueCard, BlueText, BlueSpacing20 } from '../BlueComponents';
import loc from '../loc';
import { BlueStorageContext } from '../blue_modules/storage-context';
import alert from '../components/Alert';
import Button from '../components/Button';
import triggerHapticFeedback, { HapticFeedbackTypes } from '../blue_modules/hapticFeedback';
import SafeArea from '../components/SafeArea';
const prompt = require('../helpers/prompt');

const PlausibleDeniability = ({navigation}) => {
  const { cachedPassword, isPasswordInUse, createFakeStorage, resetWallets } = useContext(BlueStorageContext);
  const [isLoading, setIsLoading] = useState(false);
  const { popToTop } = useNavigation();

  const handleOnCreateFakeStorageButtonPressed = async () => {
    setIsLoading(true);
    try {
      const p1 = await prompt(loc.plausibledeniability.create_password, loc.plausibledeniability.create_password_explanation);
      const isProvidedPasswordInUse = p1 === cachedPassword || (await isPasswordInUse(p1));
      if (isProvidedPasswordInUse) {
        setIsLoading(false);
        triggerHapticFeedback(HapticFeedbackTypes.NotificationError);
        return alert(loc.plausibledeniability.password_should_not_match);
      }
      if (!p1) {
        setIsLoading(false);
        return;
      }
      const p2 = await prompt(loc.plausibledeniability.retype_password);
      if (p1 !== p2) {
        setIsLoading(false);
        triggerHapticFeedback(HapticFeedbackTypes.NotificationError);
        return alert(loc.plausibledeniability.passwords_do_not_match);
      }

      console.log("1: ", p1, p2)
      await createFakeStorage(p1);
      console.log("2: ", p1, p2)
      await resetWallets();
      console.log("3: ", p1, p2)
      triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
      console.log("4: ", p1, p2)
      alert(loc.plausibledeniability.success);
      console.log("5: ", p1, p2)
      // navigation.goBack();
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    } catch (e) {
      console.log('e: ', e)
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <SafeArea>
      <BlueLoading />
    </SafeArea>
  ) : (
    <SafeArea>
      <BlueCard>
        <ScrollView maxHeight={450}>
          <BlueText>{loc.plausibledeniability.help}</BlueText>

          <BlueText />

          <BlueText>{loc.plausibledeniability.help2}</BlueText>

          <BlueSpacing20 />

          <Button
            testID="CreateFakeStorageButton"
            title={loc.plausibledeniability.create_fake_storage}
            onPress={handleOnCreateFakeStorageButtonPressed}
          />
        </ScrollView>
      </BlueCard>
    </SafeArea>
  );
};

export default PlausibleDeniability;

PlausibleDeniability.navigationOptions = navigationStyle({
  title: loc.plausibledeniability.title,
});
