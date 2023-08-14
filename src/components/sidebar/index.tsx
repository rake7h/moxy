'use client'

import S from './style.module.css'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const list = [
    {
        name: 'apiendpoints',
        lable: 'Endpoints',
        path: '/dashboard/endpoints'

    },
    {
        name: 'collections',
        lable: 'Records',
        path: '/dashboard/collections'
    }
]

const SideNav = () => {
    const pathname = usePathname()

    const isActivePath = (selectPath: string) => selectPath === pathname;

    return (
        <nav className={S.navRoot}>
            <ul className={S.navList}>
                {list.map((l) => (
                    <li className={`${S.navListItem} ${isActivePath(l.path) ? S.activeNav : 'nope'}`} key={l.name}>
                        <Link href={l.path} >{l.lable}</Link>
                    </li>
                ))}

            </ul>

        </nav>
    )
}

export { SideNav }