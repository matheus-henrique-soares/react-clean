import React from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from '@/presentation/components'

const root = createRoot(document.getElementById('main'))

root.render(<Router/>)
