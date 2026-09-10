import { clerkKey } from "./clerk-shell";
import { LinearGradient } from "expo-linear-gradient";
import { useStore, api } from "./store";
import { Feedback, useAction } from "./functional-ui";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  useWindowDimensions,
} from "react-native";
import { art } from "./assets";
import { purple } from "./data";
import {
  Button,
  Field,
  FloatArt,
  Header,
  Icon,
  Page,
  Tap,
  Title,
  Txt,
  useTheme,
} from "./ui";
export function Splash({ navigation }: any) {
  const store = useStore();
  useEffect(() => {
    const id = setTimeout(
      () => navigation.replace(store.user ? "Main" : "Onboarding"),
      1600,
    );
    return () => clearTimeout(id);
  }, [store.user]);
  return (
    <Page scroll={false}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FloatArt name="logo" size={155} />
        <Txt bold color={purple} size={36}>
          iBook
        </Txt>
      </View>
      <Txt color={purple} style={{ textAlign: "center" }}>
        Where every page is an adventure
      </Txt>
      <Txt size={12} style={{ textAlign: "center", marginTop: 9 }}>
        App version 1.24.0
      </Txt>
    </Page>
  );
}
export function Onboarding({ navigation }: any) {
  const [step, setStep] = useState(0);
  const t = useTheme();
  const { height } = useWindowDimensions();
  return (
    <Page style={{ paddingHorizontal: 0, paddingTop: 0 }}>
      <View
        style={{
          height: Math.min(height * 0.56, 560),
          backgroundColor: "#1C1938",
        }}
      >
        <Image
          source={art.hero}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["#10111700", t.bg]}
          style={{
            position: "absolute",
            bottom: 0,
            height: 100,
            width: "100%",
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 55,
            left: 28,
            flexDirection: "row",
            gap: 9,
            alignItems: "center",
          }}
        >
          <Icon name="book" color="white" />
          <Txt bold color="white" size={20}>
            iBook
          </Txt>
        </View>
      </View>
      <View style={{ padding: 28, flex: 1 }}>
        <View style={{ flexDirection: "row", gap: 6, marginBottom: 22 }}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={{
                width: i === step ? 30 : 7,
                height: 7,
                borderRadius: 7,
                backgroundColor: i === step ? "#7055E8" : t.line,
              }}
            />
          ))}
        </View>
        <Txt
          size={12}
          color="#7055E8"
          bold
          style={{ letterSpacing: 2, marginBottom: 13 }}
        >
          READ. FEEL. DISCOVER.
        </Txt>
        <Txt size={37} bold style={{ lineHeight: 43, marginBottom: 18 }}>
          {
            [
              "A whole world.\nOne page away.",
              "Let the story\ncome to life.",
              "Find your rhythm.\nMake it yours.",
            ][step]
          }
        </Txt>
        <Txt
          color={t.muted}
          size={16}
          style={{ lineHeight: 25, marginBottom: 28 }}
        >
          {
            [
              "Books to get lost in. Little moments to come back to. Welcome to your reading life.",
              "After every page, explore beautiful short reels inspired by the world you just stepped into.",
              "A personal library, thoughtful daily goals, and stories that follow your curiosity.",
            ][step]
          }
        </Txt>
        <Button
          title={step === 2 ? "Create your reading life" : "Continue"}
          icon="arrow-forward"
          onPress={() =>
            step < 2
              ? setStep(step + 1)
              : navigation.navigate(clerkKey ? "ClerkLogin" : "SignUp")
          }
        />
        <Tap
          onPress={() => navigation.navigate("SignIn")}
          style={{ alignItems: "center", padding: 18 }}
        >
          <Txt color={t.muted}>
            Already a reader?{" "}
            <Txt bold color="#7055E8">
              Sign in
            </Txt>
          </Txt>
        </Tap>
        <Tap
          onPress={() => navigation.replace("Main")}
          style={{ alignItems: "center", padding: 8 }}
        >
          <Txt size={12} color={t.muted}>
            Take a look around
          </Txt>
        </Tap>
      </View>
    </Page>
  );
}
export function Auth({ navigation, route }: any) {
  const signup = route.name === "SignUp";
  const store = useStore(),
    action = useAction();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [name, setName] = useState("");
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Page>
        <Header navigation={navigation} />
        <Title>{signup ? "Create your account" : "Welcome back"}</Title>
        <Txt style={{ marginBottom: 30 }}>
          Your books, progress, and conversations in one place.
        </Txt>
        {clerkKey && (
          <>
            <Button
              title="Continue with Clerk"
              icon="lock"
              secondary
              onPress={() => navigation.navigate("ClerkLogin")}
            />
            <Txt
              color="#888"
              size={12}
              style={{ textAlign: "center", marginVertical: 22 }}
            >
              or continue with email
            </Txt>
          </>
        )}
        {signup && (
          <Field
            label="Name"
            value={name}
            onChangeText={setName}
            maxLength={80}
          />
        )}
        <Field
          label="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Field
          label="Password"
          placeholder="At least 10 characters"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Feedback {...action} />
        <Button
          title={
            action.busy ? "Please wait…" : signup ? "Sign Up Now" : "Sign In"
          }
          disabled={action.busy}
          onPress={() =>
            action.run(async () => {
              await store.login(signup, {
                email,
                password,
                ...(signup ? { name } : {}),
              });
              navigation.reset({
                index: 0,
                routes: [{ name: signup ? "Personalize" : "Main" }],
              });
            })
          }
        />
        <Button
          title={signup ? "Already have an account? Sign In" : "Create account"}
          secondary
          style={{ marginTop: 16 }}
          onPress={() => navigation.replace(signup ? "SignIn" : "SignUp")}
        />
        {!signup && (
          <Button
            title="Forgot password?"
            secondary
            style={{ marginTop: 16 }}
            onPress={() => navigation.navigate("Forgot")}
          />
        )}
      </Page>
    </KeyboardAvoidingView>
  );
}
export function Forgot({ navigation }: any) {
  const [email, setEmail] = useState(""),
    [message, setMessage] = useState("");
  const action = useAction();
  return (
    <Page>
      <Header navigation={navigation} title="Reset password" />
      <Txt style={{ marginBottom: 24 }}>
        Password reset requires the app owner to configure email delivery. No
        reset message will be sent until that service is connected.
      </Txt>
      <Field
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Feedback {...action} message={message} />
      <Button
        title="Request reset code"
        disabled={action.busy}
        onPress={() =>
          action.run(async () => {
            const r = await api("/auth/forgot", "POST", { email });
            setMessage(r.message);
          })
        }
      />
      <Button
        title="I have a reset code"
        secondary
        style={{ marginTop: 16 }}
        onPress={() => navigation.navigate("Verification")}
      />
    </Page>
  );
}
export function Verification({ navigation }: any) {
  const [token, setToken] = useState(""),
    [password, setPassword] = useState("");
  const action = useAction();
  return (
    <Page>
      <Header navigation={navigation} title="Set a new password" />
      <Field label="Reset code" value={token} onChangeText={setToken} />
      <Field
        label="New password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Feedback {...action} />
      <Button
        title="Reset password"
        disabled={action.busy}
        onPress={() =>
          action.run(async () => {
            await api("/auth/reset", "POST", { token: token.trim(), password });
            navigation.replace("SignIn");
          })
        }
      />
    </Page>
  );
}
