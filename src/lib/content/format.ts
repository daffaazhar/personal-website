export function isVerifiedText(value: string | null | undefined) {
  return Boolean(value && !value.includes('TODO:'));
}

export function verifiedOrPending(value: string | null | undefined, fallback: string) {
  return isVerifiedText(value) ? value : fallback;
}

export function verifiedList(items: string[]) {
  return items.filter((item) => isVerifiedText(item));
}
