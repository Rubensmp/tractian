import React from "react"

import { Routes, Route } from "react-router-dom"

import * as Pages from "./pages"

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
    </Routes>
  )
}
