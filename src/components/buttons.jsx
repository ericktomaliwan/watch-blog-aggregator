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

