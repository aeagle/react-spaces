export const debounce = <F extends ((...args: any) => any)>(func: F, waitFor: number) => {
    let timeout: number = 0

    const debounced = (...args: any) => {
        window.clearTimeout(timeout)
        timeout = window.setTimeout(() => func(...args), waitFor)
    }
    
    return debounced as (...args: Parameters<F>) => ReturnType<F>
}