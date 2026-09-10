import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AccessibilityInfo,
  Animated,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppSymbol } from "./symbols";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";
import {
  GlassView,
  isLiquidGlassAvailable,
  isGlassEffectAPIAvailable,
} from "expo-glass-effect";
import { art } from "./assets";
import { Book, purple } from "./data";
export const ThemeContext = createContext({
  dark: false,
  setDark: (_v: boolean) => {},
});
export function useTheme() {
  const { dark, setDark } = useContext(ThemeContext);
  return {
    dark,
    setDark,
    bg: dark ? "#101117" : "#F8F7FC",
    card: dark ? "#20212B" : "#EFEDF6",
    ink: dark ? "#F1F0F8" : "#252332",
    muted: dark ? "#A7A5B6" : "#777486",
    heading: dark ? "#F1F0F8" : "#252332",
    line: dark ? "#37343F" : "#ECEBF1",
  };
}
export function Txt({
  children,
  size = 14,
  bold = false,
  color,
  style,
  ...rest
}: any) {
  const t = useTheme();
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily:
            Platform.OS === "web"
              ? "-apple-system, BlinkMacSystemFont, Inter, system-ui, sans-serif"
              : undefined,
          fontWeight: bold ? "600" : "400",
          letterSpacing: size >= 24 ? -0.8 : 0,
          fontSize: size,
          color: color || t.ink,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
export function Tap({
  children,
  onPress,
  style,
  label,
  onLongPress,
  disabled = false,
}: any) {
  const v = useRef(new Animated.Value(1)).current;
  return (
    <Animated.View style={{ transform: [{ scale: v }] }}>
      <Pressable
        disabled={disabled}
        accessibilityState={{ disabled }}
        accessibilityRole="button"
        accessibilityLabel={label}
        onLongPress={onLongPress}
        onPress={(event) => {
          if (Platform.OS !== "web")
            void Haptics.selectionAsync().catch(() => {});
          onPress?.(event);
        }}
        onPressIn={() =>
          Animated.spring(v, {
            toValue: 0.96,
            useNativeDriver: Platform.OS !== "web",
            speed: 40,
          }).start()
        }
        onPressOut={() =>
          Animated.spring(v, {
            toValue: 1,
            useNativeDriver: Platform.OS !== "web",
            speed: 30,
            bounciness: 8,
          }).start()
        }
        style={style}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
export function Icon({
  name = "chevron-back",
  color = purple,
  size = 23,
}: any) {
  return <AppSymbol name={name} size={size} color={color} />;
}
export function IconButton({ name, onPress, light = false, label }: any) {
  const t = useTheme();
  return (
    <Tap
      label={label || name}
      onPress={onPress}
      style={{
        width: 44,
        height: 44,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: light ? "#00000020" : t.card,
      }}
    >
      <Icon name={name} color={light ? "white" : purple} />
    </Tap>
  );
}
export function Button({
  title,
  onPress,
  secondary = false,
  icon,
  style,
  disabled = false,
}: any) {
  const t = useTheme();
  return (
    <Tap
      disabled={disabled}
      onPress={onPress}
      label={title}
      style={[
        {
          minHeight: 56,
          paddingVertical: 15,
          paddingHorizontal: 18,
          borderRadius: 18,
          backgroundColor: secondary ? t.card : purple,
          borderWidth: secondary ? 1 : 0,
          borderColor: secondary ? purple : "transparent",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 9,
        },
        style,
      ]}
    >
      {icon && (
        <Icon name={icon} size={20} color={secondary ? purple : "white"} />
      )}
      <Txt bold size={14} color={secondary ? purple : "white"}>
        {title}
      </Txt>
    </Tap>
  );
}
export function Page({
  children,
  purpleBg = false,
  scroll = true,
  style,
  bottom = 30,
  scrollRef,
}: any) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ flex: 1, backgroundColor: purpleBg && !t.dark ? purple : t.bg }}
    >
      {scroll ? (
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            {
              paddingTop: insets.top + 16,
              paddingBottom: insets.bottom + bottom,
              paddingHorizontal: 24,
              width: "100%",
              maxWidth: 860,
              alignSelf: "center",
              flexGrow: 1,
            },
            style,
          ]}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            {
              flex: 1,
              paddingTop: insets.top + 16,
              paddingBottom: insets.bottom + bottom,
              paddingHorizontal: 24,
              width: "100%",
              maxWidth: 860,
              alignSelf: "center",
            },
            style,
          ]}
        >
          {children}
        </View>
      )}
    </View>
  );
}
export function Header({ navigation, title, right, light = false }: any) {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <IconButton
          name="chevron-back"
          light={light}
          onPress={() =>
            navigation.canGoBack()
              ? navigation.goBack()
              : navigation.navigate("Main")
          }
          label="Back"
        />
        <View style={{ flexDirection: "row", gap: 10 }}>{right}</View>
      </View>
      {title && <Title light={light}>{title}</Title>}
    </>
  );
}
export function Title({ children, light = false }: any) {
  const t = useTheme();
  return (
    <Txt
      size={30}
      bold
      color={light ? "white" : t.heading}
      style={{ marginBottom: 12 }}
    >
      {children}
    </Txt>
  );
}
export function Section({ title, children, light = false, right }: any) {
  const t = useTheme();
  return (
    <View style={{ marginTop: 24 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <Txt bold size={15} color={light ? "white" : t.heading}>
          {title}
        </Txt>
        {right}
      </View>
      {children}
    </View>
  );
}
export function Field({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  icon,
  autoFocus = false,
  multiline = false,
  maxLength,
}: any) {
  const t = useTheme();
  const [focus, setFocus] = useState(false);
  const [hide, setHide] = useState(true);
  return (
    <View style={{ marginBottom: 22 }}>
      {label && (
        <Txt size={13} color={t.muted} style={{ marginBottom: 7 }}>
          {label}
        </Txt>
      )}
      <View
        style={{
          borderWidth: 1,
          borderColor: focus ? purple : t.line,
          borderRadius: 18,
          backgroundColor: t.dark ? t.card : t.bg,
          minHeight: 56,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        {icon && <Icon name={icon} size={20} />}
        <TextInput
          accessibilityLabel={label || placeholder}
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={t.muted}
          secureTextEntry={secureTextEntry && hide}
          keyboardType={keyboardType}
          autoCapitalize="none"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          multiline={multiline}
          maxLength={maxLength}
          style={{
            flex: 1,
            paddingVertical: 15,
            paddingHorizontal: icon ? 10 : 0,
            fontFamily: Platform.OS === "web" ? "system-ui" : undefined,
            fontSize: 14,
            color: t.ink,
          }}
        />
        {secureTextEntry && (
          <IconButton
            name={hide ? "eye-off-outline" : "eye-outline"}
            onPress={() => setHide(!hide)}
            label="Toggle password visibility"
          />
        )}
      </View>
    </View>
  );
}
export function Avatar({
  index = 0,
  size = 46,
  ring = false,
  name = "",
  source,
}: any) {
  const colors = [
    ["#DCD4FF", "#9F8BEE"],
    ["#D4E8EE", "#77A6AE"],
    ["#F7DDCE", "#DCAB87"],
  ] as const;
  return (
    <LinearGradient
      colors={colors[index % 3]}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: ring ? 3 : 1,
        borderColor: "#FFFFFF88",
      }}
    >
      {name ? (
        <Txt size={size * 0.34} bold color="#48405F">
          {name
            .split(" ")
            .map((x: string) => x[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </Txt>
      ) : (
        <AppSymbol name="person" color="#655884" size={size * 0.43} />
      )}
    </LinearGradient>
  );
}
export function BookRow({
  book,
  onPress,
  onMore,
  selected,
  selectable = false,
}: {
  book: Book;
  onPress: () => void;
  onMore?: () => void;
  selected?: boolean;
  selectable?: boolean;
}) {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 13,
        alignItems: "center",
        marginBottom: 22,
      }}
    >
      {selectable && (
        <Tap onPress={onMore || onPress} label={"Select " + book.title}>
          <Icon
            name={selected ? "checkmark-circle" : "ellipse-outline"}
            size={23}
          />
        </Tap>
      )}
      <Tap onPress={onPress} label={book.title}>
        <BookCover book={book} />
      </Tap>
      <Pressable onPress={onPress} style={{ flex: 1 }}>
        <Txt bold size={14}>
          {book.title}
        </Txt>
        <Txt size={11} color={t.muted}>
          By {book.author}
        </Txt>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          <Icon name="eye-outline" size={15} />
          <Txt size={11} color={t.muted}>
            {" "}
            {"category" in book ? String(book.category) : "Book"}
          </Txt>
        </View>
        {"available" in book && (
          <Txt size={11} color={purple}>
            {book.available ? "Read free" : "Reading list only"}
          </Txt>
        )}
      </Pressable>
      {onMore && !selectable && (
        <Tap
          label={"Options for " + book.title}
          onPress={onMore}
          style={{ padding: 7 }}
        >
          <Icon name="ellipsis-vertical" size={19} color={t.muted} />
        </Tap>
      )}
    </View>
  );
}
export function BookCover({ book, large = false, width: custom }: any) {
  const width = custom || (large ? 188 : 82),
    height = width * 1.43;
  return (
    <View
      style={{
        width,
        height,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#332745",
        borderLeftWidth: 3,
        borderLeftColor: "#FFFFFF40",
      }}
    >
      <Image
        source={book.image || art[book.id as keyof typeof art] || art.ocean}
        style={{position:"absolute",top:0,left:0,width,height}}
      />
      <LinearGradient
        colors={["#080B1800", "#080B1820", "#080B18DF"]}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          justifyContent: "flex-end",
          padding: width * 0.09,
        }}
      >
        <Txt
          color="white"
          size={large || custom ? Math.max(14, width * 0.115) : 10}
          bold
          numberOfLines={3}
        >
          {book.title}
        </Txt>
        {(large || custom) && (
          <Txt color="#FFFFFFBB" size={10} style={{ marginTop: 7 }}>
            {book.author}
          </Txt>
        )}
      </LinearGradient>
    </View>
  );
}
export function Card({ children, style }: any) {
  const t = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: t.dark ? t.card : "white",
          borderRadius: 28,
          padding: 20,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
export function Art({ name, size = 200, style }: any) {
  const icon =
    (
      {
        logo: "book",
        empty: "folder-open",
        check: "checkmark-circle",
        bulb: "sparkles",
        coffee: "leaf",
        bell: "notifications",
        trash: "trash",
        timer: "timer",
        trophy: "trophy",
        orbit: "people",
      } as any
    )[name] || "sparkles";
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <LinearGradient
        colors={["#ECE7FF", "#C5B5F5", "#8970DC"]}
        style={{
          width: size * 0.72,
          height: size * 0.72,
          borderRadius: size * 0.25,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#FFFFFFCC",
          transform: [{ rotate: "-8deg" }],
        }}
      >
        <AppSymbol name={icon} color="white" size={size * 0.36} animated />
      </LinearGradient>
    </View>
  );
}
export function FloatArt({ name, size = 200 }: any) {
  const y = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let loop: Animated.CompositeAnimation;
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then((reduce) => {
      if (!reduce && active) {
        loop = Animated.loop(
          Animated.sequence([
            Animated.timing(y, {
              toValue: -8,
              duration: 1800,
              useNativeDriver: Platform.OS !== "web",
            }),
            Animated.timing(y, {
              toValue: 0,
              duration: 1800,
              useNativeDriver: Platform.OS !== "web",
            }),
          ]),
        );
        loop.start();
      }
    });
    return () => {
      active = false;
      loop?.stop();
    };
  }, []);
  return (
    <Animated.View
      style={{
        transform: [{ translateY: y }],
        alignSelf: "center",
        maxWidth: "100%",
      }}
    >
      <Art name={name} size={size} />
    </Animated.View>
  );
}
export function Glass({ children, style }: any) {
  const t = useTheme();
  if (
    Platform.OS === "ios" &&
    isLiquidGlassAvailable() &&
    isGlassEffectAPIAvailable()
  )
    return (
      <GlassView glassEffectStyle="regular" style={style}>
        {children}
      </GlassView>
    );
  return (
    <BlurView
      intensity={65}
      tint={t.dark ? "dark" : "light"}
      style={[
        {
          backgroundColor: t.dark ? "#242430AA" : "#FFFFFFAA",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: t.dark ? "#FFFFFF20" : "#FFFFFFBB",
        },
        style,
      ]}
    >
      {children}
    </BlurView>
  );
}
export function Row({
  title,
  icon = "chevron-forward",
  onPress,
  trailing,
  color,
}: any) {
  const t = useTheme();
  return (
    <Tap
      onPress={onPress}
      label={title}
      style={{
        flexDirection: "row",
        alignItems: "center",
        minHeight: 59,
        borderBottomWidth: 1,
        borderColor: t.line,
        gap: 16,
      }}
    >
      <Icon name={icon} />
      <Txt bold size={14} color={color} style={{ flex: 1 }}>
        {title}
      </Txt>
      {trailing || <Icon name="chevron-forward" size={17} color={t.muted} />}
    </Tap>
  );
}

export function ModalBackdrop({ children, style }: any) {
  return (
    <View style={[{ flex: 1 }, style]}>
      <BlurView
        intensity={35}
        tint="dark"
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {children}
    </View>
  );
}
