import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '../components/sidebar'
import { SidebarLayout } from '../components/sidebar-layout'

import { useLocation } from 'react-router-dom'

export default function  Home({events, children}) {
  let location = useLocation()

  const pathname = location.pathname

  return (
    <SidebarLayout
    sidebar={
      <Sidebar>
        <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === '/'}>
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/About" current={pathname.startsWith('/About')}>
                <SidebarLabel>About</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
        </SidebarBody>
      </Sidebar>
    }
    >
    </SidebarLayout>
  )
}
  
  