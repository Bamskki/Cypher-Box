import React from 'react';
import { View, StyleSheet, Image, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import Modal from "react-native-modal";
import { GradientCard } from '@Cypher/components';
import { colors, heights } from '@Cypher/style-guide';
import { Close, Confirm } from "@Cypher/assets/images";
import { Text } from '@Cypher/component-library';

interface Props {
    userProfile?: string;
    userName?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    isVisible: boolean;
    onClose: () => void;
    headerText?: string;
    confirmButtonIcon?: React.ReactNode;
    cancelButtonIcon?: React.ReactNode;
}

interface ModalStyles {
    modal: ViewStyle;
    recipientCardContainer: ViewStyle;
    recipientCard: ViewStyle;
    cardGradient: ViewStyle;
    avatarContainer: ViewStyle;
    avatarGradient: ViewStyle;
    avatarImage: ImageStyle;
    avatarPlaceholder: TextStyle;
    recipientName: TextStyle;
    buttonContainer: ViewStyle;
    confirmButton: ViewStyle;
    buttonGradient: ViewStyle;
    insideView: ViewStyle;
    avatarGradientWrapper: ViewStyle;
}

export const AvatarContainer = ({ userProfile }: { userProfile: string }) => (
    <GradientCard
        style={styles.avatarGradientWrapper}
        linearStyle={styles.avatarGradient}
        colors_={[colors.pink.extralight, colors.pink.default]}
    >
        <View style={styles.avatarContainer}>
            {userProfile ? (
                <Image source={{ uri: userProfile }} style={styles.avatarImage} resizeMode='cover' />
            ) : (
                <Text style={styles.avatarPlaceholder}>
                    {userName?.charAt(0).toUpperCase() || '?'}
                </Text>
            )}
        </View>
    </GradientCard>
);

const ConfirmNostrPublicID: React.FC<Props> = ({
    userProfile,
    userName,
    onConfirm,
    onCancel,
    isVisible,
    onClose,
    headerText = 'Pay:',
    confirmButtonIcon = <Image source={Confirm} resizeMode="contain" />,
    cancelButtonIcon = <Image source={Close} resizeMode="contain" />,
}) => {
    const handleConfirm = () => {
        onConfirm?.();
        onClose();
    };

    const handleCancel = () => {
        onCancel?.();
        onClose();
    };



    const renderButtons = () => (
        <View style={styles.buttonContainer}>
            <ActionButton
                onPress={handleConfirm}
                icon={confirmButtonIcon}
            />
            <ActionButton
                onPress={handleCancel}
                icon={cancelButtonIcon}
            />
        </View>
    );

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropOpacity={0.7}
            style={styles.modal}
        >
            <GradientCard
                style={styles.recipientCard}
                linearStyle={styles.cardGradient}
                colors_={[colors.pink.extralight, colors.pink.default]}
            >
                <View style={styles.recipientCardContainer}>
                    <AvatarContainer userProfile={userProfile} />
                    <Text h3 bold style={styles.recipientName}>
                        {headerText} {userName || 'Unknown user'}
                    </Text>
                    {renderButtons()}
                </View>
            </GradientCard>
        </Modal>
    );
};

const ActionButton: React.FC<{
    onPress: () => void;
    icon: React.ReactNode;
}> = ({ onPress, icon }) => (
    <GradientCard
        style={styles.confirmButton}
        linearStyle={styles.buttonGradient}
        colors_={[colors.pink.extralight, colors.pink.default]}
        onPress={onPress}
    >
        <View style={styles.insideView}>
            {icon}
        </View>
    </GradientCard>
);

const styles = StyleSheet.create<ModalStyles>({
    modal: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recipientCardContainer: {
        width: '90%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray.dark,
        margin: 1,
        borderRadius: 8,
    },
    recipientCard: {
        width: '100%',
        height: 'auto',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
    },
    cardGradient: {
        height: heights * 0.35,
        borderRadius: 16,
        padding: 2,
    },
    avatarGradientWrapper: {
        flex: 1,
        width: 160,
        heights: 160,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray.dark,
        margin: 1,
        borderRadius: 80,
    },
    avatarGradient: {
        height: 160,
        borderRadius: 80,
        padding: 2,
    },
    avatarContainer: {
        width: 160,
        heights: 160,
        borderRadius: 80,
        backgroundColor: colors.gray.dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    avatarPlaceholder: {
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
    },
    recipientName: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        paddingHorizontal: 20,
        marginBottom: 24
    },
    confirmButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        marginRight: 8,
        backgroundColor: 'transparent',
    },
    buttonGradient: {
        borderRadius: 8,
    },
    insideView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray.dark,
        margin: 1,
        borderRadius: 8,
    },
});

export default ConfirmNostrPublicID;