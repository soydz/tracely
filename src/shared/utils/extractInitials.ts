export function extractInitial(fullName: string): string {
    return  fullName
    .trim()
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0,2);
}
