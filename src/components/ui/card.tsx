 * Standard Luxury Card Component
 * Refactored for Bilingual Support (EN/MY)
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

interface BilingualProps {
  en?: string;
  my?: string;
}

/**
 * CardTitle with automatic translation support
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { bilingual?: BilingualProps }
>(({ className, children, bilingual, ...props }, ref) => {
  const { t } = useLanguageContext();
  
  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-bold leading-none tracking-tight font-heading text-primary",
        className
      )}
      {...props}
    >
      {bilingual ? t(bilingual.en || "", bilingual.my || "") : children}
    </h3>
  );
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { bilingual?: BilingualProps }
>(({ className, children, bilingual, ...props }, ref) => {
  const { t } = useLanguageContext();

  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground font-light", className)}
      {...props}
    >
      {bilingual ? t(bilingual.en || "", bilingual.my || "") : children}
    </p>
  );
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 border-t border-border/40 mt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }