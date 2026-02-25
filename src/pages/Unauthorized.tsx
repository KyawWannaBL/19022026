    <div className="min-h-screen flex items-center justify-center p-10 bg-background text-foreground">
      <div className="max-w-lg w-full border rounded-2xl p-6 bg-card">
        <h1 className="text-xl font-bold mb-2">Unauthorized</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to view this page.
        </p>
        <Link className="text-primary underline" to="/login">
          Go to Login
        </Link>
      </div>
    </div>
  );
}
