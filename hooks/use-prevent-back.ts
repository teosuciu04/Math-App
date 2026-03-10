import { useNavigation } from "expo-router";
import { useEffect } from "react";

/**
 * DRY Principle: This logic is now reusable across the whole app.
 * @param shouldPrevent - Boolean to enable/disable the block
 * @param onPrevent - Function to call when a back action is intercepted
 */
export function usePreventBack(shouldPrevent: boolean, onPrevent: () => void) {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type === "REPLACE" || !shouldPrevent) {
        return;
      }

      e.preventDefault();
      onPrevent();
    });

    return unsubscribe;
  }, [navigation, shouldPrevent, onPrevent]);
}
