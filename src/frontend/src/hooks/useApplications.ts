import { useMutation } from "@tanstack/react-query";
import type { ApplicationInput } from "../types";

interface SubmitResult {
  success: boolean;
  message: string;
}

async function submitApplicationFn(
  input: ApplicationInput,
): Promise<SubmitResult> {
  // Simulate async submission — backend integration point
  await new Promise((res) => setTimeout(res, 1200));
  console.log("Application submitted:", input);
  return {
    success: true,
    message: `Thank you, ${input.name}! Your application has been received. Our team will reach out to you shortly.`,
  };
}

export function useSubmitApplication() {
  return useMutation<SubmitResult, Error, ApplicationInput>({
    mutationFn: submitApplicationFn,
  });
}
