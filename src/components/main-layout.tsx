import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Logo from '@/assets/react.svg'
import {Link, Outlet} from 'react-router-dom'
import {Toaster} from './ui/sonner'

export default function MainLayout() {
  return (
    <main className="flex h-screen w-screen justify-center overflow-x-hidden">
      <div className="w-full max-w-screen-2xl">
        <header className="flex items-center justify-between py-4 px-6 shadow-md gap-4">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="logo" className="h-6 w-auto" />
            <span className="text-accent-foreground font-extrabold text-lg italic">SkillTest</span>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/form-builder">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Form Builder
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/users">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Users
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        <Outlet />
        <Toaster />
      </div>
    </main>
  )
}
