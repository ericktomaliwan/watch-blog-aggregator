import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import { LayoutGroup, motion } from 'framer-motion'
import { forwardRef, useId } from 'react'
import { TouchTarget } from './buttons'
import { Heading } from './heading'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


export function Navbar({ className, ...props }) {
    return <nav {...props} className={clsx(className, 'flex flex-1 items-center gap-4 py-2.5')} />
}

