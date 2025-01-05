import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">LifeSync</h1>
        <nav>
          <Button variant="secondary">Login</Button>
        </nav>
      </div>
    </header>
  )
}

