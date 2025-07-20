import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import { forwardRef } from 'react'
import PropTypes from "prop-types";


function ArrowIcon(props) {
    return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
            <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
            />
        </svg>
    )
}


/**
 * Expand the hit area to at least 44×44px on touch devices
 */
export function TouchTarget({ children }) {
    return (
      <>
        <span
          className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
          aria-hidden="true"
        />
        {children}
      </>
    )
  }
  