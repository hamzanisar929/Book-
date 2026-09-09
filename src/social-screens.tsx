import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { art } from "./assets";
import { friends, purple } from "./data";
import {
  Art,
  Avatar,
  Button,
  Field,
  FloatArt,
  Header,
  Icon,
  IconButton,
  Page,
  Row,
  Tap,
  Title,
  Txt,
  useTheme,
} from "./ui";
export function Friends({ navigation }: any) {
  const t = useTheme();
  return (
    <Page>
      <Header
        navigation={navigation}
        right={
          <>
            <IconButton
              name="create-outline"
              onPress={() => navigation.navigate("FriendSearch")}
            />
            <IconButton
              name="person-add-outline"
              onPress={() => navigation.navigate("Invite")}
            />
          </>
        }
      />
      <Tap
        onPress={() => navigation.navigate("FriendSearch")}
        style={{
          backgroundColor: t.card,
          borderRadius: 16,
          padding: 13,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Txt size={12} color={t.muted}>
          Enter the Title or Authors
        </Txt>
        <Icon name="search" size={19} />
      </Tap>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 40,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Tap
            key={i}
            label={"Open " + friends[i]}
            onPress={() => navigation.navigate("Chat")}
          >
            <Avatar
              source={i === 1 ? art.joshua : undefined}
              index={i}
              size={i === 1 ? 93 : 68}
              ring
            />
          </Tap>
        ))}
      </View>
      {[
        "This book… my favorite book of the year! Maybe even this decade! :)",
        "Many thanks!!!!",
        "On the other hand we denounce with righteous indignation and dislike",
        "In a free hour and the end.",
        "it will frequently occur that pleasures <3",
      ].map((s, i) => (
        <Tap
          key={s}
          onPress={() => navigation.navigate("Chat")}
          style={{
            flexDirection: "row",
            gap: 16,
            marginBottom: 22,
            alignItems: "flex-start",
          }}
        >
          <Avatar index={i} />
          <View
            style={{
              flex: 1,
              backgroundColor: i === 0 ? purple : t.card,
              padding: 16,
              borderRadius: 18,
              borderTopLeftRadius: 5,
            }}
          >
            <Txt size={12} color={i === 0 ? "white" : t.ink}>
              <Txt size={13} bold color={i === 0 ? "white" : t.heading}>
                {
                  [
                    "Gisele Yashar",
                    "VadimLi",
                    "OuluPulu",
                    "Oleksandr Lytvynenko",
                    "Natalia Lebedinskaia",
                  ][i]
                }{" "}
              </Txt>
              {s}
            </Txt>
          </View>
        </Tap>
      ))}
    </Page>
  );
}
export function Invite({ navigation, route }: any) {
  const t = useTheme();
  return (
    <Page>
      <Header
        navigation={navigation}
        right={
          <IconButton
            name="chatbubble-ellipses-outline"
            onPress={() => navigation.navigate("Friends")}
          />
        }
      />
      <View style={{ flex: 1, justifyContent: "center", marginVertical: 25 }}>
        <FloatArt name="orbit" size={310} />
      </View>
      <Txt bold style={{ textAlign: "center", marginVertical: 40 }}>
        {route.params?.empty
          ? "You don’t have friends\nTry searching through your social networks"
          : "Find your close friend Facebook or\nInstagram and start with them on Daily!!!"}
      </Txt>
      <Button
        title="Invite from Facebook"
        icon="logo-facebook"
        secondary
        onPress={() => navigation.navigate("Discover")}
      />
      <Button
        title="Invite from Instagram"
        icon="logo-instagram"
        style={{ marginTop: 16 }}
        onPress={() => navigation.navigate("Discover")}
      />
    </Page>
  );
}
export function Discover({ navigation }: any) {
  const [waved, setWaved] = useState<number[]>([]);
  return (
    <Page>
      <Header
        navigation={navigation}
        right={
          <IconButton
            name="chatbubble-ellipses-outline"
            onPress={() => navigation.navigate("Friends")}
          />
        }
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <Avatar index={2} size={60} />
        <Avatar source={art.profile} size={91} ring />
        <Avatar source={art.author} size={60} />
      </View>
      <Txt size={21} bold style={{ textAlign: "center", marginBottom: 24 }}>
        More Friends, More Funs!
      </Txt>
      {friends.map((name, i) => (
        <View
          key={name}
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Tap onPress={() => navigation.navigate("FriendProfile", { name })}>
            <Avatar index={i} />
          </Tap>
          <Txt bold style={{ flex: 1 }}>
            {name}
          </Txt>
          <Tap
            label={"Wave to " + name}
            onPress={() => setWaved([...waved, i])}
          >
            <Txt size={32}>{waved.includes(i) ? "💜" : "👋"}</Txt>
          </Tap>
        </View>
      ))}
      <View style={{ flex: 1 }} />
      <Button
        title="Discover People"
        icon="person-add-outline"
        onPress={() => navigation.navigate("FriendSearch")}
      />
    </Page>
  );
}
export function FriendSearch({ navigation }: any) {
  const [q, setQ] = useState("");
  return (
    <Page>
      <Header navigation={navigation} />
      <Field
        placeholder="Enter a name"
        value={q}
        onChangeText={setQ}
        icon="search-outline"
      />
      {[...friends, ...friends]
        .filter((s) => s.toLowerCase().includes(q.toLowerCase()))
        .map((s, i) => (
          <Tap
            key={i}
            onPress={() => navigation.navigate("FriendProfile", { name: s })}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 22,
              marginBottom: 24,
            }}
          >
            <Avatar index={i} />
            <Txt bold>{s}</Txt>
          </Tap>
        ))}
    </Page>
  );
}
export function Chat({ navigation }: any) {
  const t = useTheme();
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: t.bg }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={[t.bg, t.dark ? "#272060" : "#E5DFFF"]}
        style={{ paddingHorizontal: 24, paddingTop: 58, paddingBottom: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton name="chevron-back" onPress={() => navigation.goBack()} />
          <Txt bold>Joshua Lomax</Txt>
          <Avatar source={art.joshua} size={42} />
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {[
          "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
          "XD",
          "Many desktop publishing packages and web page editors",
          "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything hidden in the middle of text.",
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          "Contrary to popular belief, Lorem Ipsum is not simply random text",
          "Horror or comic?",
          ...sent,
        ].map((s, i) => {
          const own = [0, 2, 5].includes(i) || i > 6;
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                gap: 12,
                marginBottom: 22,
                marginLeft: own ? 58 : 0,
              }}
            >
              {!own && <Avatar source={art.joshua} size={42} />}
              <View
                style={{
                  flex: 1,
                  backgroundColor: own ? purple : t.card,
                  padding: 15,
                  borderRadius: 19,
                  borderTopRightRadius: own ? 5 : 19,
                }}
              >
                <Txt size={12} color={own ? "white" : t.ink}>
                  {s}
                </Txt>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          padding: 20,
          paddingBottom: 34,
          alignItems: "center",
        }}
      >
        <IconButton
          name="attach"
          onPress={() => navigation.navigate("Share")}
        />
        <TextInput
          accessibilityLabel="Message"
          placeholder="Aa"
          placeholderTextColor={t.muted}
          value={draft}
          onChangeText={setDraft}
          style={{
            flex: 1,
            color: t.ink,
            backgroundColor: t.card,
            borderRadius: 25,
            padding: 15,
            fontFamily: "Poppins_400Regular",
          }}
        />
        <IconButton
          name="paper-plane-outline"
          onPress={() => {
            if (draft.trim()) {
              setSent([...sent, draft]);
              setDraft("");
            }
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
