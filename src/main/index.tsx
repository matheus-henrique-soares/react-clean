import React from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from '@/presentation/components'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import '@/presentation/styles/global.scss'

const root = createRoot(document.getElementById('main'))

root.render(<Router makeLogin={makeLogin}/>)
