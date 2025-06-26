export const SIZES = ['sm', 'md', 'lg', 'xl'] as const;
export type Size = typeof SIZES[number];


const SizeMap:Record<Size, string> = {
    'sm' : 'p-1 rounded-sm',
    'md' : 'p-1.5 rounded-md',
    'lg' : 'p-2 rounded-lg',
    'xl' : 'p-2.5 rounded-xl',
}

export function getClass(size:Size): string {
    return SizeMap[size];
}