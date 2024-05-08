'use client'

import { useState,useEffect } from "react"
import axios from "axios";
import Link from "next/link";






export default function Admin(){


    return(
        <div>
            <h1>Admin</h1>
            <Link
            href="/admin/Men">Men</Link>
            <Link  href="/admin/Women">Women</Link>
            <Link  href="/admin/Unisex">Unisex</Link>
            <Link  href="/admin/Kids">Kids</Link>
        </div>
    )
}