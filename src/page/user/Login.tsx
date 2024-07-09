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
import { useMutation, useQueryClient } from "react-query";
import { loginUser, TLoginResponse } from "@/api/UserApi";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContextProvider";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Please enter the password",
  }),
});
const Login = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const mutation = useMutation({
    mutationFn: loginUser,
    onError: (error: AxiosError) => {
      let errorResponse =
        JSON.stringify(error.response?.data) ||
        "An unexpected error has occurred";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorResponse,
      });
    },
    onSuccess: (data: TLoginResponse) => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        variant: "success",
        title: "Success",
        description: "Successfull Login",
      });
      login(data.access);
      navigate("/home");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
