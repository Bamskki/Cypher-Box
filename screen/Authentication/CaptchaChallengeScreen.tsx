// CaptchaChallengeScreen.tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useCaptchaCreateChallenge } from '../../apollo/api';
import Button from '../../components/Button';

interface CaptchaChallengeScreenProps {}

const CaptchaChallengeScreen: React.FC<CaptchaChallengeScreenProps> = () => {
  const [createChallenge, { loading }] = useCaptchaCreateChallenge();
  const [challengeResult, setChallengeResult] = useState<any | null>(null);

  const handleCreateChallenge = async () => {
    try {
      const response = await createChallenge();
      setChallengeResult(response.data.captchaCreateChallenge.result);
    } catch (error) {
      console.error('Error creating challenge:', error?.message);
    }
  };

  return (
    <View>
      <Button title="Create Challenge" onPress={handleCreateChallenge} />
      {loading && <Text>Loading...</Text>}
      {challengeResult && (
        <View>
          <Text>Challenge Code: {challengeResult.challengeCode}</Text>
          {/* Display other challenge result fields here */}
        </View>
      )}
    </View>
  );
};

export default CaptchaChallengeScreen;
