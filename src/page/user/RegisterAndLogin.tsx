import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "./Register";
import Login from "./Login";
const RegisterAndLogin = () => {
  return (
    <div className="flex items-center justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
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
