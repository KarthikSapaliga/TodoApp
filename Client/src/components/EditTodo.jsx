import React, { useState } from "react";
import { Pencil, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EditTodo({ title, id, handleUpdate }) {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(new FormData(e.target));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="icon-hover" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Make changes to your Todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <input type="hidden" name="id" value={id} />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={updatedTitle}
              className="col-span-3"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>
          <DialogTrigger asChild>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogTrigger>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditTodo;
