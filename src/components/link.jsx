import * as Headless from '@headlessui/react'
import { Link as RouterLink } from 'react-router-dom'
import { forwardRef } from 'react'

export const Link = forwardRef(function Link({ to, ...props }, ref) {
  return (
    <Headless.DataInteractive>
      <RouterLink to={to} {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})
