import { useState, type FormEvent } from "react";
import type { ShowcaseItem, UpdateShowcaseItemInput } from "@starter/shared";
import {
  CheckCircle2Icon,
  FileIcon,
  LoaderCircleIcon,
  PaperclipIcon,
  PencilIcon,
  Trash2Icon,
  UploadIcon
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiUrl } from "../services/api-url";

interface Props {
  item: ShowcaseItem;
  busy: boolean;
  onUpdate: (id: string, input: UpdateShowcaseItemInput) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
  onUpload: (id: string, file: File) => Promise<unknown>;
  onRemoveAttachment: (id: string) => Promise<unknown>;
}

export function ShowcaseItemCard({
  item,
  busy,
  onUpdate,
  onDelete,
  onUpload,
  onRemoveAttachment
}: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description ?? "");
  const [file, setFile] = useState<File | null>(null);

  async function saveEdit(event: FormEvent) {
    event.preventDefault();
    await onUpdate(item.id, { title, description });
    setEditOpen(false);
  }

  async function uploadAttachment(event: FormEvent) {
    event.preventDefault();
    if (!file) return;
    await onUpload(item.id, file);
    setFile(null);
    const input = event.currentTarget.querySelector<HTMLInputElement>('input[type="file"]');
    if (input) input.value = "";
  }

  return (
    <Card className={item.completed ? "opacity-80" : undefined}>
      <CardHeader>
        <div className="flex items-start gap-3">
          <Checkbox
            className="mt-1"
            checked={item.completed}
            disabled={busy}
            aria-label={`Mark ${item.title} as ${item.completed ? "incomplete" : "complete"}`}
            onCheckedChange={(checked) => onUpdate(item.id, { completed: checked === true })}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className={item.completed ? "line-through" : undefined}>{item.title}</CardTitle>
            <CardDescription>{item.description || "No description yet."}</CardDescription>
          </div>
        </div>
        <CardAction>
          <Badge variant={item.completed ? "secondary" : "outline"}>
            {item.completed ? <CheckCircle2Icon data-icon="inline-start" /> : null}
            {item.completed ? "Complete" : "Open"}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {item.attachment ? (
          <div className="flex flex-col gap-3 rounded-lg border bg-muted/40 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <FileIcon className="shrink-0 text-muted-foreground" aria-hidden="true" />
              <a className="truncate text-sm font-medium underline underline-offset-4" href={apiUrl(item.attachment.url)} target="_blank" rel="noreferrer">
                {item.attachment.originalName}
              </a>
              <span className="shrink-0 text-xs text-muted-foreground">
                {(item.attachment.sizeBytes / 1024).toFixed(1)} KB
              </span>
            </div>
            <Button type="button" size="sm" variant="ghost" disabled={busy} onClick={() => onRemoveAttachment(item.id)}>
              <Trash2Icon data-icon="inline-start" />
              Remove file
            </Button>
          </div>
        ) : (
          <form className="flex flex-col gap-3 rounded-lg border border-dashed p-3 sm:flex-row sm:items-end" onSubmit={uploadAttachment}>
            <Field className="flex-1">
              <FieldLabel htmlFor={`attachment-${item.id}`}>Optional attachment</FieldLabel>
              <Input
                id={`attachment-${item.id}`}
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.pdf"
                disabled={busy}
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
              <FieldDescription>PNG, JPEG, WebP, or PDF. Maximum 5 MB.</FieldDescription>
            </Field>
            <Button type="submit" variant="outline" disabled={!file || busy}>
              {busy ? <LoaderCircleIcon data-icon="inline-start" className="animate-spin" /> : <UploadIcon data-icon="inline-start" />}
              Upload
            </Button>
          </form>
        )}

        <div className="flex flex-wrap gap-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={busy}>
                <PencilIcon data-icon="inline-start" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form className="flex flex-col gap-4" onSubmit={saveEdit}>
                <DialogHeader>
                  <DialogTitle>Edit showcase item</DialogTitle>
                  <DialogDescription>Update the example data stored in SQLite.</DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor={`edit-title-${item.id}`}>Title</FieldLabel>
                    <Input id={`edit-title-${item.id}`} value={title} maxLength={120} required onChange={(event) => setTitle(event.target.value)} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={`edit-description-${item.id}`}>Description</FieldLabel>
                    <Textarea id={`edit-description-${item.id}`} value={description} maxLength={1000} onChange={(event) => setDescription(event.target.value)} />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={busy || !title.trim()}>
                    {busy ? <LoaderCircleIcon data-icon="inline-start" className="animate-spin" /> : null}
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={busy}>
                <Trash2Icon data-icon="inline-start" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                <AlertDialogDescription>
                  This removes the SQLite record and its local attachment. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={() => onDelete(item.id)}>Delete item</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {item.attachment ? (
            <Badge variant="outline" className="ml-auto">
              <PaperclipIcon data-icon="inline-start" />
              Local upload
            </Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
