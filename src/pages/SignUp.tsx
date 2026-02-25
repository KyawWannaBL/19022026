import { Button } from "@/components/ui/button";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-xl space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Create account</h1>
          <p className="text-muted-foreground">Choose the account type you want to create.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border">
            <CardContent className="p-6 space-y-3">
              <h2 className="text-lg font-semibold">Customer</h2>
              <p className="text-sm text-muted-foreground">Track shipments, request pickups, manage deliveries.</p>
              <Button asChild className="w-full">
                <Link to="/register/customer">Continue as Customer</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6 space-y-3">
              <h2 className="text-lg font-semibold">Merchant</h2>
              <p className="text-sm text-muted-foreground">Create shipments, manage orders, view analytics.</p>
              <Button asChild className="w-full">
                <Link to="/register/merchant">Continue as Merchant</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account? <Link className="text-primary underline" to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
