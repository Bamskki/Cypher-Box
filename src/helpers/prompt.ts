import { Platform } from 'react-native';
import prompt from 'react-native-prompt-android';

type PromptType = 'plain-text' | 'secure-text' | 'numeric';
type PromptTypeIOS = 'plain-text' | 'secure-text';
type PromptTypeAndroid = 'plain-text' | 'secure-text' | 'numeric';

interface PromptButton {
    text: string;
    onPress: (input?: string) => void;
    style?: 'default' | 'cancel' | 'destructive';
}

const showPrompt = (
    title: string,
    text: string,
    isCancelable: boolean = true,
    type: PromptType | PromptTypeIOS | PromptTypeAndroid = 'secure-text',
    isOKDestructive: boolean = false,
    continueButtonText: string = 'Ok'
): Promise<string> => {
    const keyboardType: 'numeric' | 'default' = type === 'numeric' ? 'numeric' : 'default';

    if (Platform.OS === 'ios' && type === 'numeric') {
        // `react-native-prompt-android` on iOS does not support numeric input
        type = 'plain-text';
    }

    return new Promise((resolve, reject) => {
        const buttons: Array<PromptButton> = isCancelable
            ? [
                {
                    text: 'No, cancel',
                    onPress: () => {
                        reject(new Error('Cancel Pressed'));
                    },
                    style: 'cancel',
                },
                {
                    text: continueButtonText,
                    onPress: (password: string) => {
                        console.log('OK Pressed');
                        resolve(password);
                    },
                    style: isOKDestructive ? 'destructive' : 'default',
                },
            ]
            : [
                {
                    text: continueButtonText,
                    onPress: (password: string) => {
                        console.log('OK Pressed');
                        resolve(password);
                    },
                },
            ];

        prompt(title, text, buttons, {
            type,
            cancelable: isCancelable,
            // @ts-ignore suppressed because its supported only on ios and is absent from type definitions
            keyboardType,
        });
    });
};

export default showPrompt;
