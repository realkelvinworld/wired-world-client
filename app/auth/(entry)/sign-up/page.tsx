import ComingSoon from "@/components/ux/coming-soon";

export default function SignUp() {
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
            Create your WiredWorld account
          </h1>
          <p className="max-w-xs text-sm text-center text-muted-foreground">
            Join thousands of happy customers. Get exclusive deals, track your
            orders, and save your favourite products all in one place.
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
