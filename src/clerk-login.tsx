import React, { useEffect } from "react";
import { useHostedAuth } from "@clerk/expo/hosted-auth";
import { useAuth } from "@clerk/expo";
import { useStore } from "./store";
import { clerkKey } from "./clerk-shell";
import { Page, Header, FloatArt, Title, Txt, Button } from "./ui";
import { Feedback, useAction } from "./functional-ui";
function Connected({ navigation }: any) {
  const { startHostedAuth } = useHostedAuth();
  const { getToken, isSignedIn } = useAuth();
  const store = useStore();
  const action = useAction();
  const finish = () =>
    action.run(async () => {
      const token = await getToken();
      if (!token) return;
      const user = await store.exchangeClerk(token);
      navigation.reset({
        index: 0,
        routes: [{ name: user.onboarding_completed ? "Main" : "Personalize" }],
      });
    });
  useEffect(() => {
    if (isSignedIn) void finish();
  }, [isSignedIn]);
  return (
    <Page>
      <Header navigation={navigation} />
      <FloatArt name="logo" />
      <Title>A little more you.</Title>
      <Txt>Securely sign in with your email or connected Google account.</Txt>
      <Feedback {...action} />
      <Button
        title="Continue securely"
        disabled={action.busy}
        onPress={() =>
          action.run(async () => {
            await startHostedAuth({ mode: "sign-in" });
          })
        }
      />
    </Page>
  );
}
export default function ClerkLogin(props: any) {
  return clerkKey ? (
    <Connected {...props} />
  ) : (
    <Page>
      <Header navigation={props.navigation} />
      <Button
        title="Continue with email"
        onPress={() => props.navigation.replace("SignIn")}
      />
    </Page>
  );
}
