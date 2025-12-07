import { Outlet, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarHeading,
} from 'components/sidebar';
import { SidebarLayout } from 'components/sidebar-layout';
import { WATCH_FEEDS } from '../../data';

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
              <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            <SidebarSection>
              <SidebarHeading>Watch Feeds</SidebarHeading>
              {WATCH_FEEDS.map((feed, index) => (
                <SidebarItem
                  key={feed.url}
                  href={`/list/${index}`}
                  current={pathname === `/list/${index}`}
                >
                  <SidebarLabel>{feed.name}</SidebarLabel>
                </SidebarItem>
              ))}
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      <Outlet />
    </SidebarLayout>
  );
}
