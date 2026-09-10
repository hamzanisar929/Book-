import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { useAuth } from "@clerk/expo";
import { SignIn } from "@clerk/expo/web";
import { useStore } from "./store";
import { Page, Header, Title, Txt, Button } from "./ui";
import { clerkKey } from "./clerk-shell";
import { Feedback, useAction } from "./functional-ui";
function Connected({ navigation }: any) {
  const { isSignedIn, getToken } = useAuth();
  const store = useStore();
  const action = useAction();
  const locked = useRef(false);
  const exchange = () =>
    action.run(async () => {
      const token = await getToken();
      if (!token) throw new Error("Please sign in again.");
      const user = await store.exchangeClerk(token);
      navigation.reset({
        index: 0,
        routes: [{ name: user.onboarding_completed ? "Main" : "Personalize" }],
      });
    });
  useEffect(() => {
    if (isSignedIn && !locked.current) {
      locked.current = true;
      void exchange();
    }
  }, [isSignedIn]);
  return (
    <Page>
      <Header navigation={navigation} />
      <View style={{ alignItems: "center", paddingTop: 20 }}>
        <Title>Your next chapter starts here.</Title>
        <Txt style={{ marginBottom: 24 }}>
          A secure home for your reading life.
        </Txt>
        {isSignedIn ? (
          <>
            <Feedback {...action} />
            {action.error && <Button title="Try again" onPress={exchange} />}
          </>
        ) : (
          <SignIn
            routing="hash"
            withSignUp
            forceRedirectUrl="/clerk"
            appearance={{
              variables: {
                colorPrimary: "#7055E8",
                borderRadius: "18px",
                fontFamily: "system-ui",
              },
              elements: {
                card: { boxShadow: "none", background: "transparent" },
                rootBox: { maxWidth: "100%" },
              },
            }}
          />
        )}
      </View>
    </Page>
  );
}
export default function ClerkLogin(props: any) {
  return clerkKey ? (
    <Connected {...props} />
  ) : (
    <Page>
      <Header navigation={props.navigation} />
      <Title>Sign in</Title>
      <Txt>
        Social sign-in is being connected. You can use email in the meantime.
      </Txt>
      <Button
        title="Continue with email"
        onPress={() => props.navigation.replace("SignIn")}
      />
    </Page>
  );
}
