import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { UserProfile, UserProfileInput } from "../backend.d.ts";

function getActor() {
  const noop = async () => new Uint8Array();
  const noopDown = async () => ({
    directURL: "",
    getBytes: noop,
    getDirectURL: () => "",
    withUploadProgress: () => ({
      directURL: "",
      getBytes: noop,
      getDirectURL: () => "",
      withUploadProgress: () => null as never,
      _blob: undefined,
      onProgress: undefined,
    }),
  });
  return createActor(
    (window as unknown as Record<string, string>).__CANISTER_ID_BACKEND__ ?? "",
    noop,
    noopDown as never,
    {},
  );
}

export function useGetCallerUserProfile(enabled: boolean) {
  return useQuery<UserProfile | null>({
    queryKey: ["callerUserProfile"],
    queryFn: async () => {
      const actor = getActor();
      return actor.getCallerUserProfile();
    },
    enabled,
    retry: false,
  });
}

export function useSaveCallerUserProfile() {
  const queryClient = useQueryClient();
  return useMutation<UserProfile, Error, UserProfileInput>({
    mutationFn: async (profile) => {
      const actor = getActor();
      const result = await actor.saveCallerUserProfile(profile);
      if (result.__kind__ === "ok") {
        return result.ok;
      }
      throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerUserProfile"] });
    },
  });
}
