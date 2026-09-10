import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { art } from "./assets";
import { purple } from "./data";
import { useStore, CatalogBook } from "./store";
import { Empty, RequireAccount } from "./functional-ui";
import {
  Avatar,
  BookCover,
  BookRow,
  Button,
  Card,
  Field,
  Glass,
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
export function CategoryTiles({ navigation }: any) {
  const { books } = useStore();
  const names = [...new Set(books.map((b) => b.category))];
  const t = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10, paddingVertical: 4 }}
    >
      {names.map((name, i) => (
        <Tap
          key={name}
          label={name}
          onPress={() => navigation.navigate("Category", { category: name })}
          style={{
            flexDirection: "row",
            gap: 9,
            alignItems: "center",
            paddingHorizontal: 18,
            paddingVertical: 13,
            borderRadius: 24,
            backgroundColor: t.card,
          }}
        >
          <Icon
            name={
              ["sparkles", "moon", "leaf", "heart", "book", "compass"][i % 6]
            }
            size={18}
          />
          <Txt size={12} bold>
            {name}
          </Txt>
        </Tap>
      ))}
    </ScrollView>
  );
}
function BookList({
  items,
  navigation,
}: {
  items: CatalogBook[];
  navigation: any;
}) {
  return (
    <>
      {items.map((b) => (
        <BookRow
          key={b.id}
          book={b}
          onPress={() => navigation.navigate("Book", { bookId: b.id })}
          onMore={() => navigation.navigate("BookActions", { bookId: b.id })}
        />
      ))}
    </>
  );
}
function Shelf({ items, navigation }: any) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 18, paddingVertical: 5, paddingBottom: 15 }}
    >
      {items.map((b: any) => (
        <Tap
          key={b.id}
          label={b.title}
          onPress={() => navigation.navigate("Book", { bookId: b.id })}
          style={{ width: 150 }}
        >
          <BookCover book={b} width={150} />
          <Txt
            bold
            size={13}
            numberOfLines={2}
            style={{ marginTop: 12, lineHeight: 18 }}
          >
            {b.title}
          </Txt>
          <Txt size={11} color="#8B879B" style={{ marginTop: 5 }}>
            {b.category} · {b.available ? "Read free" : "Reading list"}
          </Txt>
        </Tap>
      ))}
    </ScrollView>
  );
}
export function Home({ navigation }: any) {
  const { books, library, user, days } = useStore();
  const t = useTheme();
  const recent =
    books.find(
      (b) =>
        b.id ===
        library.find(
          (l) =>
            books.find((x) => x.id === l.book_id)?.available && !l.finished,
        )?.book_id,
    ) ||
    books.find((b) => b.id === "moonlit-archive") ||
    books.find((b) => b.available);
  const today = days.find(
    (d) => d.day === new Date().toISOString().slice(0, 10),
  );
  const minutes = Math.floor((today?.seconds || 0) / 60);
  const available = books
    .filter((b) => b.available)
    .sort(
      (a, b) =>
        Number(user?.preferences?.interests?.includes(b.category) || false) -
        Number(user?.preferences?.interests?.includes(a.category) || false),
    );
  return (
    <Page bottom={125}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <View>
          <Txt
            size={11}
            color={t.muted}
            style={{ letterSpacing: 1.3, marginBottom: 8 }}
          >
            {new Date()
              .toLocaleDateString("en", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })
              .toUpperCase()}
          </Txt>
          <Txt size={34} bold>
            Today{" "}
            <Txt size={27} color={purple}>
              .
            </Txt>
          </Txt>
        </View>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <IconButton
            name="notifications"
            label="Notifications"
            onPress={() => navigation.navigate("Notifications")}
          />
          <Tap
            label="Open profile"
            onPress={() => navigation.navigate("Profile")}
          >
            <Avatar name={user?.name || "Reader"} size={45} />
          </Tap>
        </View>
      </View>
      <View
        style={{
          borderRadius: 30,
          overflow: "hidden",
          backgroundColor: "#26223D",
        }}
      >
        <Image source={art.hero} style={{ width: "100%", height: 300 }} />
        <LinearGradient
          colors={["#13112300", "#131123DD"]}
          style={{
            position: "absolute",
            inset: 0,
            justifyContent: "flex-end",
            padding: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginBottom: 12,
            }}
          >
            <Icon name="sparkles" color="#D7CBFF" size={15} />
            <Txt color="#D7CBFF" size={10} bold style={{ letterSpacing: 2 }}>
              A LITTLE WONDER, EVERY DAY
            </Txt>
          </View>
          <Txt size={30} bold color="white" style={{ lineHeight: 35 }}>
            Get lost in a story.{"\n"}Find a little more you.
          </Txt>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Txt color="#FFFFFFBB" size={12}>
              Beautiful reads. A new perspective.
            </Txt>
            <IconButton
              name="arrow-forward"
              light
              label="Explore books"
              onPress={() => navigation.navigate("Store")}
            />
          </View>
        </LinearGradient>
      </View>
      {recent && (
        <Section
          title={user ? "Pick up where you left off" : "Your next chapter"}
          right={
            <Txt size={11} color={t.muted}>
              A moment for you
            </Txt>
          }
        >
          <Card
            style={{
              flexDirection: "row",
              gap: 17,
              alignItems: "center",
              borderWidth: 1,
              borderColor: t.line,
            }}
          >
            <BookCover book={recent} />
            <View style={{ flex: 1 }}>
              <Txt bold size={17}>
                {recent.title}
              </Txt>
              <Txt
                color={t.muted}
                size={12}
                style={{ marginTop: 6, marginBottom: 15 }}
              >
                {recent.author} · {recent.pages} pages
              </Txt>
              <Tap
                onPress={() =>
                  navigation.navigate("Reader", { bookId: recent.id })
                }
                style={{ flexDirection: "row", gap: 7, alignItems: "center" }}
              >
                <Txt bold color={purple} size={12}>
                  {library.some((l) => l.book_id === recent.id)
                    ? "Continue reading"
                    : "Start reading"}
                </Txt>
                <Icon name="arrow-forward" size={16} />
              </Tap>
            </View>
          </Card>
        </Section>
      )}
      <Section
        title="Made for your curiosity"
        right={
          <Tap onPress={() => navigation.navigate("Store")}>
            <Txt color={purple} size={12}>
              See all
            </Txt>
          </Tap>
        }
      >
        <Shelf items={available} navigation={navigation} />
      </Section>
      <Section title="Follow a feeling">
        <CategoryTiles navigation={navigation} />
      </Section>
      <Section title="Your daily ritual">
        <Card
          style={{
            backgroundColor: t.dark ? "#272336" : "#EDE8F9",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              borderWidth: 5,
              borderColor: "#C9BAF4",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="flame" size={28} />
          </View>
          <View style={{ flex: 1 }}>
            <Txt bold size={20}>
              {minutes}{" "}
              <Txt size={13} color={t.muted}>
                / {user?.goal || 20} min
              </Txt>
            </Txt>
            <Txt color={t.muted} size={12} style={{ marginTop: 7 }}>
              One page is a beautiful start.
            </Txt>
          </View>
          <IconButton
            name="chevron-forward"
            label="Reading goals"
            onPress={() => navigation.navigate("Goals")}
          />
        </Card>
      </Section>
      <Section title="Beyond the page">
        <Tap
          onPress={() =>
            navigation.navigate("Reels", {
              bookId: recent?.id || "reading-guide",
              page: 0,
            })
          }
        >
          <LinearGradient
            colors={["#283B47", "#584369"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 26,
              padding: 23,
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
            }}
          >
            <Icon name="play-circle" color="white" size={45} />
            <View style={{ flex: 1 }}>
              <Txt color="white" bold size={19}>
                Stories in motion.
              </Txt>
              <Txt
                color="#FFFFFFBB"
                size={12}
                style={{ marginTop: 6, lineHeight: 19 }}
              >
                Short reels inspired by the page you just read.
              </Txt>
            </View>
            <Icon name="arrow-forward" color="white" />
          </LinearGradient>
        </Tap>
      </Section>
      <Section title="On the reading list">
        <Shelf
          items={books.filter((b) => !b.available).slice(0, 8)}
          navigation={navigation}
        />
      </Section>
    </Page>
  );
}
export function Store({ navigation }: any) {
  const { books } = useStore();
  return (
    <Page bottom={120}>
      <Txt
        size={11}
        color={purple}
        bold
        style={{ letterSpacing: 2, marginBottom: 12 }}
      >
        A WORLD TO EXPLORE
      </Txt>
      <Title>Discover</Title>
      <Txt style={{ marginBottom: 24 }}>Find a story that stays with you.</Txt>
      <CategoryTiles navigation={navigation} />
      <Section title="iBook Originals">
        <Shelf
          items={books.filter((b) => b.available)}
          navigation={navigation}
        />
      </Section>
      <Section title="For your reading list">
        <BookList
          items={books.filter((b) => !b.available)}
          navigation={navigation}
        />
      </Section>
    </Page>
  );
}
export function Library({ navigation }: any) {
  const { books, library, collections } = useStore();
  const { width } = useWindowDimensions();
  const t = useTheme();
  const cols = width > 700 ? 4 : width > 500 ? 3 : 2;
  const cell = (Math.min(width, 860) - 48 - (cols - 1) * 18) / cols;
  return (
    <RequireAccount navigation={navigation}>
      <Page bottom={120}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title>Your library</Title>
          <IconButton
            name="settings"
            label="Settings"
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
        <Txt color={t.muted} style={{ marginBottom: 26 }}>
          Stories you love. All in one place.
        </Txt>
        <Tap onPress={() => navigation.navigate("Collections")}>
          <Card style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <Icon name="folder" />
            <View style={{ flex: 1 }}>
              <Txt bold>Collections</Txt>
              <Txt color={t.muted} size={12} style={{ marginTop: 4 }}>
                {collections.length} personal shelves
              </Txt>
            </View>
            <Icon name="chevron-forward" />
          </Card>
        </Tap>
        <Section title="Your books">
          {!library.length ? (
            <>
              <Empty text="Your next favorite belongs here. Discover a book and save it to your library." />
              <Button
                title="Find a book"
                onPress={() => navigation.navigate("Store")}
              />
            </>
          ) : (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 18 }}>
              {library.map((l) => {
                const b = books.find((b) => b.id === l.book_id);
                return b ? (
                  <View key={b.id} style={{ width: cell }}>
                    <Tap
                      onPress={() =>
                        navigation.navigate("Book", { bookId: b.id })
                      }
                    >
                      <BookCover book={b} width={cell} />
                      <Txt bold size={13} style={{ marginTop: 10 }}>
                        {b.title}
                      </Txt>
                      <Txt
                        size={11}
                        color={purple}
                        style={{ marginTop: 7, marginBottom: 14 }}
                      >
                        {l.finished
                          ? "Finished"
                          : b.available
                            ? `Page ${l.page + 1} of ${b.pages}`
                            : "Saved for later"}
                      </Txt>
                    </Tap>
                  </View>
                ) : null;
              })}
            </View>
          )}
        </Section>
      </Page>
    </RequireAccount>
  );
}
export function Search({ navigation }: any) {
  const { books } = useStore();
  const [q, setQ] = useState("");
  const items = books.filter((b) =>
    (b.title + " " + b.author).toLowerCase().includes(q.trim().toLowerCase()),
  );
  return (
    <Page bottom={120}>
      <Title>A little curiosity.</Title>
      <Field
        label="Search books or authors"
        placeholder="What are you looking for?"
        value={q}
        onChangeText={setQ}
        icon="search"
      />
      {q.trim() ? (
        <Section title={`${items.length} discoveries`}>
          {items.length ? (
            <BookList items={items} navigation={navigation} />
          ) : (
            <Empty text="Nothing here yet. Try a different title or author." />
          )}
        </Section>
      ) : (
        <>
          <CategoryTiles navigation={navigation} />
          <Section title="Start somewhere wonderful">
            <BookList
              items={books.filter((b) => b.available)}
              navigation={navigation}
            />
          </Section>
          <Section title="All books">
            <BookList
              items={books.filter((b) => !b.available)}
              navigation={navigation}
            />
          </Section>
        </>
      )}
    </Page>
  );
}
export function Category({ navigation, route }: any) {
  const { books } = useStore();
  const name = route.params?.category;
  const items = books.filter((b) => b.category === name);
  return (
    <Page>
      <Header navigation={navigation} title={name || "Categories"} />
      <Txt style={{ marginBottom: 28 }}>
        Follow your curiosity a little further.
      </Txt>
      {items.length ? (
        <BookList items={items} navigation={navigation} />
      ) : (
        <Empty text="New stories are on their way." />
      )}
    </Page>
  );
}
