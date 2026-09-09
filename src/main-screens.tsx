import React, { useState } from "react";
import {
  Image,
  ScrollView,
  View,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { art } from "./assets";
import { books, categories, purple } from "./data";
import {
  Art,
  Avatar,
  BookRow,
  Button,
  Card,
  Field,
  Goals,
  Header,
  Icon,
  IconButton,
  Page,
  Section,
  Tags,
  Tap,
  Title,
  Txt,
  useTheme,
} from "./ui";
export function CategoryTiles({ navigation, grid = false }: any) {
  const t = useTheme();
  const { width } = useWindowDimensions();
  const content = categories.map((name, i) => (
    <Tap
      key={name}
      label={name}
      onPress={() => navigation.navigate("Category", { category: name })}
      style={{
        width: grid ? Math.min((width - 84) / 4, 150) : 73,
        alignItems: "center",
        marginBottom: grid ? 22 : 0,
      }}
    >
      <Image
        source={art[`category-${i}` as keyof typeof art]}
        style={{
          width: grid ? Math.min((width - 84) / 4, 150) : 66,
          height: grid ? Math.min((width - 84) / 4, 150) : 66,
          borderRadius: 20,
        }}
      />
      <Txt size={grid ? 11 : 10} style={{ marginTop: 8 }}>
        {name}
      </Txt>
    </Tap>
  ));
  return grid ? (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      {content}
    </View>
  ) : (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
    >
      {content}
    </ScrollView>
  );
}
function Greeting({ navigation }: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 27,
      }}
    >
      <Tap
        onPress={() => navigation.navigate("Profile")}
        label="Open profile"
        style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
      >
        <Avatar source={art.profile} size={44} />
        <View>
          <Txt color="white" size={19} bold>
            Hi.
          </Txt>
          <Txt color="white" bold size={13}>
            JollyDesigner78
          </Txt>
        </View>
      </Tap>
      <Tap
        onPress={() => navigation.navigate("Membership")}
        style={{
          backgroundColor: "white",
          paddingHorizontal: 12,
          paddingVertical: 5,
          borderRadius: 20,
        }}
      >
        <Txt size={11} color={purple}>
          ♔ 12 Ebook
        </Txt>
      </Tap>
    </View>
  );
}
export function Home({ navigation }: any) {
  const t = useTheme();
  const open = (b: any) => navigation.navigate("Book", { bookId: b.id });
  return (
    <Page purpleBg bottom={115}>
      <Greeting navigation={navigation} />
      <View
        style={{
          backgroundColor: t.bg,
          marginHorizontal: -24,
          borderTopLeftRadius: 40,
          borderBottomRightRadius: 40,
          padding: 24,
        }}
      >
        <Txt bold size={14} color={t.heading}>
          Keep Reading
        </Txt>
        <Tap
          onPress={() => navigation.navigate("Reading")}
          style={{ marginTop: 14 }}
        >
          <LinearGradient
            colors={["#FFC062", "#DF5B32", "#A92324"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 24,
              padding: 18,
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
            }}
          >
            <Image
              source={art.dune}
              style={{
                width: 73,
                height: 105,
                borderRadius: 8,
                transform: [{ rotate: "-5deg" }],
              }}
            />
            <View>
              <Txt bold color="white" size={19}>
                Dune
              </Txt>
              <Txt color="#FFFFFFCC" size={12}>
                By Frank Herbert
              </Txt>
              <View
                style={{
                  borderWidth: 3,
                  borderColor: "#FFFFFFAA",
                  borderRadius: 23,
                  width: 46,
                  height: 46,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Txt color="white" size={11}>
                  62%
                </Txt>
              </View>
            </View>
          </LinearGradient>
        </Tap>
      </View>
      <Section
        title="Category"
        light={!t.dark}
        right={
          <Tap onPress={() => navigation.navigate("Search")}>
            <Txt size={10} color="white">
              VIEW ALL
            </Txt>
          </Tap>
        }
      >
        <CategoryTiles navigation={navigation} />
      </Section>
      <View
        style={{
          backgroundColor: t.bg,
          marginHorizontal: -24,
          marginTop: 22,
          padding: 24,
          borderTopLeftRadius: 36,
          borderBottomRightRadius: 36,
        }}
      >
        <Txt bold color={t.heading} style={{ marginBottom: 18 }}>
          Trending Book
        </Txt>
        {[books[6], books[4], books[7], books[2]].map((b) => (
          <BookRow
            key={b.id}
            book={b}
            onPress={() => open(b)}
            onMore={() => navigation.navigate("BookActions", { bookId: b.id })}
          />
        ))}
      </View>
      <Section title="Popular Authors" light={!t.dark}>
        {[
          "Marie Berry",
          "Rounak Purohit",
          "Malala Cerno",
          "Neil Alvin",
          "Yaa Bornetta",
        ].map((name, i) => (
          <Tap
            key={name}
            onPress={() => navigation.navigate("Author", { name })}
            style={{
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <Avatar index={i} />
            <View>
              <Txt color={t.dark ? t.ink : "white"} bold>
                {name}
              </Txt>
              <Tags />
            </View>
          </Tap>
        ))}
      </Section>
      <View
        style={{
          backgroundColor: t.bg,
          marginHorizontal: -24,
          padding: 24,
          borderTopLeftRadius: 36,
          borderBottomRightRadius: 36,
        }}
      >
        <Txt bold color={t.heading} style={{ marginBottom: 18 }}>
          You may love
        </Txt>
        {books.slice(2, 6).map((b) => (
          <BookRow
            key={b.id}
            book={b}
            onPress={() => open(b)}
            onMore={() => navigation.navigate("BookActions", { bookId: b.id })}
          />
        ))}
      </View>
      <Section title="Reading Goals" light={!t.dark}>
        <Goals onPress={() => navigation.navigate("Goals")} />
        <Button
          title="Keep Reading"
          secondary
          style={{ marginTop: 15 }}
          onPress={() => navigation.navigate("Reader")}
        />
      </Section>
      <View
        style={{
          backgroundColor: t.bg,
          marginHorizontal: -24,
          marginTop: 24,
          padding: 24,
          borderTopLeftRadius: 36,
        }}
      >
        <Txt bold color={t.heading} style={{ marginBottom: 18 }}>
          More book for you
        </Txt>
        {books.slice(8, 12).map((b) => (
          <BookRow
            key={b.id}
            book={b}
            onPress={() => open(b)}
            onMore={() => navigation.navigate("BookActions", { bookId: b.id })}
          />
        ))}
      </View>
    </Page>
  );
}
export function Store({ navigation }: any) {
  const t = useTheme();
  return (
    <Page purpleBg bottom={110}>
      <Greeting navigation={navigation} />
      <View
        style={{
          backgroundColor: t.bg,
          marginHorizontal: -24,
          padding: 24,
          borderTopLeftRadius: 42,
          flex: 1,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 18 }}
        >
          {[0, 1].map((i) => (
            <Tap
              key={i}
              onPress={() =>
                navigation.navigate("Category", { category: "Special offers" })
              }
            >
              <LinearGradient
                colors={["#66D8FA", "#8D9AFF", "#FFDA77"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 305,
                  height: 158,
                  borderRadius: 28,
                  padding: 18,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={art.love}
                  style={{
                    height: 124,
                    width: 75,
                    transform: [{ rotate: "-7deg" }],
                    borderRadius: 6,
                  }}
                />
                <Image
                  source={art.olive}
                  style={{
                    height: 108,
                    width: 66,
                    transform: [{ rotate: "-7deg" }],
                    marginLeft: -9,
                    marginTop: 26,
                    borderRadius: 5,
                  }}
                />
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Txt color="white" size={35} bold style={{ lineHeight: 38 }}>
                    20%{"\n"}OFF
                  </Txt>
                  <Txt color="white" bold size={10} style={{ marginTop: 18 }}>
                    VIEW MORE
                  </Txt>
                </View>
              </LinearGradient>
            </Tap>
          ))}
        </ScrollView>
        <Section title="Discover something new">
          <CategoryTiles navigation={navigation} />
        </Section>
        <View style={{ marginTop: 32 }}>
          {[...books.slice(9, 12), ...books.slice(2, 6)].map((b) => (
            <BookRow
              key={b.id}
              book={b}
              onPress={() =>
                navigation.navigate("Book", { bookId: b.id, purchase: true })
              }
              onMore={() =>
                navigation.navigate("BookActions", { bookId: b.id })
              }
            />
          ))}
        </View>
      </View>
    </Page>
  );
}
export function Library({ navigation }: any) {
  const t = useTheme();
  const { width } = useWindowDimensions();
  const cols = width > 700 ? 4 : width > 500 ? 3 : 2;
  const cellWidth = (Math.min(width, 860) - 48 - (cols - 1) * 16) / cols;
  return (
    <Page purpleBg bottom={120}>
      <View style={{ alignItems: "flex-end" }}>
        <IconButton
          name="settings-outline"
          light={!t.dark}
          onPress={() => navigation.navigate("Settings")}
        />
      </View>
      <Title light={!t.dark}>Library</Title>
      <Txt size={12} color={t.dark ? t.muted : "#FFFFFFB0"}>
        Synthesize favorite books your way. Everyone can see and share this
        collection.
      </Txt>
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
          <BookRow
            book={books[2]}
            onPress={() =>
              navigation.navigate("Collection", { name: "Self help book" })
            }
          />
          <BookRow
            book={books[3]}
            onPress={() =>
              navigation.navigate("Collection", { name: "Self help book" })
            }
          />
          <Button
            title="View Collections"
            secondary
            onPress={() => navigation.navigate("Collections")}
          />
        </Card>
      </Section>
      <Section title="All Book" light={!t.dark}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
          {[...books.slice(0, 8), ...books.slice(9, 12)].map((b, i) => (
            <View
              key={b.id}
              style={{ width: cellWidth }}
            >
              <Tap
                onPress={() => navigation.navigate("Book", { bookId: b.id })}
                style={{
                  padding: 10,
                  backgroundColor: t.dark ? t.card : "white",
                  borderRadius: 20,
                }}
              >
                <Image
                  source={b.image}
                  style={{ width: cellWidth - 20, height: (cellWidth - 20) / 0.68, borderRadius: 12 }}
                />
                <Txt bold size={11} style={{ marginTop: 9 }} numberOfLines={2}>
                  {b.title}
                </Txt>
                <Txt size={9} color={t.muted} numberOfLines={1}>
                  By {b.author}
                </Txt>
                <View
                  style={{
                    marginTop: 9,
                    height: 4,
                    borderRadius: 4,
                    backgroundColor: t.line,
                  }}
                >
                  <View
                    style={{
                      width: `${30 + i * 5}%`,
                      height: 4,
                      backgroundColor: purple,
                      borderRadius: 4,
                    }}
                  />
                </View>
                <Txt
                  size={9}
                  color={purple}
                  style={{ textAlign: "right", marginTop: 4 }}
                >
                  {30 + i * 5}%
                </Txt>
              </Tap>
            </View>
          ))}
        </View>
      </Section>
    </Page>
  );
}
export function Search({ navigation }: any) {
  const t = useTheme();
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  return (
    <Page bottom={120}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        {focus && (
          <IconButton
            name="chevron-back"
            onPress={() => {
              setFocus(false);
              setQ("");
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            backgroundColor: t.card,
            borderRadius: 18,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <TextInput
            accessibilityLabel="Search books or authors"
            placeholder="Enter the Title or Authors"
            placeholderTextColor={t.muted}
            value={q}
            onChangeText={setQ}
            onFocus={() => setFocus(true)}
            style={{
              flex: 1,
              height: 48,
              color: t.ink,
              fontFamily: "Poppins_400Regular",
              fontSize: 12,
            }}
          />
          <Icon name="search-outline" />
        </View>
      </View>
      {focus ? (
        <>
          <Section title="Trending">
            {q
              ? (books.filter((b) =>
                  (b.title + " " + b.author)
                    .toLowerCase()
                    .includes(q.toLowerCase()),
                ).length
                  ? books.filter((b) =>
                      (b.title + " " + b.author)
                        .toLowerCase()
                        .includes(q.toLowerCase()),
                    )
                  : [books[11], books[1], books[0]]
                ).map((b) => (
                  <BookRow
                    key={b.id}
                    book={b}
                    onPress={() =>
                      navigation.navigate("Book", { bookId: b.id })
                    }
                  />
                ))
              : [
                  "Stephen king",
                  "The Secret",
                  "The great gatsby",
                  "1984",
                  "The four agreements",
                  "A promised land",
                  "Caste",
                  "The power of habit",
                  "Leadership",
                ].map((s) => (
                  <Tap
                    key={s}
                    onPress={() => setQ(s)}
                    style={{ paddingVertical: 7 }}
                  >
                    <Txt bold size={20}>
                      {s}
                    </Txt>
                  </Tap>
                ))}
          </Section>
        </>
      ) : (
        <Section title="Category">
          <CategoryTiles navigation={navigation} grid />
        </Section>
      )}
    </Page>
  );
}
export function Category({ navigation, route }: any) {
  const t = useTheme();
  const name = route.params?.category || "Horror";
  return (
    <Page style={{ paddingTop: 0 }}>
      <LinearGradient
        colors={["#7521D0", "#401263", "#160E25"]}
        style={{
          marginHorizontal: -24,
          padding: 24,
          paddingTop: 58,
          borderBottomRightRadius: 58,
        }}
      >
        <Header navigation={navigation} light />
        <Title light>{name}</Title>
        <Txt size={13} color="#E3D0EF" style={{ lineHeight: 22 }}>
          {name} fiction is fiction in any medium intended to inspire and
          transport the audience. Discover unforgettable stories, imaginative
          worlds, and your next favorite book.{" "}
          {name === "Horror"
            ? "Since the 1960s, any work of fiction with a morbid, gruesome, surreal, or exceptionally suspenseful or frightening theme has come to be called “horror”. Horror fiction often overlaps science fiction or fantasy."
            : ""}
        </Txt>
      </LinearGradient>
      <View style={{ marginTop: 28 }}>
        {[...books.slice(12), books[0], books[1]].map((b) => (
          <BookRow
            key={b.id}
            book={b}
            onPress={() =>
              navigation.navigate("Book", { bookId: b.id, purchase: true })
            }
            onMore={() => navigation.navigate("BookActions", { bookId: b.id })}
          />
        ))}
      </View>
    </Page>
  );
}
