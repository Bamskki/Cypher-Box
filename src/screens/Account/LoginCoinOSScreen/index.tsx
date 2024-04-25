import React, { useState } from "react";
import { View } from "react-native";
import SimpleToast from "react-native-simple-toast";
import styles from "./styles";
import { GradientButton, GradientText } from "@Cypher/components";
import { InputEmailPhone } from "@Cypher/screens/Components";
import { ScreenLayout } from "@Cypher/component-library";
import { dispatchNavigate, dispatchReset } from "@Cypher/helpers";
import { loginUser } from "../../../../api/coinOSApis";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginCoinOSScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nextClickHandler = async () => {
    setIsLoading(true);
    if (email == "") {
      SimpleToast.show("Please enter your username", SimpleToast.SHORT);
      setIsLoading(false);
      return;
    } else if (password == "") {
      SimpleToast.show("Please enter your password", SimpleToast.SHORT);
      setIsLoading(false);
      return;
    }

    try {
      const response: any = await loginUser(email, password);
      console.log("User Login successful:", response);
      if (response.token) {
        await AsyncStorage.setItem("authToken", response?.token);
        await AsyncStorage.setItem("user", JSON.stringify(response?.user));
        dispatchReset("AccountStatus");
      } else {
        SimpleToast.show("Invalid usernmae or password", SimpleToast.SHORT);
      }

      await AsyncStorage.setItem("viewWithdraw", "1");
    } catch (error: any) {
      console.error("Error login user:", error?.message);
      SimpleToast.show(error?.message, SimpleToast.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenLayout disableScroll showToolbar progress={1}>
      <View style={styles.container}>
        <View style={styles.innerView}>
          <GradientText>Login to Coinos</GradientText>
          <InputEmailPhone
            label={`Username`}
            setText={setEmail}
            text={email}
            style={{ marginTop: 50 }}
          />
          <InputEmailPhone
            label="Password"
            secureTextEntry={true}
            setText={setPassword}
            text={password}
          />
        </View>
        <GradientButton
          title="Login"
          disabled={isLoading}
          onPress={nextClickHandler}
        />
      </View>
    </ScreenLayout>
  );
}
