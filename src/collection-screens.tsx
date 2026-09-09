import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { books, collections, purple } from "./data";
import {
  BookRow,
  ModalBackdrop,
  Button,
  Card,
  Field,
  FloatArt,
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
export function Collections({ navigation, route }: any) {
  const t = useTheme();
  const empty = route.params?.empty;
  return (
    <Page purpleBg>
      <Header
        navigation={navigation}
        light={!t.dark}
        title="Collections"
        right={
          <IconButton
            light={!t.dark}
            name="settings-outline"
            onPress={() => navigation.navigate("CollectionList")}
          />
        }
      />
      <Txt size={12} color={t.dark ? t.muted : "#FFFFFFBB"}>
        Synthesize favorite books your way. Everyone can see and share this
        collection.
      </Txt>
      {empty ? (
        <>
          <View
            style={{ flex: 1, justifyContent: "center", marginVertical: 60 }}
          >
            <FloatArt name="empty" size={260} />
            <Txt
              bold
              color={t.dark ? purple : "white"}
              style={{ textAlign: "center", marginTop: 32 }}
            >
              No Collections Right Now!
            </Txt>
          </View>
          <Button
            title="New Collection"
            secondary
            onPress={() => navigation.navigate("NewCollection")}
          />
        </>
      ) : (
        <>
          {collections.slice(0, 3).map((name, i) => (
            <Section
              key={name}
              title={name}
              light={!t.dark}
              right={
                <Tap
                  onPress={() => navigation.navigate("Collection", { name })}
                >
                  <Icon name="chevron-forward" color="white" />
                </Tap>
              }
            >
              <Card>
                {books.slice(4 + i, 6 + i).map((b) => (
                  <BookRow
                    key={b.id}
                    book={b}
                    onPress={() => navigation.navigate("Collection", { name })}
                  />
                ))}
              </Card>
            </Section>
          ))}
          <Button
            title="New Collection"
            secondary
            style={{ marginTop: 24 }}
            onPress={() => navigation.navigate("NewCollection")}
          />
        </>
      )}
    </Page>
  );
}
export function Collection({ navigation, route }: any) {
  const t = useTheme();
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [title, setTitle] = useState(route.params?.name || "Self help book");
  return (
    <Page>
      <Header
        navigation={navigation}
        right={
          <>
            <IconButton
              name="add"
              onPress={() => navigation.navigate("AddBooks")}
            />
            <IconButton
              name={editing ? "checkmark-circle" : "settings-outline"}
              onPress={() => setEditing(!editing)}
            />
          </>
        }
      />
      {editing ? (
        <>
          <Txt color={t.muted} size={12}>
            Title
          </Txt>
          <TextInput
            accessibilityLabel="Collection title"
            value={title}
            onChangeText={setTitle}
            style={{
              fontFamily: "Poppins_600SemiBold",
              fontSize: 29,
              color: t.ink,
              marginBottom: 10,
            }}
          />
        </>
      ) : (
        <Title>{title}</Title>
      )}
      <Txt color={t.muted} size={12} style={{ marginBottom: 28 }}>
        From individual reflection to the power of positive thought and from
        every perspective and theism.
      </Txt>
      {selected.length > 0 && editing && (
        <Card
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            padding: 12,
          }}
        >
          <Txt>Selected {selected.length} books</Txt>
          <IconButton
            name="folder-open-outline"
            onPress={() => navigation.navigate("SaveCollection")}
          />
          <IconButton
            name="trash"
            onPress={() => navigation.navigate("DeleteCollection")}
          />
        </Card>
      )}
      {books.slice(2, 9).map((b) => (
        <BookRow
          key={b.id}
          book={b}
          selectable={editing}
          selected={selected.includes(b.id)}
          onPress={() => navigation.navigate("Book", { bookId: b.id })}
          onMore={() =>
            editing
              ? setSelected(
                  selected.includes(b.id)
                    ? selected.filter((x) => x !== b.id)
                    : [...selected, b.id],
                )
              : navigation.navigate("BookActions", { bookId: b.id })
          }
        />
      ))}
    </Page>
  );
}
export function CollectionList({ navigation }: any) {
  const [removed, setRemoved] = useState<string[]>([]);
  return (
    <Page>
      <Header navigation={navigation} title="Collections" />
      <Txt size={12} style={{ marginBottom: 20 }}>
        Synthesize favorite books your way. Everyone can see and share this
        collection.
      </Txt>
      {collections
        .filter((x) => !removed.includes(x))
        .map((s, i) => (
          <Row
            key={s}
            title={s}
            icon={
              [
                "folder-outline",
                "folder-outline",
                "folder-outline",
                "folder-outline",
                "folder-outline",
                "heart",
                "bag-check-outline",
                "checkmark-circle",
                "headset-outline",
              ][i]
            }
            onPress={() => navigation.navigate("Collection", { name: s })}
            trailing={
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <Txt>{[4, 3, 1, 5, 5, 36, 18, 12, 0][i]}</Txt>
                <Tap
                  label={"Remove " + s}
                  onPress={() => setRemoved([...removed, s])}
                >
                  <Icon name="trash-outline" size={17} />
                </Tap>
                <Icon name="chevron-forward" size={15} />
              </View>
            }
          />
        ))}
      <Row
        title="New Collection"
        icon="add-circle"
        color={purple}
        onPress={() => navigation.navigate("NewCollection")}
      />
    </Page>
  );
}
export function NewCollection({ navigation }: any) {
  const [name, setName] = useState("");
  return (
    <Page>
      <Header navigation={navigation} title="New Collection" />
      <Field
        label="Title"
        placeholder="Name your collection"
        value={name}
        onChangeText={setName}
      />
      <View style={{ flex: 1, justifyContent: "center", marginVertical: 30 }}>
        <FloatArt name="empty" size={260} />
        <Txt bold style={{ textAlign: "center", marginTop: 30 }}>
          No Book in Collection
        </Txt>
      </View>
      <Button
        title="Add Books"
        onPress={() =>
          navigation.navigate("AddBooks", { name: name || "New Collection" })
        }
      />
    </Page>
  );
}
export function AddBooks({ navigation, route }: any) {
  const [selected, setSelected] = useState<string[]>(["burning"]);
  return (
    <Page>
      <Header navigation={navigation} title="Purchased book" />
      <Card>
        <Field
          placeholder="Enter the title of the book"
          icon="search-outline"
        />
        {books.slice(2, 6).map((b) => (
          <BookRow
            key={b.id}
            book={b}
            selectable
            selected={selected.includes(b.id)}
            onPress={() =>
              setSelected(
                selected.includes(b.id)
                  ? selected.filter((x) => x !== b.id)
                  : [...selected, b.id],
              )
            }
          />
        ))}
      </Card>
      <View style={{ flex: 1, minHeight: 20 }} />
      <Button
        title="Done"
        onPress={() =>
          navigation.replace("Collection", {
            name: route.params?.name || "Self help book",
          })
        }
      />
    </Page>
  );
}
export function DeleteCollection({ navigation }: any) {
  return (
    <ModalBackdrop
      style={{
        flex: 1,
        backgroundColor: "#00000099",
        padding: 32,
        justifyContent: "center",
      }}
    >
      <Card style={{ alignItems: "center", marginBottom: 60 }}>
        <FloatArt name="trash" size={230} />
        <Txt bold style={{ textAlign: "center", marginTop: 20 }}>
          Your book has still{"\n"}been purchased
        </Txt>
      </Card>
      <Button
        title="Remove from Collection"
        secondary
        onPress={() => navigation.goBack()}
      />
      <Button
        title="Remove Everywhere"
        style={{ marginTop: 12 }}
        onPress={() => navigation.goBack()}
      />
    </ModalBackdrop>
  );
}
