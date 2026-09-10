import React, { useEffect } from "react";
import { ClerkProvider, useClerk } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { registerProviderLogout } from "./store";
export const clerkKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
function SessionLifecycle() {
  const clerk = useClerk();
  useEffect(() => {
    registerProviderLogout(() => clerk.signOut());
  }, [clerk]);
  return null;
}
export function ClerkShell({ children }: any) {
  return clerkKey ? (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}>
      <SessionLifecycle />
      {children}
    </ClerkProvider>
  ) : (
    children
  );
}
