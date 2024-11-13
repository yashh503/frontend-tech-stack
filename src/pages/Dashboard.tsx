import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useToast } from "@/hooks/use-toast";
import { logoutUser } from "@/slice/authSlice";

const Dashboard = () => {
  const { toast } = useToast();
  const user: any = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    toast({
      title: "Logged out",
      description: "Logged out Successfully",
      duration: 1000,
    });
    dispatch(logoutUser());
  };
  return (
    <>
      <div className="font-bold from-neutral-950 text-purple-950 text-3xl mt-auto h-screen flex flex-col gap-3 items-center justify-center ">
        <p> Hola Amigo </p>
        {user.user.firstName || ""} {user.user.lastName || ""}
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
};

export default Dashboard;
