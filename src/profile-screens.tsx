import React, { useState } from "react";
import { Switch, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { art } from "./assets";
import { books, purple } from "./data";
import {
  Avatar,
  ModalBackdrop,
  BookRow,
  Button,
  Card,
  Field,
  FloatArt,
  Goals,
  Header,
  Icon,
  IconButton,
  Page,
  Row,
  Section,
  Tap,
  Title,
  Txt,
  useTheme,
} from "./ui";
export function Profile({ navigation, route }: any) {
  const t = useTheme();
  const friend = route.name === "FriendProfile";
  const [premium, setPremium] = useState(true);
  return (
    <Page purpleBg>
      <Header
        navigation={navigation}
        light={!t.dark}
        right={
          <>
            <IconButton
              light={!t.dark}
              name={
                friend ? "chatbubble-ellipses-outline" : "notifications-outline"
              }
              onPress={() =>
                navigation.navigate(friend ? "Chat" : "Notifications")
              }
            />
            <IconButton
              light={!t.dark}
              name={friend ? "settings-outline" : "grid"}
              onPress={() =>
                navigation.navigate(friend ? "FriendActions" : "ProfileMenu")
              }
            />
          </>
        }
      />
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Avatar size={84} source={friend ? art.friend : art.profile} ring />
        <View style={{ flex: 1 }}>
          <Txt size={20} color={t.dark ? purple : "white"} bold>
            {friend
              ? route.params?.name || "Patricia Miller"
              : "JollyDesigner78"}
          </Txt>
          <View style={{ flexDirection: "row", gap: 23, marginTop: 7 }}>
            <View>
              <Txt bold color={t.dark ? t.ink : "white"} size={23}>
                23
              </Txt>
              <Txt size={11} color={t.dark ? t.muted : "#FFFFFF99"}>
                Total Read
              </Txt>
            </View>
            <View>
              <Txt bold color={t.dark ? t.ink : "white"} size={23}>
                1873{" "}
                <Txt size={10} color="white">
                  hr
                </Txt>
              </Txt>
              <Txt size={11} color={t.dark ? t.muted : "#FFFFFF99"}>
                Total Reading
              </Txt>
            </View>
          </View>
        </View>
      </View>
      {!friend && !premium && (
        <Tap onPress={() => navigation.navigate("Membership")}>
          <LinearGradient
            colors={["#FFBF34", "#FF403E", "#A747A4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 16, borderRadius: 23 }}
          >
            <Txt color="white" bold>
              ♛ Go Membership today
            </Txt>
            <Txt color="white" size={11}>
              More than 10 million books are waiting for you
            </Txt>
          </LinearGradient>
        </Tap>
      )}
      {friend ? (
        <Section title="Reading" light={!t.dark}>
          <Card>
            <BookRow
              book={books[5]}
              onPress={() => navigation.navigate("Book", { bookId: "gold" })}
            />
          </Card>
        </Section>
      ) : (
        <Section title="Reading Goals" light={!t.dark}>
          <Goals onPress={() => navigation.navigate("Goals")} />
        </Section>
      )}
      <Section
        title="Collections"
        light={!t.dark}
        right={
          <Tap onPress={() => navigation.navigate("Collections")}>
            <Icon name="arrow-forward" color="white" />
          </Tap>
        }
      >
        <Card>
          {books.slice(friend ? 6 : 4, friend ? 8 : 6).map((b) => (
            <BookRow
              key={b.id}
              book={b}
              onPress={() => navigation.navigate("Book", { bookId: b.id })}
            />
          ))}
          <Button
            title="View Collections"
            secondary
            onPress={() => navigation.navigate("Collections")}
          />
        </Card>
      </Section>
      {!friend && (
        <>
          <Button
            title="Friends"
            icon="people-outline"
            secondary
            style={{ marginTop: 22 }}
            onPress={() => navigation.navigate("Friends")}
          />
          <Tap
            onPress={() => setPremium(!premium)}
            style={{ alignItems: "center", padding: 20 }}
          >
            <Txt size={11} color={t.dark ? purple : "white"}>
              {premium
                ? "Preview without membership"
                : "Preview premium membership"}
            </Txt>
          </Tap>
        </>
      )}
    </Page>
  );
}
export function Author({ navigation, route }: any) {
  const t = useTheme();
  return (
    <Page purpleBg>
      <Header navigation={navigation} light={!t.dark} />
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <Avatar source={art.author} size={86} ring />
        <View style={{ flex: 1 }}>
          <Txt bold color={t.dark ? purple : "white"} size={21}>
            {route.params?.name || "Patricia Miller"}
          </Txt>
          <Txt color="white" size={11}>
            Horror Romantic
          </Txt>
        </View>
      </View>
      <Section title="About" light={!t.dark}>
        <Txt
          size={13}
          color={t.dark ? t.ink : "white"}
          style={{ lineHeight: 22 }}
        >
          <Txt bold color={t.dark ? t.ink : "white"}>
            Date of birth:{" "}
          </Txt>
          January 1st 1980{"\n"}Nationality: Czech Republic{"\n"}Patricia Miller
          graduated with a master’s degree in Science and Technology from
          Tsinghua University, is a writer specializing in the writing of
          detective novels, loved by the people for building the character
          police in the series. She has now published more than 10 novels, and
          many works have been made into films.
        </Txt>
      </Section>
      <Section title="Book" light={!t.dark}>
        <Card>
          {books.slice(6, 9).map((b) => (
            <BookRow
              key={b.id}
              book={b}
              onPress={() => navigation.navigate("Book", { bookId: b.id })}
            />
          ))}
        </Card>
      </Section>
    </Page>
  );
}
export function Membership({ navigation }: any) {
  const t = useTheme();
  return (
    <Page purpleBg>
      <Header navigation={navigation} light={!t.dark} title="Membership" />
      <LinearGradient
        colors={t.dark ? ["#353535", "#242424"] : ["#8B7EFF", "#6751FF"]}
        style={{
          borderWidth: 1,
          borderColor: "#FFFFFF88",
          borderRadius: 24,
          padding: 23,
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Avatar source={art.profile} size={52} />
          <View>
            <Txt size={58} color={t.dark ? purple : "white"} bold>
              4
            </Txt>
            <Txt color="white">Tags book</Txt>
          </View>
        </View>
        <Txt color="white" bold>
          JollyDesigner78 ♛
        </Txt>
        <Txt color="white" size={10}>
          YEAR PREMIUM
        </Txt>
      </LinearGradient>
      <Section title="Go Premium" light={!t.dark}>
        <View style={{ flexDirection: "row", gap: 18 }}>
          {[0, 1].map((i) => (
            <View key={i} style={{ flex: 1 }}>
              <LinearGradient
                colors={
                  t.dark
                    ? ["#353535", "#705330", "#292929"]
                    : ["#8A7DFF", "#BFA6C1", "#6C56FF"]
                }
                style={{
                  borderWidth: 1,
                  borderColor: "#FFFFFF80",
                  borderRadius: 24,
                  padding: 17,
                  alignItems: "center",
                }}
              >
                <Txt color={t.dark ? purple : "white"} bold size={13}>
                  {i ? "Year" : "Month"} Premium
                </Txt>
                <Txt color="white" bold size={57}>
                  {i ? "99" : "9"}
                </Txt>
                <Txt color="white" size={11}>
                  US$ / {i ? "Year" : "Month"}
                </Txt>
                <Txt color="white" size={11} style={{ marginTop: 20 }}>
                  Save {i ? "25" : "10"}%
                </Txt>
              </LinearGradient>
              <Button
                title="Go Premium"
                secondary
                style={{ marginTop: 12, paddingHorizontal: 8 }}
                onPress={() => navigation.navigate("Purchase")}
              />
            </View>
          ))}
        </View>
      </Section>
      <Section title="You Need Know" light={!t.dark}>
        {[
          "You got 1 tag each month to select and buy a book, any value.",
          "Get all audio books purchased forever and listen again whenever you want, even if you cancel your membership.",
          "You can cancel your membership at any time.",
        ].map((s) => (
          <View
            key={s}
            style={{ flexDirection: "row", gap: 12, marginBottom: 15 }}
          >
            <Icon name="ribbon" color={t.dark ? purple : "white"} />
            <Txt
              size={12}
              color={t.dark ? t.muted : "#FFFFFFBB"}
              style={{ flex: 1 }}
            >
              {s}
            </Txt>
          </View>
        ))}
      </Section>
    </Page>
  );
}
export function ProfileMenu({ navigation }: any) {
  return (
    <ModalBackdrop
      style={{
        flex: 1,
        backgroundColor: "#00000077",
        justifyContent: "flex-end",
      }}
    >
      <Card
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          paddingBottom: 42,
        }}
      >
        <View
          style={{
            height: 4,
            width: 40,
            backgroundColor: "#CCC",
            borderRadius: 4,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
        {[
          ["Settings", "settings-outline", "Settings"],
          ["Edit Profile", "person", "EditProfile"],
          ["Insights", "bar-chart", "Goals"],
          ["Gift Code", "gift", "Gift"],
          ["Help Center", "help-buoy", "Help"],
          ["Screen Preview Gallery", "albums-outline", "Gallery"],
        ].map(([title, icon, dest]) => (
          <Row
            key={title}
            title={title}
            icon={icon}
            onPress={() => navigation.replace(dest)}
          />
        ))}
        <Button
          title="Close"
          secondary
          style={{ marginTop: 18 }}
          onPress={() => navigation.goBack()}
        />
      </Card>
    </ModalBackdrop>
  );
}
export function FriendActions({ navigation }: any) {
  return (
    <ModalBackdrop
      style={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#00000077",
      }}
    >
      <Card style={{ paddingBottom: 40 }}>
        {["Delete", "Ignore", "Mute", "Block"].map((s, i) => (
          <Row
            key={s}
            title={s}
            icon={["trash", "sync", "notifications-off-outline", "ban"][i]}
            onPress={() => navigation.goBack()}
          />
        ))}
        <Button
          title="Cancel"
          secondary
          style={{ marginTop: 15 }}
          onPress={() => navigation.goBack()}
        />
      </Card>
    </ModalBackdrop>
  );
}
export function Settings({ navigation }: any) {
  const t = useTheme();
  const [notify, setNotify] = useState(false);
  return (
    <Page>
      <Header navigation={navigation} title="Setting" />
      <Section title="Options">
        <Row
          title="Notifications"
          icon="notifications"
          trailing={
            <Switch
              value={notify}
              onValueChange={setNotify}
              trackColor={{ true: purple }}
            />
          }
        />
        <Row
          title="Appearance"
          icon="copy-outline"
          onPress={() => t.setDark(!t.dark)}
          trailing={
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Txt size={12}>{t.dark ? "Dark" : "Light"}</Txt>
              <Switch
                accessibilityLabel="Dark appearance"
                value={t.dark}
                onValueChange={t.setDark}
                trackColor={{ true: purple }}
              />
            </View>
          }
        />
      </Section>
      <Section title="Book">
        {[
          ["Text Size", "text"],
          ["Page Background", "ellipse-outline"],
          ["Text Font", "text-outline"],
        ].map(([s, i]) => (
          <Row
            key={s}
            title={s}
            icon={i}
            onPress={() => navigation.navigate("Reader")}
          />
        ))}
      </Section>
      <Section title="About">
        {[
          ["Terms of Use", "alert-circle", "Terms"],
          ["Privacy Policy", "shield-checkmark", "Privacy"],
          ["Purchased", "bag-check", "Collection"],
          ["Screen Preview Gallery", "albums-outline", "Gallery"],
        ].map(([s, i, d]) => (
          <Row
            key={s}
            title={s}
            icon={i}
            onPress={() => navigation.navigate(d, { name: "Purchased book" })}
          />
        ))}
      </Section>
      <Button
        title="Back to Onboarding"
        secondary
        style={{ marginTop: 30 }}
        onPress={() => navigation.navigate("Onboarding")}
      />
    </Page>
  );
}
export function EditProfile({ navigation }: any) {
  return (
    <Page>
      <Header navigation={navigation} title="Edit Profile" />
      <View style={{ alignItems: "center", marginVertical: 24 }}>
        <Avatar source={art.profile} size={118} />
      </View>
      <Field icon="person-outline" placeholder="Baodesigner" />
      <Field icon="calendar-outline" placeholder="18 / 08 / 1996" />
      <Field
        icon="location-outline"
        placeholder="78 Út Tịch, Phường 4, Tân Bình…"
      />
      <Field
        icon="call-outline"
        placeholder="+84355869631"
        keyboardType="phone-pad"
      />
      <View style={{ flex: 1, minHeight: 35 }} />
      <Button title="Save" onPress={() => navigation.goBack()} />
    </Page>
  );
}
export function GoalsScreen({ navigation }: any) {
  return (
    <Page>
      <Header
        navigation={navigation}
        right={
          <IconButton
            name="settings-outline"
            onPress={() => navigation.navigate("GoalPicker")}
          />
        }
      />
      <View
        style={{
          alignSelf: "center",
          width: 250,
          height: 250,
          borderRadius: 125,
          backgroundColor: "#FF653F",
          borderWidth: 15,
          borderColor: "#FF865A",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
          shadowColor: "#FF5D30",
          shadowOpacity: 0.3,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 15 },
        }}
      >
        <Txt size={48} color="white" bold>
          10:03
        </Txt>
        <Txt size={11} color="white">
          of your 40-minute goal
        </Txt>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 15,
        }}
      >
        {["S", "M", "T", "W", "T", "F", "S"].map((s, i) => (
          <Txt key={i} bold color={purple} size={12}>
            {s}
          </Txt>
        ))}
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {Array.from({ length: 35 }, (_, i) => (
          <View
            key={i}
            style={{ width: "14.285%", alignItems: "center", marginBottom: 15 }}
          >
            <View
              style={{
                width: 33,
                height: 33,
                borderRadius: 17,
                backgroundColor: i >= 13 && i <= 28 ? purple : "transparent",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Txt
                color={i >= 13 && i <= 28 ? "white" : undefined}
                size={12}
                bold
              >
                {i < 2 ? 29 + i : i > 32 ? i - 32 : i - 1}
              </Txt>
            </View>
          </View>
        ))}
      </View>
      <Txt
        color={purple}
        size={31}
        bold
        style={{ textAlign: "center", marginVertical: 20 }}
      >
        🔥 16 days
      </Txt>
      <Txt style={{ textAlign: "center", marginBottom: 30 }} size={11}>
        Longest Reading Streak
      </Txt>
      <Button title="Share" onPress={() => navigation.navigate("Share")} />
    </Page>
  );
}
export function GoalPicker({ navigation }: any) {
  const [goal, setGoal] = useState(40);
  return (
    <ModalBackdrop
      style={{
        flex: 1,
        backgroundColor: "#00000088",
        justifyContent: "flex-end",
      }}
    >
      <Card style={{ paddingBottom: 40 }}>
        {[25, 30, 35, 40, 45, 50].map((n) => (
          <Tap
            key={n}
            onPress={() => setGoal(n)}
            style={{
              padding: 7,
              backgroundColor: n === goal ? "#6952FF22" : "transparent",
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Txt
              bold={n === goal}
              color={n === goal ? purple : undefined}
              size={n === goal ? 22 : 15}
            >
              {n}
              {n === goal ? "   Minute/Day" : ""}
            </Txt>
          </Tap>
        ))}
        <Button
          title="Done"
          style={{ marginTop: 20 }}
          onPress={() =>
            navigation.replace("Popup", {
              kind: "timer",
              title: goal + " minute goal selected!",
              subtitle: "Time to Read!",
            })
          }
        />
      </Card>
    </ModalBackdrop>
  );
}
export function Notifications({ navigation, route }: any) {
  const [empty, setEmpty] = useState(route.params?.empty || false);
  return (
    <Page>
      <Header
        navigation={navigation}
        title="Notifications"
        right={
          <>
            <IconButton name="eye-outline" onPress={() => setEmpty(!empty)} />
            <IconButton
              name="chatbubble-ellipses-outline"
              onPress={() => navigation.navigate("Friends")}
            />
          </>
        }
      />
      {empty ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <FloatArt name="bell" size={280} />
          <Txt bold style={{ textAlign: "center", marginTop: 45 }}>
            No Notifications Right Now!
          </Txt>
        </View>
      ) : (
        Array.from({ length: 7 }, (_, i) => (
          <Tap
            key={i}
            onPress={() =>
              navigation.navigate(i % 3 === 2 ? "Chat" : "Membership")
            }
            style={{
              flexDirection: "row",
              gap: 18,
              alignItems: "center",
              marginTop: 24,
            }}
          >
            {i % 3 === 2 ? (
              <Avatar source={art.joshua} />
            ) : (
              <View
                style={{
                  width: 47,
                  height: 47,
                  borderRadius: 15,
                  backgroundColor: i % 3 ? "#FF4C48" : "#FFBF36",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={i % 3 ? "pricetag" : "star"} color="white" />
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Txt size={12} bold>
                {i % 3 === 2
                  ? "Horror or comic?"
                  : i % 3
                    ? "Get over 20 Premium books on book store with 20% off voucher!!"
                    : "You have 12 Premium books left to read. Remember this!"}
              </Txt>
              <Txt size={10} style={{ marginTop: 8 }}>
                Wed, January, 2021
              </Txt>
            </View>
          </Tap>
        ))
      )}
    </Page>
  );
}
export function Info({ navigation, route }: any) {
  const name = route.name;
  return (
    <Page>
      <Header
        navigation={navigation}
        title={
          name === "Gift"
            ? "Gift Code"
            : name === "Help"
              ? "Help Center"
              : name === "Privacy"
                ? "Privacy Policy"
                : "Terms of Use"
        }
      />
      {name === "Gift" ? (
        <>
          <FloatArt name="bulb" size={240} />
          <Field label="Gift Code" placeholder="Enter your gift code" />
          <Button
            title="Redeem"
            onPress={() =>
              navigation.navigate("Popup", {
                kind: "check",
                title: "Gift code preview",
              })
            }
          />
        </>
      ) : name === "Help" ? (
        <>
          <Row
            title="How do I start reading?"
            icon="book-outline"
            onPress={() => navigation.navigate("Reader")}
          />
          <Row
            title="Manage my collections"
            icon="folder-outline"
            onPress={() => navigation.navigate("Collections")}
          />
          <Row
            title="Membership and purchases"
            icon="ribbon-outline"
            onPress={() => navigation.navigate("Membership")}
          />
        </>
      ) : (
        <>
          <Txt bold style={{ marginBottom: 20 }}>
            iBook UI Preview
          </Txt>
          <Txt>
            This is a design prototype with sample content. Account, payment,
            sharing, and reading controls show interface previews only. No
            account is created and no purchase is processed.
          </Txt>
        </>
      )}
    </Page>
  );
}
