import { useEffect } from "react";
import { InteractionManager } from "react-native";

const useRunAfterInteraction = (callBack, dep = []) => {
  useEffect(() => {
    const interactionPromise =
      InteractionManager.runAfterInteractions(callBack);

    return () => interactionPromise.cancel();
  }, dep);

  return null;
};

export default useRunAfterInteraction;
