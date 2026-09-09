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
  useEffect(() => {
    const id = setTimeout(() => navigation.replace("Onboarding"), 1600);
    return () => clearTimeout(id);
  }, []);
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
  const { height, width } = useWindowDimensions();
  return (
    <Page>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginTop: 16,
          marginBottom: 24,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Tap
            key={i}
            label={"Onboarding " + (i + 1)}
            onPress={() => setStep(i)}
            style={{
              width: Math.min((width - 72) / 3, 245),
              height: 4,
              borderRadius: 4,
              backgroundColor: i <= step ? purple : t.line,
            }}
          />
        ))}
      </View>
      <Image
        source={
          art[`onboard${step + 1}${t.dark ? "-dark" : ""}` as keyof typeof art]
        }
        style={{
          width: "100%",
          height: Math.min(height * 0.47, 480),
          marginBottom: 32,
        }}
        resizeMode="contain"
      />
      <Title>
        {
          [
            "Track your daily\nprogress",
            "Challenge with\nFriends",
            "Join the Weekly\nChallenge",
          ][step]
        }
      </Title>
      <Txt
        size={15}
        color={t.muted}
        style={{ lineHeight: 25, marginBottom: 36 }}
      >
        {step === 0
          ? "Save your progress in one application, and track your reading journey."
          : "Let’s start the week with a challenge with your best friends"}
      </Txt>
      <View style={{ flex: 1 }} />
      <Button
        title="Get Started"
        onPress={() =>
          step < 2 ? setStep(step + 1) : navigation.replace("SignIn")
        }
      />
      <Tap
        onPress={() => navigation.replace("Main")}
        style={{ paddingTop: 18, alignItems: "center" }}
      >
        <Txt color={purple} size={12}>
          Explore the app
        </Txt>
      </Tap>
    </Page>
  );
}
export function Auth({ navigation, route }: any) {
  const signup = route.name === "SignUp";
  const t = useTheme();
  const [check, setCheck] = useState(false);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Page style={{ paddingTop: 80 }}>
        <Title>{signup ? "Sign up with Email" : "Sign in with Email"}</Title>
        <Txt color={t.muted} style={{ marginBottom: 38 }}>
          {signup
            ? "Create account and enjoy your reading!"
            : "Input your registered account!"}
        </Txt>
        <Field
          label="Email"
          placeholder="Type your email"
          keyboardType="email-address"
        />
        {signup && (
          <Field
            label="Phone number"
            placeholder="🇺🇸   Type your phone number"
            keyboardType="phone-pad"
          />
        )}
        <Field
          label="Password"
          placeholder="Type your password"
          secureTextEntry
        />
        {signup ? (
          <Tap
            onPress={() => setCheck(!check)}
            style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}
          >
            <Icon name={check ? "checkbox" : "square-outline"} size={22} />
            <Txt size={12} color={t.muted} style={{ flex: 1 }}>
              By Creating your account you have to agree with our{" "}
              <Txt size={12} bold color={purple}>
                Terms and Condition
              </Txt>
            </Txt>
          </Tap>
        ) : (
          <Tap
            onPress={() => navigation.navigate("Forgot")}
            style={{ alignItems: "center", marginBottom: 26 }}
          >
            <Txt color={purple}>Forgot password?</Txt>
          </Tap>
        )}
        <Button
          title={signup ? "Sign Up Now" : "Sign In"}
          onPress={() =>
            signup
              ? navigation.navigate("Verification")
              : navigation.replace("Main")
          }
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 18,
            marginVertical: 28,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: t.line }} />
          <Txt color={t.muted}>Or</Txt>
          <View style={{ flex: 1, height: 1, backgroundColor: t.line }} />
        </View>
        <Button
          title="Sign in with Apple"
          icon="logo-apple"
          secondary
          onPress={() => navigation.replace("Main")}
        />
        <Button
          title="Sign in with Google"
          icon="logo-google"
          secondary
          style={{ marginTop: 14 }}
          onPress={() => navigation.replace("Main")}
        />
        <Tap
          onPress={() => navigation.replace(signup ? "SignIn" : "SignUp")}
          style={{ alignItems: "center", paddingVertical: 28 }}
        >
          <Txt size={13} color={t.muted}>
            {signup ? "Have an account?" : "Don’t have an account?"}{" "}
            <Txt color={purple} bold size={13}>
              {signup ? "Sign in here" : "Sign up here"}
            </Txt>
          </Txt>
        </Tap>
      </Page>
    </KeyboardAvoidingView>
  );
}
export function Forgot({ navigation }: any) {
  const [choice, setChoice] = useState(0);
  const t = useTheme();
  return (
    <Page>
      <Header navigation={navigation} />
      <Title>Forgot password</Title>
      <Txt color={t.muted} style={{ marginBottom: 30 }}>
        Please select option to send link reset password
      </Txt>
      {["email", "whatsapp"].map((s, i) => (
        <Tap
          key={s}
          onPress={() => setChoice(i)}
          style={{
            borderWidth: 1,
            borderColor: choice === i ? purple : t.line,
            borderRadius: 20,
            padding: 18,
            marginBottom: 22,
            flexDirection: "row",
            gap: 14,
          }}
        >
          <Icon name={i ? "logo-whatsapp" : "mail-open"} />
          <View style={{ flex: 1 }}>
            <Txt bold color={choice === i ? purple : t.ink}>
              Send to your {s}
            </Txt>
            <Txt size={12} color={t.muted} style={{ marginTop: 8 }}>
              Link reset will be sent to your {s} account registered
            </Txt>
          </View>
        </Tap>
      ))}
      <Button
        title="Send Link"
        onPress={() =>
          navigation.navigate("Popup", {
            kind: "check",
            title: "Reset link sent",
            subtitle: "Check your selected account.",
            next: "SignIn",
          })
        }
      />
      <Tap
        onPress={() =>
          navigation.navigate("Popup", { kind: "check", title: "Link resent" })
        }
        style={{ alignItems: "center", padding: 26 }}
      >
        <Txt color={t.muted}>
          Didn’t receive link? <Txt color={purple}>Resend Link</Txt>
        </Txt>
      </Tap>
    </Page>
  );
}
export function Verification({ navigation }: any) {
  return (
    <Page>
      <Header navigation={navigation} />
      <Title>Verification</Title>
      <Txt>
        We have sent code to your whatsapp number <Txt bold>+6287784662331</Txt>
      </Txt>
      <View style={{ flexDirection: "row", gap: 12, marginTop: 36 }}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={{ flex: 1 }}>
            <Field
              label={"Digit " + (i + 1)}
              placeholder=""
              keyboardType="number-pad"
              maxLength={1}
            />
          </View>
        ))}
      </View>
      <Tap
        onPress={() =>
          navigation.navigate("Popup", { kind: "check", title: "Code resent" })
        }
      >
        <Txt>
          Didn’t receive code? <Txt color={purple}>Resend</Txt>
        </Txt>
      </Tap>
      <Button
        title="Verify"
        style={{ marginTop: 32 }}
        onPress={() => navigation.replace("Main")}
      />
    </Page>
  );
}
