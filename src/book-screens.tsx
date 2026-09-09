import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { art } from "./assets";
import { books, collections, excerpt, purple } from "./data";
import {
  Art,
  ModalBackdrop,
  Avatar,
  Button,
  Card,
  Field,
  FloatArt,
  Glass,
  Goals,
  Header,
  Icon,
  IconButton,
  Page,
  Row,
  Section,
  Tags,
  Tap,
  Title,
  Txt,
  useTheme,
} from "./ui";
export function BookBackdrop({ children, bookId = "murder" }: any) {
  const b = books.find((x) => x.id === bookId) || books[1];
  return (
    <ImageBackground source={b.image} blurRadius={32} style={{ flex: 1 }}>
      <LinearGradient
        colors={["#10070B45", "#07151CCC", "#737778DD", "#773322BB"]}
        style={{ flex: 1 }}
      >
        {children}
      </LinearGradient>
    </ImageBackground>
  );
}
function Cover({ book, large = false }: any) {
  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      <Image
        source={book.image}
        style={{
          width: large ? 220 : 158,
          height: large ? 305 : 218,
          borderRadius: 18,
          marginBottom: 14,
        }}
      />
      <Txt color="white" bold size={17}>
        {book.title}
      </Txt>
      <Txt size={12} color="#FFFFFFB0">
        By {book.author}
      </Txt>
    </View>
  );
}
export function BookScreen({ navigation, route }: any) {
  const t = useTheme();
  const b = books.find((x) => x.id === route.params?.bookId) || books[0];
  const [reviews, setReviews] = useState(false);
  const purchase = route.params?.purchase;
  const insets = useSafeAreaInsets();
  return (
    <BookBackdrop bookId={b.id}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: 110,
        }}
      >
        <View style={{ paddingHorizontal: 24 }}>
          <Header
            navigation={navigation}
            light
            right={
              <IconButton
                light
                name="share-social-outline"
                onPress={() =>
                  navigation.navigate("BookActions", { bookId: b.id })
                }
              />
            }
          />
          <Cover book={b} />
        </View>
        <Glass
          style={{
            marginTop: 0,
            borderTopLeftRadius: 44,
            borderTopRightRadius: 44,
            padding: 24,
            paddingBottom: 48,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {["Reads", "Rating", "Review"].map((name, i) => (
            <Tap
              key={name}
              onPress={() => setReviews(i === 2)}
              style={{ alignItems: "center" }}
            >
              <Txt color="#FFFFFFBB" size={11}>
                {name}
              </Txt>
              <Txt bold color="white">
                {["412", "5.0", "156"][i]}
              </Txt>
            </Tap>
          ))}
        </Glass>
        <View
          style={{
            marginTop: -26,
            borderTopLeftRadius: 42,
            borderTopRightRadius: 42,
            backgroundColor: t.dark ? t.bg : "#EDF0F3",
            padding: 27,
            minHeight: 350,
          }}
        >
          {reviews ? (
            [0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={{ flexDirection: "row", gap: 14, marginBottom: 17 }}
              >
                <Avatar index={i} />
                <Card style={{ flex: 1, padding: 14, borderRadius: 15 }}>
                  <Txt size={12}>
                    <Txt bold color={t.heading} size={13}>
                      {i ? "Andy D." : "OuluPulu"}{" "}
                    </Txt>
                    {i
                      ? "I pre-ordered this book and forgot about it. I was very pleased when the delivery lady set off my ringing doorbell…"
                      : "This book… my favorite book of the year! Maybe even this decade! :)"}
                  </Txt>
                </Card>
              </View>
            ))
          ) : (
            <>
              <Txt bold color={t.heading}>
                Categories
              </Txt>
              <Tags />
              <Txt
                bold
                color={t.heading}
                style={{ marginTop: 22, marginBottom: 12 }}
              >
                Over View
              </Txt>
              <Txt size={13} color={t.muted} style={{ lineHeight: 22 }}>
                {excerpt}
              </Txt>
            </>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          alignItems: "stretch",
          backgroundColor: t.card,
          borderTopLeftRadius: 35,
          paddingBottom: insets.bottom,
        }}
      >
        <Tap
          onPress={() => setReviews(!reviews)}
          label={reviews ? "Close reviews" : "Show reviews"}
          style={{
            width: 90,
            alignItems: "center",
            justifyContent: "center",
            minHeight: 72,
          }}
        >
          <Icon
            name={reviews ? "close" : purchase ? "heart" : "chatbox-outline"}
          />
          {!purchase && !reviews && <Txt size={10}>156</Txt>}
        </Tap>
        <View
          style={{
            flex: 1,
            backgroundColor: purple,
            borderTopLeftRadius: 42,
            padding: 12,
          }}
        >
          {purchase && !reviews ? (
            <>
              <Button
                title="View Sample"
                icon="book-outline"
                onPress={() => navigation.navigate("Reader", { bookId: b.id })}
              />
              <Button
                title="$10 – Purchase"
                icon="bag-check-outline"
                onPress={() =>
                  navigation.navigate("Purchase", { bookId: b.id })
                }
              />
            </>
          ) : (
            <Button
              title={reviews ? "Write a Review" : "Start Reading"}
              icon={reviews ? "chatbox-outline" : "book-outline"}
              onPress={() =>
                navigation.navigate(reviews ? "WriteReview" : "Reader", {
                  bookId: b.id,
                })
              }
            />
          )}
        </View>
      </View>
    </BookBackdrop>
  );
}
export function Reading({ navigation }: any) {
  const t = useTheme();
  return (
    <BookBackdrop>
      <ScrollView contentContainerStyle={{ paddingTop: 60, paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: 24 }}>
          <Header
            navigation={navigation}
            light
            right={
              <IconButton
                name="ellipsis-vertical"
                light
                onPress={() =>
                  navigation.navigate("BookActions", { bookId: "murder" })
                }
              />
            }
          />
          <Tap
            onPress={() => navigation.navigate("Reader")}
            style={{
              flexDirection: "row",
              backgroundColor: "#EEECE7",
              borderRadius: 16,
              borderWidth: 5,
              borderColor: "#111",
              padding: 10,
              height: 230,
              overflow: "hidden",
            }}
          >
            {[0, 1].map((i) => (
              <Txt
                key={i}
                color="#555"
                size={8}
                style={{
                  flex: 1,
                  padding: 7,
                  borderRightWidth: i ? 0 : 1,
                  borderColor: "#AAA",
                }}
              >
                {excerpt}
              </Txt>
            ))}
          </Tap>
          <Txt
            bold
            color="white"
            size={18}
            style={{ textAlign: "center", marginTop: 22 }}
          >
            Murder Board
          </Txt>
          <Txt
            color="#FFFFFFAA"
            style={{ textAlign: "center", marginBottom: 30 }}
          >
            By Brian Shea
          </Txt>
        </View>
        <View
          style={{
            backgroundColor: t.dark ? t.bg : "#EDF0F3",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            padding: 24,
          }}
        >
          <Goals onPress={() => navigation.navigate("Goals")} />
          <Section title="Categories">
            <Tags />
          </Section>
          <Section title="Over view">
            <Txt color={t.muted}>{excerpt.slice(0, 250)}</Txt>
          </Section>
          <Button
            title="Keep Reading"
            style={{ marginTop: 25 }}
            onPress={() => navigation.navigate("Reader")}
          />
        </View>
      </ScrollView>
    </BookBackdrop>
  );
}
export function Reader({ navigation }: any) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [theme, setTheme] = useState("white");
  const [settings, setSettings] = useState(false);
  const [size, setSize] = useState(18);
  const [font, setFont] = useState("San Francisco Display");
  const [page, setPage] = useState(208);
  const [select, setSelect] = useState(false);
  const [find, setFind] = useState(false);
  const bg =
    theme === "sepia" ? "#FFE6BE" : theme === "dark" ? "#555555" : "white";
  return (
    <View style={{ flex: 1, backgroundColor: bg, paddingTop: insets.top + 12 }}>
      <View
        style={{
          paddingHorizontal: 22,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <IconButton name="chevron-back" onPress={() => navigation.goBack()} />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
          <Tap onPress={() => navigation.navigate("Share")} label="Share">
            <Icon name="share-social-outline" />
          </Tap>
          <Tap onPress={() => setSettings(!settings)} label="Reader settings">
            <Txt color={purple} bold size={23}>
              aA
            </Txt>
          </Tap>
          <Tap onPress={() => setFind(!find)} label="Search in book">
            <Icon name="search-outline" />
          </Tap>
        </View>
      </View>
      {find && (
        <View style={{ paddingHorizontal: 24 }}>
          <Field placeholder="Search in this book" />
        </View>
      )}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 26,
          paddingBottom: 24,
          maxWidth: 760,
          alignSelf: "center",
        }}
      >
        <Tap
          onLongPress={() => setSelect(!select)}
          label="Reading page, long press for selection"
        >
          <Txt
            selectable
            size={size}
            color={theme === "dark" ? "#EEE" : "#777"}
            style={{
              lineHeight: size * 1.48,
              fontFamily:
                font === "Times New Roman"
                  ? Platform.OS === "ios"
                    ? "Times New Roman"
                    : "serif"
                  : font === "Roboto"
                    ? "sans-serif"
                    : "Poppins_400Regular",
            }}
          >
            {excerpt} {excerpt.slice(0, 260)}
          </Txt>
        </Tap>
      </ScrollView>
      {select && (
        <View style={{ position: "absolute", top: "43%", left: 24, right: 24 }}>
          <Button
            title="Copy    |    Highlight    |    Search    |    Share"
            onPress={() => setSelect(false)}
          />
        </View>
      )}
      <View
        style={{
          paddingHorizontal: 25,
          paddingBottom: insets.bottom + 12,
          paddingTop: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 7,
          }}
        >
          <Tap
            label="Previous page"
            onPress={() => setPage(Math.max(1, page - 1))}
          >
            <Icon name="chevron-back" size={19} />
          </Tap>
          <Txt size={11} color={purple}>
            {page} / 337
          </Txt>
          <Tap
            label="Next page"
            onPress={() => setPage(Math.min(337, page + 1))}
          >
            <Icon name="chevron-forward" size={19} />
          </Tap>
        </View>
        <Tap
          onPress={() => setPage(page === 208 ? 250 : 208)}
          label="Reading progress"
        >
          <View style={{ height: 4, backgroundColor: "#CCC", borderRadius: 3 }}>
            <View
              style={{
                width: `${(page / 337) * 100}%`,
                height: 4,
                backgroundColor: purple,
              }}
            />
          </View>
        </Tap>
      </View>
      {settings && (
        <View
          style={{
            position: "absolute",
            top: insets.top + 66,
            right: 24,
            width: 240,
            borderRadius: 28,
            borderWidth: 1.5,
            borderColor: purple,
            padding: 20,
            backgroundColor: t.card,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 9,
          }}
        >
          <View
            style={{ height: 3, backgroundColor: purple, marginVertical: 10 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 10,
            }}
          >
            <Tap
              label="Smaller text"
              onPress={() => setSize(Math.max(13, size - 1))}
            >
              <Txt size={16} color={purple}>
                A
              </Txt>
            </Tap>
            <Tap
              label="Larger text"
              onPress={() => setSize(Math.min(28, size + 1))}
            >
              <Txt size={25} color={purple}>
                A
              </Txt>
            </Tap>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 12,
            }}
          >
            {["white", "sepia", "dark"].map((s, i) => (
              <Tap
                key={s}
                label={s + " page"}
                onPress={() => setTheme(s)}
                style={{
                  backgroundColor: ["white", "#FFE6BE", "#555"][i],
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  borderWidth: theme === s ? 2 : 0,
                  borderColor: purple,
                }}
              />
            ))}
          </View>
          {[
            "Avo",
            "Roboto",
            "San Francisco Display",
            "Times New Roman",
            "Comic Neue",
          ].map((s) => (
            <Tap
              key={s}
              onPress={() => setFont(s)}
              style={{
                flexDirection: "row",
                gap: 10,
                paddingVertical: 10,
                alignItems: "center",
              }}
            >
              <Icon
                name={font === s ? "radio-button-on" : "ellipse"}
                size={15}
                color={font === s ? purple : "#CCC"}
              />
              <Txt size={11}>{s}</Txt>
            </Tap>
          ))}
        </View>
      )}
    </View>
  );
}
export function WriteReview({ navigation, route }: any) {
  const [stars, setStars] = useState(4);
  const t = useTheme();
  return (
    <BookBackdrop bookId={route.params?.bookId}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 55 }}>
          <Header navigation={navigation} light />
          <Cover
            book={books.find((b) => b.id === route.params?.bookId) || books[0]}
          />
          <Card style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 24,
              }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <Tap key={i} label={i + " stars"} onPress={() => setStars(i)}>
                  <Icon
                    name="star"
                    size={29}
                    color={i <= stars ? "#FF694D" : t.muted}
                  />
                </Tap>
              ))}
            </View>
            <Field placeholder="Add a comment…" multiline />
            <Button title="Post" onPress={() => navigation.goBack()} />
            <Txt size={28} style={{ textAlign: "center", marginTop: 18 }}>
              😀 🤯 🥳 💋 😈 😎
            </Txt>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </BookBackdrop>
  );
}
export function BookActions({ navigation, route }: any) {
  return (
    <BookBackdrop bookId={route.params?.bookId}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Cover
          book={books.find((b) => b.id === route.params?.bookId) || books[0]}
          large
        />
      </View>
      <Card
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          paddingBottom: 40,
        }}
      >
        <View
          style={{
            width: 38,
            height: 4,
            borderRadius: 4,
            backgroundColor: "#CCC",
            alignSelf: "center",
            marginBottom: 18,
          }}
        />
        <Row
          title="Save to Collection"
          icon="bookmark"
          onPress={() =>
            navigation.replace("SaveCollection", {
              bookId: route.params?.bookId,
            })
          }
        />
        <Row
          title="Share"
          icon="share-social-outline"
          onPress={() =>
            navigation.replace("Share", { bookId: route.params?.bookId })
          }
        />
        <Row title="Cancel" icon="close" onPress={() => navigation.goBack()} />
      </Card>
    </BookBackdrop>
  );
}
export function SaveCollection({ navigation, route }: any) {
  const [selected, setSelected] = useState(4);
  return (
    <BookBackdrop bookId={route.params?.bookId}>
      <View style={{ flex: 1, padding: 26, paddingTop: 110 }}>
        <Title light>Save To Collection</Title>
        <Card>
          {collections.slice(0, 5).map((s, i) => (
            <Row
              key={s}
              title={s}
              icon={selected === i ? "checkmark-circle" : "ellipse-outline"}
              trailing={<View />}
              onPress={() => setSelected(i)}
            />
          ))}
          <Row
            title="New Collection"
            icon="add-circle"
            color={purple}
            onPress={() => navigation.navigate("NewCollection")}
          />
        </Card>
        <View style={{ flex: 1 }} />
        <Button
          title="Done"
          style={{ marginBottom: 20 }}
          onPress={() =>
            navigation.replace("Popup", {
              kind: "check",
              title: "Saved to Collection",
              subtitle: collections[selected],
            })
          }
        />
      </View>
    </BookBackdrop>
  );
}
export function Share({ navigation }: any) {
  return (
    <BookBackdrop>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Cover book={books[1]} large />
      </View>
      <Card style={{ paddingBottom: 45 }}>
        <Txt bold>Murder Board</Txt>
        <Txt size={12}>By Brian Shea</Txt>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 25,
          }}
        >
          {["AirDrop", "Messages", "Mail", "Messenger"].map((s, i) => (
            <Tap
              key={s}
              onPress={() =>
                navigation.navigate("Popup", {
                  kind: "check",
                  title: "Share preview",
                  subtitle: "This is a UI-only sharing preview.",
                })
              }
            >
              <View
                style={{
                  backgroundColor: ["#329BFF", "#49D35A", "#448FFF", "#AE46FE"][
                    i
                  ],
                  padding: 13,
                  borderRadius: 16,
                }}
              >
                <Icon
                  name={["radio", "chatbubble", "mail", "chatbubbles"][i]}
                  color="white"
                  size={25}
                />
              </View>
              <Txt size={10} style={{ marginTop: 7 }}>
                {s}
              </Txt>
            </Tap>
          ))}
        </View>
        <Row
          title="Copy"
          icon="copy-outline"
          onPress={() => navigation.goBack()}
        />
        <Row
          title="Add to Reading List"
          icon="glasses-outline"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Cancel"
          secondary
          style={{ marginTop: 15 }}
          onPress={() => navigation.goBack()}
        />
      </Card>
    </BookBackdrop>
  );
}
export function Popup({ navigation, route }: any) {
  const p = route.params || {};
  const t = useTheme();
  return (
    <ModalBackdrop
      style={{
        flex: 1,
        backgroundColor: "#00000088",
        justifyContent: "center",
        padding: 42,
      }}
    >
      <Card
        style={{
          alignItems: "center",
          padding: 25,
          maxWidth: 360,
          width: "100%",
          alignSelf: "center",
          borderRadius: 40,
        }}
      >
        <FloatArt name={p.kind || "check"} size={220} />
        <Txt
          bold
          color={t.heading}
          style={{ textAlign: "center", marginTop: 10 }}
        >
          {p.title || "Download Completed"}
        </Txt>
        <Txt
          size={11}
          color={t.muted}
          style={{ textAlign: "center", marginTop: 5 }}
        >
          {p.subtitle || "Grab a Coffee and start reading it!"}
        </Txt>
        <Button
          title="Done"
          style={{ marginTop: 22, minWidth: 180 }}
          onPress={() =>
            p.next ? navigation.replace(p.next) : navigation.goBack()
          }
        />
      </Card>
    </ModalBackdrop>
  );
}
export function Purchase({ navigation, route }: any) {
  const p = route.params || {};
  const status = p.status;
  const b = books.find((b) => b.id === p.bookId) || books[1];
  return (
    <BookBackdrop bookId={b.id}>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: 58,
          paddingBottom: 45,
          flexGrow: 1,
        }}
      >
        <Header navigation={navigation} light />
        {status ? (
          <>
            <Art
              name={status === "success" ? "target" : "failure"}
              size={190}
            />
            <Txt
              color="white"
              bold
              size={25}
              style={{ textAlign: "center", marginTop: 15 }}
            >
              Payment {status === "success" ? "Success!" : "failed!"}
            </Txt>
            <Txt
              color="white"
              style={{ textAlign: "center", marginBottom: 30 }}
            >
              You can start reading your book{"\n"}whenever you want
            </Txt>
          </>
        ) : (
          <Cover book={b} />
        )}
        <Card>
          <Row
            title="Book"
            icon="book-outline"
            trailing={<Txt bold>$10.00</Txt>}
          />
          <Row
            title="Tax & Fees"
            icon="receipt-outline"
            trailing={<Txt>0.00</Txt>}
          />
          <Row
            title="Discount code"
            icon="pricetag-outline"
            trailing={
              <Txt size={9} color={purple}>
                ADD DISCOUNT CODE
              </Txt>
            }
            onPress={() => navigation.navigate("Gift")}
          />
          <Row
            title="Total"
            icon="wallet-outline"
            trailing={
              <Txt bold color={purple}>
                $10.00
              </Txt>
            }
          />
        </Card>
        <Card style={{ marginTop: 12, paddingVertical: 3 }}>
          <Row
            title="🔴🟠  **035"
            icon="card-outline"
            onPress={() => navigation.navigate("PaymentMethods")}
            trailing={
              <Txt size={10} color={purple}>
                CHANGE
              </Txt>
            }
          />
        </Card>
        <View style={{ flex: 1, minHeight: 35 }} />
        <Button
          title={
            status === "success"
              ? "Read Now"
              : status === "failed"
                ? "Get Back"
                : "Pay Now"
          }
          onPress={() =>
            status === "success"
              ? navigation.navigate("Reader")
              : status === "failed"
                ? navigation.setParams({ status: undefined })
                : navigation.setParams({ status: "success" })
          }
        />
        {!status && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <Tap onPress={() => navigation.setParams({ status: "failed" })}>
              <Txt color="white" size={11}>
                Preview failure
              </Txt>
            </Tap>
            <Tap onPress={() => navigation.navigate("AppStore")}>
              <Txt color="white" size={11}>
                App Store preview
              </Txt>
            </Tap>
          </View>
        )}
      </ScrollView>
    </BookBackdrop>
  );
}
export function PaymentMethods({ navigation }: any) {
  const [selected, setSelected] = useState(0);
  return (
    <BookBackdrop>
      <View style={{ flex: 1, padding: 26, paddingTop: 58 }}>
        <Header navigation={navigation} light />
        <Title light>Payment Methods</Title>
        <Card>
          {["🔴🟠  **035", "PayPal   **ner96@gmail.com", "VISA   **320"].map(
            (s, i) => (
              <Row
                key={s}
                title={s}
                icon="card-outline"
                trailing={
                  <Icon
                    name={
                      selected === i ? "checkmark-circle" : "ellipse-outline"
                    }
                  />
                }
                onPress={() => setSelected(i)}
              />
            ),
          )}
          <Button
            title="Add Payment Method"
            secondary
            style={{ marginTop: 22 }}
            onPress={() => navigation.navigate("AddPayment")}
          />
        </Card>
        <View style={{ flex: 1 }} />
        <Button
          title="Confirm"
          style={{ marginBottom: 30 }}
          onPress={() => navigation.goBack()}
        />
      </View>
    </BookBackdrop>
  );
}
export function AddPayment({ navigation }: any) {
  return (
    <Page>
      <Header navigation={navigation} title="Add Payment Method" />
      <Field label="Cardholder" placeholder="Name on card" />
      <Field
        label="Card number"
        placeholder="0000 0000 0000 0000"
        keyboardType="number-pad"
      />
      <Field label="Expiry" placeholder="MM / YY" />
      <Field
        label="Security code"
        placeholder="CVC"
        keyboardType="number-pad"
      />
      <Button title="Save" onPress={() => navigation.goBack()} />
    </Page>
  );
}
export function AppStore({ navigation }: any) {
  return (
    <BookBackdrop>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Cover book={books[1]} />
      </View>
      <Card style={{ paddingBottom: 45 }}>
        <Txt bold>App Store</Txt>
        <Row title="Murder Board" icon="book-outline" />
        <Row
          title="Account"
          trailing={<Txt size={11}>jollydesigner78@gmail.com</Txt>}
        />
        <Row title="Price" trailing={<Txt bold>$10.00</Txt>} />
        <Txt style={{ textAlign: "center", margin: 20 }}>
          Confirm with Side Button
        </Txt>
        <Button
          title="Preview Confirmation"
          onPress={() => navigation.replace("Purchase", { status: "success" })}
        />
        <Tap
          onPress={() => navigation.goBack()}
          style={{ padding: 15, alignItems: "center" }}
        >
          <Txt color={purple}>Cancel</Txt>
        </Tap>
      </Card>
    </BookBackdrop>
  );
}
export function Download({ navigation }: any) {
  return (
    <BookBackdrop>
      <View style={{ flex: 1, justifyContent: "center", padding: 35 }}>
        <Cover book={books[1]} large />
        <View
          style={{
            height: 4,
            backgroundColor: "#FFFFFF55",
            marginVertical: 20,
          }}
        >
          <View style={{ height: 4, width: "25%", backgroundColor: "white" }} />
        </View>
        <Txt color="white" style={{ textAlign: "center" }}>
          Downloading 25%
        </Txt>
        <Button
          title="Preview Completed"
          style={{ marginTop: 30 }}
          onPress={() => navigation.replace("Popup", { kind: "coffee" })}
        />
      </View>
    </BookBackdrop>
  );
}
