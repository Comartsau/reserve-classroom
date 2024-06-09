'use client'
import {useEffect} from 'react'

function AdminHome() {

    useEffect(() => {
        document.cookie = "token=admin"; // Change to 'user' for user role
      }, []);

  return (
    <div>Admin</div>
  )
}

export default  AdminHome