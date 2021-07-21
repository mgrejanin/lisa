export function usePlugin(fileName: string): boolean {
    return /(\.scss|\.sass)$/i.test(fileName);
}
