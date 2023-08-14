import S from './styles.module.css';

interface Props {
    children: React.ReactNode
}

const OutletBody = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <main className={S.outletMain}>
            {children}
        </main>
    )
}

export { OutletBody }