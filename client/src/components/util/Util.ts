export function range(size: number, startAt = 0): Array<number> {
    return [...Array(size).keys()].map(i => i + startAt);
}

export function deleteCookie(name: string) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}