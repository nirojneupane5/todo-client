import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "./Register";
import Login from "./Login";

const RegisterAndLogin = () => {
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-5">
        <h1 className="text-xl font-bold capitalize">
          Welcome to Todo web appication{" "}
        </h1>
        <h2>Please Register or Login to Get Started</h2>
      </div>
      <Tabs defaultValue="register" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Register />
        </TabsContent>
        <TabsContent value="login">
          <Login />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegisterAndLogin;
