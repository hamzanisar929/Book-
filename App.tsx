import "react-native-gesture-handler";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
const Poppins_400Regular = require("@expo-google-fonts/poppins/400Regular/Poppins_400Regular.ttf");
const Poppins_600SemiBold = require("@expo-google-fonts/poppins/600SemiBold/Poppins_600SemiBold.ttf");
import {
  Glass,
  Header,
  Icon,
  Page,
  Row,
  Section,
  Tap,
  ThemeContext,
  Txt,
  useTheme,
} from "./src/ui";
import { purple } from "./src/data";
import { Home, Library, Store, Search, Category } from "./src/main-screens";
import {
  Splash,
  Onboarding,
  Auth,
  Forgot,
  Verification,
} from "./src/auth-screens";
import {
  BookScreen,
  Reading,
  Reader,
  WriteReview,
  BookActions,
  SaveCollection,
  Share,
  Popup,
  Purchase,
  PaymentMethods,
  AddPayment,
  AppStore,
  Download,
} from "./src/book-screens";
import {
  Collections,
  Collection,
  CollectionList,
  NewCollection,
  AddBooks,
  DeleteCollection,
} from "./src/collection-screens";
import {
  Friends,
  Invite,
  Discover,
  FriendSearch,
  Chat,
} from "./src/social-screens";
import {
  Profile,
  Author,
  Membership,
  ProfileMenu,
  FriendActions,
  Settings,
  EditProfile,
  GoalsScreen,
  GoalPicker,
  Notifications,
  Info,
} from "./src/profile-screens";
const Stack = createNativeStackNavigator<any>();
const Tabs = createBottomTabNavigator<any>();
function TabBar({ state, navigation }: any) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        left: 28,
        right: 28,
        bottom: Math.max(insets.bottom, 16),
        alignItems: "center",
      }}
    >
      <Glass
        style={{
          flexDirection: "row",
          borderRadius: 40,
          padding: 7,
          width: "100%",
          maxWidth: 560,
          shadowColor: "#4A378A",
          shadowOpacity: 0.14,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 7 },
          elevation: 10,
        }}
      >
        {state.routes.map((r: any, i: number) => (
          <View key={r.key} style={{ flex: 1 }}>
            <Tap
              label={r.name + " tab"}
              onPress={() => {
                const e = navigation.emit({
                  type: "tabPress",
                  target: r.key,
                  canPreventDefault: true,
                });
                if (!e.defaultPrevented) navigation.navigate(r.name);
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 54,
                borderRadius: 30,
                backgroundColor:
                  state.index === i ? "#6952FF19" : "transparent",
              }}
            >
              <Icon
                name={
                  [
                    "home-outline",
                    "book-outline",
                    "bag-outline",
                    "search-outline",
                  ][i]
                }
                color={state.index === i ? purple : t.muted}
                size={24}
              />
              {state.index === i && (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: purple,
                    marginTop: 4,
                  }}
                />
              )}
            </Tap>
          </View>
        ))}
      </Glass>
    </View>
  );
}
function Main() {
  return (
    <Tabs.Navigator
      tabBar={(p) => <TabBar {...p} />}
      screenOptions={{ headerShown: false, animation: "fade" }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Library" component={Library} />
      <Tabs.Screen name="Store" component={Store} />
      <Tabs.Screen name="Search" component={Search} />
    </Tabs.Navigator>
  );
}
const groups: [string, [string, string, object?][]][] = [
  [
    "Start",
    [
      ["Splash", "Splash"],
      ["Onboarding", "Onboarding"],
      ["Sign in", "SignIn"],
      ["Sign up", "SignUp"],
      ["Forgot password", "Forgot"],
      ["Verification", "Verification"],
    ],
  ],
  [
    "Main tabs",
    [
      ["Home", "Main", { screen: "Home" }],
      ["Library", "Main", { screen: "Library" }],
      ["Store", "Main", { screen: "Store" }],
      ["Search", "Main", { screen: "Search" }],
      ["Horror category", "Category", { category: "Horror" }],
    ],
  ],
  [
    "Books & reader",
    [
      ["Mexican Gothic", "Book", { bookId: "mexican" }],
      ["Murder Board · purchase", "Book", { bookId: "murder", purchase: true }],
      ["Reading progress", "Reading"],
      ["Reader · themes and settings", "Reader"],
      ["Write a review", "WriteReview"],
      ["Book actions", "BookActions"],
      ["Save to collection", "SaveCollection"],
      ["Share preview", "Share"],
      ["Download progress", "Download"],
    ],
  ],
  [
    "Collections",
    [
      ["Collections", "Collections"],
      ["Empty collections", "Collections", { empty: true }],
      ["Collection detail", "Collection"],
      ["My Collections", "Collection", { name: "My Collections" }],
      ["Edit collection list", "CollectionList"],
      ["New collection", "NewCollection"],
      ["Add books", "AddBooks"],
      ["Delete collection popup", "DeleteCollection"],
    ],
  ],
  [
    "Friends",
    [
      ["Friends feed", "Friends"],
      ["No friends", "Invite", { empty: true }],
      ["Invite friends", "Invite"],
      ["Discover people", "Discover"],
      ["Search friends", "FriendSearch"],
      ["Chat", "Chat"],
      ["Friend profile", "FriendProfile"],
      ["Friend actions", "FriendActions"],
    ],
  ],
  [
    "Profile & settings",
    [
      ["Profile", "Profile"],
      ["Author detail", "Author"],
      ["Membership", "Membership"],
      ["Profile menu", "ProfileMenu"],
      ["Settings · light / dark", "Settings"],
      ["Edit Profile", "EditProfile"],
      ["Reading goal", "Goals"],
      ["Goal picker", "GoalPicker"],
      ["Notifications", "Notifications"],
      ["Empty notifications", "Notifications", { empty: true }],
      ["Gift Code", "Gift"],
      ["Help Center", "Help"],
    ],
  ],
  [
    "Purchase previews",
    [
      ["Purchase details", "Purchase"],
      ["Payment success", "Purchase", { status: "success" }],
      ["Payment failure", "Purchase", { status: "failed" }],
      ["Payment methods", "PaymentMethods"],
      ["Add payment method", "AddPayment"],
      ["App Store preview", "AppStore"],
    ],
  ],
  [
    "Illustrated popups",
    [
      ["Download complete", "Popup", { kind: "check" }],
      ["Tip", "Popup", { kind: "bulb" }],
      ["Coffee", "Popup", { kind: "coffee" }],
      [
        "Goal selected",
        "Popup",
        {
          kind: "timer",
          title: "40 minute goal selected!",
          subtitle: "Time to Read!",
        },
      ],
    ],
  ],
];
function Gallery({ navigation }: any) {
  const t = useTheme();
  return (
    <Page>
      <Header navigation={navigation} title="Screen Gallery" />
      <Txt size={12}>Explore every UI flow and alternate state.</Txt>
      <Row
        title={t.dark ? "Dark appearance" : "Light appearance"}
        icon={t.dark ? "moon" : "sunny"}
        onPress={() => t.setDark(!t.dark)}
      />
      {groups.map(([title, items]) => (
        <Section key={title} title={title}>
          {items.map(([name, dest, params]) => (
            <Row
              key={name}
              title={name}
              icon="phone-portrait-outline"
              onPress={() => navigation.navigate(dest, params)}
            />
          ))}
        </Section>
      ))}
    </Page>
  );
}
const screens: any = {
  Main,
  Gallery,
  Splash,
  Onboarding,
  SignIn: Auth,
  SignUp: Auth,
  Forgot,
  Verification,
  Category,
  Book: BookScreen,
  Reading,
  Reader,
  WriteReview,
  BookActions,
  SaveCollection,
  Share,
  Purchase,
  PaymentMethods,
  AddPayment,
  AppStore,
  Download,
  Collections,
  Collection,
  CollectionList,
  NewCollection,
  AddBooks,
  Friends,
  Invite,
  Discover,
  FriendSearch,
  Chat,
  Profile,
  FriendProfile: Profile,
  Author,
  Membership,
  Settings,
  EditProfile,
  Goals: GoalsScreen,
  Notifications,
  Gift: Info,
  Help: Info,
  Terms: Info,
  Privacy: Info,
};
const appLinks: any = {
  prefixes: ["ibook://"],
  config: {
    screens: {
      Gallery: "gallery",
      Main: {
        screens: {
          Home: "home",
          Library: "library",
          Store: "store",
          Search: "search",
        },
      },
      Settings: "settings",
      Reader: "reader",
      Book: "book",
      Onboarding: "onboarding",
      Profile: "profile",
      Collections: "collections",
      Friends: "friends",
      SignIn: "signin",
      Purchase: "purchase",
    },
  },
};
export default function App() {
  const [dark, setDark] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  if (!fontsLoaded && !fontError)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={purple} />
      </View>
    );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeContext.Provider value={{ dark, setDark }}>
          <StatusBar style={dark ? "light" : "dark"} />
          <NavigationContainer
            theme={dark ? DarkTheme : DefaultTheme}
            linking={appLinks}
          >
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
                contentStyle: { backgroundColor: dark ? "#111" : "white" },
                gestureEnabled: true,
              }}
            >
              {Object.entries(screens).map(([name, component]) => (
                <Stack.Screen
                  key={name}
                  name={name}
                  component={component as any}
                />
              ))}
              {Object.entries({
                Popup,
                DeleteCollection,
                ProfileMenu,
                FriendActions,
                GoalPicker,
              }).map(([name, component]) => (
                <Stack.Screen
                  key={name}
                  name={name}
                  component={component}
                  options={{
                    presentation: "transparentModal",
                    animation: "fade",
                    contentStyle: { backgroundColor: "transparent" },
                  }}
                />
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
