"use client"

import React from 'react'
import useAuthStore from "@/store/useAuthStore"
import useAuth from '@/lib/useAuth'
const page = () => {
  const { user } = useAuth()

  const jB = user?.toJSON()
  return (
    <div>{user?.email} sdfsdfsdf</div>
  )
}

export default page