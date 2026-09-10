import React, { useState } from "react";
import { View } from "react-native";
import { useStore } from "./store";
import { Feedback, RequireAccount, useAction } from "./functional-ui";
import {
  Button,
  Card,
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
export default function Personalize({ navigation }: any) {
  const store = useStore();
  const t = useTheme();
  const action = useAction();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(store.user?.name || "");
  const [interests, setInterests] = useState<string[]>(
    store.user?.preferences?.interests || ["Fantasy"],
  );
  const [goal, setGoal] = useState(store.user?.goal || 20);
  const [time, setTime] = useState(
    store.user?.preferences?.readingTime || "evening",
  );
  const [dark, setDark] = useState(store.user?.dark || false);
  const labels = [
    "A library that feels like you.",
    "Follow your curiosity.",
    "Make a little space.",
    "Your next chapter awaits.",
  ];
  return (
    <RequireAccount navigation={navigation}>
      <Page>
        <Header navigation={navigation} />
        <View style={{ flexDirection: "row", gap: 7, marginBottom: 30 }}>
          {labels.map((_, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 8,
                backgroundColor: i <= step ? "#7055E8" : t.line,
              }}
            />
          ))}
        </View>
        <Txt
          size={11}
          color="#7055E8"
          bold
          style={{ letterSpacing: 2, marginBottom: 12 }}
        >
          YOUR READING LIFE · {step + 1} / 4
        </Txt>
        <Title>{labels[step]}</Title>
        <Txt color={t.muted} style={{ lineHeight: 23, marginBottom: 28 }}>
          {
            [
              "First, what should we call you?",
              "Choose a few things you love. We’ll make room for more.",
              "Small moments become a beautiful habit.",
              "A few preferences, a world of possibilities.",
            ][step]
          }
        </Txt>
        {step === 0 ? (
          <>
            <FloatArt name="logo" size={220} />
            <Field
              label="Your name"
              value={name}
              onChangeText={setName}
              maxLength={80}
            />
          </>
        ) : step === 1 ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {[
              "Fantasy",
              "Self-Help",
              "Horror",
              "Romance",
              "History",
              "Arts",
              "Science",
              "Adventure",
            ].map((s, i) => (
              <Tap
                key={s}
                onPress={() =>
                  setInterests(
                    interests.includes(s)
                      ? interests.filter((x) => x !== s)
                      : [...interests, s],
                  )
                }
                style={{
                  backgroundColor: interests.includes(s) ? "#7055E8" : t.card,
                  borderRadius: 23,
                  padding: 20,
                  minWidth: 135,
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <Icon
                  name={
                    [
                      "moon",
                      "leaf",
                      "eye",
                      "heart",
                      "book",
                      "sparkles",
                      "globe",
                      "compass",
                    ][i]
                  }
                  color={interests.includes(s) ? "white" : "#7055E8"}
                />
                <Txt bold color={interests.includes(s) ? "white" : t.ink}>
                  {s}
                </Txt>
              </Tap>
            ))}
          </View>
        ) : step === 2 ? (
          <>
            <FloatArt name="timer" size={180} />
            <View style={{ flexDirection: "row", gap: 12, marginVertical: 24 }}>
              {[10, 20, 30].map((n) => (
                <View key={n} style={{ flex: 1 }}>
                  <Button
                    title={n + " min"}
                    secondary={goal !== n}
                    onPress={() => setGoal(n)}
                  />
                </View>
              ))}
            </View>
            <Txt bold style={{ marginBottom: 16 }}>
              Your favorite time to read
            </Txt>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {["morning", "afternoon", "evening"].map((s) => (
                <Button
                  key={s}
                  title={s[0].toUpperCase() + s.slice(1)}
                  secondary={time !== s}
                  onPress={() => setTime(s)}
                />
              ))}
            </View>
          </>
        ) : (
          <>
            <FloatArt name="check" size={170} />
            <Card>
              <Txt bold size={22}>
                {name.trim() || "Reader"}’s reading life
              </Txt>
              <Txt
                color={t.muted}
                style={{ marginVertical: 15, lineHeight: 24 }}
              >
                {interests.join(" · ") || "Open to discovery"}
                {"\n"}
                {goal} minutes, every {time}
                {"\n"}Page-inspired reels, always one tap away
              </Txt>
            </Card>
            <View style={{ flexDirection: "row", gap: 12, marginTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Button
                  title="Light"
                  icon="sunny"
                  secondary={dark}
                  onPress={() => setDark(false)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="Dark"
                  icon="moon"
                  secondary={!dark}
                  onPress={() => setDark(true)}
                />
              </View>
            </View>
          </>
        )}
        <View style={{ flex: 1, minHeight: 35 }} />
        <Feedback {...action} />
        <Button
          title={
            action.busy
              ? "Saving…"
              : step < 3
                ? "Continue"
                : "Start my reading journey"
          }
          disabled={action.busy || (step === 0 && !name.trim())}
          onPress={() =>
            step < 3
              ? setStep(step + 1)
              : action.run(async () => {
                  await store.mutate("/me", "PATCH", {
                    name: name.trim(),
                    goal,
                    dark,
                    preferences: {
                      interests,
                      readingTime: time,
                      reelsEnabled: true,
                    },
                    onboarding_completed: true,
                  });
                  navigation.reset({ index: 0, routes: [{ name: "Main" }] });
                })
          }
        />
        {step > 0 && (
          <Tap
            onPress={() => setStep(step - 1)}
            style={{ padding: 18, alignItems: "center" }}
          >
            <Txt color={t.muted}>Back</Txt>
          </Tap>
        )}
      </Page>
    </RequireAccount>
  );
}
