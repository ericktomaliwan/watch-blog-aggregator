import { Outlet, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from 'components/sidebar';
import { SidebarLayout } from 'components/sidebar-layout'

export default function AppLayout() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <SidebarLayout
      sidebar={
        <Sidebar>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === '/'}>
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/about" current={pathname.startsWith('/about')}>
                <SidebarLabel>About</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/events/1" current={pathname.startsWith('/events')}>
                <SidebarLabel>Events</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      <Outlet />
    </SidebarLayout>
  );
}
