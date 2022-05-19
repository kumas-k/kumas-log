import React from 'react'
import Layout from './src/components/Layout'

import { defineCustomElements as HighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

import './src/styles/global.css'

HighlightElement()

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
