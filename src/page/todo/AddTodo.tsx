import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "@/api/TodoApi";
import { useAuth } from "@/context/AuthContextProvider";
import Loader from "@/components/loading/Loader";

const formSchema = z.object({
  task_name: z.string().min(2, {
    message: "Please enter the task name",
  }),
  desc: z.string().min(2, {
    message: "Please enter the task description",
  }),
});
const AddTodo = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task_name: "",
      desc: "",
    },
  });
  const { userId } = useAuth();
  let userIds: number | null = null;

  if (userId !== null) {
    userIds = parseInt(userId, 10);
  }
  //Add todo
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      form.reset();
      queryClient.invalidateQueries("todos");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newValue = {
      idOfUser_fk: userIds,
      task_name: values.task_name,
      desc: values.desc,
    };
    mutation.mutate(newValue);
  };
  return (
    <div className="w-[400px]">
      <h1 className="text-2xl font-bold text-black uppercase px-[100px]">
        Add your Todo
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="task_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input placeholder="Task Name" {...field} />
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
                <FormLabel>Task Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a task description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {mutation.isLoading ? (
              <div className="flex items-center gap-4">
                <Loader /> Adding
              </div>
            ) : (
              "Add Todo"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTodo;
