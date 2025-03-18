import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {Link, Outlet} from 'react-router-dom'
import {Toaster} from './ui/sonner'
import {Github, Menu, Moon, Sun} from 'lucide-react'
import {useTheme} from './theme-provider'
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'
import {CryptoLogo} from './logo'

export default function MainLayout() {
  const {theme, setTheme} = useTheme()

  const navItems = ({className = ''}: {className?: string}) => (
    <>
      <NavigationMenuItem className={className}>
        <Link to="/">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Dashboard
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className={className}>
        <Link to="/form-builder">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Form Builder
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className={className}>
        <Link to="/users">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>Users</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </>
  )

  return (
    <div className="flex h-screen w-screen items-center overflow-x-hidden  bg-secondary flex-col">
      <header className="w-full flex items-center justify-between py-4 px-6 shadow-md gap-4 bg-card">
        <div className="flex items-center gap-4">
          <CryptoLogo size={32} />
          <span className="text-accent-foreground font-extrabold text-lg italic">
            CryptoTracker
          </span>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            {navItems({className: 'max-md:hidden'})}
            {theme === 'dark' ? (
              <NavigationMenuItem className="cursor-pointer ml-4" onClick={() => setTheme('light')}>
                <Sun className="h-6 w-6" />
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem className="cursor-pointer ml-4" onClick={() => setTheme('dark')}>
                <Moon className="h-6 w-6" />
              </NavigationMenuItem>
            )}
            <NavigationMenuItem className="cursor-pointer ml-2.5">
              <Link to="https://github.com/acm-97/billimd-skill-test" target="_blank">
                <Github className="h-6 w-6" />
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer ml-2.5">
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Menu className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent className="w-[250px] p-4 pt-10" side="left">
                  <div className="flex items-center gap-4">
                    <CryptoLogo className="h-6 w-auto" />
                    <span className="text-accent-foreground font-extrabold text-lg italic">
                      CryptoTracker
                    </span>
                  </div>

                  <NavigationMenu className="items-baseline">
                    <NavigationMenuList className="flex-col items-start">
                      {navItems({})}
                    </NavigationMenuList>
                  </NavigationMenu>
                </SheetContent>
              </Sheet>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="w-full max-w-screen-2xl">
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}
