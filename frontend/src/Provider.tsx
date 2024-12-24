import { ThemeProvider } from "./components/theme-provider";

export const Provider = ({ children }:{
    children: React.ReactNode
}) => {
    return <ThemeProvider>
        {children}
    </ThemeProvider>
}