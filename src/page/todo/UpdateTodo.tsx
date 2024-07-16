import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useMutation, useQueryClient } from "react-query";
import { updateTodo } from "@/api/TodoApi";

const formSchema = z.object({
  task_name: z.string().min(2, {
    message: "Task name must be at least 2 characters.",
  }),
  desc: z.string().min(2, {
    message: "Task description must be at least 2 characters.",
  }),
});

export type TUpdateTodoProps = {
  id: number;
  task_name: string;
  desc: string;
};

const UpdateTodo = ({ id, task_name, desc }: TUpdateTodoProps) => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task_name: task_name,
      desc: desc,
    },
  });

  const mutation = useMutation(updateTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      form.reset();
      queryClient.invalidateQueries("todos");
      setIsDialogOpen(false);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newValues = {
      id: id,
      task_name: values.task_name,
      desc: values.desc,
    };
    mutation.mutate(newValues);
  };
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700 mx-4 my-2"
            onClick={() => setIsDialogOpen(true)}
          >
            Edit
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update your Todo</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="task_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Task Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Task name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateTodo;
