import ComingSoon from "@/components/ux/coming-soon";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full ">
      {/* Form goes here */}
      <div className="flex flex-col items-center justify-center h-full p-4 space-y-6 ">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <span className="text-sm font-bold text-background">W</span>
        </div>

        {/* Form component */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="font-semibold text-2xl text-center max-w-sm">
            Welcome back to WiredWorld
          </h1>
          <p className="max-w-xs text-sm text-center text-muted-foreground">
            Sign in to track your orders, manage your wishlist, and pick up
            right where you left off.
          </p>
          {/* <Login /> */}
        </div>

        {/* copy right */}
        <p className=" text-sm">
          © Wired World {new Date().getFullYear()} | All Rights Reserved
        </p>
      </div>
    </div>
  );
}
