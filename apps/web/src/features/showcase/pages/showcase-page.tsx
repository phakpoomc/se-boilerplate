import { useState, type FormEvent } from "react";
import { createShowcaseItemSchema } from "@starter/shared";
import {
  BoxesIcon,
  DatabaseIcon,
  FolderOpenIcon,
  HeartPulseIcon,
  LoaderCircleIcon,
  PlusIcon,
  SparklesIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShowcaseItemCard } from "../components/showcase-item-card";
import { useShowcaseItems } from "../hooks/use-showcase-items";

export function ShowcasePage() {
  const { items, create, update, remove, upload, removeAttachment } = useShowcaseItems();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const busy = create.isPending || update.isPending || remove.isPending || upload.isPending || removeAttachment.isPending;

  async function submit(event: FormEvent) {
    event.preventDefault();
    const parsed = createShowcaseItemSchema.safeParse({ title, description });
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Check the form.");
      return;
    }

    setFormError("");
    await create.mutateAsync(parsed.data);
    setTitle("");
    setDescription("");
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="flex flex-col gap-5 rounded-2xl border bg-background p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between lg:p-8">
          <div className="flex max-w-3xl flex-col gap-3">
            <Badge className="w-fit">
              <SparklesIcon data-icon="inline-start" />
              Full-stack starter
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Student project boilerplate</h1>
            <p className="text-base leading-7 text-muted-foreground">
              A deliberately small example connecting React, TanStack Query, Express, Prisma SQLite,
              and validated local file uploads. Replace this feature with your own project idea.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
            <Badge variant="outline" className="h-9 gap-2 rounded-lg px-3">
              <HeartPulseIcon />
              Express API
            </Badge>
            <Badge variant="outline" className="h-9 gap-2 rounded-lg px-3">
              <DatabaseIcon />
              SQLite
            </Badge>
            <Badge variant="outline" className="h-9 gap-2 rounded-lg px-3">
              <FolderOpenIcon />
              Local files
            </Badge>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)]">
          <Card className="h-fit lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle>Create an item</CardTitle>
              <CardDescription>This form validates in the browser and again in the API.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-5" onSubmit={submit}>
                <FieldGroup>
                  <Field data-invalid={Boolean(formError)}>
                    <FieldLabel htmlFor="new-title">Title</FieldLabel>
                    <Input
                      id="new-title"
                      value={title}
                      maxLength={120}
                      placeholder="My first feature"
                      aria-invalid={Boolean(formError)}
                      disabled={busy}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                    <FieldError>{formError}</FieldError>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="new-description">Description</FieldLabel>
                    <Textarea
                      id="new-description"
                      value={description}
                      maxLength={1000}
                      placeholder="What should this item demonstrate?"
                      disabled={busy}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                    <FieldDescription>Optional, up to 1,000 characters.</FieldDescription>
                  </Field>
                </FieldGroup>
                <Button type="submit" size="lg" disabled={busy || !title.trim()}>
                  {create.isPending ? <LoaderCircleIcon data-icon="inline-start" className="animate-spin" /> : <PlusIcon data-icon="inline-start" />}
                  Create item
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Showcase items</h2>
                <p className="text-sm text-muted-foreground">Persistent data from your local SQLite database.</p>
              </div>
              <Badge variant="secondary">{items.data?.length ?? 0} items</Badge>
            </div>

            {items.isLoading ? (
              <Card>
                <CardContent className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
                  <LoaderCircleIcon className="animate-spin" aria-hidden="true" />
                  Loading the API…
                </CardContent>
              </Card>
            ) : items.isError ? (
              <Card>
                <CardHeader>
                  <CardTitle>Could not reach the API</CardTitle>
                  <CardDescription>{items.error instanceof Error ? items.error.message : "Run pnpm dev and try again."}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" onClick={() => items.refetch()}>Try again</Button>
                </CardContent>
              </Card>
            ) : items.data?.length ? (
              items.data.map((item) => (
                <ShowcaseItemCard
                  key={item.id}
                  item={item}
                  busy={busy}
                  onUpdate={(id, input) => update.mutateAsync({ id, input })}
                  onDelete={(id) => remove.mutateAsync(id)}
                  onUpload={(id, file) => upload.mutateAsync({ id, file })}
                  onRemoveAttachment={(id) => removeAttachment.mutateAsync(id)}
                />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                  <BoxesIcon className="text-muted-foreground" aria-hidden="true" />
                  <div>
                    <p className="font-medium">No showcase items yet</p>
                    <p className="text-sm text-muted-foreground">Create one to verify the complete data flow.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
