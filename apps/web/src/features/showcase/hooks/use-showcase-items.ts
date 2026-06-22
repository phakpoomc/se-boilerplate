import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateShowcaseItemInput, UpdateShowcaseItemInput } from "@starter/shared";
import { toast } from "sonner";
import { showcaseItemsApi } from "../services/showcase-items.api";

const queryKey = ["showcase-items"] as const;

function message(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export function useShowcaseItems() {
  const queryClient = useQueryClient();
  const items = useQuery({ queryKey, queryFn: showcaseItemsApi.list });
  const refresh = () => queryClient.invalidateQueries({ queryKey });

  const create = useMutation({
    mutationFn: (input: CreateShowcaseItemInput) => showcaseItemsApi.create(input),
    onSuccess: async () => {
      await refresh();
      toast.success("Item created.");
    },
    onError: (error) => toast.error(message(error))
  });

  const update = useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateShowcaseItemInput }) =>
      showcaseItemsApi.update(id, input),
    onSuccess: async () => {
      await refresh();
      toast.success("Item updated.");
    },
    onError: (error) => toast.error(message(error))
  });

  const remove = useMutation({
    mutationFn: showcaseItemsApi.delete,
    onSuccess: async () => {
      await refresh();
      toast.success("Item deleted.");
    },
    onError: (error) => toast.error(message(error))
  });

  const upload = useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      showcaseItemsApi.uploadAttachment(id, file),
    onSuccess: async () => {
      await refresh();
      toast.success("Attachment uploaded.");
    },
    onError: (error) => toast.error(message(error))
  });

  const removeAttachment = useMutation({
    mutationFn: showcaseItemsApi.removeAttachment,
    onSuccess: async () => {
      await refresh();
      toast.success("Attachment removed.");
    },
    onError: (error) => toast.error(message(error))
  });

  return { items, create, update, remove, upload, removeAttachment };
}
